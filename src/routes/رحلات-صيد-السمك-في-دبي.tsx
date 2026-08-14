import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { fishingTrips } from "@/data/site";
import fishingImg from "@/assets/fishing.jpg";

export const Route = createFileRoute("/رحلات-صيد-السمك-في-دبي")({
  head: () => ({
    meta: [
      { title: "أفضل رحلات صيد السمك في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "احجز أفضل رحلات صيد السمك في دبي مع قوارب مجهزة، معدات صيد، طاقم محترف، وخيارات خاصة أو مشتركة بأسعار مميزة.",
      },
      { property: "og:title", content: "أفضل رحلات صيد السمك في دبي | توت فن لليخوت" },
      { property: "og:description", content: "رحلات صيد خاصة ومشتركة في دبي مع تجهيزات كاملة." },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/رحلات-صيد-السمك-في-دبي" },
    ],
    links: [{ rel: "canonical", href: "https://doc-whisperer-750.lovable.app/رحلات-صيد-السمك-في-دبي" }],
  }),
  component: Fishing,
});

function Fishing() {
  return (
    <>
      <PageHero
        compact
        image={fishingImg}
        eyebrow="رحلات الصيد"
        title="رحلات صيد السمك في دبي"
        subtitle="اكتشف أفضل رحلات صيد السمك في دبي مع قوارب مجهزة، طاقم محترف، وتجربة بحرية ممتعة."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أفضل خيارات رحلات صيد السمك في دبي"
          subtitle="اختر من بين رحلات الصيد الخاصة والمشتركة مع قوارب مجهزة وطاقم محترف."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fishingTrips.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={i * 80} />
          ))}
        </div>
      </section>
    </>
  );
}
