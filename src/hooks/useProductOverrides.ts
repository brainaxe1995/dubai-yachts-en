import { useEffect, useMemo, useState } from "react";
import { getProductOverrides } from "@/lib/overrides";
import { applyOverrides, EMPTY_OVERRIDES, type ProductOverrides, type Category } from "@/lib/overrides-types";

const EMPTY = EMPTY_OVERRIDES;

// Client-side cache shared across route renders.
let cache: ProductOverrides | null = null;
let inflight: Promise<ProductOverrides> | null = null;

function loadOverrides(): Promise<ProductOverrides> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = getProductOverrides()
      .then((data) => {
        cache = data;
        return data;
      })
      .catch(() => EMPTY)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/**
 * Returns product list filtered by admin-hidden flags and sorted by admin drag-drop order.
 * First render (SSR + pre-hydrate) returns raw list. After async load, list updates.
 */
export function useOverriddenProducts<T extends { title: string }>(
  products: T[],
  cat: Category,
): T[] {
  const [overrides, setOverrides] = useState<ProductOverrides | null>(cache);

  useEffect(() => {
    let cancelled = false;
    loadOverrides().then((data) => {
      if (!cancelled) setOverrides(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => {
    if (!overrides) return products;
    return applyOverrides(products, overrides, cat);
  }, [products, overrides, cat]);
}

// Force reload — call after admin save so category pages open in new tab see fresh data.
export function invalidateOverridesCache() {
  cache = null;
  inflight = null;
}
