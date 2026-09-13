// Server-only persistence for admin data. Files live in `hbuilds/` (one level above
// `current/nodejs/`) so they survive Hostinger managed-deploy activations that swap
// the `current/` symlink under each build. Never import from client code — this
// module uses `node:fs`.

import fs from "node:fs/promises";
import path from "node:path";

/**
 * Where admin data lives.
 *
 * This used to climb two fixed levels from cwd. `current/` is a symlink and
 * Node resolves cwd through it, so the real cwd is
 * `hbuilds/versions/<uuid>/nodejs` and two levels up is **`hbuilds/versions/`**
 * — the directory the deploy pipeline prunes. Every admin setting on this site
 * was sitting one bad deploy away from being wiped.
 *
 * Climb until the directory actually named `hbuilds` is found instead, so the
 * depth of the build path stops mattering. Falling back to a project-local
 * `.admin-data` keeps dev off a sibling site's store — decided by finding
 * `hbuilds`, never by NODE_ENV, because the Node app here does not set it.
 */
function resolveDataDir(): string {
  const envDir = process.env["ADMIN_DATA_DIR"];
  if (envDir && envDir.length > 0) return envDir;
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (path.basename(dir) === "hbuilds") return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return path.resolve(process.cwd(), ".admin-data");
}

function resolveDataPath(fileName: string): string {
  return path.join(resolveDataDir(), fileName);
}

export async function readJsonStore<T>(fileName: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(resolveDataPath(fileName), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeJsonStore(fileName: string, data: unknown): Promise<void> {
  const payload = JSON.stringify(data, null, 2);
  const target = resolveDataPath(fileName);
  // The dev fallback directory does not exist until something writes to it.
  await fs.mkdir(path.dirname(target), { recursive: true });
  // Temp file + rename so a crash mid-write cannot leave truncated JSON behind.
  const tmp = `${target}.${process.pid}.tmp`;
  await fs.writeFile(tmp, payload, "utf-8");
  await fs.rename(tmp, target);
}

const DEFAULT_ADMIN_PASSWORD = "Tootfun321+";
const PASSWORD_FILE = "admin-password.json";

type PasswordFile = { password: string; updatedAt: string };

async function readStoredPassword(): Promise<string | null> {
  const rec = await readJsonStore<PasswordFile>(PASSWORD_FILE);
  if (rec && typeof rec.password === "string" && rec.password.length > 0) return rec.password;
  return null;
}

// Plaintext store on disk. Matches existing threat model (default password
// is already plaintext in source, custom pw plaintext in browser localStorage).
// Rotate by POSTing /api/password.
export async function writeStoredPassword(next: string): Promise<void> {
  const payload: PasswordFile = { password: next, updatedAt: new Date().toISOString() };
  await writeJsonStore(PASSWORD_FILE, payload);
}

export async function verifyAdminPassword(supplied: string): Promise<boolean> {
  if (!supplied || supplied.length === 0) return false;
  // Per-deploy env var is an always-on recovery backdoor: even after the admin
  // rotates the pw and forgets it, whoever controls the Hostinger Node.js env can
  // still authenticate. Leave `CONFIG_ADMIN_PASSWORD` unset to disable.
  const envPw = process.env["CONFIG_ADMIN_PASSWORD"];
  if (envPw && supplied === envPw) return true;
  const stored = await readStoredPassword();
  if (stored) return supplied === stored;
  // No rotation yet — accept the baked-in default.
  return supplied === DEFAULT_ADMIN_PASSWORD;
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export function jsonError(status: number, error: string): Response {
  return jsonResponse({ ok: false, error }, status);
}
