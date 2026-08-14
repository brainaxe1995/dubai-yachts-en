import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

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
    ],
  }),
  component: Sitemap,
});

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/تأجير-يخوت-في-دبي", label: "يخوت للإيجار في دبي" },
  { to: "/حفلات-اليخوت-في-دبي", label: "حفلات اليخوت في دبي" },
  { to: "/رحلات-صيد-السمك-في-دبي", label: "رحلات صيد السمك في دبي" },
  { to: "/باقات-تأجير-اليخوت-في-دبي", label: "باقات وعروض اليخوت" },
  { to: "/من-نحن", label: "من نحن" },
  { to: "/المدونة", label: "المدونة" },
  { to: "/اتصل-بنا", label: "اتصل بنا" },
  { to: "/الشروط-والأحكام", label: "الشروط والأحكام" },
  { to: "/سياسة-الخصوصية", label: "سياسة الخصوصية" },
  { to: "/سياسة-الإلغاء", label: "سياسة الإلغاء" },
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
