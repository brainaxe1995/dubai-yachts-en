import { createFileRoute } from "@tanstack/react-router";
import { Ship, Compass, Package, MapPin, Lock, Landmark, Sparkles, Wine } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { CharterEssentials } from "@/components/CharterEssentials";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { yachts, faqs, occasions, keywordCloud } from "@/data/site";
import gulfcraftImg from "@/assets/yachts/gulfcraft-90.webp";
import azimutImg from "@/assets/yachts/azimut-80.webp";
import marinaHero from "@/assets/yachts/majesty-88.webp";

export const Route = createFileRoute("/تأجير-يخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "تأجير يخوت في دبي | أسطول اليخوت والأسعار – توت فن" },
      {
        name: "description",
        content:
          "نوفر خدمات تأجير يخوت في دبي مع رحلات خاصة، يخوت متنوعة، وأسعار تبدأ من 450 درهم للساعة لجميع المناسبات.",
      },
      { property: "og:title", content: "تأجير يخوت في دبي | أسطول اليخوت والأسعار – توت فن" },
      { property: "og:description", content: "أسطول متنوع من اليخوت الفاخرة للإيجار في دبي بأسعار تنافسية." },
      { property: "og:url", content: "https://dubai-yacht.ae/تأجير-يخوت-في-دبي/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/تأجير-يخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/تأجير-يخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/تأجير-يخوت-في-دبي/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "أسطول اليخوت للإيجار في دبي",
          itemListElement: yachts.map((y, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: y.title,
              serviceType: "تأجير يخوت",
              areaServed: "Dubai, United Arab Emirates",
              provider: { "@type": "Organization", name: "توت فن لليخوت" },
            },
          })),
        }),
      },
    ],
  }),
  component: YachtRental,
});

const brands = [
  { n: "Majesty", d: "يخوت فاخرة من مصانع إماراتية عالمية، من 48 حتى 88 قدم." },
  { n: "Azimut", d: "يخوت إيطالية أنيقة بتصميم عصري، من 50 حتى 80 قدم مع جاكوزي." },
  { n: "Sunseeker", d: "سوبر يخوت بريطانية للراغبين بأعلى مستويات الفخامة." },
  { n: "Ferretti", d: "يخوت إيطالية بتصميم فسيح ومساحات معيشة راقية." },
  { n: "Gulf Craft", d: "أسطول إماراتي متين مثالي لرحلات مارينا دبي." },
];

const rentalTopFaqs = [
  {
    q: "هل يمكن إحضار الطعام على اليخت؟",
    a: "نعم، يمكن إحضار الطعام والمشروبات غير الكحولية على اليخت، كما يمكن طلب خدمات تقديم الطعام مسبقًا حسب الباقة المختارة.",
  },
  {
    q: "هل يمكن حجز يخت لحفلة خاصة؟",
    a: "نعم، يمكن __حجز يخت لحفلة خاصة في دبي__ مثل أعياد الميلاد، الخطوبة، الذكرى السنوية أو التجمعات الخاصة، مع إمكانية إضافة الديكور، الكيك، الطعام والموسيقى حسب اختيارك.",
  },
];

const rentalFeatures = [
  {
    h: "كيفية تأجير يخت في دبي؟",
    icon: Compass,
    image: azimutImg,
    imageAlt: "كيفية تأجير يخت في دبي",
    p: [
      "يمكنك __تأجير يخت في دبي__ بسهولة من خلال اختيار اليخت المناسب، وتحديد التاريخ والوقت ومدة الرحلة، ثم تأكيد الحجز بدفع العربون. بعد ذلك ستحصل على تفاصيل موقع الصعود والرحلة.",
    ],
  },
  {
    h: "ماذا يشمل تأجير اليخت في دبي؟",
    icon: Package,
    image: gulfcraftImg,
    imageAlt: "ماذا يشمل تأجير اليخت في دبي",
    p: [
      "يشمل __تأجير اليخوت في دبي__ عادةً قبطانًا وطاقمًا محترفًا، الوقود، معدات السلامة، المياه والمشروبات المنعشة، مع إمكانية إضافة الطعام والديكور والأنشطة البحرية حسب الباقة المختارة.",
    ],
  },
  {
    h: "ما أهم المعالم التي يمكنك الوصول إليها عند تأجير يخت في دبي؟",
    icon: MapPin,
    image: marinaHero,
    imageAlt: "معالم دبي البحرية",
    p: [
      "استمتع برحلة __يخت في دبي__ تمر بأشهر المعالم البحرية مثل دبي مارينا، جميرا بيتش، بلوواترز، نخلة جميرا وبرج العرب، مع فرصة للاستمتاع بالإطلالات والتقاط الصور.",
    ],
  },
];

function YachtRental() {
  return (
    <>
      <PageHero
        compact
        eyebrow="تأجير يخوت"
        title="تأجير يخوت في دبي"
        subtitle="نوفر خدمات تأجير يخوت في دبي مع رحلات خاصة، يخوت متنوعة، وأسعار تبدأ من 450 درهم للساعة لجميع المناسبات."
      />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="خدمات تأجير اليخوت الخاصة في دبي"
          subtitle="اختر من بين أفضل اليخوت الخاصة في دبي بأسعار تبدأ من 450 درهم للساعة، واستمتع برحلة فاخرة تناسب جميع المناسبات."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {yachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      {/* Why choose yacht rental Dubai — right after products */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">لماذا تختار تأجير يخت في دبي؟</h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              يمنحك <strong className="font-extrabold text-gold-deep">تأجير يخت في دبي</strong> تجربة خاصة تجمع بين
              الخصوصية والراحة والإطلالات البحرية المميزة، سواء للرحلات العائلية، الحفلات، المناسبات الخاصة أو قضاء وقت
              ممتع مع الأصدقاء.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Lock, t: "خصوصية كاملة", d: "للاستمتاع بالرحلة مع العائلة أو الأصدقاء." },
              { icon: Landmark, t: "إطلالات مميزة", d: "على دبي مارينا ونخلة جميرا وبرج العرب." },
              { icon: Sparkles, t: "مناسب لجميع المناسبات", d: "مثل أعياد الميلاد والحفلات والرحلات العائلية." },
              { icon: Wine, t: "تجربة مريحة وفاخرة", d: "مع طاقم محترف وخدمات متنوعة." },
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

      {/* Long-form SEO feature section */}
      <section className="bg-gradient-to-b from-background via-muted to-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title="دليلك الكامل لتأجير اليخوت في دبي"
            subtitle="كل ما تحتاج معرفته قبل استئجار يختك — من خطوات الحجز إلى ما يشمله السعر وأشهر المعالم البحرية."
          />
          <FeatureBlocks blocks={rentalFeatures} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أشهر ماركات اليخوت في أسطولنا"
          subtitle="نتعاون مع أفضل ماركات اليخوت العالمية لتقديم تجربة إبحار استثنائية."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => (
            <Reveal key={b.n} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe">
                <Ship className="mb-3 h-7 w-7 text-gold-deep" />
                <h3 className="text-lg font-bold text-primary">{b.n}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading title="لأي مناسبة تناسب اليخوت" subtitle="نصمّم لك تجربة تأجير تناسب مناسبتك ومزاجك." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {occasions.map((o, i) => (
            <Reveal key={o.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-bold text-foreground">{o.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CharterEssentials />

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading
          title="أسئلة شائعة حول تأجير اليخوت في دبي"
          subtitle="اكتشف أهم الإجابات حول تأجير اليخوت في دبي، بما في ذلك الأسعار، الحجز، المدة، الخدمات المتوفرة، وما تحتاج معرفته قبل رحلتك."
        />
        <Accordion items={[...rentalTopFaqs, ...faqs]} />
      </section>

      <ContactCta />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أشهر عمليات البحث عن اليخوت والرحلات البحرية في دبي"
          subtitle="اكتشف أكثر عمليات البحث شيوعًا حول تأجير اليخوت في دبي للوصول بسرعة إلى الخدمة أو التجربة التي تناسبك."
        />
        <KeywordCloud items={keywordCloud["/تأجير-يخوت-في-دبي/"].map((k) => ({ keyword: k, to: "/تأجير-يخوت-في-دبي/" }))} />
      </section>
    </>
  );
}
