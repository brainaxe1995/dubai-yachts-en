import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { yachts } from "@/data/site";

export const Route = createFileRoute("/تأجير-يخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "تأجير يخوت في دبي | أسطول اليخوت والأسعار – توت فن" },
      {
        name: "description",
        content:
          "نوفر خدمات تأجير يخوت في دبي مع رحلات خاصة، يخوت متنوعة، وأسعار تبدأ من 400 درهم للساعة لجميع المناسبات.",
      },
      { property: "og:title", content: "تأجير يخوت في دبي | أسطول اليخوت والأسعار – توت فن" },
      {
        property: "og:description",
        content: "أسطول متنوع من اليخوت الفاخرة للإيجار في دبي بأسعار تنافسية.",
      },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/تأجير-يخوت-في-دبي" },
    ],
    links: [
      { rel: "canonical", href: "https://doc-whisperer-750.lovable.app/تأجير-يخوت-في-دبي" },
      { rel: "alternate", hreflang: "ar", href: "https://doc-whisperer-750.lovable.app/تأجير-يخوت-في-دبي" },
      { rel: "alternate", hreflang: "x-default", href: "https://doc-whisperer-750.lovable.app/تأجير-يخوت-في-دبي" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "أسطول اليخوت للإيجار في دبي",
          itemListElement: yachts.map((y, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: y.title,
              serviceType: "تأجير يخوت",
              areaServed: "Dubai, United Arab Emirates",
              provider: { "@type": "Organization", name: "توت فن لليخوت" },
            },
          })),
        }),
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
