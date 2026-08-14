#!/usr/bin/env node
import { readdirSync, statSync, renameSync, unlinkSync, existsSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(root, "src/assets");

// Directories to process
const DIRS = ["yachts", "parties", "fishing", "packages", "extras", "branding"];
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

let saved = 0;
let count = 0;

async function processFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

  const origSize = statSync(filePath).size;
  const base = basename(filePath, ext);
  const dir = dirname(filePath);
  const outPath = join(dir, `${base}.webp`);
  const tmpPath = `${outPath}.tmp.webp`;

  try {
    const image = sharp(filePath, { failOn: "none" });
    const meta = await image.metadata();
    const resize = meta.width && meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : undefined;

    await image
      .resize(resize)
      .webp({ quality: WEBP_QUALITY, effort: 5 })
      .toFile(tmpPath);

    const newSize = statSync(tmpPath).size;

    // Only replace if smaller than original
    if (newSize < origSize) {
      if (existsSync(outPath) && outPath !== filePath) unlinkSync(outPath);
      renameSync(tmpPath, outPath);
      // Remove non-webp original
      if (ext !== ".webp") unlinkSync(filePath);
      saved += origSize - newSize;
      count++;
      const pct = Math.round((1 - newSize / origSize) * 100);
      console.log(`✓ ${filePath.replace(root, ".")} → ${(newSize / 1024).toFixed(0)}KB (-${pct}%)`);
    } else {
      unlinkSync(tmpPath);
      console.log(`= ${filePath.replace(root, ".")} (kept, webp not smaller)`);
    }
  } catch (err) {
    console.error(`✗ ${filePath}: ${err.message}`);
    if (existsSync(tmpPath)) unlinkSync(tmpPath);
  }
}

async function walk(dir) {
  const entries = readdirSync(dir);
  for (const name of entries) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) await walk(full);
    else await processFile(full);
  }
}

for (const sub of DIRS) {
  const p = join(ASSETS, sub);
  if (existsSync(p)) await walk(p);
}

// Also optimize logo + hero + old shared assets
for (const single of ["logo.png", "hero-yacht.jpg", "fishing.jpg", "packages.jpg", "party.jpg", "yacht-1.jpg", "yacht-2.jpg", "yacht-3.jpg"]) {
  const p = join(ASSETS, single);
  if (existsSync(p)) await processFile(p);
}

console.log(`\n✓ Optimized ${count} files. Saved ~${(saved / 1024 / 1024).toFixed(2)} MB.`);
