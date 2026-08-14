import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, ShieldCheck, Users, Headphones } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookButton, CallButton } from "@/components/CtaButtons";
import { yachts, faqs, steps, extras } from "@/data/site";
import partyImg from "@/assets/party.jpg";
import fishingImg from "@/assets/fishing.jpg";
import packagesImg from "@/assets/packages.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "تأجير يخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "استمتع بخدمة تأجير يخوت في دبي مع يخوت فاخرة، أسعار تنافسية، رحلات خاصة، وطاقم محترف لجميع المناسبات. احجز يختك الآن.",
      },
      { property: "og:title", content: "تأجير يخوت في دبي | توت فن لليخوت" },
      {
        property: "og:description",
        content: "يخوت فاخرة للإيجار في دبي بأسعار تبدأ من 400 درهم للساعة.",
      },
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
  { to: "/حفلات-اليخوت-في-دبي", img: partyImg, t: "حفلات اليخوت في دبي", d: "أعياد ميلاد، خطوبة، زفاف وتخرج على متن يخت فاخر." },
  { to: "/رحلات-صيد-السمك-في-دبي", img: fishingImg, t: "رحلات صيد السمك", d: "رحلات خاصة ومشتركة مع قوارب مجهزة وطاقم محترف." },
  { to: "/باقات-تأجير-اليخوت-في-دبي", img: packagesImg, t: "باقات وعروض اليخوت", d: "إفطار، عشاء رومانسي، وجيت سكي ضمن باقات مميزة." },
] as const;

function Home() {
  return (
    <>
      <PageHero
        eyebrow="رحلة بحرية لا تُنسى"
        title="تأجير يخوت في دبي مع توت فن"
        subtitle="استمتع بأفضل خدمات تأجير اليخوت في دبي مع رحلات خاصة، أسعار مميزة، ويخوت فاخرة لجميع المناسبات."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أفضل اليخوت للإيجار في دبي بأسعار تنافسية"
          subtitle="اختر من مجموعة متنوعة من أفضل اليخوت للإيجار في دبي بأسعار تنافسية تبدأ من 400 درهم للساعة."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {yachts.slice(0, 6).map((p, i) => (
            <ProductCard key={p.title} product={p} delay={i * 70} />
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            to="/تأجير-يخوت-في-دبي"
            className="inline-flex rounded-full border border-primary/20 px-7 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            تصفح كل اليخوت
          </Link>
        </Reveal>
      </section>

      <section className="surface-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
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

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
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

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
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

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="إضافات حجز اليخوت في دبي"
          subtitle="أضف لمسة خاصة على رحلتك مع خدماتنا الإضافية."
        />
        <div className="flex flex-wrap justify-center gap-3">
          {extras.map((e, i) => (
            <Reveal key={e} delay={i * 40}>
              <span className="rounded-full border border-gold/40 bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
                {e}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading title="أسئلة شائعة حول تأجير اليخوت في دبي" />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group rounded-2xl border border-border bg-card p-5">
                <summary className="cursor-pointer list-none text-base font-bold text-foreground marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="surface-navy py-16">
        <Reveal className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl text-primary-foreground md:text-3xl">أسعار تأجير اليخوت في دبي مارينا</h2>
          <p className="mt-4 text-sm text-primary-foreground/70">
            احجز يختك الآن واستفد من أفضل عروض تأجير اليخوت في دبي.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <BookButton />
            <CallButton />
          </div>
        </Reveal>
      </section>
    </>
  );
}
