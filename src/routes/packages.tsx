import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { packages, extras } from "@/data/site";
import packagesImg from "@/assets/packages.jpg";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "أفضل باقات تأجير اليخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "اكتشف أفضل باقات تأجير اليخوت في دبي بخيارات متنوعة تناسب الرحلات الخاصة، الحفلات والمناسبات بأسعار مرنة.",
      },
      { property: "og:title", content: "أفضل باقات تأجير اليخوت في دبي | توت فن لليخوت" },
      { property: "og:description", content: "باقات إفطار، عشاء رومانسي، وجيت سكي على متن اليخت في دبي." },
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
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading title="باقات مختارة لتجربة بحرية مميزة" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={i * 80} />
          ))}
        </div>
      </section>
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title="إضافات حجز اليخوت في دبي" />
          <div className="flex flex-wrap justify-center gap-3">
            {extras.map((e, i) => (
              <Reveal key={e} delay={i * 40}>
                <span className="rounded-full border border-gold/40 bg-card px-5 py-2.5 text-sm font-semibold text-foreground">
                  {e}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
