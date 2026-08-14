import { createFileRoute } from "@tanstack/react-router";
import { Coffee, Sparkles, Waves, Gift } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { faqSchema, breadcrumbSchema } from "@/components/SeoJsonLd";
import { packages, extras, stepsPackage } from "@/data/site";
import packagesImg from "@/assets/packages/romantic-dinner.png";

const pkgFaqs = [
  { q: "ما الفرق بين الباقة والحجز العادي؟", a: "الباقة تشمل الرحلة + وجبة/تجربة معينة (إفطار، عشاء، جيت سكي) بسعر ثابت. الحجز العادي هو تأجير اليخت فقط بالساعة، وأنت تختار الإضافات." },
  { q: "هل يمكن تخصيص الباقة حسب طلبي؟", a: "نعم — نصمّم باقات مخصّصة لأي مناسبة. تواصل معنا بتفاصيل احتياجاتك ونرسل عرضًا سعرًا خلال ساعات." },
  { q: "هل الأطعمة في الباقات حلال؟", a: "جميع أطعمتنا حلال 100%. نتعامل مع مطاعم موثوقة معتمدة في دبي." },
  { q: "متى أفضل وقت لباقة الإفطار؟", a: "7-11 صباحًا — تحصل على شروق الشمس، طقس منعش، وهدوء تام قبل ازدحام المارينا." },
  { q: "كم مدة باقة العشاء الرومانسي؟", a: "ساعتان — كافيتان لتقديم 5 أطباق مع وقت للاستمتاع بالغروب والحديث." },
  { q: "هل يمكن إضافة الجيت سكي لأي باقة؟", a: "نعم، جميع باقاتنا قابلة لإضافة جيت سكي (300 د.إ / نصف ساعة) أو بانانا بوت." },
];

const pkgHighlights = [
  { icon: Coffee, t: "باقة إفطار", d: "ابدأ يومك بإطلالة مارينا وإفطار عربي فاخر (3,000 د.إ / 4 ساعات)." },
  { icon: Waves, t: "باقة جيت سكي", d: "اجمع بين اليخت ومغامرة الجيت سكي في تجربة واحدة (2,300 د.إ / 4 ساعات)." },
  { icon: Sparkles, t: "عشاء رومانسي", d: "ليلة مثالية للأزواج مع 5 أطباق وديكور خاص (1,800 د.إ / ساعتين)." },
];

export const Route = createFileRoute("/باقات-تأجير-اليخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "باقات تأجير اليخوت في دبي | إفطار وعشاء — توت فن" },
      {
        name: "description",
        content:
          "اكتشف أفضل باقات تأجير اليخوت في دبي بخيارات متنوعة تناسب الرحلات الخاصة، الحفلات والمناسبات بأسعار مرنة تبدأ من 1,800 د.إ.",
      },
      { name: "keywords", content: "باقات يخوت دبي, باقة إفطار يخت, عشاء رومانسي يخت, باقة جيت سكي, عروض اليخوت دبي" },
      { property: "og:title", content: "أفضل باقات تأجير اليخوت في دبي | توت فن لليخوت" },
      { property: "og:description", content: "باقات إفطار، عشاء رومانسي، وجيت سكي على متن اليخت في دبي." },
      { property: "og:url", content: "https://dubai-yacht.ae/باقات-تأجير-اليخوت-في-دبي" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/باقات-تأجير-اليخوت-في-دبي" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/باقات-تأجير-اليخوت-في-دبي" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/باقات-تأجير-اليخوت-في-دبي" },
    ],
    scripts: [
      faqSchema(pkgFaqs),
      breadcrumbSchema([
        { name: "الرئيسية", url: "https://dubai-yacht.ae/" },
        { name: "باقات اليخوت", url: "https://dubai-yacht.ae/باقات-تأجير-اليخوت-في-دبي" },
      ]),
    ],
  }),
  component: Packages,
});

function Packages() {
  return (
    <>
      <PageHero
        compact
        image={packagesImg}
        eyebrow="العروض"
        title="باقات تأجير اليخوت في دبي"
        subtitle="اكتشف أفضل باقات تأجير اليخوت في دبي بخيارات متنوعة تناسب الرحلات الخاصة، الحفلات والمناسبات، مع أسعار مرنة."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Reveal className="text-center">
          <h2 className="text-2xl text-foreground md:text-3xl">باقات جاهزة توفّر عليك الوقت والسعر</h2>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
          <p className="mt-6 text-start text-sm leading-loose text-muted-foreground md:text-base">
            بدلاً من ترتيب كل تفصيل بنفسك، صمّمت توت فن مجموعة من <strong>باقات تأجير اليخوت في دبي</strong> جاهزة
            لمناسبات محدّدة — من إفطار صباحي هادئ إلى عشاء رومانسي، إلى مغامرة جيت سكي. كل باقة تشمل اليخت، الطاقم،
            الطعام، والإضافات — سعر واحد شفاف بدون مفاجآت.
          </p>
          <p className="mt-4 text-start text-sm leading-loose text-muted-foreground md:text-base">
            تنطلق جميع باقاتنا من دبي مارينا، مع مرونة كاملة في اختيار الموعد. الباقات مثالية للأزواج، العائلات،
            المسافرين الذين يريدون تجربة مميزة بدون تخطيط طويل، أو من يريد هدية استثنائية لشخص عزيز.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <SectionHeading title="أشهر باقاتنا" subtitle="ثلاث باقات مختارة بعناية." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pkgHighlights.map((h, i) => (
            <Reveal key={h.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe transition-transform hover:-translate-y-1">
                <h.icon className="mb-3 h-8 w-8 text-gold-deep" />
                <h3 className="text-lg font-bold text-primary">{h.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="باقات مختارة لتجربة بحرية مميزة" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p, i) => (
              <ProductCard key={p.title} product={p} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="إضافات حجز اليخوت في دبي"
          subtitle="خصّص رحلتك بإضافات مميزة من الطعام، الحلويات، الديكورات، الرياضات المائية، والمزيد."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {extras.map((e, i) => (
            <Reveal key={e.label} delay={i * 40}>
              <div className="group h-full overflow-hidden rounded-xl border border-border bg-card shadow-luxe transition-transform hover:-translate-y-1">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={e.image}
                    alt={e.label}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="text-xs font-bold text-foreground md:text-sm">{e.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="كيف تحجز باقة يخت في دبي"
            subtitle="خطوات بسيطة لاختيار وحجز باقة اليخت المناسبة لك."
          />
          <BookingSteps steps={stepsPackage} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
              <Gift className="mb-3 h-8 w-8 text-gold-deep" />
              <h2 className="text-xl font-bold text-foreground">هدية استثنائية</h2>
              <p className="mt-3 text-sm leading-loose text-muted-foreground">
                هل تبحث عن هدية لعزيز؟ باقاتنا خيار مميز لعيد الميلاد، الذكرى السنوية، أو حتى تخرج صديق. نوفّر
                قسائم هدايا رقمية مع تصميم أنيق ورسالة شخصية.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
              <Sparkles className="mb-3 h-8 w-8 text-gold-deep" />
              <h2 className="text-xl font-bold text-foreground">باقات مخصّصة</h2>
              <p className="mt-3 text-sm leading-loose text-muted-foreground">
                لا تجد ما يناسبك؟ صمّم باقتك الخاصة — اختر اليخت، المدة، الوجبة، الإضافات. نرسل لك عرض سعر شفاف
                خلال ساعات.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading title="أسئلة شائعة عن باقات اليخوت" />
        <Accordion items={pkgFaqs} />
      </section>

      <ContactCta
        title="جاهز لتجربة باقة يخت مميزة؟"
        subtitle="تواصل معنا لحجز باقتك أو تخصيص واحدة حسب طلبك."
      />
    </>
  );
}
