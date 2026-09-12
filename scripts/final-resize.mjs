#!/usr/bin/env node
/**
 * Final pass: cleaned (watermark-removed) -> 1920x1200 WebP q80 with
 * Lanczos3 resample + unsharp mask for perceived detail on small sources.
 * Preserves folder structure and filenames (extension -> .webp).
 */
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative, extname, dirname, basename } from "node:path";
import sharp from "sharp";

const SOURCE = process.argv[2];
const OUT = process.argv[3];
if (!SOURCE || !OUT) {
  console.error("usage: node final-resize.mjs <source-dir> <out-dir>");
  process.exit(1);
}

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const TARGET_W = 1920;
const TARGET_H = 1200;

let ok = 0, fail = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { await walk(full); continue; }
    const ext = extname(entry.name).toLowerCase();
    if (!IMG_EXT.has(ext)) continue;
    const rel = relative(SOURCE, full);
    const outFull = join(OUT, dirname(rel), basename(rel, ext) + ".webp");
    const outDir = dirname(outFull);
    if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });
    try {
      await sharp(full)
        .resize(TARGET_W, TARGET_H, {
          fit: "cover",
          position: sharp.strategy.attention,
          kernel: sharp.kernel.lanczos3,
        })
        // sigma 1.0, flat 1.0, jagged 2.0 — modest sharpening for perceived crispness
        .sharpen({ sigma: 1.0, m1: 1.0, m2: 2.0 })
        .webp({ quality: 80, effort: 5 })
        .toFile(outFull);
      ok++;
      if (ok % 40 === 0) console.log(`  ${ok} done`);
    } catch (err) {
      fail++;
      console.error(`  FAIL ${rel}: ${err.message}`);
    }
  }
}

console.log(`Source: ${SOURCE}`);
console.log(`Out:    ${OUT}`);
console.log(`Target: ${TARGET_W}x${TARGET_H} WebP q80, lanczos3 + unsharp`);
console.log("---");
await walk(SOURCE);
console.log("---");
console.log(`ok: ${ok}  fail: ${fail}`);
