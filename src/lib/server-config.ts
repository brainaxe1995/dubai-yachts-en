// Server-only helper for reading the persisted config JSON. Keep the node:fs import inside
// a dynamic import so this module stays tree-shakeable from the client bundle.

import type { SiteConfig } from "@/data/config";

async function resolveStorePath(): Promise<string> {
  const envPath = process.env["CONFIG_OVERRIDE_PATH"];
  if (envPath && envPath.length > 0) return envPath;
  const path = await import("node:path");
  // Same walk as admin-store: two fixed levels from cwd landed in
  // `hbuilds/versions/`, which the deploy pipeline prunes, because `current/`
  // is a symlink and cwd resolves through it. Find `hbuilds` itself.
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (path.basename(dir) === "hbuilds") return path.join(dir, "config-overrides.json");
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return path.resolve(process.cwd(), ".admin-data", "config-overrides.json");
}

export async function readStoredConfig(): Promise<Partial<SiteConfig> | null> {
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
