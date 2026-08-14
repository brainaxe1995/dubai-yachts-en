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
  return parseRouteFileInner(file);
}

/**
 * Required properties per JSON-LD @type. Each entry may contain:
 *  - required: properties that MUST exist
 *  - recommended: properties that SHOULD exist (warning)
 *  - shape: per-property validators
 */
const SCHEMA_RULES = {
  Organization: {
    required: ["name", "url"],
    recommended: ["logo", "contactPoint"],
  },
  WebSite: {
    required: ["name", "url"],
    recommended: ["inLanguage"],
  },
  LocalBusiness: {
    required: ["name", "address", "telephone"],
    recommended: ["url", "image", "openingHoursSpecification", "priceRange"],
  },
  ItemList: {
    required: ["itemListElement"],
    recommended: ["name"],
  },
  ListItem: {
    required: ["position", "item"],
  },
  Service: {
    required: ["name"],
    recommended: ["provider", "areaServed", "serviceType"],
  },
  Product: {
    required: ["name", "offers"],
    recommended: ["image", "description"],
  },
  Offer: {
    required: ["price", "priceCurrency"],
    recommended: ["availability"],
  },
  FAQPage: {
    required: ["mainEntity"],
  },
  Question: {
    required: ["name", "acceptedAnswer"],
  },
  Answer: {
    required: ["text"],
  },
  BreadcrumbList: {
    required: ["itemListElement"],
  },
  PostalAddress: {
    required: ["addressLocality", "addressCountry"],
  },
  Article: {
    required: ["headline", "author", "datePublished"],
    recommended: ["image", "dateModified"],
  },
  BlogPosting: {
    required: ["headline", "author", "datePublished"],
    recommended: ["image", "dateModified"],
  },
};

function isEmpty(v) {
  if (v === undefined || v === null) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  return false;
}

/** Locales the site publishes. Arabic is the only live version today. */
export const LOCALES = ["ar"];
export const X_DEFAULT = "ar";

/** Value-format validators applied per property name, anywhere in the graph. */
const FORMAT_RULES = {
  url: { test: (v) => /^https?:\/\/[^\s]+$/.test(v), level: "error", msg: "يجب أن يكون رابطًا مطلقًا (http/https)" },
  logo: { test: (v) => /^https?:\/\/[^\s]+$/.test(v), level: "warning", msg: "يُفضّل رابط مطلق للشعار" },
  image: { test: (v) => /^https?:\/\/[^\s]+$/.test(v), level: "warning", msg: "يُفضّل رابط مطلق للصورة" },
  sameAs: { test: (v) => /^https?:\/\/[^\s]+$/.test(v), level: "error", msg: "sameAs يجب أن يكون رابطًا مطلقًا" },
  email: { test: (v) => /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(v.replace(/^mailto:/, "")), level: "error", msg: "صيغة بريد إلكتروني غير صالحة" },
  telephone: { test: (v) => /^\+?[0-9\s\-().]{7,20}$/.test(v), level: "error", msg: "صيغة رقم هاتف غير صالحة (يُفضّل الصيغة الدولية +9715...)" },
  priceCurrency: { test: (v) => /^[A-Z]{3}$/.test(v), level: "error", msg: "priceCurrency يجب أن يكون رمز عملة من 3 أحرف كبيرة (AED)" },
  price: { test: (v) => /^\d+(\.\d+)?$/.test(String(v)), level: "error", msg: "price يجب أن يكون رقمًا بدون رموز عملة" },
  datePublished: { test: (v) => !Number.isNaN(Date.parse(v)), level: "error", msg: "datePublished يجب أن يكون تاريخ ISO 8601" },
  dateModified: { test: (v) => !Number.isNaN(Date.parse(v)), level: "error", msg: "dateModified يجب أن يكون تاريخ ISO 8601" },
  inLanguage: { test: (v) => /^[a-z]{2}(-[A-Za-z0-9]{2,8})*$/.test(v), level: "error", msg: "inLanguage يجب أن يكون رمز لغة صالحًا (ar)" },
  addressCountry: { test: (v) => /^[A-Z]{2}$/.test(v) || v.length > 3, level: "warning", msg: "يُفضّل رمز دولة ISO مثل AE" },
  priceRange: { test: (v) => v.length <= 20, level: "warning", msg: "priceRange طويل جدًا" },
};

/** Properties that must carry a nested node of a specific @type. */
const NESTED_TYPE_RULES = {
  address: ["PostalAddress"],
  contactPoint: ["ContactPoint"],
  offers: ["Offer", "AggregateOffer"],
  acceptedAnswer: ["Answer"],
  openingHoursSpecification: ["OpeningHoursSpecification"],
};

function checkFormats(node, type, path, acc) {
  for (const [key, rule] of Object.entries(FORMAT_RULES)) {
    const raw = node[key];
    if (raw === undefined || raw === null) continue;
    const values = Array.isArray(raw) ? raw : [raw];
    for (const v of values) {
      if (typeof v === "object") continue;
      if (rule.test(String(v))) continue;
      const msg = `${type ?? path}.${key}: ${rule.msg} (القيمة: ${String(v).slice(0, 40)})`;
      if (rule.level === "error") acc.invalid.push(msg);
      else acc.warnings.push(msg);
    }
  }
  for (const [key, allowed] of Object.entries(NESTED_TYPE_RULES)) {
    const raw = node[key];
    if (!raw) continue;
    const values = Array.isArray(raw) ? raw : [raw];
    for (const v of values) {
      if (typeof v !== "object") {
        acc.invalid.push(`${type ?? path}.${key}: يجب أن يكون كائنًا من نوع ${allowed.join("/")}`);
        continue;
      }
      const t = String(v["@type"] ?? "");
      if (!allowed.includes(t)) acc.invalid.push(`${type ?? path}.${key}: @type غير صالح (${t || "مفقود"}) — المتوقع ${allowed.join("/")}`);
    }
  }
}

/** Recursively validate a parsed JSON-LD node against SCHEMA_RULES. */
export function validateJsonLd(node, path = "$", acc = { missing: [], recommended: [], invalid: [], warnings: [] }) {
  acc.warnings ??= [];
  if (Array.isArray(node)) {
    node.forEach((n, i) => validateJsonLd(n, `${path}[${i}]`, acc));
    return acc;
  }
  if (!node || typeof node !== "object") return acc;

  const type = node["@type"];
  if (path === "$" && !node["@context"]) acc.invalid.push(`${path}: @context مفقود`);
  if (!type) {
    acc.invalid.push(`${path}: @type مفقود`);
  } else {
    const rules = SCHEMA_RULES[String(type)];
    if (rules) {
      for (const key of rules.required ?? []) if (isEmpty(node[key])) acc.missing.push(`${type}.${key}`);
      for (const key of rules.recommended ?? []) if (isEmpty(node[key])) acc.recommended.push(`${type}.${key}`);
    }
    if (type === "ListItem" && node.position !== undefined && typeof node.position !== "number") {
      acc.invalid.push(`ListItem.position يجب أن يكون رقمًا`);
    }
    if ((type === "Article" || type === "BlogPosting") && typeof node.headline === "string" && node.headline.length > 110) {
      acc.invalid.push(`${type}.headline أطول من 110 حرفًا`);
    }
    if (type === "LocalBusiness" || type === "Organization") {
      if (node.address && typeof node.address === "object" && isEmpty(node.address.addressLocality)) {
        acc.invalid.push(`${type}.address.addressLocality مفقود`);
      }
    }
  }
  checkFormats(node, type ? String(type) : null, path, acc);

  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("@")) continue;
    if (v && typeof v === "object") validateJsonLd(v, `${path}.${k}`, acc);
  }
  return acc;
}

function parseRouteFileInner(file) {
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
  const alternates = links
    .filter((l) => l.rel === "alternate" && l.hreflang)
    .map((l) => ({ hreflang: String(l.hreflang), href: String(l.href ?? "") }));

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
      const v = validateJsonLd(parsed);
      const problems = [
        ...(ok ? [] : ["missing @context or @type"]),
        ...v.invalid,
        ...(v.missing.length ? [`حقول مطلوبة ناقصة: ${v.missing.join("، ")}`] : []),
      ];
      structuredData.push({
        type: String(parsed["@type"] ?? "unknown"),
        status: problems.length ? "invalid" : "valid",
        message: problems.length
          ? problems.join(" — ")
          : v.warnings?.length
            ? v.warnings.join(" — ")
            : v.recommended.length
              ? `حقول مُوصى بها ناقصة: ${v.recommended.join("، ")}`
              : null,
        missingRequired: v.missing,
        missingRecommended: v.recommended,
        warnings: v.warnings ?? [],
        json: JSON.stringify(parsed, null, 2).slice(0, 4000),
      });
    } else {
      const typeMatch = body.match(/"@type":\s*"([^"]+)"/);
      const hasCtx = /"@context":\s*"https:\/\/schema\.org"/.test(body);
      // dynamic payload: check required keys textually for the outer @type
      const dynType = typeMatch?.[1];
      const rules = dynType ? SCHEMA_RULES[dynType] : null;
      const missing = (rules?.required ?? []).filter((k) => !new RegExp(`(^|[{,\\s])${k}\\s*:|"${k}"\\s*:`).test(body));
      const missingRec = (rules?.recommended ?? []).filter((k) => !new RegExp(`(^|[{,\\s])${k}\\s*:|"${k}"\\s*:`).test(body));
      structuredData.push({
        type: typeMatch?.[1] ?? "dynamic",
        status: hasCtx && typeMatch && missing.length === 0 ? "dynamic" : "invalid",
        message: !hasCtx || !typeMatch
          ? "could not detect @context/@type"
          : missing.length
            ? `حقول مطلوبة ناقصة: ${missing.join("، ")}`
            : `مبنية من بيانات ديناميكية — تم التحقق من @context/@type${missingRec.length ? ` (موصى به ناقص: ${missingRec.join("، ")})` : ""}`,
        missingRequired: missing,
        missingRecommended: missingRec,
      });
    }
  }

  return { file, path, title, description, ogTitle, ogDescription, ogUrl, ogImage, canonical, alternates, robots, structuredData, hasHead: head.length > 0 };
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
    r.noindex = Boolean(r.robots && /noindex/.test(r.robots));
    const add = (level, rule, message) => r.issues.push({ level, rule, message });
    if (r.noindex) continue;
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

    // hreflang / alternates
    const alts = r.alternates ?? [];
    if (alts.length === 0) {
      add("error", "missing-hreflang", "لا توجد روابط hreflang لهذه الصفحة");
    } else {
      const langs = alts.map((a) => a.hreflang);
      for (const loc of LOCALES) {
        if (!langs.includes(loc)) add("error", "hreflang-missing-locale", `hreflang="${loc}" غير موجود`);
      }
      if (!langs.includes("x-default")) add("warning", "hreflang-missing-x-default", 'hreflang="x-default" غير موجود');
      for (const a of alts) {
        if (!/^([a-z]{2}(-[A-Za-z0-9]{2,8})*|x-default)$/.test(a.hreflang))
          add("error", "hreflang-invalid-code", `رمز hreflang غير صالح: ${a.hreflang}`);
        if (!/^https?:\/\//.test(a.href))
          add("error", "hreflang-relative-href", `رابط hreflang يجب أن يكون مطلقًا (${a.hreflang})`);
      }
      const dupes = langs.filter((l, i) => langs.indexOf(l) !== i);
      if (dupes.length) add("error", "hreflang-duplicate", `رموز hreflang مكررة: ${[...new Set(dupes)].join("، ")}`);
      const self = alts.find((a) => a.hreflang === X_DEFAULT);
      if (self && norm(self.href) !== norm(expected))
        add("error", "hreflang-self-mismatch", `hreflang="${X_DEFAULT}" لا يشير إلى الصفحة نفسها (${self.href})`);
      const xdef = alts.find((a) => a.hreflang === "x-default");
      if (xdef && norm(xdef.href) !== norm(expected))
        add("error", "hreflang-x-default-mismatch", `hreflang="x-default" لا يشير إلى الصفحة نفسها (${xdef.href})`);
    }

    for (const sd of r.structuredData) if (sd.status === "invalid") add("error", "invalid-structured-data", `بيانات منظمة غير صالحة (${sd.type}): ${sd.message}`);
    for (const sd of r.structuredData)
      if (sd.status !== "invalid" && sd.warnings?.length)
        add("warning", "structured-data-value", `قيم مشكوك فيها في (${sd.type}): ${sd.warnings.join("، ")}`);
    for (const sd of r.structuredData)
      if (sd.status !== "invalid" && sd.missingRecommended?.length)
        add("warning", "structured-data-recommended", `حقول مُوصى بها ناقصة في (${sd.type}): ${sd.missingRecommended.join("، ")}`);
  }

  // sitemap cross-check
  const sitemapSrc = readFileSync(join(ROUTES_DIR, "sitemap[.]xml.ts"), "utf8");
  const sitemapPaths = [...sitemapSrc.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
  const routePaths = routes.map((r) => r.path).filter((p) => !p.startsWith("/seo-audit"));
  for (const p of routePaths.filter((p) => !routes.find((r) => r.path === p)?.noindex)) if (!sitemapPaths.includes(p)) globalIssues.push({ level: "error", rule: "sitemap-missing-route", message: `المسار ${p} غير مدرج في sitemap.xml`, routes: [p] });
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
