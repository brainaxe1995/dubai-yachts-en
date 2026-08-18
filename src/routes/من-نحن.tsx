import { createFileRoute } from "@tanstack/react-router";
import { Award, Compass, HeartHandshake, ShieldCheck, Sparkles, Star } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CallButton, BookButton } from "@/components/CtaButtons";
import { occasions, inclusions } from "@/data/site";
import fleetImg from "@/assets/yachts/majesty-88.webp";
import marinaImg from "@/assets/yachts/gulfcraft-90.webp";
import whatIncludedImg from "@/assets/branding/what-included.webp";

export const Route = createFileRoute("/من-نحن")({
  head: () => ({
    meta: [
      { title: "من نحن | توت فن لليخوت" },
      {
        name: "description",
        content:
          "تعرّف على من نحن في توت فن لليخوت، وخبرتنا في تقديم خدمات تأجير اليخوت والرحلات البحرية الفاخرة في دبي.",
      },
      { property: "og:title", content: "من نحن | توت فن لليخوت" },
      { property: "og:description", content: "خبرتنا في تأجير اليخوت والرحلات البحرية الفاخرة في دبي." },
      { property: "og:url", content: "https://dubai-yacht.ae/من-نحن/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/من-نحن/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/من-نحن/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/من-نحن/" },
    ],
  }),
  component: About,
});

const stats = [
  { n: "15+", l: "يخت وقارب فاخر" },
  { n: "450 د.إ", l: "تبدأ الأسعار من / الساعة" },
  { n: "24/7", l: "خدمة عملاء" },
  { n: "+1000", l: "رحلة بحرية سعيدة" },
];

const values = [
  { icon: Award, t: "خبرة موثوقة", d: "سنوات من التجربة في تنظيم الرحلات البحرية في دبي مارينا." },
  { icon: ShieldCheck, t: "أمان وترخيص", d: "جميع يخوتنا مرخّصة ومطابقة لمعايير السلامة البحرية." },
  { icon: Sparkles, t: "خدمة راقية", d: "طاقم مدرّب على تقديم تجربة ضيافة من الطراز الأول." },
  { icon: HeartHandshake, t: "شفافية كاملة", d: "أسعار واضحة بدون رسوم مخفية أو مفاجآت." },
  { icon: Compass, t: "مرونة كاملة", d: "نخصّص الرحلات والباقات حسب طلبك ومناسبتك." },
  { icon: Star, t: "تقييمات ممتازة", d: "مئات العملاء السعداء يعودون إلينا مرة بعد مرة." },
];

function About() {
  return (
    <>
      <PageHero
        compact
        eyebrow="عن الشركة"
        title="من نحن"
        subtitle="نحن فريق متخصّص في تأجير اليخوت الفاخرة والرحلات البحرية في دبي، نحرص على تقديم تجربة استثنائية تجمع بين الأمان، الفخامة، والخدمة الشخصية لكل ضيف."
      >
        <CallButton label="تواصل معنا" />
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <img
              src={fleetImg}
              alt="أسطول توت فن لليخوت في دبي"
              loading="lazy"
              width={1200}
              height={800}
              className="rounded-2xl object-cover shadow-luxe"
            />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-2xl text-foreground md:text-3xl">من نحن في توت فن لليخوت</h2>
            <p className="mt-4 text-sm leading-loose text-muted-foreground md:text-base">
              نقدّم خدمات تأجير اليخوت والرحلات البحرية الخاصة في دبي مع أسطول متنوع وطاقم محترف. نحرص على تقديم تجربة
              بحرية آمنة ومريحة تناسب جميع المناسبات، من الرحلات العائلية والجولات الخاصة إلى الحفلات ورحلات الصيد.
            </p>
            <p className="mt-3 text-sm leading-loose text-muted-foreground md:text-base">
              نؤمن بالشفافية في الأسعار ووضوح التفاصيل قبل الحجز، مع دعم متواصل على مدار الساعة لمساعدتك في اختيار اليخت
              والباقة الأنسب لك.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <BookButton />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-navy py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 80} className="text-center">
              <div className="text-2xl font-extrabold text-gold md:text-3xl">{s.n}</div>
              <div className="mt-2 text-xs text-primary-foreground/70 md:text-sm">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading title="قيمنا في كل رحلة" subtitle="خدمة احترافية، أسعار واضحة، وتجربة بحرية لا تُنسى." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1 shadow-luxe">
                <v.icon className="mb-3 h-7 w-7 text-gold-deep" />
                <h3 className="text-base font-bold text-foreground">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="مناسبات نصنع لها ذكريات لا تُنسى"
            subtitle="من عيد الميلاد إلى الزفاف، من حفلات الشركات إلى رحلات العائلة — يخوتنا مسرح مثالي لكل مناسبة تستحق البقاء في الذاكرة."
          />
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal delay={120}>
            <h2 className="text-2xl text-foreground md:text-3xl">ماذا تشمل رحلتك</h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              نتضمّن كل ما تحتاجه للاستمتاع برحلتك دون قلق — سعر واحد يشمل الطاقم، الوقود، التأمين، وضيافة أساسية.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              {inclusions.map((i) => (
                <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <img
              src={whatIncludedImg}
              alt="ماذا تشمل رحلة اليخت"
              loading="lazy"
              width={1200}
              height={800}
              className="rounded-2xl object-cover shadow-luxe"
            />
          </Reveal>
        </div>
      </section>

      <section className="surface-navy py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <Reveal>
            <img
              src={marinaImg}
              alt="يخوت في دبي مارينا"
              loading="lazy"
              width={1200}
              height={800}
              className="rounded-2xl object-cover shadow-luxe"
            />
          </Reveal>
          <Reveal delay={120} className="text-primary-foreground">
            <h2 className="text-2xl md:text-3xl">موقعنا في قلب دبي مارينا</h2>
            <p className="mt-4 text-sm leading-loose text-primary-foreground/80 md:text-base">
              تنطلق معظم رحلاتنا من دبي مارينا — أفضل نقطة انطلاق للاستمتاع بمعالم دبي البحرية: عين دبي، JBR، نخلة جميرا،
              وأتلانتس، وحتى برج العرب.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookButton />
              <CallButton />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
