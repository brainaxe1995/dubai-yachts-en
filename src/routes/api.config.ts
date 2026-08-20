import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { DEFAULT_CONFIG, type SiteConfig } from "@/data/config";

// Persistent per-server config store. Path chosen to survive Hostinger managed-deploy
// activations (which swap the `current/` symlink under `hbuilds/`). Written outside
// process.cwd() by walking up two levels to land in `hbuilds/`.
async function resolveStorePath(): Promise<string> {
  const envPath = process.env["CONFIG_OVERRIDE_PATH"];
  if (envPath && envPath.length > 0) return envPath;
  const path = await import("node:path");
  return path.resolve(process.cwd(), "../../config-overrides.json");
}

async function readStore(): Promise<Partial<SiteConfig> | null> {
  try {
    const fs = await import("node:fs/promises");
    const storePath = await resolveStorePath();
    const raw = await fs.readFile(storePath, "utf-8");
    const parsed = JSON.parse(raw) as { config?: Partial<SiteConfig> };
    return parsed.config ?? null;
  } catch {
    return null;
  }
}

async function writeStore(config: SiteConfig, password: string): Promise<void> {
  const fs = await import("node:fs/promises");
  const storePath = await resolveStorePath();
  const payload = JSON.stringify({ config, updatedAt: new Date().toISOString(), passwordLastSet: password.length }, null, 2);
  await fs.writeFile(storePath, payload, "utf-8");
}

const DEFAULT_ADMIN_PASSWORD = "Tootfun321+";

async function verifyPassword(supplied: string): Promise<boolean> {
  if (!supplied || supplied.length === 0) return false;
  // Server has no visibility into per-browser localStorage password. Accept either the
  // baked-in default password OR a value set via CONFIG_ADMIN_PASSWORD env var (settable
  // per-deploy on Hostinger for rotation).
  const envPw = process.env["CONFIG_ADMIN_PASSWORD"];
  if (envPw && supplied === envPw) return true;
  return supplied === DEFAULT_ADMIN_PASSWORD;
}

export const Route = createFileRoute("/api/config")({
  server: {
    handlers: {
      GET: async () => {
        const stored = await readStore();
        return new Response(JSON.stringify({ config: stored ?? {} }), {
          headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        });
      },
      POST: async ({ request }) => {
        let body: { password?: string; config?: SiteConfig };
        try {
          body = (await request.json()) as { password?: string; config?: SiteConfig };
        } catch {
          return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        const pw = body.password ?? "";
        if (!(await verifyPassword(pw))) {
          return new Response(JSON.stringify({ ok: false, error: "Invalid password" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }
        if (!body.config || typeof body.config !== "object") {
          return new Response(JSON.stringify({ ok: false, error: "Missing config" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        try {
          const merged = deepMerge(DEFAULT_CONFIG, body.config);
          await writeStore(merged, pw);
        } catch (e) {
          return new Response(
            JSON.stringify({ ok: false, error: e instanceof Error ? e.message : "Write failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});

function deepMerge<T>(base: T, patch: Partial<T>): T {
  if (typeof base !== "object" || base === null) return (patch as T) ?? base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const k of Object.keys(patch as Record<string, unknown>)) {
    const bv = (base as Record<string, unknown>)[k];
    const pv = (patch as Record<string, unknown>)[k];
    if (typeof bv === "object" && bv !== null && typeof pv === "object" && pv !== null && !Array.isArray(bv)) {
      out[k] = deepMerge(bv, pv as Partial<typeof bv>);
    } else if (pv !== undefined) {
      out[k] = pv;
    }
  }
  return out as T;
}
