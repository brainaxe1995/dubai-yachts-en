import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { yachts } from "@/data/site";

export const Route = createFileRoute("/إيجار-يخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "إيجار يخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "نوفر خدمات إيجار يخوت في دبي بأسعار تنافسية تبدأ من 400 درهم للساعة، مع أسطول متنوع وخيارات مناسبة للرحلات الخاصة والمناسبات.",
      },
      { property: "og:title", content: "إيجار يخوت في دبي | توت فن لليخوت" },
      {
        property: "og:description",
        content: "نوفر خدمات إيجار يخوت في دبي بأسعار تنافسية تبدأ من 400 درهم للساعة، مع أسطول متنوع وخيارات مناسبة للرحلات الخاصة والمناسبات.",
      },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/إيجار-يخوت-في-دبي" },
    ],
    links: [
      { rel: "canonical", href: "https://doc-whisperer-750.lovable.app/إيجار-يخوت-في-دبي" },
      { rel: "alternate", hreflang: "ar", href: "https://doc-whisperer-750.lovable.app/إيجار-يخوت-في-دبي" },
      { rel: "alternate", hreflang: "x-default", href: "https://doc-whisperer-750.lovable.app/إيجار-يخوت-في-دبي" },
    ],
  }),
  component: RentYacht,
});

function RentYacht() {
  return (
    <>
      <PageHero
        compact
        eyebrow="إيجار يخوت"
        title="إيجار يخوت في دبي"
        subtitle="نوفر خدمات إيجار يخوت في دبي بأسعار تنافسية تبدأ من 400 درهم للساعة، مع أسطول متنوع وخيارات مناسبة للرحلات الخاصة والمناسبات."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أسطولنا من اليخوت الفاخرة"
          subtitle="اختر من أسطولنا المتنوع من اليخوت الفاخرة المتاحة للإيجار في دبي لجميع الرحلات والمناسبات."
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
