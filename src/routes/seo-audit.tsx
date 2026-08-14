import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { seoReport } from "@/lib/seo-report";
import type { SeoIssue } from "@/lib/seo-report";

export const Route = createFileRoute("/seo-audit")({
  head: () => ({
    meta: [
      { title: "تدقيق السيو | توت فن لليخوت" },
      { name: "description", content: "لوحة داخلية لمراجعة بيانات السيو والوسوم الوصفية لكل صفحة في الموقع." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SeoAuditPage,
});

const levelStyles: Record<string, string> = {
  error: "border-red-500/40 bg-red-500/10 text-red-300",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-300",
};

function IssueBadge({ issue }: { issue: SeoIssue }) {
  return (
    <li className={`rounded-lg border px-3 py-2 text-xs leading-relaxed ${levelStyles[issue.level] ?? ""}`}>
      <span className="font-bold">{issue.rule}</span> — {issue.message}
    </li>
  );
}

function Field({ label, value, missing }: { label: string; value: string | null; missing?: boolean }) {
  return (
    <div className="grid gap-1 border-b border-border/60 py-2 md:grid-cols-[160px_1fr] md:gap-4">
      <span className="text-xs font-bold text-gold">{label}</span>
      <span
        dir="auto"
        className={`break-words text-xs leading-relaxed ${
          value ? "text-muted-foreground" : missing ? "text-red-400" : "text-muted-foreground/60"
        }`}
      >
        {value ?? "غير موجود"}
        {value ? <span className="mr-2 text-muted-foreground/50">({value.length} حرف)</span> : null}
      </span>
    </div>
  );
}

function SeoAuditPage() {
  const { summary, routes, globalIssues, sitemapPaths, robotsSitemap, baseUrl, generatedAt } = seoReport;

  return (
    <>
      <PageHero
        compact
        eyebrow="لوحة داخلية"
        title="تدقيق السيو التلقائي"
        subtitle="فحص آلي يعمل مع كل عملية بناء: عناوين مكررة، أوصاف مكررة، canonical و og:url المفقودة، والبيانات المنظمة غير الصالحة."
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { n: summary.routes, l: "صفحة تم فحصها", c: "text-gold" },
            { n: summary.errors, l: "أخطاء", c: summary.errors ? "text-red-400" : "text-emerald-400" },
            { n: summary.warnings, l: "تحذيرات", c: summary.warnings ? "text-amber-400" : "text-emerald-400" },
          ].map((s) => (
            <Reveal key={s.l} className="rounded-2xl border border-border bg-card p-6 text-center shadow-luxe">
              <div className={`text-3xl font-bold ${s.c}`}>{s.n}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </Reveal>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          آخر فحص: {new Date(generatedAt).toLocaleString("ar-AE")} — النطاق: {baseUrl}
        </p>

        <div className="mt-12">
          <SectionHeading title="فحص خريطة الموقع و robots.txt" />
          <div className="rounded-2xl border border-border bg-card p-6">
            <Field label="Sitemap في robots.txt" value={robotsSitemap} missing />
            <Field label="عدد روابط sitemap.xml" value={String(sitemapPaths.length)} />
            <ul className="mt-4 grid gap-1 md:grid-cols-2">
              {sitemapPaths.map((p) => (
                <li key={p} dir="ltr" className="text-right text-xs text-muted-foreground">
                  {decodeURI(p)}
                </li>
              ))}
            </ul>
          </div>
          {globalIssues.length ? (
            <ul className="mt-4 grid gap-2">
              {globalIssues.map((i, idx) => (
                <IssueBadge key={`${i.rule}-${idx}`} issue={i} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
              لا توجد مشاكل عامة: كل المسارات مدرجة في sitemap.xml و robots.txt يشير إلى الخريطة الصحيحة.
            </p>
          )}
        </div>

        <div className="mt-14">
          <SectionHeading title="بيانات السيو لكل صفحة" />
          <div className="grid gap-6">
            {routes.map((r) => (
              <Reveal key={r.path} className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 dir="auto" className="text-base font-bold text-foreground">
                    {decodeURI(r.path)}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      r.issues.length
                        ? "bg-red-500/15 text-red-300"
                        : "bg-emerald-500/15 text-emerald-300"
                    }`}
                  >
                    {r.noindex ? "noindex" : r.issues.length ? `${r.issues.length} مشكلة` : "سليمة"}
                  </span>
                </div>

                <div className="mt-4">
                  <Field label="العنوان" value={r.title} missing />
                  <Field label="الوصف" value={r.description} missing />
                  <Field label="og:title" value={r.ogTitle} />
                  <Field label="og:description" value={r.ogDescription} />
                  <Field label="og:url" value={r.ogUrl ? decodeURI(r.ogUrl) : null} missing />
                  <Field label="canonical" value={r.canonical ? decodeURI(r.canonical) : null} missing />
                  <Field
                    label="hreflang"
                    value={
                      r.alternates?.length
                        ? r.alternates.map((a) => `${a.hreflang} → ${decodeURI(a.href)}`).join(" | ")
                        : null
                    }
                    missing
                  />
                  <Field label="robots" value={r.robots} />
                  <Field
                    label="البيانات المنظمة"
                    value={
                      r.structuredData.length
                        ? r.structuredData.map((s) => `${s.type} (${s.status})`).join("، ")
                        : null
                    }
                  />
                </div>

                {r.issues.length ? (
                  <ul className="mt-4 grid gap-2">
                    {r.issues.map((i, idx) => (
                      <IssueBadge key={`${i.rule}-${idx}`} issue={i} />
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
