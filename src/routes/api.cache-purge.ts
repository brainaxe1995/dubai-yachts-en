import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { jsonError, verifyAdminPassword, writeJsonStore } from "@/server/admin-store";

// POST /api/cache-purge — best-effort cache invalidation:
//  1. Bump hbuilds/cache-version.json so the SSR shell reads a fresh timestamp
//     on the next request (client checks this and force-reloads if newer).
//  2. Emit Clear-Site-Data on the response so the calling browser drops its
//     own HTTP cache immediately.
//  3. Emit x-hcdn-purge / Cache-Tag hints — harmless if the CDN ignores them,
//     honoured by anything downstream that speaks the LiteSpeed/hcdn dialect.
// Hostinger managed nodejs does not expose a public purge API for hcdn, so
// this is the strongest signal we can send from application code.
export const Route = createFileRoute("/api/cache-purge")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { password?: string };
        try {
          body = (await request.json()) as { password?: string };
        } catch {
          return jsonError(400, "Invalid JSON body");
        }
        if (!(await verifyAdminPassword(body.password ?? ""))) {
          return jsonError(401, "Invalid password");
        }
        const purgedAt = new Date().toISOString();
        try {
          await writeJsonStore("cache-version.json", { purgedAt });
        } catch (e) {
          return jsonError(500, e instanceof Error ? e.message : "Version bump failed");
        }
        return new Response(JSON.stringify({ ok: true, purgedAt }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            "Clear-Site-Data": '"cache"',
            "X-LiteSpeed-Purge": "*",
            "X-HCDN-Purge": "*",
          },
        });
      },
    },
  },
});
