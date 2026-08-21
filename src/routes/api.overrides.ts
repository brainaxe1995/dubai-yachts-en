import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
  jsonError,
  jsonResponse,
  readJsonStore,
  verifyAdminPassword,
  writeJsonStore,
} from "@/server/admin-store";
import { normalizeOverrides, type ProductOverrides } from "@/lib/overrides-types";

const FILE = "product-overrides.json";

type StoreShape = { overrides?: unknown; updatedAt?: string };

export const Route = createFileRoute("/api/overrides")({
  server: {
    handlers: {
      GET: async () => {
        const stored = await readJsonStore<StoreShape>(FILE);
        const overrides = normalizeOverrides(stored?.overrides ?? {});
        return jsonResponse({ overrides });
      },
      POST: async ({ request }) => {
        let body: { password?: string; overrides?: unknown };
        try {
          body = (await request.json()) as { password?: string; overrides?: unknown };
        } catch {
          return jsonError(400, "Invalid JSON body");
        }
        if (!(await verifyAdminPassword(body.password ?? ""))) {
          return jsonError(401, "Invalid password");
        }
        const overrides: ProductOverrides = normalizeOverrides(body.overrides ?? {});
        await writeJsonStore(FILE, { overrides, updatedAt: new Date().toISOString() });
        return jsonResponse({ ok: true });
      },
    },
  },
});
