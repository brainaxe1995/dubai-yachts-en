import { createFileRoute } from "@tanstack/react-router";
import { Anchor, ShieldCheck, DollarSign, Sparkles, Package, Users, Lock, CalendarClock, Landmark, PlusCircle } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { CharterEssentials } from "@/components/CharterEssentials";
import { KeywordCloud } from "@/components/KeywordCloud";
import { FeatureBlocks } from "@/components/FeatureSection";
import { faqSchema, breadcrumbSchema } from "@/components/SeoJsonLd";
import { yachts, stepsYacht, keywordCloud } from "@/data/site";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import italianImg from "@/assets/yachts/italian-95.webp";
import corpImg from "@/assets/yachts/corporate-105.webp";
import pageHero from "@/assets/heroes/yacht-charter-dubai.webp";

const rentalIncludedFeatures = [
  {
    h: "What Does Yacht Hire Include?",
    icon: Package,
    image: italianImg,
    imageAlt: "What yacht hire in Dubai includes",
    p: [
      "Every one of our yacht trips includes a __professional captain and crew__, __fuel__, __comprehensive insurance__, safety equipment, mineral water and soft drinks, tableware, and a professional sound system.",
      "You can add __food__, __decorations__, a __cake__, a __photographer__, or __water sports__ to match your occasion.",
    ],
  },
  {
    h: "Who Is Yacht Rental in Dubai For?",
    icon: Users,
    image: corpImg,
    imageAlt: "Who yacht rental suits",
    p: [
      "Our fleet suits __families__ and small groups (10–20 people), major __corporate events__ (up to 90 guests), luxury __wedding and engagement parties__, romantic __marriage proposals__, and __university__ graduation trips.",
      "For every yacht size and budget — there's the right option for you.",
    ],
  },
];

const yachtFaqs = [
  {
    q: "How much does a yacht charter in Dubai cost?",
    a: "__Yacht rental costs in Dubai__ vary based on yacht size, guest count, trip duration, and selected services. Prices start from __AED 450 per hour__ and increase depending on the yacht type and additional services.",
  },
  { q: "What is the cheapest yacht for rent in Dubai?", a: "The 40-ft mini yacht starts from AED 450 per hour and accommodates 10 guests with one bedroom." },
  { q: "What is the largest yacht available for rent?", a: "The 105-ft corporate yacht accommodates 90 guests and is ideal for large events, from AED 3,000 per hour." },
  { q: "Do the prices include fuel and crew?", a: "Yes — all our prices include the captain, crew, fuel, insurance, and basic drinks." },
  { q: "Where do the yachts depart from?", a: "Most of our yachts depart from Dubai Marina. Some larger yachts depart from other locations — we'll let you know at the time of booking." },
  { q: "Can I rent the yacht for more than one day?", a: "Yes, we offer full-day hires or multi-day trips with overnight stays on board — contact us for pricing." },
  { q: "Are children and pets allowed on board?", a: "Children are always welcome, with dedicated life vests. Pets are allowed with prior approval." },
];

export const Route = createFileRoute("/yacht-charter-dubai")({
  head: () => ({
    meta: [
      { title: "Private Yacht Charter Dubai | From AED 450" },
      {
        name: "description",
        content:"Book a Private Yacht Charter Dubai with Toot Fun Yachts. Choose luxury yachts, private cruises, professional crew, and prices from AED 450 per hour.",
      },
      { name: "keywords", content: "yachts for rent in Dubai, yacht rental Dubai, private yacht Dubai, luxury yachts, Dubai Marina yacht" },
      { property: "og:title", content: "Private Yacht Charter Dubai | From AED 450" },
      { property: "og:description", content: "Book a Private Yacht Charter Dubai with Toot Fun Yachts. Choose luxury yachts, private cruises, professional crew, and prices from AED 450 per hour." },
      { property: "og:url", content: "https://dubai-yachts.ae/yacht-charter-dubai/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yachts.ae/yacht-charter-dubai/" },
      { rel: "alternate", hrefLang: "en", href: "https://dubai-yachts.ae/yacht-charter-dubai/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yachts.ae/yacht-charter-dubai/" },
    ],
    scripts: [
      faqSchema(yachtFaqs),
      breadcrumbSchema([
        { name: "Home", url: "https://dubai-yachts.ae/" },
        { name: "Yachts for Rent", url: "https://dubai-yachts.ae/yacht-charter-dubai/" },
      ]),
    ],
  }),
  component: YachtsForRent,
});

const advantages = [
  { icon: DollarSign, t: "Transparent Pricing", d: "No hidden fees. The price includes the crew, fuel, and insurance." },
  { icon: Anchor, t: "Diverse Fleet", d: "15 yachts from 40 ft to 105 ft for every budget." },
  { icon: ShieldCheck, t: "Fully Safe and Licensed", d: "All yachts are insured and compliant with port authority regulations." },
  { icon: Sparkles, t: "Luxury Service", d: "Crew trained to the highest standards of hotel hospitality." },
];

function YachtsForRent() {
  const visibleYachts = useOverriddenProducts(yachts, "yachts");
  return (
    <>
      <PageHero
        compact
        image={pageHero}
        eyebrow="The Fleet"
        title="Yacht Charter Dubai"
        subtitle="Explore the best Yacht Charter in Dubai options, with a wide range of yachts and prices starting from AED 450 per hour."
      />

      {/* Products FIRST */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Private Yacht Charter Dubai at Competitive Prices"
          subtitle="Choose from a wide range of luxury yachts for private charter in Dubai, with professional crew, flexible trip options, and prices starting from AED 450 per hour."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleYachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      {/* Why choose yacht rental Dubai — right after products */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">Why Rent a Yacht in Dubai?</h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <strong className="font-extrabold text-gold-deep">Renting a yacht in Dubai</strong> gives you the freedom to
              enjoy the sea away from crowded tours, with the ability to set your trip duration, route, and services to
              match your plan.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Lock, t: "Fully Private Trip", d: "For you and your guests." },
              { icon: CalendarClock, t: "Choose Your Trip Duration", d: "And the time that suits you." },
              { icon: Landmark, t: "Visit Dubai's Iconic Marine Landmarks", d: "From a different perspective." },
              { icon: PlusCircle, t: "Add Services and Experiences", d: "Tailored to your trip type." },
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

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center">
            <h2 className="text-2xl text-foreground md:text-3xl">Largest Yacht Rental Fleet in Dubai</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              A complete look at the fleet and global brands available at Toot Fun.
            </p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-6 text-start text-sm leading-loose text-muted-foreground md:text-base">
              Toot Fun Yachts is proud to own one of the largest and best-known fleets of <strong>yachts for rent in Dubai</strong> —
              15 luxury yachts from the world's most renowned brands: Majesty, Azimut, Sunseeker, Ferretti, and Gulf Craft.
              Our yachts range from 40 ft to 105 ft in size and suit anything from a simple family outing to a major
              corporate event hosting 90 guests.
            </p>
            <p className="mt-4 text-start text-sm leading-loose text-muted-foreground md:text-base">
              All our yachts are fully licensed and insured, depart from Dubai Marina with a professional multilingual
              crew, and offer transparent, competitive pricing starting from AED 450 per hour.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Why We're the Best Choice for Yacht Hire"
          subtitle="What sets Toot Fun apart in the Emirati yacht market."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => (
            <Reveal key={a.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 text-center shadow-luxe">
                <a.icon className="mx-auto mb-3 h-7 w-7 text-gold-deep" />
                <h3 className="text-base font-bold text-foreground">{a.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="How to Rent a Yacht in Dubai"
            subtitle="Easy steps to book your yacht and enjoy an unforgettable luxury experience."
          />
          <BookingSteps steps={stepsYacht} />
        </div>
      </section>

      {/* New visual feature section after products */}
      <section className="bg-gradient-to-b from-background via-muted to-background py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="Everything You Need to Know About Yacht Charter in Dubai"
            subtitle="From included add-ons to the groups our trips suit best — a complete guide before booking."
          />
          <FeatureBlocks blocks={rentalIncludedFeatures} />
        </div>
      </section>

      <CharterEssentials />

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="Frequently Asked Questions About Yachts for Charter in Dubai"
          subtitle="Top questions about __yachts for rent in Dubai__ covering prices, how to book, and the services available before your trip."
        />
        <Accordion items={yachtFaqs} />
      </section>

      <ContactCta />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Searches for Yachts and Sea Trips in Dubai"
          subtitle="Discover the most popular searches about yacht rental in Dubai to quickly reach the service or experience that suits you."
        />
        <KeywordCloud items={keywordCloud["/yacht-charter-dubai/"].map((k) => ({ keyword: k, to: "/yacht-charter-dubai/" }))} />
      </section>
    </>
  );
}
