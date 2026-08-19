// Client-side localStorage persistence for admin product overrides.
// Server-side persistence via TanStack Start server functions is blocked
// by a createCsrfMiddleware bug in @tanstack/react-start 1.168.32.
// Once that upgrade lands, we can swap this back to server storage.

import { EMPTY_OVERRIDES, normalizeOverrides, type ProductOverrides } from "./overrides-types";

const STORAGE_KEY = "toot-fun-product-overrides-v1";

export async function getProductOverrides(): Promise<ProductOverrides> {
  if (typeof window === "undefined") return EMPTY_OVERRIDES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_OVERRIDES;
    return normalizeOverrides(JSON.parse(raw));
  } catch {
    return EMPTY_OVERRIDES;
  }
}

export async function saveProductOverrides(input: {
  data: { password: string; overrides: ProductOverrides };
}): Promise<{ ok: true }> {
  if (typeof window === "undefined") throw new Error("Client only");
  const normalized = normalizeOverrides(input.data.overrides);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return { ok: true };
}
