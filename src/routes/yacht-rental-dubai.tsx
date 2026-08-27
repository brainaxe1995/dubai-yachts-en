import { createFileRoute } from "@tanstack/react-router";
import { Ship, Compass, Package, MapPin, Lock, Landmark, Sparkles, Wine } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { CharterEssentials } from "@/components/CharterEssentials";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { yachts, faqs, occasions, keywordCloud } from "@/data/site";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import gulfcraftImg from "@/assets/yachts/gulfcraft-90.webp";
import azimutImg from "@/assets/yachts/azimut-80.webp";
import marinaHero from "@/assets/yachts/majesty-88.webp";

export const Route = createFileRoute("/yacht-rental-dubai")({
  head: () => ({
    meta: [
      { title: "Private Yacht Rental Dubai | From AED 450" },
      {
        name: "description",
        content:"We offer yacht rental Dubai with private cruises, a wide selection of yachts, and prices starting from AED 450 per hour for all occasions.",
      },
      { property: "og:title", content: "Private Yacht Rental Dubai | From AED 450" },
      { property: "og:description", content: "We offer yacht rental Dubai with private cruises, a wide selection of yachts, and prices starting from AED 450 per hour for all occasions." },
      { property: "og:url", content: "https://tootfunyachts.com/yacht-rental-dubai/" },
    ],
    links: [
      { rel: "canonical", href: "https://tootfunyachts.com/yacht-rental-dubai/" },
      { rel: "alternate", hrefLang: "en", href: "https://tootfunyachts.com/yacht-rental-dubai/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://tootfunyachts.com/yacht-rental-dubai/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Yacht Rental Fleet in Dubai",
          itemListElement: yachts.map((y, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: y.title,
              serviceType: "Yacht Rental",
              areaServed: "Dubai, United Arab Emirates",
              provider: { "@type": "Organization", name: "Toot Fun Yachts" },
            },
          })),
        }),
      },
    ],
  }),
  component: YachtRental,
});

const brands = [
  { n: "Majesty", d: "Luxury yachts from world-class Emirati shipyards, from 48 to 88 feet." },
  { n: "Azimut", d: "Sleek Italian yachts with modern design, from 50 to 80 feet with jacuzzi." },
  { n: "Sunseeker", d: "British super yachts for those seeking the highest levels of luxury." },
  { n: "Ferretti", d: "Italian yachts with spacious design and refined living areas." },
  { n: "Gulf Craft", d: "A sturdy Emirati fleet ideal for Dubai Marina cruises." },
];

const rentalTopFaqs = [
  {
    q: "Can I bring food on the yacht?",
    a: "Yes, you can bring food and non-alcoholic drinks on board, and you can also request catering services in advance based on your chosen package.",
  },
  {
    q: "Can I book a yacht for a private party?",
    a: "Yes, you can __book a yacht for a private party in Dubai__ such as birthdays, engagements, anniversaries, or private gatherings, with the option to add decorations, cakes, food, and music of your choice.",
  },
];

const rentalFeatures = [
  {
    h: "How to Rent a Yacht in Dubai?",
    icon: Compass,
    image: azimutImg,
    imageAlt: "How to rent a yacht in Dubai",
    p: [
      "You can __rent a yacht in Dubai__ easily by choosing the right yacht, selecting the date, time, and trip duration, then confirming the booking with a deposit. Afterwards, you'll receive the boarding location and trip details.",
    ],
  },
  {
    h: "What Does Yacht Rental in Dubai Include?",
    icon: Package,
    image: gulfcraftImg,
    imageAlt: "What yacht rental in Dubai includes",
    p: [
      "__Yacht rental in Dubai__ typically includes a professional captain and crew, fuel, safety equipment, water and refreshing drinks, with the option to add food, decorations, and marine activities depending on the chosen package.",
    ],
  },
  {
    h: "What Are the Top Landmarks You Can Reach on a Yacht Rental in Dubai?",
    icon: MapPin,
    image: marinaHero,
    imageAlt: "Dubai marine landmarks",
    p: [
      "Enjoy a __yacht trip in Dubai__ passing the most famous marine landmarks such as Dubai Marina, Jumeirah Beach, Bluewaters, Palm Jumeirah, and Burj Al Arab, with a chance to enjoy the views and capture great photos.",
    ],
  },
];

function YachtRental() {
  const visibleYachts = useOverriddenProducts(yachts, "yachts");
  return (
    <>
      <PageHero
        compact
        eyebrow="Yacht Rental"
        title="Yacht Rental Dubai"
        subtitle="We offer yacht rental in Dubai with private cruises, a wide selection of yachts, and prices starting from AED 450 per hour for all occasions."
      />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Private Yacht Rental Dubai | Luxury Yacht Charter"
          subtitle="Choose from the best private yachts in Dubai, with prices starting from AED 450 per hour, and enjoy a luxury cruise for every occasion."
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
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">Why Choose Yacht Rental in Dubai?</h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <strong className="font-extrabold text-gold-deep">Yacht rental in Dubai</strong> gives you a private
              experience combining comfort, privacy, and stunning sea views — whether for family trips, parties, special
              occasions, or quality time with friends.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Lock, t: "Complete Privacy", d: "Enjoy the trip with family or friends." },
              { icon: Landmark, t: "Stunning Views", d: "Of Dubai Marina, Palm Jumeirah, and Burj Al Arab." },
              { icon: Sparkles, t: "Suitable for Every Occasion", d: "Birthdays, parties, and family outings." },
              { icon: Wine, t: "Comfortable & Luxurious", d: "With a professional crew and varied services." },
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

      {/* Long-form SEO feature section */}
      <section className="bg-gradient-to-b from-background via-muted to-background py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="Your Complete Guide to Yacht Rental in Dubai"
            subtitle="Everything you need to know before renting your yacht — from booking steps to what's included in the price and top marine landmarks."
          />
          <FeatureBlocks blocks={rentalFeatures} />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Yacht Brands in Our Fleet"
          subtitle="We partner with the world's leading yacht brands to deliver an exceptional sailing experience."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => (
            <Reveal key={b.n} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe">
                <Ship className="mb-3 h-7 w-7 text-gold-deep" />
                <h3 className="text-lg font-bold text-primary">{b.n}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading title="Occasions Yachts Are Perfect For" subtitle="We design a rental experience that fits your occasion and mood." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {occasions.map((o, i) => (
            <Reveal key={o.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-5">
                <h3 className="text-base font-bold text-foreground">{o.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CharterEssentials />

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading
          title="Frequently Asked Questions About Yacht Rental in Dubai"
          subtitle="Discover key answers about yacht rental in Dubai — including prices, booking, duration, available services, and what you need to know before your trip."
        />
        <Accordion items={[...rentalTopFaqs, ...faqs]} />
      </section>

      <ContactCta />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Searches for Yachts and Sea Trips in Dubai"
          subtitle="Discover the most popular searches about yacht rental in Dubai to quickly reach the service or experience that suits you."
        />
        <KeywordCloud items={keywordCloud["/yacht-rental-dubai/"].map((k) => ({ keyword: k, to: "/yacht-rental-dubai/" }))} />
      </section>
    </>
  );
}
