import { createFileRoute } from "@tanstack/react-router";
import { Zap, MessageSquare, Ship, CalendarClock, Landmark, Sparkles, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { BookingSteps } from "@/components/BookingSteps";
import { ContactCta } from "@/components/ContactCta";
import { Accordion } from "@/components/Accordion";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { yachts, stepsYacht, faqs, keywordCloud } from "@/data/site";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import yachtBookImg from "@/assets/yachts/majesty-66.webp";
import marinaBookImg from "@/assets/yachts/sunseeker-95.webp";

const bookingFaqs = [
  {
    q: "ما هي أسهل طريقة لحجز يخت في دبي؟",
    a: "أسرع طريقة هي عبر واتساب — اختر اليخت من الموقع ثم اضغط زر «احجز الآن» وسنؤكد التوفر خلال دقائق مع تفاصيل الدفع.",
  },
  {
    q: "هل يمكنني حجز يخت في نفس اليوم؟",
    a: "نعم — الحجز في نفس اليوم متاح حسب توفر اليخت. ننصح بالتواصل عبر واتساب مباشرة للحصول على أسرع تأكيد وأفضل خيار متاح.",
  },
  {
    q: "هل يمكنني حجز يخت لحفلة خاصة؟",
    a: "نعم، يمكنك حجز يخت لأعياد الميلاد، الخطوبة، الذكرى السنوية والتجمعات الخاصة مع إضافة الديكور والطعام حسب الطلب.",
  },
  {
    q: "هل يجب الحجز مسبقًا؟",
    a: "نعم، يُفضل حجز اليخت مسبقًا لضمان توفر اليخت والوقت المناسب، خاصة خلال عطلات نهاية الأسبوع والمواسم.",
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
  const visibleYachts = useOverriddenProducts(yachts, "yachts");
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
          {visibleYachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      {/* Why choose yacht booking Dubai — right after products */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">لماذا تختار حجز يخت في دبي؟</h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              يمنحك <strong className="font-extrabold text-gold-deep">حجز يخت في دبي</strong> تجربة بحرية خاصة ومرنة،
              مع إمكانية اختيار اليخت والوقت والمسار والخدمات التي تناسب رحلتك أو مناسبتك.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Ship, t: "خيارات متنوعة من اليخوت", d: "تناسب عدد الضيوف والميزانية." },
              { icon: CalendarClock, t: "مرونة في الحجز", d: "واختيار الوقت ومدة الرحلة." },
              { icon: Landmark, t: "مسارات بحرية مميزة", d: "حول أشهر معالم دبي." },
              { icon: Sparkles, t: "خدمات إضافية حسب الطلب", d: "مثل الطعام، الديكور والأنشطة البحرية." },
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

      {/* Key sites — landmarks visited during booked yacht trip */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
              أهم المواقع التي يمكنك الوصول إليها عند حجز يخت في دبي
            </h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              استمتع برحلة بحرية تمر بأشهر المعالم البحرية في دبي عند حجز اليخت، مع إطلالات خلابة على أفق المدينة وأماكن
              مثالية لالتقاط الصور.
            </p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {[
              "دبي مارينا",
              "شاطئ جي بي آر (جميرا بيتش ريزيدنس)",
              "عين دبي (جزيرة بلوواترز)",
              "نخلة جميرا",
              "فندق أتلانتس بالم",
              "برج العرب",
            ].map((s, i) => (
              <Reveal key={s} delay={i * 50}>
                <li className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-luxe transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md">
                    <MapPin className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{s}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أسئلة شائعة عن حجز يخوت في دبي"
          subtitle="إليك أهم الأسئلة حول __حجز اليخوت في دبي__ لمساعدتك في معرفة الأسعار، طريقة الحجز والخدمات المتوفرة قبل رحلتك."
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
