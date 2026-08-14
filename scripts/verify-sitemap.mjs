#!/usr/bin/env node
/**
 * Post-deploy verification: fetches /sitemap.xml and /robots.txt from a live
 * origin and asserts the XML is well-formed, contains every expected slug and
 * that robots.txt points at the right sitemap.
 *
 *   node scripts/verify-sitemap.mjs [origin]
 *   SITE_URL=https://example.com node scripts/verify-sitemap.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_URL } from "./seo-audit.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const origin = (process.argv[2] || process.env.SITE_URL || BASE_URL).replace(/\/$/, "");

const sitemapSrc = readFileSync(join(root, "src/routes/sitemap[.]xml.ts"), "utf8");
const expected = [...sitemapSrc.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);

const failures = [];
const ok = (label) => console.log(`  ✓ ${label}`);
const fail = (label) => {
  failures.push(label);
  console.log(`  ✗ ${label}`);
};

async function get(path) {
  const res = await fetch(`${origin}${path}`, { redirect: "follow" });
  return { res, body: await res.text() };
}

console.log(`Verifying deployment: ${origin}`);

// --- /sitemap.xml ---
const { res: smRes, body: xml } = await get("/sitemap.xml");
smRes.ok ? ok(`sitemap.xml responds ${smRes.status}`) : fail(`sitemap.xml responded ${smRes.status}`);

const ctype = smRes.headers.get("content-type") ?? "";
/xml/i.test(ctype) ? ok(`content-type is XML (${ctype})`) : fail(`content-type is not XML (${ctype})`);

xml.trimStart().startsWith("<?xml") ? ok("has XML declaration") : fail("missing XML declaration");
/<urlset[^>]+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(xml)
  ? ok("valid <urlset> namespace")
  : fail("missing or wrong <urlset> namespace");
xml.trimEnd().endsWith("</urlset>") ? ok("<urlset> is closed") : fail("<urlset> is not closed");

// well-formedness: balanced tags
const opens = (xml.match(/<url>/g) ?? []).length;
const closes = (xml.match(/<\/url>/g) ?? []).length;
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodeURI(m[1].trim()));
opens === closes && opens === locs.length
  ? ok(`${opens} well-formed <url> entries`)
  : fail(`unbalanced entries: ${opens} <url>, ${closes} </url>, ${locs.length} <loc>`);

if (/&(?!amp;|lt;|gt;|quot;|apos;|#)/.test(xml)) fail("unescaped & found in XML");
else ok("no unescaped entities");

const paths = locs.map((l) => {
  try {
    return decodeURI(new URL(l).pathname);
  } catch {
    return null;
  }
});
paths.every(Boolean) ? ok("all <loc> values are absolute URLs") : fail("some <loc> values are not absolute URLs");

for (const p of expected) {
  paths.includes(p) ? ok(`slug present: ${p}`) : fail(`slug missing from sitemap: ${p}`);
}
for (const p of paths) {
  if (p && !expected.includes(p)) fail(`unexpected slug in sitemap: ${p}`);
}

const dupes = paths.filter((p, i) => paths.indexOf(p) !== i);
dupes.length ? fail(`duplicate slugs: ${[...new Set(dupes)].join(", ")}`) : ok("no duplicate slugs");

// --- /robots.txt ---
const { res: rRes, body: robots } = await get("/robots.txt");
rRes.ok ? ok(`robots.txt responds ${rRes.status}`) : fail(`robots.txt responded ${rRes.status}`);

const directive = robots.match(/Sitemap:\s*(\S+)/i)?.[1] ?? null;
if (!directive) fail("robots.txt has no Sitemap directive");
else if (directive.replace(/\/$/, "") !== `${BASE_URL}/sitemap.xml`) fail(`robots.txt Sitemap points to ${directive}`);
else ok(`robots.txt Sitemap → ${directive}`);

/^\s*Disallow:\s*\/\s*$/m.test(robots) ? fail("robots.txt blocks the whole site") : ok("site is not fully disallowed");

// the advertised sitemap URL must itself resolve
if (directive) {
  try {
    const advertised = await fetch(directive, { redirect: "follow" });
    advertised.ok ? ok("advertised sitemap URL resolves") : fail(`advertised sitemap URL responded ${advertised.status}`);
  } catch (e) {
    fail(`advertised sitemap URL unreachable: ${e.message}`);
  }
}

console.log(
  failures.length
    ? `\nFAILED — ${failures.length} check(s):\n${failures.map((f) => `  - ${f}`).join("\n")}`
    : `\nPASSED — sitemap and robots.txt verified (${expected.length} slugs).`,
);
process.exit(failures.length ? 1 : 0);
