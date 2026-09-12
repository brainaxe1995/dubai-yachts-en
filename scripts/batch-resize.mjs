#!/usr/bin/env node
/**
 * One-shot batch: walk SOURCE, mirror folder tree into OUT, resize every
 * image to 1920x1200 (16:10) with attention-based smart center-crop,
 * export as WebP q80. Preserves folder + filename (extension swap only).
 * Skips non-image files. Idempotent — re-running overwrites.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative, extname, dirname, basename } from "node:path";
import sharp from "sharp";

const SOURCE = process.argv[2];
const OUT = process.argv[3];
if (!SOURCE || !OUT) {
  console.error("usage: node batch-resize.mjs <source-dir> <out-dir>");
  process.exit(1);
}

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".tiff", ".avif"]);
const TARGET_W = 1920;
const TARGET_H = 1200;
const QUALITY = 80;

let processed = 0;
let skipped = 0;
let failed = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    const ext = extname(entry.name).toLowerCase();
    if (!IMG_EXT.has(ext)) {
      skipped++;
      continue;
    }
    const rel = relative(SOURCE, full);
    const outRel = join(dirname(rel), basename(rel, ext) + ".webp");
    const outFull = join(OUT, outRel);
    const outDir = dirname(outFull);
    if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });
    try {
      await sharp(full)
        .resize(TARGET_W, TARGET_H, {
          fit: "cover",
          position: sharp.strategy.attention,
        })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(outFull);
      processed++;
      if (processed % 20 === 0) process.stdout.write(`  ${processed} done...\n`);
    } catch (err) {
      failed++;
      console.error(`  FAIL ${rel}: ${err.message}`);
    }
  }
}

console.log(`Source: ${SOURCE}`);
console.log(`Out:    ${OUT}`);
console.log(`Target: ${TARGET_W}x${TARGET_H} WebP q${QUALITY}, attention smart-crop`);
console.log("---");
await walk(SOURCE);
console.log("---");
console.log(`processed: ${processed}`);
console.log(`skipped (non-image): ${skipped}`);
console.log(`failed: ${failed}`);
