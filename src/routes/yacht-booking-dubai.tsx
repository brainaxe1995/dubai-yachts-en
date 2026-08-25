import { createFileRoute } from "@tanstack/react-router";
import { Zap, MessageSquare, Ship, CalendarClock, Landmark, Sparkles, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { BookingSteps } from "@/components/BookingSteps";
import { ContactCta } from "@/components/ContactCta";
import { Accordion } from "@/components/Accordion";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { yachts, stepsYacht, faqs, keywordCloud } from "@/data/site";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import yachtBookImg from "@/assets/yachts/majesty-66.webp";
import marinaBookImg from "@/assets/yachts/sunseeker-95.webp";

const bookingFaqs = [
  {
    q: "What is the easiest way to book a yacht in Dubai?",
    a: "The fastest way is via WhatsApp — pick the yacht from the site, tap 'Book Now', and we'll confirm availability within minutes along with payment details.",
  },
  {
    q: "Can I book a yacht on the same day?",
    a: "Yes — same-day booking is available subject to yacht availability. We recommend reaching out directly on WhatsApp for the fastest confirmation and the best available option.",
  },
  {
    q: "Can I book a yacht for a private party?",
    a: "Yes, you can book a yacht for birthdays, engagements, anniversaries, and private gatherings, with decorations and food added on request.",
  },
  {
    q: "Do I need to book in advance?",
    a: "Yes, we recommend booking the yacht in advance to secure availability and your preferred time — especially on weekends and during peak seasons.",
  },
  ...faqs,
];

const bookingFeatures = [
  {
    h: "Book Your Yacht in Minutes",
    icon: Zap,
    image: yachtBookImg,
    imageAlt: "Yacht booking in Dubai",
    p: [
      "Browse our __luxury fleet__, pick the right yacht, and set the date and time. Confirm the booking with a __deposit__ via a secure payment link or WhatsApp.",
      "Once confirmed, you'll instantly receive __the boarding location__ and trip schedule via direct message.",
    ],
  },
  {
    h: "24/7 WhatsApp Support",
    icon: MessageSquare,
    image: marinaBookImg,
    imageAlt: "24/7 WhatsApp customer service",
    p: [
      "Our team is available __24/7__ on WhatsApp to answer your questions, recommend the best yacht for your occasion, and customize your package with __breakfast__, a __romantic dinner__, or __jet ski__.",
      "No long forms to fill — direct, fast contact.",
    ],
  },
];

export const Route = createFileRoute("/yacht-booking-dubai")({
  head: () => ({
    meta: [
      { title: "Yacht Booking Dubai | Toot Fun Yachts" },
      {
        name: "description",
        content:
          "Discover the best yacht booking options in Dubai at prices starting from AED 450 per hour, with luxury yachts and private trips for every occasion.",
      },
      { property: "og:title", content: "Yacht Booking Dubai | Toot Fun Yachts" },
      {
        property: "og:description",
        content:
          "Discover the best yacht booking options in Dubai at prices starting from AED 450 per hour, with luxury yachts and private trips for every occasion.",
      },
      { property: "og:url", content: "https://tootfunyachts.com/yacht-booking-dubai/" },
    ],
    links: [
      { rel: "canonical", href: "https://tootfunyachts.com/yacht-booking-dubai/" },
      { rel: "alternate", hrefLang: "en", href: "https://tootfunyachts.com/yacht-booking-dubai/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://tootfunyachts.com/yacht-booking-dubai/" },
    ],
  }),
  component: YachtBooking,
});

function YachtBooking() {
  const visibleYachts = useOverriddenProducts(yachts, "yachts");
  return (
    <>
      <PageHero
        compact
        eyebrow="Yacht Booking"
        title="Yacht Booking in Dubai"
        subtitle="Book your yacht in Dubai easily at prices starting from AED 450 per hour."
      />

      {/* Products first */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Best Yacht Booking Options in Dubai at Competitive Prices"
          subtitle="Book your yacht in Dubai easily at prices starting from AED 450 per hour."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleYachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      {/* Why choose yacht booking Dubai — right after products */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">Why Choose Yacht Booking in Dubai?</h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <strong className="font-extrabold text-gold-deep">Yacht booking in Dubai</strong> gives you a private, flexible
              sea experience — with the ability to pick the yacht, timing, route, and services that fit your trip or
              occasion.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Ship, t: "Diverse Yacht Options", d: "To fit your guest count and budget." },
              { icon: CalendarClock, t: "Flexible Booking", d: "Pick your time and trip duration." },
              { icon: Landmark, t: "Stunning Marine Routes", d: "Around Dubai's most iconic landmarks." },
              { icon: Sparkles, t: "Add-On Services on Demand", d: "Food, decorations, and water activities." },
            ].map((it, i) => (
              <Reveal key={it.t} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-border bg-card p-5 shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
                  <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <it.icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <h3 className="text-base font-bold text-foreground">{it.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* New rich section after products */}
      <section className="bg-gradient-to-b from-muted via-background to-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="Booking with Toot Fun — Fast and Transparent"
            subtitle="Everything you need to know about the steps to book your yacht in Dubai, from choosing to setting sail."
          />
          <FeatureBlocks blocks={bookingFeatures} />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="How to Book Your Yacht in Dubai"
          subtitle="Eight simple steps, from choosing the yacht to starting your trip."
        />
        <BookingSteps steps={stepsYacht} />
      </section>

      {/* Key sites — landmarks visited during booked yacht trip */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
              Top Sites You Can Reach When Booking a Yacht in Dubai
            </h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Enjoy a sea trip passing Dubai's most iconic marine landmarks when you book your yacht, with breathtaking
              views of the city skyline and ideal spots for photos.
            </p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {[
              "Dubai Marina",
              "JBR Beach (Jumeirah Beach Residence)",
              "Ain Dubai (Bluewaters Island)",
              "Palm Jumeirah",
              "Atlantis The Palm",
              "Burj Al Arab",
            ].map((s, i) => (
              <Reveal key={s} delay={i * 50}>
                <li className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-luxe transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md">
                    <MapPin className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{s}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="Frequently Asked Questions About Yacht Booking in Dubai"
          subtitle="Here are the top questions about __yacht booking in Dubai__ to help you understand prices, how to book, and the services available before your trip."
        />
        <Accordion items={bookingFaqs} />
      </section>

      <ContactCta
        title="Book Your Yacht in Dubai Now"
        subtitle="Reach out via WhatsApp or phone to confirm availability and pay the deposit."
      />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Searches for Yachts and Sea Trips in Dubai"
          subtitle="Discover the most-searched keywords about yacht booking in Dubai."
        />
        <KeywordCloud
          items={
            keywordCloud["/yacht-rental-dubai/"]
              .slice(0, 8)
              .map((k) => ({ keyword: k, to: "/yacht-booking-dubai/" }))
          }
        />
      </section>
    </>
  );
}
