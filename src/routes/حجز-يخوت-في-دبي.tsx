import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { BookingSteps } from "@/components/BookingSteps";
import { ContactCta } from "@/components/ContactCta";
import { Accordion } from "@/components/Accordion";
import { yachts, stepsYacht, faqs } from "@/data/site";

export const Route = createFileRoute("/حجز-يخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "حجز يخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "اكتشف أفضل خيارات حجز يخوت في دبي بأسعار تبدأ من 450 درهم للساعة، مع يخوت فاخرة ورحلات خاصة تناسب جميع المناسبات.",
      },
      { property: "og:title", content: "حجز يخوت في دبي | توت فن لليخوت" },
      {
        property: "og:description",
        content: "اكتشف أفضل خيارات حجز يخوت في دبي بأسعار تبدأ من 450 درهم للساعة، مع يخوت فاخرة ورحلات خاصة تناسب جميع المناسبات.",
      },
      { property: "og:url", content: "https://dubai-yacht.ae/حجز-يخوت-في-دبي/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/حجز-يخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/حجز-يخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/حجز-يخوت-في-دبي/" },
    ],
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
        subtitle="احجز يختك في دبي بسهولة بأسعار تبدأ من 450 درهم للساعة."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="كيف تحجز يختك في دبي"
          subtitle="ثماني خطوات بسيطة من اختيار اليخت حتى الانطلاق في رحلتك."
        />
        <BookingSteps steps={stepsYacht} />
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="أفضل خيارات حجز يخوت في دبي بأسعار تنافسية"
            subtitle="احجز يختك في دبي بسهولة بأسعار تبدأ من 450 درهم للساعة."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {yachts.map((p, i) => (
              <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading title="أسئلة شائعة عن حجز اليخوت" />
        <Accordion items={faqs} />
      </section>

      <ContactCta
        title="احجز يختك في دبي الآن"
        subtitle="تواصل معنا عبر واتساب أو الهاتف لتأكيد التوفر ودفع العربون."
      />
    </>
  );
}
