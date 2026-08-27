// Client-safe: types + pure functions. NO server-only imports (fs/path).
// This file can be imported from both client bundles and server functions.

export type Category = "home" | "yachts" | "parties" | "fishing" | "packages";

export type ProductOverrides = {
  hidden: Record<Category, string[]>;
  order: Record<Category, string[]>;
};

export const CATS: Category[] = ["home", "yachts", "parties", "fishing", "packages"];

export const EMPTY_OVERRIDES: ProductOverrides = {
  hidden: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
  order: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
};

export function normalizeOverrides(input: unknown): ProductOverrides {
  const out: ProductOverrides = {
    hidden: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
    order: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
  };
  if (!input || typeof input !== "object") return out;
  const raw = input as Partial<ProductOverrides>;
  for (const c of CATS) {
    if (Array.isArray(raw.hidden?.[c])) out.hidden[c] = raw.hidden[c].filter((s) => typeof s === "string");
    if (Array.isArray(raw.order?.[c])) out.order[c] = raw.order[c].filter((s) => typeof s === "string");
  }
  return out;
}

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
    return ra - rb;
  });
}
