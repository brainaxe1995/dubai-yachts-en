import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { DEFAULT_CONFIG, type SiteConfig } from "@/data/config";
import {
  jsonError,
  jsonResponse,
  readJsonStore,
  verifyAdminPassword,
  writeJsonStore,
} from "@/server/admin-store";

const FILE = "config-overrides.json";

type StoreShape = { config?: Partial<SiteConfig>; updatedAt?: string };

export const Route = createFileRoute("/api/config")({
  server: {
    handlers: {
      GET: async () => {
        const stored = await readJsonStore<StoreShape>(FILE);
        return jsonResponse({ config: stored?.config ?? {} });
      },
      POST: async ({ request }) => {
        let body: { password?: string; config?: SiteConfig };
        try {
          body = (await request.json()) as { password?: string; config?: SiteConfig };
        } catch {
          return jsonError(400, "Invalid JSON body");
        }
        if (!(await verifyAdminPassword(body.password ?? ""))) {
          return jsonError(401, "Invalid password");
        }
        if (!body.config || typeof body.config !== "object") {
          return jsonError(400, "Missing config");
        }
        try {
          const merged = deepMerge(DEFAULT_CONFIG, body.config);
          await writeJsonStore(FILE, { config: merged, updatedAt: new Date().toISOString() });
        } catch (e) {
          return jsonError(500, e instanceof Error ? e.message : "Write failed");
        }
        return jsonResponse({ ok: true });
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
