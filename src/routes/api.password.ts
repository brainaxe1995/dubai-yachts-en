import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
  jsonError,
  jsonResponse,
  verifyAdminPassword,
  writeStoredPassword,
} from "@/server/admin-store";

// POST /api/password
//  - { currentPassword, verifyOnly: true }       -> validate a password (used at login).
//  - { currentPassword, newPassword }            -> rotate (min 6 chars).
export const Route = createFileRoute("/api/password")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: {
          currentPassword?: string;
          newPassword?: string;
          verifyOnly?: boolean;
        };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return jsonError(400, "Invalid JSON body");
        }
        const current = body.currentPassword ?? "";
        if (!(await verifyAdminPassword(current))) {
          return jsonError(401, "Invalid password");
        }
        if (body.verifyOnly) {
          return jsonResponse({ ok: true });
        }
        const next = body.newPassword ?? "";
        if (next.length < 6) {
          return jsonError(400, "New password must be at least 6 characters");
        }
        await writeStoredPassword(next);
        return jsonResponse({ ok: true });
      },
    },
  },
});
