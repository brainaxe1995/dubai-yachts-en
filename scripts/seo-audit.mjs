#!/usr/bin/env node
/**
 * Build-time SEO validation.
 * Parses every route's head() definition, validates metadata quality and
 * cross-checks sitemap.xml + robots.txt. Emits src/data/seo-audit.json which
 * powers the in-app /seo-audit page.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROUTES_DIR = join(root, "src/routes");
const OUT = join(root, "src/data/seo-audit.json");
export const BASE_URL = "https://doc-whisperer-750.lovable.app";

/** find the substring balanced from an opening bracket index */
function balanced(src, start, open, close) {
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return null;
}

function section(head, key) {
  const idx = head.indexOf(`${key}: [`);
  if (idx === -1) return null;
  return balanced(head, head.indexOf("[", idx), "[", "]");
}

function evalObjects(arraySrc) {
  if (!arraySrc) return [];
  const out = [];
  let i = 0;
  while (i < arraySrc.length) {
    const s = arraySrc.indexOf("{", i);
    if (s === -1) break;
    const obj = balanced(arraySrc, s, "{", "}");
    if (!obj) break;
    i = s + obj.length;
    try {
      // build-time trusted source; dynamic expressions fail and are reported as dynamic
      // eslint-disable-next-line no-new-func
      const value = new Function(`return (${obj})`)();
      out.push({ value, raw: obj });
    } catch {
      out.push({ value: null, raw: obj, dynamic: true });
    }
  }
  return out;
}

function parseRouteFile(file) {
  const src = readFileSync(join(ROUTES_DIR, file), "utf8");
  const m = src.match(/createFileRoute\(\s*["'`]([^"'`]+)["'`]\s*\)/);
  if (!m) return null;
  const path = m[1];
  const headIdx = src.indexOf("head:");
  let head = "";
  if (headIdx !== -1) {
    const braceIdx = src.indexOf("({", headIdx);
    if (braceIdx !== -1) head = balanced(src, braceIdx + 1, "{", "}") ?? "";
  }

  const metas = evalObjects(section(head, "meta")).map((o) => o.value).filter(Boolean);
  const links = evalObjects(section(head, "links")).map((o) => o.value).filter(Boolean);
  const scriptsRaw = evalObjects(section(head, "scripts"));

  const get = (pred) => metas.find(pred);
  const title = get((x) => "title" in x)?.title ?? null;
  const description = get((x) => x.name === "description")?.content ?? null;
  const ogTitle = get((x) => x.property === "og:title")?.content ?? null;
  const ogDescription = get((x) => x.property === "og:description")?.content ?? null;
  const ogUrl = get((x) => x.property === "og:url")?.content ?? null;
  const ogImage = get((x) => x.property === "og:image")?.content ?? null;
  const robots = get((x) => x.name === "robots")?.content ?? null;
  const canonical = links.find((l) => l.rel === "canonical")?.href ?? null;

  // structured data
  const structuredData = [];
  for (const s of scriptsRaw) {
    const raw = s.raw;
    if (!/application\/ld\+json/.test(raw)) continue;
    const jsonIdx = raw.indexOf("JSON.stringify(");
    if (jsonIdx === -1) {
      structuredData.push({ type: "unknown", status: "invalid", message: "ld+json script without JSON.stringify payload" });
      continue;
    }
    const payload = balanced(raw, raw.indexOf("(", jsonIdx), "(", ")");
    const body = payload ? payload.slice(1, -1) : "";
    let parsed = null;
    try {
      // eslint-disable-next-line no-new-func
      parsed = new Function(`return (${body})`)();
    } catch {
      parsed = null;
    }
    if (parsed && typeof parsed === "object") {
      const ok = Boolean(parsed["@context"]) && Boolean(parsed["@type"]);
      structuredData.push({
        type: String(parsed["@type"] ?? "unknown"),
        status: ok ? "valid" : "invalid",
        message: ok ? null : "missing @context or @type",
        json: JSON.stringify(parsed, null, 2).slice(0, 4000),
      });
    } else {
      const typeMatch = body.match(/"@type":\s*"([^"]+)"/);
      const hasCtx = /"@context":\s*"https:\/\/schema\.org"/.test(body);
      structuredData.push({
        type: typeMatch?.[1] ?? "dynamic",
        status: hasCtx && typeMatch ? "dynamic" : "invalid",
        message: hasCtx && typeMatch ? "built from runtime data — validated statically for @context/@type" : "could not detect @context/@type",
      });
    }
  }

  return { file, path, title, description, ogTitle, ogDescription, ogUrl, ogImage, canonical, robots, structuredData, hasHead: head.length > 0 };
}

export function audit() {
  const files = readdirSync(ROUTES_DIR).filter((f) => f.endsWith(".tsx") && f !== "__root.tsx");
  const routes = files.map(parseRouteFile).filter(Boolean).sort((a, b) => a.path.localeCompare(b.path));

  const seenTitle = new Map();
  const seenDesc = new Map();
  for (const r of routes) {
    if (r.title) seenTitle.set(r.title, [...(seenTitle.get(r.title) ?? []), r.path]);
    if (r.description) seenDesc.set(r.description, [...(seenDesc.get(r.description) ?? []), r.path]);
  }

  const globalIssues = [];
  for (const [t, paths] of seenTitle) if (paths.length > 1) globalIssues.push({ level: "error", rule: "duplicate-title", message: `عنوان مكرر: "${t}"`, routes: paths });
  for (const [d, paths] of seenDesc) if (paths.length > 1) globalIssues.push({ level: "error", rule: "duplicate-description", message: `وصف مكرر على ${paths.length} صفحات`, routes: paths });

  for (const r of routes) {
    r.issues = [];
    const add = (level, rule, message) => r.issues.push({ level, rule, message });
    if (!r.title) add("error", "missing-title", "لا يوجد عنوان <title> لهذه الصفحة");
    else if (r.title.length > 60) add("warning", "title-length", `طول العنوان ${r.title.length} حرفًا (يُفضّل أقل من 60)`);
    if (!r.description) add("error", "missing-description", "لا يوجد وصف meta description");
    else if (r.description.length > 160) add("warning", "description-length", `طول الوصف ${r.description.length} حرفًا (يُفضّل أقل من 160)`);
    if (!r.ogTitle) add("warning", "missing-og-title", "og:title غير موجود");
    if (!r.ogDescription) add("warning", "missing-og-description", "og:description غير موجود");
    if (!r.ogUrl) add("error", "missing-og-url", "og:url غير موجود");
    if (!r.canonical) add("error", "missing-canonical", "رابط canonical غير موجود");
    const expected = `${BASE_URL}${r.path === "/" ? "/" : r.path}`;
    const norm = (u) => (u ? decodeURI(u).replace(/\/$/, "") || "/" : u);
    if (r.canonical && norm(r.canonical) !== norm(expected)) add("error", "canonical-mismatch", `canonical لا يشير إلى الصفحة نفسها (${r.canonical})`);
    if (r.ogUrl && norm(r.ogUrl) !== norm(expected)) add("error", "og-url-mismatch", `og:url لا يشير إلى الصفحة نفسها (${r.ogUrl})`);
    for (const sd of r.structuredData) if (sd.status === "invalid") add("error", "invalid-structured-data", `بيانات منظمة غير صالحة (${sd.type}): ${sd.message}`);
  }

  // sitemap cross-check
  const sitemapSrc = readFileSync(join(ROUTES_DIR, "sitemap[.]xml.ts"), "utf8");
  const sitemapPaths = [...sitemapSrc.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
  const routePaths = routes.map((r) => r.path).filter((p) => !p.startsWith("/seo-audit"));
  for (const p of routePaths) if (!sitemapPaths.includes(p)) globalIssues.push({ level: "error", rule: "sitemap-missing-route", message: `المسار ${p} غير مدرج في sitemap.xml`, routes: [p] });
  for (const p of sitemapPaths) if (!routePaths.includes(p)) globalIssues.push({ level: "error", rule: "sitemap-unknown-route", message: `sitemap.xml يحتوي مسارًا غير موجود: ${p}`, routes: [p] });

  const robotsPath = join(root, "public/robots.txt");
  const robots = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8") : "";
  const sitemapDirective = robots.match(/Sitemap:\s*(\S+)/i)?.[1] ?? null;
  if (!sitemapDirective) globalIssues.push({ level: "error", rule: "robots-sitemap", message: "robots.txt لا يحتوي على توجيه Sitemap", routes: [] });
  else if (sitemapDirective !== `${BASE_URL}/sitemap.xml`) globalIssues.push({ level: "error", rule: "robots-sitemap", message: `توجيه Sitemap في robots.txt خاطئ: ${sitemapDirective}`, routes: [] });
  if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) globalIssues.push({ level: "error", rule: "robots-disallow-all", message: "robots.txt يحجب الموقع بالكامل", routes: [] });

  const errors = globalIssues.filter((i) => i.level === "error").length + routes.reduce((n, r) => n + r.issues.filter((i) => i.level === "error").length, 0);
  const warnings = globalIssues.filter((i) => i.level === "warning").length + routes.reduce((n, r) => n + r.issues.filter((i) => i.level === "warning").length, 0);

  return { generatedAt: new Date().toISOString(), baseUrl: BASE_URL, sitemapPaths, robotsSitemap: sitemapDirective, routes, globalIssues, summary: { routes: routes.length, errors, warnings } };
}

export function writeReport() {
  const report = audit();
  mkdirSync(dirname(OUT), { recursive: true });
  const next = JSON.stringify(report, null, 2);
  const prevRaw = existsSync(OUT) ? readFileSync(OUT, "utf8") : null;
  // avoid rewriting (and retriggering HMR) when only the timestamp changed
  const strip = (s) => s.replace(/"generatedAt": "[^"]*",\n/, "");
  if (!prevRaw || strip(prevRaw) !== strip(next)) writeFileSync(OUT, next);
  return report;
}

if (process.argv[1] && process.argv[1].endsWith("seo-audit.mjs")) {
  const report = writeReport();
  const lines = [];
  for (const i of report.globalIssues) lines.push(`  [${i.level}] ${i.rule}: ${i.message}`);
  for (const r of report.routes) for (const i of r.issues) lines.push(`  [${i.level}] ${r.path} — ${i.rule}: ${i.message}`);
  console.log(`SEO audit: ${report.summary.routes} routes, ${report.summary.errors} errors, ${report.summary.warnings} warnings`);
  if (lines.length) console.log(lines.join("\n"));
  if (report.summary.errors > 0 && process.argv.includes("--strict")) process.exit(1);
}
