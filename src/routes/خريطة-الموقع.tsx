import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactCta } from "@/components/ContactCta";

export const Route = createFileRoute("/خريطة-الموقع")({
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
      { property: "og:url", content: "https://dubai-yacht.ae/خريطة-الموقع/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/خريطة-الموقع/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/خريطة-الموقع/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/خريطة-الموقع/" },
    ],
  }),
  component: Sitemap,
});

const groups = [
  {
    title: "الخدمات الرئيسية",
    links: [
      { to: "/", label: "الرئيسية" },
      { to: "/تأجير-يخوت-في-دبي", label: "تأجير يخوت في دبي" },
      { to: "/إيجار-يخوت-في-دبي", label: "إيجار يخوت في دبي" },
      { to: "/حجز-يخوت-في-دبي", label: "حجز يخوت في دبي" },
      { to: "/يخوت-للإيجار-في-دبي", label: "يخوت للإيجار في دبي" },
    ],
  },
  {
    title: "الحفلات والباقات",
    links: [
      { to: "/حفلات-اليخوت-في-دبي", label: "حفلات اليخوت في دبي" },
      { to: "/باقات-تأجير-اليخوت-في-دبي", label: "باقات وعروض اليخوت" },
      { to: "/رحلات-صيد-السمك-في-دبي", label: "رحلات صيد السمك في دبي" },
    ],
  },
  {
    title: "عن الشركة",
    links: [
      { to: "/من-نحن", label: "من نحن" },
      { to: "/المدونة", label: "المدونة" },
      { to: "/اتصل-بنا", label: "اتصل بنا" },
    ],
  },
  {
    title: "الشروط والسياسات",
    links: [
      { to: "/الشروط-والأحكام", label: "الشروط والأحكام" },
      { to: "/سياسة-الخصوصية", label: "سياسة الخصوصية" },
      { to: "/سياسة-الإلغاء", label: "سياسة الإلغاء" },
    ],
  },
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
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="اكتشف الآن جميع خدمات توت فن لتأجير اليخوت في دبي"
          subtitle="تصفح خدماتنا المتنوعة واختر ما يناسبك من تأجير اليخوت، باقات الحفلات، رحلات الصيد والتجارب البحرية الخاصة في دبي."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 90}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
                <h3 className="mb-4 border-b border-border pb-3 text-lg font-bold text-gold-deep">{g.title}</h3>
                <ul className="space-y-2">
                  {g.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted hover:text-gold-deep"
                      >
                        <span className="text-gold">←</span>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
