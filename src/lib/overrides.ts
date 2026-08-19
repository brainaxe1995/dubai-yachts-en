// Server-side persisted product overrides. Reads/writes JSON on disk so admin edits
// survive process restarts and are visible to every visitor (not per-browser localStorage).
//
// Storage path is .data/product-overrides.json at the process cwd. On Hostinger Node,
// that path is inside the project root and is NOT touched by `npm run build`.

import { createServerFn } from "@tanstack/react-start";
import fs from "node:fs/promises";
import path from "node:path";

export type Category = "yachts" | "parties" | "fishing" | "packages";

export type ProductOverrides = {
  hidden: Record<Category, string[]>;
  order: Record<Category, string[]>;
};

const CATS: Category[] = ["yachts", "parties", "fishing", "packages"];

const EMPTY: ProductOverrides = {
  hidden: { yachts: [], parties: [], fishing: [], packages: [] },
  order: { yachts: [], parties: [], fishing: [], packages: [] },
};

// Admin secret must match src/routes/admin.tsx ADMIN_PASSWORD.
// (Kept as env fallback so it can be rotated without code change; defaults to shipped constant.)
const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "Tootfun321+";

function storageFile(): string {
  return path.join(process.cwd(), ".data", "product-overrides.json");
}

function normalize(input: unknown): ProductOverrides {
  const out: ProductOverrides = {
    hidden: { yachts: [], parties: [], fishing: [], packages: [] },
    order: { yachts: [], parties: [], fishing: [], packages: [] },
  };
  if (!input || typeof input !== "object") return out;
  const raw = input as Partial<ProductOverrides>;
  for (const c of CATS) {
    if (Array.isArray(raw.hidden?.[c])) out.hidden[c] = raw.hidden[c].filter((s) => typeof s === "string");
    if (Array.isArray(raw.order?.[c])) out.order[c] = raw.order[c].filter((s) => typeof s === "string");
  }
  return out;
}

async function readFromDisk(): Promise<ProductOverrides> {
  try {
    const buf = await fs.readFile(storageFile(), "utf-8");
    return normalize(JSON.parse(buf));
  } catch {
    return EMPTY;
  }
}

async function writeToDisk(data: ProductOverrides): Promise<void> {
  const file = storageFile();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

export const getProductOverrides = createServerFn({ method: "GET" }).handler(async () => {
  return readFromDisk();
});

export const saveProductOverrides = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("Invalid payload");
    const { password, overrides } = input as { password?: unknown; overrides?: unknown };
    if (typeof password !== "string") throw new Error("Missing password");
    return { password, overrides: normalize(overrides) };
  })
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) throw new Error("Unauthorized");
    await writeToDisk(data.overrides);
    return { ok: true };
  });

// Utility used by category route loaders + client hook to apply overrides to a raw product list.
export function applyOverrides<T extends { slug?: string; title: string }>(
  products: T[],
  overrides: ProductOverrides,
  cat: Category,
  keyFn: (p: T) => string = (p) => p.slug ?? p.title,
): T[] {
  const hidden = new Set(overrides.hidden[cat]);
  const visible = products.filter((p) => !hidden.has(keyFn(p)));
  const order = overrides.order[cat];
  if (!order.length) return visible;
  const rank = new Map(order.map((k, i) => [k, i] as const));
  return [...visible].sort((a, b) => {
    const ra = rank.get(keyFn(a)) ?? Number.MAX_SAFE_INTEGER;
    const rb = rank.get(keyFn(b)) ?? Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb;
    return 0;
  });
}
