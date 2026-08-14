import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { yachts } from "@/data/site";

export const Route = createFileRoute("/تأجير-يخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "تأجير يخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "نوفر خدمات تأجير يخوت في دبي مع رحلات خاصة، يخوت متنوعة، وأسعار تبدأ من 400 درهم للساعة لجميع المناسبات.",
      },
      { property: "og:title", content: "تأجير يخوت في دبي | توت فن لليخوت" },
      {
        property: "og:description",
        content: "أسطول متنوع من اليخوت الفاخرة للإيجار في دبي بأسعار تنافسية.",
      },
    ],
  }),
  component: YachtRental,
});

function YachtRental() {
  return (
    <>
      <PageHero
        compact
        eyebrow="تأجير يخوت"
        title="تأجير يخوت في دبي"
        subtitle="نوفر خدمات تأجير يخوت في دبي مع رحلات خاصة، يخوت متنوعة، وأسعار تبدأ من 400 درهم للساعة لجميع المناسبات."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="خدمات تأجير اليخوت الخاصة في دبي"
          subtitle="اختر من بين أفضل اليخوت الخاصة في دبي بأسعار تبدأ من 400 درهم للساعة، واستمتع برحلة فاخرة تناسب جميع المناسبات."
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
