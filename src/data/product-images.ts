// Eager-import all per-product image sets via Vite glob. Returns sorted URL list per slug.
// Files live at src/assets/{cat}/{slug}/{slug}-{n}.webp

const yachtGlob = import.meta.glob("../assets/yachts/*/*.webp", { eager: true, import: "default" }) as Record<
  string,
  string
>;
const partiesGlob = import.meta.glob("../assets/parties/*/*.webp", { eager: true, import: "default" }) as Record<
  string,
  string
>;
const fishingGlob = import.meta.glob("../assets/fishing/*/*.webp", { eager: true, import: "default" }) as Record<
  string,
  string
>;
const packagesGlob = import.meta.glob("../assets/packages/*/*.webp", { eager: true, import: "default" }) as Record<
  string,
  string
>;

type Category = "yachts" | "parties" | "fishing" | "packages";

const catMap: Record<Category, Record<string, string>> = {
  yachts: yachtGlob,
  parties: partiesGlob,
  fishing: fishingGlob,
  packages: packagesGlob,
};

export function imagesFor(slug: string, cat: Category): string[] {
  const globMap = catMap[cat];
  return Object.entries(globMap)
    .filter(([k]) => k.includes(`/${cat}/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map(([, v]) => v);
}
