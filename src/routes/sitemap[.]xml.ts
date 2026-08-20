import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { posts } from "@/data/blog";

// Fallback used only when the incoming request has no Host header (dev CLI, curl -H trickery).
const FALLBACK_BASE_URL = "https://dubai-yacht.ae";

function resolveBaseUrl(req: Request): string {
  try {
    const url = new URL(req.url);
    const forwardedProto = req.headers.get("x-forwarded-proto");
    const forwardedHost = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    const proto = forwardedProto ?? url.protocol.replace(":", "");
    const host = forwardedHost ?? url.host;
    if (!host) return FALLBACK_BASE_URL;
    return `${proto}://${host}`;
  } catch {
    return FALLBACK_BASE_URL;
  }
}

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/تأجير-يخوت-في-دبي", changefreq: "weekly", priority: "0.9" },
  { path: "/إيجار-يخوت-في-دبي", changefreq: "weekly", priority: "0.8" },
  { path: "/حجز-يخوت-في-دبي", changefreq: "weekly", priority: "0.8" },
  { path: "/يخوت-للإيجار-في-دبي", changefreq: "weekly", priority: "0.8" },
  { path: "/حفلات-اليخوت-في-دبي", changefreq: "weekly", priority: "0.8" },
  { path: "/رحلات-صيد-السمك-في-دبي", changefreq: "weekly", priority: "0.8" },
  { path: "/باقات-تأجير-اليخوت-في-دبي", changefreq: "weekly", priority: "0.8" },
  { path: "/من-نحن", changefreq: "monthly", priority: "0.5" },
  { path: "/اتصل-بنا", changefreq: "monthly", priority: "0.7" },
  { path: "/المدونة", changefreq: "weekly", priority: "0.6" },
  { path: "/خريطة-الموقع", changefreq: "monthly", priority: "0.3" },
  { path: "/سياسة-الإلغاء", changefreq: "yearly", priority: "0.3" },
  { path: "/الشروط-والأحكام", changefreq: "yearly", priority: "0.3" },
  { path: "/سياسة-الخصوصية", changefreq: "yearly", priority: "0.3" },
];

// Blog entries appended lazily inside the handler to avoid module-init circular imports.
function getEntries(): SitemapEntry[] {
  return [
    ...staticEntries,
    ...posts.map((p) => ({
      path: `/المدونة/${p.slug}`,
      changefreq: "monthly" as const,
      priority: "0.5",
    })),
  ];
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const baseUrl = resolveBaseUrl(request);
        const urls = getEntries().map((e) =>
          [
            `  <url>`,
            `    <loc>${baseUrl}${encodeURI(e.path)}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
