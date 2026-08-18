import { createFileRoute } from "@tanstack/react-router";
import { Zap, MessageSquare } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { BookingSteps } from "@/components/BookingSteps";
import { ContactCta } from "@/components/ContactCta";
import { CharterEssentials } from "@/components/CharterEssentials";
import { Accordion } from "@/components/Accordion";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { yachts, stepsYacht, faqs, keywordCloud } from "@/data/site";
import yachtBookImg from "@/assets/yachts/majesty-66.webp";
import marinaBookImg from "@/assets/yachts/sunseeker-95.webp";

const bookingFaqs = [
  {
    q: "لماذا تختار حجز يخت في دبي؟",
    a: "يمنحك حجز يخت في دبي تجربة بحرية خاصة وممتعة، مع إمكانية اختيار اليخت والوقت والمسار ومدة الرحلة والخدمات التي تناسب رحلتك أو مناسبتك. خيارات متنوعة من اليخوت تناسب عدد الضيوف والميزانية. مرونة في الحجز واختيار الوقت ومدة الرحلة. مسارات بحرية مميزة حول أشهر معالم دبي. خدمات إضافية حسب الطلب مثل الطعام والديكور والأنشطة البحرية.",
  },
  {
    q: "ما هي أسهل طريقة لحجز يخت في دبي؟",
    a: "أسرع طريقة هي عبر واتساب — اختر اليخت من الموقع ثم اضغط زر «احجز الآن» وسنؤكد التوفر خلال دقائق مع تفاصيل الدفع.",
  },
  {
    q: "هل يمكنني حجز يخت في نفس اليوم؟",
    a: "نعم — الحجز في نفس اليوم متاح حسب توفر اليخت. ننصح بالتواصل عبر واتساب مباشرة للحصول على أسرع تأكيد وأفضل خيار متاح.",
  },
  ...faqs,
];

const bookingFeatures = [
  {
    h: "احجز يختك في دقائق",
    icon: Zap,
    image: yachtBookImg,
    imageAlt: "حجز يخت في دبي",
    p: [
      "تصفّح __أسطولنا الفاخر__، اختر اليخت المناسب، وحدد التاريخ والوقت. أكّد الحجز بدفع __العربون__ عبر رابط دفع آمن أو واتساب.",
      "بعد التأكيد ستستلم فورًا __تفاصيل موقع الصعود__ وموعد الرحلة عبر رسالة مباشرة.",
    ],
  },
  {
    h: "خدمة واتساب على مدار الساعة",
    icon: MessageSquare,
    image: marinaBookImg,
    imageAlt: "خدمة عملاء واتساب 24/7",
    p: [
      "فريقنا متاح __24/7__ عبر واتساب للرد على استفساراتك، اقتراح اليخت الأنسب لمناسبتك، وتخصيص باقتك من __الإفطار__ أو __العشاء الرومانسي__ أو __جيت سكي__.",
      "لا حاجة لملء نماذج طويلة — تواصل مباشر وسريع.",
    ],
  },
];

export const Route = createFileRoute("/حجز-يخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "حجز يخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "اكتشف أفضل خيارات حجز يخوت في دبي بأسعار تبدأ من 450 درهم للساعة، مع يخوت فاخرة ورحلات خاصة تناسب جميع المناسبات.",
      },
      { property: "og:title", content: "حجز يخوت في دبي | توت فن لليخوت" },
      {
        property: "og:description",
        content:
          "اكتشف أفضل خيارات حجز يخوت في دبي بأسعار تبدأ من 450 درهم للساعة، مع يخوت فاخرة ورحلات خاصة تناسب جميع المناسبات.",
      },
      { property: "og:url", content: "https://dubai-yacht.ae/حجز-يخوت-في-دبي/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/حجز-يخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/حجز-يخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/حجز-يخوت-في-دبي/" },
    ],
  }),
  component: YachtBooking,
});

function YachtBooking() {
  return (
    <>
      <PageHero
        compact
        eyebrow="حجز يخوت"
        title="حجز يخوت في دبي"
        subtitle="احجز يختك في دبي بسهولة بأسعار تبدأ من 450 درهم للساعة."
      />

      {/* Products first */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="أفضل خيارات حجز يخوت في دبي بأسعار تنافسية"
          subtitle="احجز يختك في دبي بسهولة بأسعار تبدأ من 450 درهم للساعة."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {yachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      {/* New rich section after products */}
      <section className="bg-gradient-to-b from-muted via-background to-muted py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title="طريقة الحجز مع توت فن — سريعة وشفافة"
            subtitle="كل ما تحتاج معرفته عن خطوات حجز يختك في دبي، من الاختيار حتى الإبحار."
          />
          <FeatureBlocks blocks={bookingFeatures} />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="كيف تحجز يختك في دبي"
          subtitle="ثماني خطوات بسيطة من اختيار اليخت حتى الانطلاق في رحلتك."
        />
        <BookingSteps steps={stepsYacht} />
      </section>

      <CharterEssentials />

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أسئلة شائعة عن حجز اليخوت"
          subtitle="إجابات على أهم الأسئلة قبل حجز يختك في دبي."
        />
        <Accordion items={bookingFaqs} />
      </section>

      <ContactCta
        title="احجز يختك في دبي الآن"
        subtitle="تواصل معنا عبر واتساب أو الهاتف لتأكيد التوفر ودفع العربون."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أشهر عمليات البحث عن اليخوت والرحلات البحرية في دبي"
          subtitle="اكتشف الكلمات الأكثر بحثًا حول حجز اليخوت في دبي."
        />
        <KeywordCloud
          items={
            keywordCloud["/تأجير-يخوت-في-دبي/"]
              .slice(0, 8)
              .map((k) => ({ keyword: k, to: "/حجز-يخوت-في-دبي/" }))
          }
        />
      </section>
    </>
  );
}
