import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://doc-whisperer-750.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
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

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${encodeURI(e.path)}</loc>`,
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
