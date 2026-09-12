import { RS_COVERED } from "@/lib/rs-manifest";

/** Widths written by tools/gen-responsive.py, smallest first. */
const STEPS = [480, 720, 960] as const;

/**
 * A `srcset` for an image imported out of `src/assets/`.
 *
 * Vite emits those at `/assets/<basename>` with no content hash and no
 * subdirectory — the filenames are the alt text and carry the SEO, so they must
 * survive the build. `tools/gen-responsive.py` writes matching down-scales to
 * `public/rs/<basename>-<w>.webp`, which means the variant URL is a pure string
 * transform on the emitted one: no build plugin, no per-image JS, and nothing
 * that can rename an existing asset.
 *
 * Returns undefined — so the caller ships plain `src`, exactly today's
 * behaviour — whenever variants cannot be guaranteed: in dev (where the URL is
 * `/src/assets/...`), for anything outside `/assets/`, for a name holding a
 * comma (it would split the srcset), for a basename that appears twice in the
 * source tree (Vite renames the second and the two are indistinguishable
 * here), and for any image the generator has not covered. Never point a srcset
 * at a file that might 404: a browser does not fall back to `src`, it renders
 * nothing.
 *
 * `cap` drops every candidate above that width. A product card is never wider
 * than about 460 CSS px even on a desktop grid, but a phone at DPR 3 asks for
 * ~1180 and the browser happily takes the 1600w original. Heroes stay uncapped.
 */
export function imgSrcSet(src: string | undefined, cap?: number): string | undefined {
  if (!src || !src.startsWith("/assets/") || src.includes(",")) return undefined;
  const rel = src.slice("/assets/".length);
  if (rel.includes("/")) return undefined;
  const dot = rel.lastIndexOf(".");
  if (dot < 0) return undefined;
  let decoded: string;
  try {
    decoded = decodeURIComponent(rel);
  } catch {
    return undefined;
  }
  const intrinsicWidth = RS_COVERED[decoded];
  if (!intrinsicWidth) return undefined;

  const limit = cap ?? intrinsicWidth;
  const stem = `/rs/${rel.slice(0, dot)}`;
  const parts = STEPS.filter((w) => w < intrinsicWidth && w <= limit).map(
    (w) => `${stem}-${w}.webp ${w}w`,
  );
  if (!parts.length) return undefined;
  if (intrinsicWidth <= limit) parts.push(`${src} ${intrinsicWidth}w`);
  return parts.join(", ");
}

/**
 * `sizes` values per layout. Getting these right is the whole point — without
 * them the browser assumes 100vw and picks the largest candidate anyway.
 */
export const SIZES = {
  /** Full-bleed hero. */
  hero: "100vw",
  /** Product grid: 3 up from lg, 2 up from sm, near full width on a phone. */
  card: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw",
  /** Four-across image strip, two-across on a phone. */
  strip: "(min-width: 768px) 25vw, 45vw",
  /** Half-and-half text + image section. */
  half: "(min-width: 1024px) 50vw, 92vw",
  /** Gallery tiles. */
  tile: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw",
} as const;
