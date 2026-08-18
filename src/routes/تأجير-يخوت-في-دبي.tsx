import { createFileRoute } from "@tanstack/react-router";
import { Ship, Compass, Package, MapPin } from "lucide-react";
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
    q: "لماذا تختار تأجير يخت في دبي؟",
    a: "يمنحك تأجير يخت في دبي تجربة خاصة تجمع بين الخصوصية والراحة والإطلالات البحرية المميزة، سواء للرحلات العائلية، الحفلات، المناسبات الخاصة أو قضاء وقت ممتع مع الأصدقاء. خصوصية كاملة للاستمتاع بالرحلة مع الأصدقاء. إطلالات مميزة على دبي مارينا ونخلة جميرا وبرج العرب. مناسب لجميع المناسبات مثل أعياد الميلاد والحفلات والرحلات العائلية. تجربة مريحة وفاخرة مع طاقم محترف وخدمات متنوعة.",
  },
];

const rentalFeatures = [
  {
    h: "كيفية تأجير يخت في دبي؟",
    icon: Compass,
    image: azimutImg,
    imageAlt: "كيفية تأجير يخت في دبي",
    p: [
      "يمكنك __تأجير يخت في دبي__ بسهولة من خلال اختيار اليخت المناسب لعدد ضيوفك ومناسبتك، وتحديد التاريخ والوقت ومدة الرحلة، ثم تأكيد الحجز بدفع __العربون__.",
      "بعد ذلك ستحصل على __تفاصيل موقع الصعود__ والرحلة عبر واتساب أو البريد الإلكتروني، مع تعليمات السلامة اللازمة قبل الإبحار من دبي مارينا.",
    ],
  },
  {
    h: "ماذا يشمل تأجير اليخت في دبي؟",
    icon: Package,
    image: gulfcraftImg,
    imageAlt: "ماذا يشمل تأجير اليخت في دبي",
    p: [
      "يشمل __تأجير اليخوت في دبي__ عادةً __قبطانًا وطاقمًا محترفًا__، الوقود، معدات السلامة، المياه والمشروبات المنعشة، مع إمكانية إضافة الطعام والديكور والأنشطة البحرية حسب الباقة المختارة.",
      "جميع يخوتنا __مرخّصة ومؤمّنة__ بالكامل، ما يضمن رحلة آمنة وممتعة لك ولضيوفك دون أي رسوم مخفية.",
    ],
  },
  {
    h: "ما أهم المعالم التي يمكنك الوصول إليها عند تأجير يخت في دبي؟",
    icon: MapPin,
    image: marinaHero,
    imageAlt: "معالم دبي البحرية",
    p: [
      "استمتع برحلة __يخت في دبي__ تمر بأشهر المعالم البحرية مثل __دبي مارينا__، جميرا بيتش، بلوواترز، __نخلة جميرا__ و__برج العرب__، مع فرصة للاستمتاع بالإطلالات والتقاط الصور.",
      "أسطولنا ينطلق يوميًا من مارينا دبي مع إمكانية تخصيص المسار حسب رغبة الضيوف.",
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
          title="أسئلة شائعة عن تأجير اليخوت"
          subtitle="إجابات لأكثر الأسئلة شيوعًا قبل تأجير يختك في دبي."
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
