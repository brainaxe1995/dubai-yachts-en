import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { parties } from "@/data/site";
import partyImg from "@/assets/party.jpg";

export const Route = createFileRoute("/حفلات-اليخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "أفضل حفلات اليخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "احجز حفلات اليخوت في دبي للمناسبات وأعياد الميلاد مع يخوت فاخرة، ديكورات مميزة، طاقم محترف، وباقات خاصة بأسعار تنافسية.",
      },
      { property: "og:title", content: "أفضل حفلات اليخوت في دبي | توت فن لليخوت" },
      { property: "og:description", content: "حفلات زفاف، خطوبة، تخرج وأعياد ميلاد على متن يخت في دبي." },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/حفلات-اليخوت-في-دبي" },
    ],
    links: [{ rel: "canonical", href: "https://doc-whisperer-750.lovable.app/حفلات-اليخوت-في-دبي" }],
  }),
  component: Parties,
});

function Parties() {
  return (
    <>
      <PageHero
        compact
        image={partyImg}
        eyebrow="حفلات اليخوت"
        title="حفلات اليخوت في دبي"
        subtitle="استمتع بأفضل حفلات اليخوت في دبي مع يخوت فاخرة، رحلات خاصة، وخيارات مثالية لأعياد الميلاد والمناسبات."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="باقات لجميع حفلات اليخوت في دبي"
          subtitle="اختر نوع الحفلة التي تناسب ميزانيتك واحتفل على متن يخت في دبي."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parties.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>
    </>
  );
}
