import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/**
 * A 30-second in-process cache for rendered HTML.
 *
 * Rendering the home page server-side costs about 340 ms on this shared host —
 * 2,500 elements, nine yacht cards, the whole FAQ — and nothing else on the
 * page can start until that lands. It was the largest single contributor left
 * to first contentful paint on mobile.
 *
 * Every anonymous visitor gets byte-identical HTML (the admin's stored config
 * is read per request but changes only when someone saves), so the render can
 * be reused. Deliberately narrow:
 *
 *   - GET only, and never /api/* or /admin — those must stay live.
 *   - Only a 200 text/html response, and never one carrying Set-Cookie.
 *   - Entries expire after 30 s, and any non-GET clears the cache outright, so
 *     an admin save is visible on the next request. Passenger may run more than
 *     one worker, and a POST only clears the worker that handled it; the other
 *     workers catch up when their entries expire, which is the reason for the
 *     short TTL.
 *   - On a miss the original streaming response is returned untouched and a
 *     clone is read in the background, so a cold request is never made slower
 *     in order to fill the cache.
 */
const HTML_CACHE_TTL_MS = 30_000;
const HTML_CACHE_MAX_ENTRIES = 60;

type CachedHtml = { at: number; body: string; headers: [string, string][] };

const htmlCache = new Map<string, CachedHtml>();

/**
 * Where the shared copy lives.
 *
 * Passenger runs more than one worker, and each has its own heap — measured
 * live, the in-memory cache alone left server response time at 330 ms because
 * consecutive requests kept landing on a worker that had never rendered the
 * page. Writing the render next to the other hbuilds state lets every worker
 * read it. Same directory walk as server-config: `current/` is a symlink, so
 * cwd resolves through it and a fixed depth would land in `versions/`, which
 * the deploy pipeline prunes.
 */
async function cacheDir(): Promise<string> {
  const path = await import("node:path");
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (path.basename(dir) === "hbuilds") return path.join(dir, "html-cache");
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return path.resolve(process.cwd(), ".admin-data", "html-cache");
}

function cacheFileName(key: string): string {
  // The build directory is part of the name on purpose. `current/` points at a
  // fresh versions/<uuid> after every deploy, and the HTML references
  // hashed CSS and JS filenames from its own build — serving a previous
  // build's page would point at assets that no longer exist. Keying on cwd
  // means a deploy can never be served a stale render.
  const seed = `${process.cwd()}::${key}`;
  // Not security, just a filesystem-safe stable name.
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < seed.length; i++) {
    h1 = Math.imul(h1 ^ seed.charCodeAt(i), 0x01000193) >>> 0;
    h2 = Math.imul(h2 + seed.charCodeAt(i), 0x85ebca6b) >>> 0;
  }
  return `${h1.toString(36)}${h2.toString(36)}.html`;
}

/** Drop anything left behind by an earlier build, once per process. */
let sweptPromise: Promise<void> | undefined;
function sweepStaleOnce(): Promise<void> {
  if (!sweptPromise) {
    sweptPromise = (async () => {
      try {
        const [fs, path] = await Promise.all([
          import("node:fs/promises"),
          import("node:path"),
        ]);
        const dir = await cacheDir();
        const now = Date.now();
        for (const name of await fs.readdir(dir)) {
          const file = path.join(dir, name);
          const stat = await fs.stat(file);
          if (now - stat.mtimeMs > HTML_CACHE_TTL_MS) await fs.rm(file, { force: true });
        }
      } catch {
        // nothing to sweep
      }
    })();
  }
  return sweptPromise;
}

async function readDiskCache(key: string): Promise<Response | null> {
  try {
    const [fs, path] = await Promise.all([import("node:fs/promises"), import("node:path")]);
    const file = path.join(await cacheDir(), cacheFileName(key));
    const stat = await fs.stat(file);
    if (Date.now() - stat.mtimeMs > HTML_CACHE_TTL_MS) return null;
    const body = await fs.readFile(file, "utf-8");
    return new Response(body, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8", "x-dy-cache": "disk" },
    });
  } catch {
    return null;
  }
}

async function writeDiskCache(key: string, body: string): Promise<void> {
  try {
    await sweepStaleOnce();
    const [fs, path] = await Promise.all([import("node:fs/promises"), import("node:path")]);
    const dir = await cacheDir();
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, cacheFileName(key));
    // temp file + rename, so a worker reading mid-write never sees a half page
    const tmp = `${file}.${process.pid}.tmp`;
    await fs.writeFile(tmp, body, "utf-8");
    await fs.rename(tmp, file);
  } catch {
    // a read-only or full disk just means no shared cache
  }
}

async function clearDiskCache(): Promise<void> {
  try {
    const [fs, path] = await Promise.all([import("node:fs/promises"), import("node:path")]);
    const dir = await cacheDir();
    for (const name of await fs.readdir(dir)) {
      await fs.rm(path.join(dir, name), { force: true });
    }
  } catch {
    // nothing cached yet
  }
}

function cacheKeyFor(request: Request): string | null {
  if (request.method !== "GET") return null;
  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return null;
  }
  const path = url.pathname;
  if (path.startsWith("/api/") || path.startsWith("/admin")) return null;
  return path + url.search;
}

function readCache(key: string): Response | null {
  const hit = htmlCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > HTML_CACHE_TTL_MS) {
    htmlCache.delete(key);
    return null;
  }
  const headers = new Headers(hit.headers);
  headers.set("x-dy-cache", "memory");
  return new Response(hit.body, { status: 200, headers });
}

function fillCache(key: string, response: Response): void {
  if (response.status !== 200) return;
  if (response.headers.has("set-cookie")) return;
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return;

  const headers: [string, string][] = [];
  response.headers.forEach((value, name) => headers.push([name, value]));

  void response
    .clone()
    .text()
    .then(async (body) => {
      if (htmlCache.size >= HTML_CACHE_MAX_ENTRIES) {
        const oldest = htmlCache.keys().next();
        if (!oldest.done) htmlCache.delete(oldest.value);
      }
      htmlCache.set(key, { at: Date.now(), body, headers });
      await writeDiskCache(key, body);
    })
    .catch(() => {
      // a body that cannot be read simply does not get cached
    });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const key = cacheKeyFor(request);
      if (key) {
        const cached = readCache(key) ?? (await readDiskCache(key));
        if (cached) return cached;
      } else if (request.method !== "GET") {
        // An admin save comes through here; drop everything so the next page
        // render picks up the new config rather than waiting out the TTL.
        htmlCache.clear();
        await clearDiskCache();
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      if (key) fillCache(key, normalized);
      return normalized;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
