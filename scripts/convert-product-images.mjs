#!/usr/bin/env node
// One-off script: replace all product images from client zip folders.
// Reads /tmp/newimages/{cat-arabic}/{cat-arabic}/{title-arabic}/*.{jpg,jpeg,png,webp}
// Writes src/assets/{cat}/{slug}/{slug}-{n}.webp + src/assets/{cat}/{slug}.webp (fallback single).

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_ROOT = "tmp-newimages";
const DST_ROOT = "src/assets";

const MAP = {
  yachts: {
    zipDir: "يخوت للإيجار/يخوت للإيجار",
    products: [
      { slug: "houseboat-55", title: "تأجير هاوس بوت 55 قدم فاخر في دبي" },
      { slug: "floating-100", title: "عوامة 100 قدم للإيجار في دبي" },
      { slug: "majesty-48", title: "إيجار يخت ماجستي 48 قدم في دبي" },
      { slug: "italian-95", title: "حجز يخت 95 قدم للحفلات والمناسبات في دبي" },
      { slug: "ferretti-78", title: "إيجار سوبر يخت فيريتي 78 قدم في دبي" },
      { slug: "mini-40", title: "تاجير ميني يخت 40 قدم في دبي" },
      { slug: "azimut-80", title: "تأجير يخت أزيموت 80 قدم في دبي مع جاكوزي" },
      { slug: "sunseeker-95", title: "إيجار سوبر يخت صن سيكر 95 قدم في دبي" },
      { slug: "majesty-70", title: "تأجير يخت ماجستي 70 قدم في دبي" },
      { slug: "majesty-66", title: "استئجار يخت ماجستي 66 قدم في دبي مارينا" },
      { slug: "majesty-55", title: "جولة بحرية بيخت ماجستي 55 قدم في دبي" },
      { slug: "azimut-50", title: "تأجير يخت أزيموت 50 قدم في دبي" },
      { slug: "majesty-88", title: "يخت ماجستي 88 قدم في دبي" },
      { slug: "corporate-105", title: "تأجير يخت للشركات 105 قدم في دبي" },
      { slug: "gulfcraft-90", title: "إيجار يخت جلف كرافت 90 قدم في مارينا دبي" },
    ],
  },
  fishing: {
    zipDir: "الصيد/الصيد",
    products: [
      { slug: "shared", title: "رحلة صيد سمك مشتركة في دبي" },
      { slug: "private-yacht", title: "رحلة صيد سمك خاصة باليخت في دبي" },
      { slug: "private-boat", title: "رحلة صيد سمك خاصة بالقارب في دبي" },
    ],
  },
  parties: {
    zipDir: "الحفلات/الحفلات",
    products: [
      { slug: "proposal", title: "طلب زواج على يخت في دبي" },
      { slug: "wedding", title: "حفل زفاف على يخت في دبي" },
      { slug: "anniversary", title: "حفلة ذكرى سنوية على يخت في دبي" },
      { slug: "graduation", title: "حفلة تخرج على يخت في دبي" },
      { slug: "engagement", title: "حفلة خطوبة على يخت في دبي" },
      { slug: "birthday", title: "حفلة عيد ميلاد على يخت في دبي" },
    ],
  },
  packages: {
    zipDir: "الباقات/الباقات",
    products: [
      { slug: "breakfast", title: "باقة إفطار على يخت في دبي" },
      { slug: "jetski", title: "باقة تأجير يخت مع جيت سكي في دبي" },
      { slug: "romantic-dinner", title: "باقة عشاء رومانسي على يخت في دبي" },
    ],
  },
};

const IMG_EXT = /\.(jpe?g|png|webp)$/i;

function naturalSort(a, b) {
  const nA = parseInt(a.match(/(\d+)(?=\.[a-z]+$)/i)?.[1] ?? "0", 10);
  const nB = parseInt(b.match(/(\d+)(?=\.[a-z]+$)/i)?.[1] ?? "0", 10);
  if (nA !== nB) return nA - nB;
  return a.localeCompare(b, "ar");
}

async function processProduct(cat, catRoot, product) {
  const srcDir = path.join(SRC_ROOT, catRoot, product.title);
  if (!fs.existsSync(srcDir)) {
    console.log(`  ! MISSING srcDir: ${srcDir}`);
    return { slug: product.slug, count: 0, missing: true };
  }
  const files = fs.readdirSync(srcDir).filter((f) => IMG_EXT.test(f)).sort(naturalSort);
  if (files.length === 0) {
    console.log(`  ! NO IMAGES: ${srcDir}`);
    return { slug: product.slug, count: 0 };
  }

  const dstDir = path.join(DST_ROOT, cat, product.slug);
  // Wipe existing folder
  if (fs.existsSync(dstDir)) fs.rmSync(dstDir, { recursive: true, force: true });
  fs.mkdirSync(dstDir, { recursive: true });

  let n = 1;
  for (const f of files) {
    const src = path.join(srcDir, f);
    const dst = path.join(dstDir, `${product.slug}-${n}.webp`);
    await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dst);
    n++;
  }

  // Fallback single at src/assets/{cat}/{slug}.webp (used by pages that import a single image)
  const fallback = path.join(DST_ROOT, cat, `${product.slug}.webp`);
  fs.copyFileSync(path.join(dstDir, `${product.slug}-1.webp`), fallback);

  console.log(`  ✓ ${product.slug}: ${files.length} images`);
  return { slug: product.slug, count: files.length };
}

async function main() {
  const summary = [];
  for (const [cat, { zipDir, products }] of Object.entries(MAP)) {
    console.log(`\n== ${cat} ==`);
    for (const p of products) {
      const r = await processProduct(cat, zipDir, p);
      summary.push({ cat, ...r });
    }
  }
  console.log("\n== DONE ==");
  console.log(`Total: ${summary.reduce((s, r) => s + r.count, 0)} images across ${summary.length} products`);
  const missing = summary.filter((s) => s.missing);
  if (missing.length) console.log(`MISSING: ${missing.map((m) => `${m.cat}/${m.slug}`).join(", ")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
