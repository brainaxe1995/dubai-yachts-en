import { createFileRoute } from "@tanstack/react-router";
import { Anchor, BadgeCheck, Clock, ShieldCheck } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { yachts, faqs } from "@/data/site";

export const Route = createFileRoute("/إيجار-يخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "إيجار يخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "نوفر خدمات إيجار يخوت في دبي بأسعار تنافسية تبدأ من 450 درهم للساعة، مع أسطول متنوع وخيارات مناسبة للرحلات الخاصة والمناسبات.",
      },
      { property: "og:title", content: "إيجار يخوت في دبي | توت فن لليخوت" },
      {
        property: "og:description",
        content: "نوفر خدمات إيجار يخوت في دبي بأسعار تنافسية تبدأ من 450 درهم للساعة، مع أسطول متنوع وخيارات مناسبة للرحلات الخاصة والمناسبات.",
      },
      { property: "og:url", content: "https://dubai-yacht.ae/إيجار-يخوت-في-دبي/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/إيجار-يخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/إيجار-يخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/إيجار-يخوت-في-دبي/" },
    ],
  }),
  component: RentYacht,
});

const reasons = [
  { icon: BadgeCheck, t: "أسطول متنوّع", d: "من 40 قدم حتى 105 قدم — يخوت لكل المناسبات والميزانيات." },
  { icon: Clock, t: "مرونة في المدة", d: "احجز من ساعة واحدة إلى يوم كامل حسب رغبتك." },
  { icon: ShieldCheck, t: "أمان مضمون", d: "جميع اليخوت مرخّصة ومؤمّنة بالكامل وطاقم مدرّب." },
  { icon: Anchor, t: "انطلاق من مارينا دبي", d: "موقع مركزي قريب من أشهر معالم دبي البحرية." },
];

const fleetGroups = [
  { size: "صغير (40–55 قدم)", price: "من 450 د.إ / الساعة", guests: "2 – 18 ضيف", best: "رحلات صغيرة وعائلية" },
  { size: "متوسط (66–80 قدم)", price: "من 800 د.إ / الساعة", guests: "20 – 35 ضيف", best: "حفلات ومناسبات خاصة" },
  { size: "كبير (88–105 قدم)", price: "من 1,300 د.إ / الساعة", guests: "40 – 90 ضيف", best: "فعاليات الشركات وحفلات الزفاف" },
];

function RentYacht() {
  return (
    <>
      <PageHero
        compact
        eyebrow="إيجار يخوت"
        title="إيجار يخوت في دبي"
        subtitle="نوفر خدمات إيجار يخوت في دبي بأسعار تنافسية تبدأ من 450 درهم للساعة، مع أسطول متنوع وخيارات مناسبة للرحلات الخاصة والمناسبات."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="لماذا إيجار يخت مع توت فن"
          subtitle="نقدّم تجربة إيجار سهلة وشفافة مع أفضل الأسعار في دبي."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 text-center shadow-luxe transition-transform hover:-translate-y-1">
                <r.icon className="mx-auto mb-3 h-7 w-7 text-gold-deep" />
                <h3 className="text-base font-bold text-foreground">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title="مقاسات اليخوت المتاحة للإيجار"
            subtitle="اختر الحجم المناسب لعدد ضيوفك ونوع مناسبتك."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {fleetGroups.map((g, i) => (
              <Reveal key={g.size} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe">
                  <h3 className="text-lg font-bold text-primary">{g.size}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">السعر:</span> {g.price}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">السعة:</span> {g.guests}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">مناسب لـ:</span> {g.best}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أسطولنا من اليخوت الفاخرة"
          subtitle="اختر من أسطولنا المتنوع من اليخوت الفاخرة المتاحة للإيجار في دبي لجميع الرحلات والمناسبات."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {yachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading title="أسئلة شائعة عن إيجار اليخوت" />
        <Accordion items={faqs} />
      </section>

      <ContactCta />
    </>
  );
}
