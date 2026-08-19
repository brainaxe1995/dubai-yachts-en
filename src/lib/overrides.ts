"use server";

// Server-only. "use server" directive tells TanStack Start to strip this
// module from the client bundle. Persistence via Node fs to .data/ dir,
// which lives at project root and survives Hostinger Cloud Host redeploys.

import { createServerFn } from "@tanstack/react-start";
import { EMPTY_OVERRIDES, normalizeOverrides, type ProductOverrides } from "./overrides-types";

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "Tootfun321+";

async function readOverrides(): Promise<ProductOverrides> {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const file = path.join(process.cwd(), ".data", "product-overrides.json");
    const buf = await fs.readFile(file, "utf-8");
    return normalizeOverrides(JSON.parse(buf));
  } catch {
    return EMPTY_OVERRIDES;
  }
}

async function writeOverrides(data: ProductOverrides): Promise<void> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const file = path.join(process.cwd(), ".data", "product-overrides.json");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

export const getProductOverrides = createServerFn({ method: "GET" }).handler(async () => {
  return readOverrides();
});

export const saveProductOverrides = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("Invalid payload");
    const { password, overrides } = input as { password?: unknown; overrides?: unknown };
    if (typeof password !== "string") throw new Error("Missing password");
    return { password, overrides: normalizeOverrides(overrides) };
  })
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) throw new Error("Unauthorized");
    await writeOverrides(data.overrides);
    return { ok: true };
  });
