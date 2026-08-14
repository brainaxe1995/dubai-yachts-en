import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { yachts } from "@/data/site";

export const Route = createFileRoute("/يخوت-للإيجار-في-دبي")({
  head: () => ({
    meta: [
      { title: "يخوت للإيجار في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "اكتشف أفضل يخوت للإيجار في دبي بأسعار تبدأ من 400 درهم للساعة، مع رحلات خاصة وخيارات تناسب جميع المناسبات.",
      },
      { property: "og:title", content: "يخوت للإيجار في دبي | توت فن لليخوت" },
      {
        property: "og:description",
        content: "اكتشف أفضل يخوت للإيجار في دبي بأسعار تبدأ من 400 درهم للساعة، مع رحلات خاصة وخيارات تناسب جميع المناسبات.",
      },
    ],
  }),
  component: YachtsForRent,
});

function YachtsForRent() {
  return (
    <>
      <PageHero
        compact
        eyebrow="الأسطول"
        title="يخوت للإيجار في دبي"
        subtitle="اختر من مجموعة متنوعة من اليخوت للإيجار في دبي بأسعار تبدأ من 400 درهم للساعة."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="جميع اليخوت المتاحة للإيجار في دبي"
          subtitle="اختر من مجموعة متنوعة من اليخوت الفاخرة المتاحة للإيجار في دبي، بمقاسات وأسعار تناسب الرحلات الخاصة وجميع المناسبات."
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
