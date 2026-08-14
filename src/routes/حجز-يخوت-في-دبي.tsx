import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { yachts } from "@/data/site";

export const Route = createFileRoute("/حجز-يخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "حجز يخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "اكتشف أفضل خيارات حجز يخوت في دبي بأسعار تبدأ من 400 درهم للساعة، مع يخوت فاخرة ورحلات خاصة تناسب جميع المناسبات.",
      },
      { property: "og:title", content: "حجز يخوت في دبي | توت فن لليخوت" },
      {
        property: "og:description",
        content: "اكتشف أفضل خيارات حجز يخوت في دبي بأسعار تبدأ من 400 درهم للساعة، مع يخوت فاخرة ورحلات خاصة تناسب جميع المناسبات.",
      },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/حجز-يخوت-في-دبي" },
    ],
    links: [{ rel: "canonical", href: "https://doc-whisperer-750.lovable.app/حجز-يخوت-في-دبي" }],
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
        subtitle="احجز يختك في دبي بسهولة بأسعار تبدأ من 400 درهم للساعة."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أفضل خيارات حجز يخوت في دبي بأسعار تنافسية"
          subtitle="احجز يختك في دبي بسهولة بأسعار تبدأ من 400 درهم للساعة."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {yachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>
    </>
  );
}
