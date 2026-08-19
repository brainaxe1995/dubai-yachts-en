"use server";

// Server-only. TanStack Start's compiler strips this from client bundles when
// the "use server" directive is present at the file top.
//
// Persistence via Nitro's useStorage — works across Node/Cloudflare/other presets.
// On Hostinger Cloud Host (Node preset) it maps to a filesystem-backed storage
// under `.data/` at the project root, which is NOT rebuilt by `npm run build`.

import { createServerFn } from "@tanstack/react-start";
import { EMPTY_OVERRIDES, normalizeOverrides, type ProductOverrides } from "./overrides-types";

const STORAGE_KEY = "product-overrides.json";

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "Tootfun321+";

type StorageDriver = {
  getItem: (key: string) => Promise<unknown>;
  setItem: (key: string, value: unknown) => Promise<void>;
};

async function getStorage(): Promise<StorageDriver> {
  // Dynamic import so bundlers don't statically pull the Nitro runtime import
  // into the client transform pipeline. This module already has "use server",
  // but the extra guard makes SSR failure modes more graceful (fall through to
  // EMPTY_OVERRIDES rather than crashing the SSR pipeline).
  const mod = (await import("#imports")) as { useStorage: (name?: string) => StorageDriver };
  return mod.useStorage("data");
}

async function readOverrides(): Promise<ProductOverrides> {
  try {
    const storage = await getStorage();
    const raw = await storage.getItem(STORAGE_KEY);
    if (raw == null) return EMPTY_OVERRIDES;
    if (typeof raw === "string") return normalizeOverrides(JSON.parse(raw));
    return normalizeOverrides(raw);
  } catch {
    return EMPTY_OVERRIDES;
  }
}

async function writeOverrides(data: ProductOverrides): Promise<void> {
  const storage = await getStorage();
  await storage.setItem(STORAGE_KEY, JSON.stringify(data));
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
