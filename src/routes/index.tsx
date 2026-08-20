import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, ShieldCheck, Users, Headphones } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { Testimonials } from "@/components/Testimonials";
import { KeywordCloud } from "@/components/KeywordCloud";
import { ExtrasMarquee } from "@/components/ExtrasMarquee";
import { ContactCta } from "@/components/ContactCta";
import {
  yachts,
  faqs,
  steps,
  extras,
  inclusions,
  destinations,
  testimonials,
  keywordCloudFlat,
} from "@/data/site";
import partyImg from "@/assets/parties/wedding.webp";
import fishingImg from "@/assets/fishing/shared.webp";
import packagesImg from "@/assets/packages/romantic-dinner.webp";
import whatIncludedImg from "@/assets/branding/what-included.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "تأجير يخوت في دبي | أفضل الأسعار - توت فن لليخوت" },
      {
        name: "description",
        content:
          "استمتع بخدمة تأجير يخوت في دبي مع يخوت فاخرة، أسعار تنافسية، رحلات خاصة، وطاقم محترف لجميع المناسبات. احجز يختك الآن.",
      },
      { property: "og:title", content: "تأجير يخوت في دبي | أفضل الأسعار - توت فن لليخوت" },
      {
        property: "og:description",
        content:
          "استمتع بخدمة تأجير يخوت في دبي مع يخوت فاخرة، أسعار تنافسية، رحلات خاصة، وطاقم محترف لجميع المناسبات. احجز يختك الآن.",
      },
      { property: "og:url", content: "https://dubai-yacht.ae/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/" },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Anchor, t: "يخوت فاخرة", d: "مجموعة واسعة من أفخم اليخوت للإيجار في دبي" },
  { icon: ShieldCheck, t: "أمان وراحة", d: "معايير أمان عالية وخدمة مميزة" },
  { icon: Users, t: "طاقم محترف", d: "طاقم مدرب لتقديم أفضل خدمة" },
  { icon: Headphones, t: "دعم 24/7", d: "خدمة عملاء متاحة على مدار الساعة" },
];

const services = [
  { to: "/حفلات-اليخوت-في-دبي/", img: partyImg, t: "حفلات اليخوت في دبي", d: "أعياد ميلاد، خطوبة، زفاف وتخرج على متن يخت فاخر." },
  { to: "/رحلات-صيد-السمك-في-دبي/", img: fishingImg, t: "رحلات صيد السمك", d: "رحلات خاصة ومشتركة مع قوارب مجهزة وطاقم محترف." },
  { to: "/باقات-تأجير-اليخوت-في-دبي/", img: packagesImg, t: "باقات وعروض اليخوت", d: "إفطار، عشاء رومانسي، وجيت سكي ضمن باقات مميزة." },
] as const;

function Home() {
  return (
    <>
      <PageHero
        eyebrow="رحلة بحرية لا تُنسى"
        title="تأجير يخوت في دبي مع توت فن"
        subtitle="استمتع بأفضل خدمات تأجير اليخوت في دبي مع رحلات خاصة، أسعار مميزة، ويخوت فاخرة لجميع المناسبات."
      />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="أفضل اليخوت للإيجار في دبي بأسعار تنافسية"
          subtitle="اختر من مجموعة متنوعة من أفضل اليخوت للإيجار في دبي بأسعار تنافسية تبدأ من 450 درهم للساعة."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {yachts.slice(0, 6).map((p, i) => (
            <ProductCard key={p.title} product={p} delay={i * 70} />
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            to="/تأجير-يخوت-في-دبي/"
            className="inline-flex rounded-full border border-primary/20 px-7 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            اكتشف المزيد
          </Link>
        </Reveal>
      </section>

      <section className="surface-navy py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-2xl text-primary-foreground md:text-3xl">
              لماذا تختار <span className="text-gold-gradient">توت فن</span> لتأجير اليخوت في دبي؟
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70 md:text-base">
              تتميز توت فن بخدمة احترافية، يخوت متنوعة، أسعار واضحة، وطاقم متمرس لتجربة بحرية مريحة ومميزة في دبي.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <div className="h-full rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center transition-colors hover:border-gold/50">
                  <f.icon className="mx-auto mb-4 h-8 w-8 text-gold" />
                  <h3 className="text-base text-primary-foreground">{f.t}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/65">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="خدمات توت فن لتأجير اليخوت في دبي"
          subtitle="اكتشف خدمات توت فن المتنوعة لتأجير اليخوت في دبي."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <Link
                to={s.to}
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-luxe"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.t}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-gold-deep">اكتشف الآن ←</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cv-auto bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="كيف تحجز يختك في دبي؟"
            subtitle="ثماني خطوات بسيطة تفصلك عن رحلة بحرية فاخرة."
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-5">
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-secondary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="text-base text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="إضافات حجز اليخوت في دبي"
          subtitle="خصّص تجربتك بإضافات مميزة — من الكيك والحلويات إلى الرياضات المائية والتصوير الاحترافي. مرّر بمؤشر الفأرة لإيقاف الحركة."
        />
        <ExtrasMarquee items={extras} />
      </section>

      <section className="cv-auto surface-navy py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            onDark
            title="أشهر الوجهات البحرية في دبي"
            subtitle="استمتع برحلة بحرية مميزة واكتشف أشهر الوجهات البحرية في دبي، من دبي مارينا وJBR إلى نخلة جميرا وأتلانتس وبرج العرب."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <Reveal key={d.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
                  <h3 className="text-base text-primary-foreground">{d.t}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70">{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-auto bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-2xl text-foreground md:text-3xl">ماذا تشمل رحلتك على متن اليخت</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              استمتع برحلة يخت في دبي تشمل الطاقم، الوقود، معدات السلامة والمشروبات، مع خيارات إضافية حسب رغبتك.
            </p>
            <span className="mx-auto mt-5 block h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
          </Reveal>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20">
                <img
                  src={whatIncludedImg}
                  alt="ماذا تشمل رحلة اليخت — كابتن، طاقم، وقود، تأمين، مشروبات وضيافة"
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ul className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                {inclusions.map((i) => (
                  <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {i}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أسئلة شائعة حول تأجير اليخوت في دبي"
          subtitle="اكتشف أهم الإجابات حول تأجير اليخوت في دبي، بما في ذلك الأسعار، الحجز، المدة، الخدمات المتوفرة، وما تحتاج معرفته قبل رحلتك."
        />
        <Accordion items={faqs} />
      </section>

      {/* Customer reviews */}
      <section className="cv-auto bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="ماذا يقول ضيوفنا؟"
            subtitle="اكتشف آراء ضيوفنا حول تجارب تأجير اليخوت في دبي، من الرحلات الخاصة والاحتفالات إلى أجمل اللحظات على متن اليخت."
          />
          <Testimonials items={testimonials} />
        </div>
      </section>

      <ContactCta
        title="جاهز للإبحار في دبي؟"
        subtitle="احجز يختك الآن واستفد من أفضل عروض تأجير اليخوت في دبي مارينا."
      />

      {/* Keyword cloud — LAST section (matches other pages) */}
      <section className="cv-auto mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="أشهر عمليات البحث عن اليخوت والرحلات البحرية في دبي"
          subtitle="اكتشف أكثر عمليات البحث شيوعًا حول تأجير اليخوت والرحلات البحرية في دبي للوصول بسرعة إلى الخدمة أو التجربة التي تناسبك."
        />
        <KeywordCloud items={keywordCloudFlat} />
      </section>
    </>
  );
}
