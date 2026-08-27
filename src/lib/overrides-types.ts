// Client-safe: types + pure functions. NO server-only imports (fs/path).
// This file can be imported from both client bundles and server functions.

export type Category = "home" | "yachts" | "parties" | "fishing" | "packages";

export type ProductOverrides = {
  hidden: Record<Category, string[]>;
  order: Record<Category, string[]>;
  copies: Record<Category, string[]>; // product keys copied INTO this category from elsewhere
};

export const CATS: Category[] = ["home", "yachts", "parties", "fishing", "packages"];

export const EMPTY_OVERRIDES: ProductOverrides = {
  hidden: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
  order: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
  copies: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
};

export function normalizeOverrides(input: unknown): ProductOverrides {
  const out: ProductOverrides = {
    hidden: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
    order: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
    copies: { home: [], yachts: [], parties: [], fishing: [], packages: [] },
  };
  if (!input || typeof input !== "object") return out;
  const raw = input as Partial<ProductOverrides>;
  for (const c of CATS) {
    if (Array.isArray(raw.hidden?.[c])) out.hidden[c] = raw.hidden[c].filter((s) => typeof s === "string");
    if (Array.isArray(raw.order?.[c])) out.order[c] = raw.order[c].filter((s) => typeof s === "string");
    if (Array.isArray(raw.copies?.[c])) out.copies[c] = raw.copies[c].filter((s) => typeof s === "string");
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

/**
 * Full resolver: returns native products for `cat` PLUS any products copied
 * into `cat` from other categories (per overrides.copies[cat]). Copies are
 * resolved by looking up the product key across every entry in `allSources`.
 * Hide + order are applied to the merged list.
 */
export function applyOverridesFull<T extends { slug?: string; title: string }>(
  nativeProducts: T[],
  allSources: Record<Category, T[]>,
  overrides: ProductOverrides,
  cat: Category,
  keyFn: (p: T) => string = (p) => p.slug ?? p.title,
): T[] {
  // Build global index once (lookup by key). Prefer first occurrence.
  const globalByKey = new Map<string, T>();
  for (const c of CATS) {
    for (const p of allSources[c] ?? []) {
      const k = keyFn(p);
      if (!globalByKey.has(k)) globalByKey.set(k, p);
    }
  }
  const nativeKeys = new Set(nativeProducts.map(keyFn));
  const copyKeys = overrides.copies[cat] ?? [];
  const copied = copyKeys
    .filter((k) => !nativeKeys.has(k))
    .map((k) => globalByKey.get(k))
    .filter((p): p is T => Boolean(p));
  const merged = [...nativeProducts, ...copied];
  const hidden = new Set(overrides.hidden[cat]);
  const visible = merged.filter((p) => !hidden.has(keyFn(p)));
  const order = overrides.order[cat];
  if (!order.length) return visible;
  const rank = new Map(order.map((k, i) => [k, i] as const));
  return [...visible].sort((a, b) => {
    const ra = rank.get(keyFn(a)) ?? Number.MAX_SAFE_INTEGER;
    const rb = rank.get(keyFn(b)) ?? Number.MAX_SAFE_INTEGER;
    return ra - rb;
  });
}
