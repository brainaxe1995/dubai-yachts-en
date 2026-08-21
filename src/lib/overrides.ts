// Product overrides (hidden/reorder) persistence.
// Source of truth: server (POST /api/overrides). localStorage kept only as an
// offline fallback so category pages still respect the last-known state if
// the API request fails.

import { EMPTY_OVERRIDES, normalizeOverrides, type ProductOverrides } from "./overrides-types";

const STORAGE_KEY = "toot-fun-product-overrides-v1";

export async function getProductOverrides(): Promise<ProductOverrides> {
  try {
    const res = await fetch("/api/overrides", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { overrides?: unknown };
      const norm = normalizeOverrides(data.overrides ?? {});
      cacheLocal(norm);
      return norm;
    }
  } catch {
    // fall through to local cache
  }
  return readLocal();
}

export async function saveProductOverrides(input: {
  password: string;
  overrides: ProductOverrides;
}): Promise<{ ok: true }> {
  const normalized = normalizeOverrides(input.overrides);
  const res = await fetch("/api/overrides", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: input.password, overrides: normalized }),
  });
  let data: { ok?: boolean; error?: string };
  try {
    data = (await res.json()) as { ok?: boolean; error?: string };
  } catch {
    data = {};
  }
  if (!res.ok || !data.ok) {
    throw new Error(data.error ?? `Save failed (HTTP ${res.status})`);
  }
  cacheLocal(normalized);
  return { ok: true };
}

function cacheLocal(o: ProductOverrides): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
  } catch {
    /* quota or disabled — ignore */
  }
}

function readLocal(): ProductOverrides {
  if (typeof window === "undefined") return EMPTY_OVERRIDES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_OVERRIDES;
    return normalizeOverrides(JSON.parse(raw));
  } catch {
    return EMPTY_OVERRIDES;
  }
}
