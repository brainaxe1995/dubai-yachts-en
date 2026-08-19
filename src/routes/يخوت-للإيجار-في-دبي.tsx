import { createFileRoute } from "@tanstack/react-router";
import { Anchor, ShieldCheck, DollarSign, Sparkles, Package, Users, Lock, CalendarClock, Landmark, PlusCircle } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { CharterEssentials } from "@/components/CharterEssentials";
import { KeywordCloud } from "@/components/KeywordCloud";
import { FeatureBlocks } from "@/components/FeatureSection";
import { faqSchema, breadcrumbSchema } from "@/components/SeoJsonLd";
import { yachts, stepsYacht, keywordCloud } from "@/data/site";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import italianImg from "@/assets/yachts/italian-95.webp";
import corpImg from "@/assets/yachts/corporate-105.webp";

const rentalIncludedFeatures = [
  {
    h: "ماذا يشمل إيجار اليخت؟",
    icon: Package,
    image: italianImg,
    imageAlt: "ما يشمل إيجار اليخت في دبي",
    p: [
      "كل رحلة يخت لدينا تشمل __كابتن وطاقم محترف__، __الوقود__، __التأمين الشامل__، معدات السلامة، مياه معدنية ومشروبات غازية، أطباق وأدوات مائدة، ونظام صوت احترافي.",
      "يمكنك إضافة __الطعام__، __الديكور__، __الكيك__، __المصور__، أو __الرياضات المائية__ حسب مناسبتك.",
    ],
  },
  {
    h: "لمن يناسب إيجار اليخوت في دبي؟",
    icon: Users,
    image: corpImg,
    imageAlt: "من يناسب تأجير اليخوت",
    p: [
      "أسطولنا يناسب __العائلات__ والمجموعات الصغيرة (10–20 شخص)، __فعاليات الشركات__ الكبرى (حتى 90 ضيفًا)، __حفلات الزفاف والخطوبة__ الفاخرة، __طلبات الزواج__ الرومانسية، ورحلات __طلاب الجامعات__ للتخرج.",
      "لكل مقاس يخت وميزانية — يوجد الخيار المناسب لك.",
    ],
  },
];

const yachtFaqs = [
  {
    q: "كم تكلفة استئجار يخت في دبي؟",
    a: "تختلف تكلفة __استئجار اليخوت في دبي__ حسب حجم اليخت، وعدد الضيوف، ومدة الرحلة والخدمات المختارة. تبدأ الأسعار من __450 درهمًا إماراتيًا في الساعة__، وتزداد حسب نوع اليخت والخدمات الإضافية.",
  },
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
      { name: "keywords", content: "يخوت للإيجار في دبي, تأجير يخت دبي, يخت خاص دبي, يخوت فاخرة, يخت مارينا دبي" },
      { property: "og:title", content: "يخوت للإيجار في دبي | توت فن لليخوت" },
      { property: "og:description", content: "أسطول 15 يخت فاخر للإيجار في دبي — من 40 قدم حتى 105 قدم." },
      { property: "og:url", content: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي/" },
    ],
    scripts: [
      faqSchema(yachtFaqs),
      breadcrumbSchema([
        { name: "الرئيسية", url: "https://dubai-yacht.ae/" },
        { name: "يخوت للإيجار", url: "https://dubai-yacht.ae/يخوت-للإيجار-في-دبي/" },
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
  const visibleYachts = useOverriddenProducts(yachts, "yachts");
  return (
    <>
      <PageHero
        compact
        eyebrow="الأسطول"
        title="يخوت للإيجار في دبي"
        subtitle="اختر من مجموعة متنوعة من اليخوت للإيجار في دبي بأسعار تبدأ من 450 درهم للساعة."
      />

      {/* Products FIRST */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="جميع اليخوت المتاحة للإيجار في دبي"
          subtitle="اختر من مجموعة متنوعة من اليخوت الفاخرة المتاحة للإيجار في دبي، بمقاسات وأسعار تناسب الرحلات الخاصة وجميع المناسبات."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleYachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      {/* Why choose yacht rental Dubai — right after products */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">لماذا تختار استئجار يخت في دبي؟</h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              يمنحك <strong className="font-extrabold text-gold-deep">استئجار يخت في دبي</strong> حرية الاستمتاع بالبحر
              بعيدًا عن الرحلات المزدحمة، مع إمكانية تحديد مدة الرحلة والمسار والخدمات بما يناسب خطتك.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Lock, t: "رحلة خاصة بالكامل", d: "لك ولضيوفك." },
              { icon: CalendarClock, t: "حرية اختيار مدة الرحلة", d: "والوقت المناسب لك." },
              { icon: Landmark, t: "زيارة أشهر معالم دبي البحرية", d: "من منظور مختلف." },
              { icon: PlusCircle, t: "إمكانية إضافة خدمات وتجارب", d: "تناسب نوع رحلتك." },
            ].map((it, i) => (
              <Reveal key={it.t} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-border bg-card p-5 shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
                  <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <it.icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <h3 className="text-base font-bold text-foreground">{it.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center">
            <h2 className="text-2xl text-foreground md:text-3xl">أكبر أسطول يخوت للإيجار في دبي</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              نظرة كاملة على الأسطول والماركات العالمية المتوفرة في توت فن.
            </p>
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
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
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
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="كيف تستأجر يخت في دبي"
            subtitle="خطوات سهلة لحجز يختك والاستمتاع بتجربة فاخرة لا تُنسى."
          />
          <BookingSteps steps={stepsYacht} />
        </div>
      </section>

      {/* New visual feature section after products */}
      <section className="bg-gradient-to-b from-background via-muted to-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title="كل ما تحتاج معرفته عن إيجار اليخوت في دبي"
            subtitle="من الإضافات المشمولة إلى الفئات التي تناسبها رحلاتنا — دليل شامل قبل الحجز."
          />
          <FeatureBlocks blocks={rentalIncludedFeatures} />
        </div>
      </section>

      <CharterEssentials />

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="الأسئلة الشائعة عن يخوت للإيجار في دبي"
          subtitle="أهم الأسئلة حول __يخوت للإيجار في دبي__ للتعرف على الأسعار، طريقة الحجز والخدمات المتوفرة قبل رحلتك."
        />
        <Accordion items={yachtFaqs} />
      </section>

      <ContactCta />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أشهر عمليات البحث عن اليخوت والرحلات البحرية في دبي"
          subtitle="اكتشف أكثر عمليات البحث شيوعًا حول تأجير اليخوت في دبي للوصول بسرعة إلى الخدمة أو التجربة التي تناسبك."
        />
        <KeywordCloud items={keywordCloud["/يخوت-للإيجار-في-دبي/"].map((k) => ({ keyword: k, to: "/يخوت-للإيجار-في-دبي/" }))} />
      </section>
    </>
  );
}
