import { createFileRoute } from "@tanstack/react-router";
import { Anchor, ShieldCheck, DollarSign, Sparkles } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { faqSchema, breadcrumbSchema } from "@/components/SeoJsonLd";
import { yachts, stepsYacht } from "@/data/site";

const yachtFaqs = [
  { q: "ما أرخص يخت للإيجار في دبي؟", a: "يبدأ ميني يخت 40 قدم من 450 درهم للساعة، ويتسع لـ 10 ضيوف مع غرفة نوم واحدة." },
  { q: "ما أكبر يخت متاح للإيجار؟", a: "يخت الشركات 105 قدم يتسع لـ 90 ضيفًا، مثالي للفعاليات الكبيرة، من 3,000 د.إ للساعة." },
  { q: "هل الأسعار تشمل الوقود والطاقم؟", a: "نعم — كل أسعارنا تشمل الكابتن، الطاقم، الوقود، التأمين، ومشروبات أساسية." },
  { q: "من أين تنطلق اليخوت؟", a: "معظم يخوتنا تنطلق من دبي مارينا. بعض اليخوت الكبيرة من مواقع أخرى — نبلغك عند الحجز." },
  { q: "هل يمكن تأجير اليخت لأكثر من يوم؟", a: "نعم، نوفر إيجارات ليوم كامل أو رحلات متعددة الأيام مع مبيت على متن اليخت — تواصل معنا للأسعار." },
  { q: "هل مسموح باصطحاب الأطفال والحيوانات الأليفة؟", a: "الأطفال مرحّب بهم دومًا مع سترات نجاة مخصّصة. الحيوانات مسموحة بموافقة مسبقة." },
];

export const Route = createFileRoute("/يخوت-للإيجار-في-دبي")({
  head: () => ({
    meta: [
      { title: "يخوت للإيجار في دبي | 15 يخت فاخر من 450 د.إ — توت فن" },
      {
        name: "description",
        content:
          "اكتشف أفضل يخوت للإيجار في دبي بأسعار تبدأ من 450 درهم للساعة. أسطول متنوع من 40 حتى 105 قدم، مع رحلات خاصة وخيارات تناسب جميع المناسبات.",
      },
      { name: "keywords", content: "يخوت للإيجار في دبي, تأجير يخت دبي, يخت خاص دبي, يخوت فاخرة, يخت مارينا دبي, تأجير يخت رخيص, majesty azimut sunseeker ferretti" },
      { property: "og:title", content: "يخوت للإيجار في دبي | توت فن لليخوت" },
      { property: "og:description", content: "أسطول 15 يخت فاخر للإيجار في دبي — من 40 قدم حتى 105 قدم." },
      { property: "og:url", content: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي" },
    ],
    scripts: [
      faqSchema(yachtFaqs),
      breadcrumbSchema([
        { name: "الرئيسية", url: "https://dubai-yacht.ae/" },
        { name: "يخوت للإيجار", url: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي" },
      ]),
    ],
  }),
  component: YachtsForRent,
});

const advantages = [
  { icon: DollarSign, t: "أسعار شفافة", d: "لا رسوم مخفية. السعر يشمل الطاقم، الوقود، والتأمين." },
  { icon: Anchor, t: "أسطول متنوّع", d: "15 يخت من 40 قدم حتى 105 قدم لكل ميزانية." },
  { icon: ShieldCheck, t: "أمان وترخيص كامل", d: "جميع اليخوت مؤمّنة ومطابقة لأنظمة هيئة الموانئ." },
  { icon: Sparkles, t: "خدمة فاخرة", d: "طاقم مدرّب على أعلى مستويات الضيافة الفندقية." },
];

function YachtsForRent() {
  return (
    <>
      <PageHero
        compact
        eyebrow="الأسطول"
        title="يخوت للإيجار في دبي"
        subtitle="اختر من مجموعة متنوعة من اليخوت للإيجار في دبي بأسعار تبدأ من 450 درهم للساعة."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Reveal className="text-center">
          <h2 className="text-2xl text-foreground md:text-3xl">أكبر أسطول يخوت للإيجار في دبي</h2>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
          <p className="mt-6 text-start text-sm leading-loose text-muted-foreground md:text-base">
            تفخر توت فن لليخوت بامتلاك أحد أكبر وأشهر أساطيل <strong>اليخوت للإيجار في دبي</strong> — 15 يختًا فاخرًا
            من أشهر ماركات العالم: Majesty، Azimut، Sunseeker، Ferretti، وGulf Craft. تتراوح مقاسات يخوتنا من 40 قدم
            وحتى 105 قدم، وتناسب من رحلة عائلية بسيطة حتى فعالية شركات كبرى تستوعب 90 ضيفًا.
          </p>
          <p className="mt-4 text-start text-sm leading-loose text-muted-foreground md:text-base">
            جميع يخوتنا مرخّصة ومؤمّنة بالكامل، تنطلق من دبي مارينا مع طاقم محترف يتحدث عدة لغات، وأسعار تنافسية شفافة
            تبدأ من 450 درهم للساعة.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <SectionHeading
          title="لماذا نحن الخيار الأفضل لإيجار يخت"
          subtitle="ما يميّز توت فن عن غيرها في سوق اليخوت الإماراتي."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => (
            <Reveal key={a.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 text-center shadow-luxe">
                <a.icon className="mx-auto mb-3 h-7 w-7 text-gold-deep" />
                <h3 className="text-base font-bold text-foreground">{a.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="جميع اليخوت المتاحة للإيجار في دبي"
            subtitle="اختر من مجموعة متنوعة من اليخوت الفاخرة المتاحة للإيجار في دبي، بمقاسات وأسعار تناسب الرحلات الخاصة وجميع المناسبات."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {yachts.map((p, i) => (
              <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading title="كيف تستأجر يخت في دبي" subtitle="خطوات سهلة لحجز يختك والاستمتاع بتجربة فاخرة لا تُنسى." />
        <BookingSteps steps={stepsYacht} />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading title="أسئلة شائعة عن إيجار اليخوت في دبي" />
        <Accordion items={yachtFaqs} />
      </section>

      <ContactCta />
    </>
  );
}
