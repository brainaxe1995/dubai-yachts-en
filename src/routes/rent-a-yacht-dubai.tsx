import { createFileRoute } from "@tanstack/react-router";
import { Anchor, BadgeCheck, Clock, ShieldCheck, Ship, Users } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { YachtEssentialsTabs } from "@/components/YachtEssentialsTabs";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { yachts, faqs, keywordCloud } from "@/data/site";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import pageHero from "@/assets/heroes/rent-a-yacht-dubai.webp";
import fleetImg from "@/assets/page-sections/rent-a-yacht-dubai/rent-a-yacht-dubai-fleet-showcase.webp";
import guestGroupsImg from "@/assets/page-sections/rent-a-yacht-dubai/rent-a-yacht-dubai-guest-groups.webp";

const rentFaqs = [
  {
    q: "How much does rent yacht in Dubai cost?",
    a: "__Yacht rental prices in Dubai__ vary based on the yacht size, guest count, trip duration, and selected services. Prices start from __AED 450__ per hour and increase depending on the yacht type and additional services.",
  },
  {
    q: "What is the difference between a private and shared yacht hire?",
    a: "A private hire dedicates the entire yacht and crew to you with full privacy and a flexible route. A shared hire places you with other passengers at a lower per-person price and is usually a fishing trip or event ticket.",
  },
  ...faqs,
];

const rentalRichBlocks = [
  {
    h: "Why Hire a Private Yacht in Dubai with Toot Fun?",
    icon: Ship,
    image: fleetImg,
    imageAlt: "Private yacht hire in Dubai",
    p: [
      "We own one of the largest __yacht hire fleets in Dubai__ — 15 luxury yachts from __Majesty__, __Azimut__, __Sunseeker__, __Ferretti__, and __Gulf Craft__.",
      "Our fleet ranges from a __40-ft mini yacht__ (AED 450 / hour) up to a __105-ft corporate yacht__ (AED 3,000 / hour), with all-inclusive pricing — no hidden fees.",
    ],
  },
  {
    h: "Who Are Yacht Hire Trips For?",
    icon: Users,
    image: guestGroupsImg,
    imageAlt: "Who yacht hire in Dubai suits",
    p: [
      "Our services are designed for __families__, __friends__, __corporate events__, __birthday and wedding parties__, __romantic marriage proposals__, and __tourists__ seeking an authentic sea experience in Dubai.",
      "We'll recommend the ideal yacht for your guest count and occasion when you reach out.",
    ],
  },
];

export const Route = createFileRoute("/rent-a-yacht-dubai")({
  head: () => ({
    meta: [
      { title: "Rent a Yacht Dubai | Toot Fun Yachts" },
      {
        name: "description",
        content:"Rent a Yacht Dubai with Toot Fun Yachts from AED 450 per hour. Choose from luxury yachts, private cruises, professional crew, and flexible options.",
      },
      { property: "og:title", content: "Rent a Yacht Dubai | Toot Fun Yachts" },
      {
        property: "og:description",
        content:
          "Rent a Yacht Dubai with Toot Fun Yachts from AED 450 per hour. Choose from luxury yachts, private cruises, professional crew, and flexible options.",
      },
      { property: "og:url", content: "https://dubai-yachts.ae/rent-a-yacht-dubai/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yachts.ae/rent-a-yacht-dubai/" },
      { rel: "alternate", hrefLang: "en", href: "https://dubai-yachts.ae/rent-a-yacht-dubai/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yachts.ae/rent-a-yacht-dubai/" },
    ],
  }),
  component: RentYacht,
});

const reasons = [
  { icon: BadgeCheck, t: "Diverse Fleet", d: "From 40 ft to 105 ft — yachts for every occasion and budget." },
  { icon: Clock, t: "Flexible Duration", d: "Book from one hour up to a full day, as you prefer." },
  { icon: ShieldCheck, t: "Guaranteed Safety", d: "All yachts are fully licensed, insured, and staffed with trained crew." },
  { icon: Anchor, t: "Departing from Dubai Marina", d: "A central location close to Dubai's top marine landmarks." },
];

const fleetGroups = [
  { size: "Small (40–55 ft)", price: "From AED 450 / hour", guests: "2 – 18 guests", best: "Small and family trips" },
  { size: "Medium (66–80 ft)", price: "From AED 800 / hour", guests: "20 – 35 guests", best: "Parties and private events" },
  { size: "Large (88–105 ft)", price: "From AED 1,300 / hour", guests: "40 – 90 guests", best: "Corporate events and weddings" },
];

function RentYacht() {
  const visibleYachts = useOverriddenProducts(yachts, "yachts");
  return (
    <>
      <PageHero
        compact
        image={pageHero}
        eyebrow="Rent a Yacht"
        title="Rent a Yacht Dubai"
        subtitle="Rent a yacht in Dubai at competitive prices starting from AED 450 per hour, with a diverse fleet and flexible options for private trips and special occasions."
      />

      {/* Products first */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Our Luxury Yacht Fleet"
          subtitle="Choose from our diverse fleet of luxury yachts available for rent in Dubai for private trips and all special occasions."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleYachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      {/* New rich visual after products */}
      <section className="bg-gradient-to-b from-background via-muted to-background py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="Yacht Rent Dubai Guide"
            subtitle="Everything you need to know before hiring a yacht in Dubai — from the fleet to the groups our trips suit best."
          />
          <FeatureBlocks blocks={rentalRichBlocks} />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Why Hire a Yacht in Dubai with Toot Fun?"
          subtitle="__Yacht hire in Dubai__ with Toot Fun gives you a private sea experience with diverse yacht options and professional service that helps you choose the right trip for your guest count, occasion, and budget."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 text-center shadow-luxe transition-transform hover:-translate-y-1">
                <r.icon className="mx-auto mb-3 h-7 w-7 text-gold-deep" />
                <h3 className="text-base font-bold text-foreground">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading title="Yacht Sizes Available for Hire" subtitle="Pick the right size for your guest count and occasion type." />
          <div className="grid gap-5 md:grid-cols-3">
            {fleetGroups.map((g, i) => (
              <Reveal key={g.size} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe">
                  <h3 className="text-lg font-bold text-primary">{g.size}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Price:</span> {g.price}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Capacity:</span> {g.guests}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Best for:</span> {g.best}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <YachtEssentialsTabs />

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading
          title="Frequently Asked Questions About Rent a Yacht Dubai"
          subtitle="Learn the top FAQs about __yacht hire in Dubai__ covering prices, booking, services, and what you need to know before your trip."
        />
        <Accordion items={rentFaqs} />
      </section>

      <ContactCta />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Searches for Yachts and Sea Trips in Dubai"
          subtitle="Discover the most-searched keywords about yacht hire in Dubai."
        />
        <KeywordCloud items={keywordCloud["/yacht-charter-dubai/"].map((k) => ({ keyword: k, to: "/rent-a-yacht-dubai/" }))} />
      </section>
    </>
  );
}
