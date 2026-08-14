import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "خريطة الموقع | توت فن لتأجير اليخوت في دبي" },
      {
        name: "description",
        content:
          "تصفح خريطة الموقع لتوت فن لليخوت للوصول بسهولة إلى صفحات تأجير اليخوت، الحفلات، الرحلات البحرية، والباقات المتوفرة في دبي.",
      },
      { property: "og:title", content: "خريطة الموقع | توت فن لليخوت" },
      { property: "og:description", content: "روابط جميع صفحات وخدمات توت فن لليخوت في دبي." },
    ],
  }),
  component: Sitemap,
});

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/yacht-rental", label: "يخوت للإيجار في دبي" },
  { to: "/yacht-parties", label: "حفلات اليخوت في دبي" },
  { to: "/fishing-trips", label: "رحلات صيد السمك في دبي" },
  { to: "/packages", label: "باقات وعروض اليخوت" },
  { to: "/about", label: "من نحن" },
  { to: "/blog", label: "المدونة" },
  { to: "/contact", label: "اتصل بنا" },
  { to: "/terms", label: "الشروط والأحكام" },
  { to: "/privacy", label: "سياسة الخصوصية" },
  { to: "/cancellation", label: "سياسة الإلغاء" },
] as const;

function Sitemap() {
  return (
    <>
      <PageHero
        compact
        eyebrow="خريطة الموقع"
        title="خريطة الموقع"
        subtitle="تصفح خريطة موقع توت فن للوصول بسهولة إلى صفحات تأجير اليخوت، الحفلات، الرحلات البحرية، الصيد والباقات المتوفرة في دبي."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="اكتشف الآن جميع خدمات توت فن لتأجير اليخوت في دبي"
          subtitle="تصفح خدماتنا المتنوعة واختر ما يناسبك من تأجير اليخوت، باقات الحفلات، رحلات الصيد والتجارب البحرية الخاصة في دبي."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {links.map((l, i) => (
            <Reveal as="li" key={l.label} delay={i * 40}>
              <Link
                to={l.to}
                className="block rounded-xl border border-border bg-card px-5 py-4 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold-deep"
              >
                {l.label}
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
