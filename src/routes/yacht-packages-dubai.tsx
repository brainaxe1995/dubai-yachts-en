import { createFileRoute } from "@tanstack/react-router";
import { Coffee, Sparkles, Waves, Gift, Wine, Sunrise } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { CharterEssentials } from "@/components/CharterEssentials";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { faqSchema, breadcrumbSchema } from "@/components/SeoJsonLd";
import { packages, extras, stepsPackage, keywordCloud } from "@/data/site";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import packagesImg from "@/assets/heroes/yacht-packages-dubai.webp";
import breakfastImg from "@/assets/page-sections/yacht-packages-dubai/yacht-package-breakfast-dubai.webp";
import romanticDinnerImg from "@/assets/page-sections/yacht-packages-dubai/yacht-package-romantic-dinner-dubai.webp";
import jetskiImg from "@/assets/page-sections/yacht-packages-dubai/yacht-package-jetski-dubai.webp";
const pkgFeatures = [
  {
    h: "Breakfast Package — A Calm Morning at Sea",
    icon: Sunrise,
    image: breakfastImg,
    imageAlt: "Breakfast package on a yacht in Dubai",
    p: [
      "Start your morning on board a yacht in __Dubai Marina__ with a full Arabic breakfast — foul, hummus, cheese, eggs, labneh, honey, dates, Arabic coffee, and fresh juices. A quiet 4-hour cruise before the day gets busy.",
      "The package includes a __complimentary 1-hour jet ski ride__ as a bonus — a complete morning experience at the best rate, with a stunning sunrise view of Dubai's skyline.",
    ],
  },
  {
    h: "Romantic Dinner Package — A Moment You'll Never Forget",
    icon: Wine,
    image: romanticDinnerImg,
    imageAlt: "Romantic dinner package on a yacht",
    p: [
      "A private evening for two on a 48 ft yacht with a __premium grill meal__, __romantic cake__, and __bottle of Champagne__. Romantic decor, candlelight, and soft music.",
      "The cruise departs before sunset to catch the best golden-hour light on __Palm Jumeirah__ and __Burj Al Arab__ — a cinematic backdrop for a marriage proposal or anniversary.",
    ],
  },
  {
    h: "Yacht + Jet Ski Package — For the Adventurous",
    icon: Waves,
    image: jetskiImg,
    imageAlt: "Jet ski package on a yacht",
    p: [
      "Combine the calm of __sailing on a yacht__ with the thrill of __professional jet skiing__ for a full hour. A certified instructor rides with you, with life jackets for all passengers. A 4-hour trip packed with adrenaline.",
      "Optional add-ons: __banana boat__, __donut ride__, and a mixed-grill buffet at AED 100 per person — a complete experience for friends and families.",
    ],
  },
];

const pkgFaqs = [
  {
    q: "How much do yacht rental packages in Dubai cost?",
    a: "__Yacht rental packages in Dubai start from AED 1,800__. The price varies with yacht size, trip duration, guest count, and any add-on services you choose.",
  },
  { q: "What's the difference between a package and a standard booking?", a: "A package covers the cruise + a specific meal/experience (breakfast, dinner, jet ski) at a fixed rate. A standard booking is yacht hire only by the hour, with you picking any add-ons." },
  { q: "Can I customise the package to my brief?", a: "Yes — we build custom packages for any occasion. Send us your requirements and we'll return a quote within hours." },
  { q: "Is the food in the packages halal?", a: "All our food is 100% halal. We work with trusted, certified restaurants in Dubai." },
  { q: "When's the best time for the breakfast package?", a: "7-11 AM — you get sunrise, fresh air, and complete calm before the marina gets busy." },
  { q: "How long is the romantic dinner package?", a: "2 hours — enough for 5 courses with time to enjoy sunset and conversation." },
  { q: "Can I add jet skiing to any package?", a: "Yes, every one of our packages accepts a jet ski add-on (AED 300 / 30 minutes) or banana boat." },
];

const pkgHighlights = [
  { icon: Coffee, t: "Breakfast Package", d: "Start your day with a marina view and a premium Arabic breakfast (AED 3,000 / 4 hours)." },
  { icon: Waves, t: "Jet Ski Package", d: "Combine the yacht and a jet ski adventure in one experience (AED 2,300 / 4 hours)." },
  { icon: Sparkles, t: "Romantic Dinner", d: "The perfect night for couples with 5 courses and a bespoke decor (AED 1,800 / 2 hours)." },
];

export const Route = createFileRoute("/yacht-packages-dubai")({
  head: () => ({
    meta: [
      { title: "Yacht Packages Dubai | Private Yacht Deals & Offers" },
      {
        name: "description",
        content:"Discover yacht packages Dubai for private trips, birthdays, parties and special occasions, with flexible options and competitive prices.",
      },
      { name: "keywords", content: "dubai yacht packages, breakfast yacht package, romantic dinner yacht, jet ski package, dubai yacht deals" },
      { property: "og:title", content: "Yacht Packages Dubai | Private Yacht Deals & Offers" },
      { property: "og:description", content: "Discover yacht packages Dubai for private trips, birthdays, parties and special occasions, with flexible options and competitive prices." },
      { property: "og:url", content: "https://dubai-yachts.ae/yacht-packages-dubai/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yachts.ae/yacht-packages-dubai/" },
      { rel: "alternate", hrefLang: "en", href: "https://dubai-yachts.ae/yacht-packages-dubai/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yachts.ae/yacht-packages-dubai/" },
    ],
    scripts: [
      faqSchema(pkgFaqs),
      breadcrumbSchema([
        { name: "Home", url: "https://dubai-yachts.ae/" },
        { name: "Yacht Packages", url: "https://dubai-yachts.ae/yacht-packages-dubai/" },
      ]),
    ],
  }),
  component: Packages,
});

function Packages() {
  const visiblePackages = useOverriddenProducts(packages, "packages");
  return (
    <>
      <PageHero
        compact
        image={packagesImg}
        eyebrow="Offers"
        title="Yacht Packages Dubai"
        subtitle="Discover the best yacht packages in Dubai, with flexible options for private trips, parties, and special occasions, plus competitive prices and selected services for a memorable experience on the water."
      />

      {/* Products FIRST */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Choose Your Yacht Rental Package in Dubai"
          subtitle="Choose the yacht package that suits your trip, celebration, or special occasion."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePackages.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={i * 80} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center">
            <h2 className="text-2xl text-foreground md:text-3xl">Ready-Made Packages That Save You Time and Money</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Everything you need for a great cruise in Dubai in one transparent package.
            </p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-6 text-start text-sm leading-loose text-muted-foreground md:text-base">
              Rather than piece every detail together yourself, Toot Fun has built a set of ready <strong>yacht rental packages in Dubai</strong>
              for specific occasions — from a quiet morning breakfast to a romantic dinner, to a jet ski adventure. Each package covers the yacht,
              crew, food, and extras — one transparent rate, no surprises.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <FeatureBlocks blocks={pkgFeatures} />
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading title="Our Most Popular Packages" subtitle="Three hand-picked packages." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pkgHighlights.map((h, i) => (
            <Reveal key={h.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe transition-transform hover:-translate-y-1">
                <h.icon className="mb-3 h-8 w-8 text-gold-deep" />
                <h3 className="text-lg font-bold text-primary">{h.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="Yacht Booking Add-Ons in Dubai"
            subtitle="Customise your cruise with premium extras — food, desserts, decor, water sports, and more."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {extras.map((e, i) => (
              <Reveal key={e.label} delay={i * 40}>
                <div className="group h-full overflow-hidden rounded-xl border border-border bg-card shadow-luxe transition-transform hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={e.image}
                      alt={e.label}
                      loading="lazy"
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs font-bold text-foreground md:text-sm">{e.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="How to Book a Yacht Package in Dubai"
          subtitle="Simple steps to pick and book the right yacht package for you."
        />
        <BookingSteps steps={stepsPackage} />
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-2xl text-foreground md:text-3xl">More Than Just a Package</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            An exceptional gift or a fully custom experience — both are possible with Toot Fun.
          </p>
          <span className="mx-auto mt-5 block h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
              <Gift className="mb-3 h-8 w-8 text-gold-deep" />
              <h3 className="text-xl font-bold text-foreground">Exceptional Gift</h3>
              <p className="mt-3 text-sm leading-loose text-muted-foreground">
                Looking for a gift for someone special? Our packages are a distinctive choice for a birthday, anniversary,
                or a friend's graduation. We offer digital gift vouchers with elegant design and a personal message.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
              <Sparkles className="mb-3 h-8 w-8 text-gold-deep" />
              <h3 className="text-xl font-bold text-foreground">Bespoke Packages</h3>
              <p className="mt-3 text-sm leading-loose text-muted-foreground">
                Can't find what suits you? Build your own package — pick the yacht, duration, meal, and extras. We'll send
                you a transparent quote within hours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CharterEssentials />

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading
          title="Frequently Asked Questions About Yacht Packages in Dubai"
          subtitle="Answers to the most common questions on yacht rental in Dubai — pricing, booking, duration, what's included, and everything to know before you sail."
        />
        <Accordion items={pkgFaqs} />
      </section>

      <ContactCta
        title="Ready for a Standout Yacht Package?"
        subtitle="Get in touch to book your package or build a custom one to your brief."
      />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Yacht and Cruise Searches in Dubai"
          subtitle="Explore the most-searched terms for yacht packages and offers in Dubai — find the package that suits you in seconds."
        />
        <KeywordCloud items={keywordCloud["/yacht-packages-dubai/"].map((k) => ({ keyword: k, to: "/yacht-packages-dubai/" }))} />
      </section>
    </>
  );
}
