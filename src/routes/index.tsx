import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, ShieldCheck, Users, Headphones } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { Testimonials } from "@/components/Testimonials";
import { KeywordCloud } from "@/components/KeywordCloud";
import { ExtrasMarquee } from "@/components/ExtrasMarquee";
import { ContactCta } from "@/components/ContactCta";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import {
  yachts,
  faqs,
  steps,
  extras,
  inclusions,
  destinations,
  testimonials,
  keywordCloudFlat,
} from "@/data/site";
import partyImg from "@/assets/parties/wedding.webp";
import fishingImg from "@/assets/fishing/shared.webp";
import packagesImg from "@/assets/packages/romantic-dinner.webp";
import whatIncludedImg from "@/assets/branding/what-included.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yacht Rental Dubai | Best Prices - Toot Fun Yachts" },
      {
        name: "description",
        content:
          "Enjoy yacht rental in Dubai with luxury yachts, competitive prices, private trips, and a professional crew for every occasion. Book your yacht now.",
      },
      { property: "og:title", content: "Yacht Rental Dubai | Best Prices - Toot Fun Yachts" },
      {
        property: "og:description",
        content:
          "Enjoy yacht rental in Dubai with luxury yachts, competitive prices, private trips, and a professional crew for every occasion. Book your yacht now.",
      },
      { property: "og:url", content: "https://tootfunyachts.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://tootfunyachts.com/" },
      { rel: "alternate", hrefLang: "en", href: "https://tootfunyachts.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://tootfunyachts.com/" },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Anchor, t: "Luxury Yachts", d: "A wide selection of luxury yachts for rent in Dubai." },
  { icon: ShieldCheck, t: "Safety & Comfort", d: "High safety standards and quality service." },
  { icon: Users, t: "Professional Crew", d: "Experienced crew trained to provide excellent service." },
  { icon: Headphones, t: "24/7 Support", d: "Customer support is available around the clock." },
];

const services = [
  { to: "/yacht-party-dubai/", img: partyImg, t: "Yacht Parties in Dubai", d: "Birthdays, engagements, weddings, and graduations aboard a luxury yacht." },
  { to: "/fishing-trip-dubai/", img: fishingImg, t: "Fishing Trips", d: "Private and shared trips with fully equipped boats and a professional crew." },
  { to: "/yacht-packages-dubai/", img: packagesImg, t: "Yacht Packages & Offers", d: "Breakfast, romantic dinner, and jet ski within curated packages." },
] as const;

function Home() {
  const homeYachts = useOverriddenProducts(yachts.slice(0, 6), "home");
  return (
    <>
      <PageHero
        eyebrow="An Unforgettable Yacht Experience"
        title="Yacht Rental Dubai with Toot Fun"
        subtitle="Enjoy premium yacht rental in Dubai with private cruises, competitive prices, and luxury yachts for every occasion."
      />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Best Yachts for Rent in Dubai at Competitive Prices"
          subtitle="Choose from a wide selection of the best yachts for rent in Dubai at competitive prices starting from AED 450 per hour."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeYachts.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={i * 70} />
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            to="/yacht-rental-dubai/"
            className="inline-flex rounded-full border border-primary/20 px-7 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Discover More
          </Link>
        </Reveal>
      </section>

      <section className="surface-navy py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-2xl text-primary-foreground md:text-3xl">
              Why Choose <span className="text-gold-gradient">Toot Fun</span> for Yacht Rental Dubai?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70 md:text-base">
              Toot Fun offers professional service, a diverse fleet of yachts, transparent pricing, and an experienced crew for a comfortable and memorable yacht experience in Dubai. Whether you are planning a private cruise, yacht party, or luxury event, we provide options to suit your needs.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <div className="h-full rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center transition-colors hover:border-gold/50">
                  <f.icon className="mx-auto mb-4 h-8 w-8 text-gold" />
                  <h3 className="text-base text-primary-foreground">{f.t}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/65">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Toot Fun Yacht Rental Services in Dubai"
          subtitle="Discover Toot Fun's wide range of yacht rental services in Dubai."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <Link
                to={s.to}
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-luxe"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.t}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-gold-deep">Discover Now →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cv-auto bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="How to Book Your Yacht in Dubai?"
            subtitle="Eight simple steps between you and a luxury sea trip."
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-5">
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-secondary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="text-base text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Extra Yacht Services Dubai"
          subtitle="Discover extra yacht services in Dubai, including catering, decorations, photography, water sports, transfers, and more to customize your trip."
        />
        <ExtrasMarquee items={extras} />
      </section>

      <section className="cv-auto surface-navy py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            onDark
            title="Top Sea Destinations in Dubai"
            subtitle="Enjoy a memorable sea trip and discover the most iconic marine destinations in Dubai, from Dubai Marina and JBR to Palm Jumeirah, Atlantis, and Burj Al Arab."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <Reveal key={d.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
                  <h3 className="text-base text-primary-foreground">{d.t}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70">{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-auto bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-2xl text-foreground md:text-3xl">What Your Yacht Trip Includes</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Enjoy a yacht trip in Dubai that includes the crew, fuel, safety equipment, and drinks, with optional add-ons to suit your preferences.
            </p>
            <span className="mx-auto mt-5 block h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
          </Reveal>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20">
                <img
                  src={whatIncludedImg}
                  alt="What the yacht trip includes — captain, crew, fuel, insurance, drinks, and hospitality"
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ul className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                {inclusions.map((i) => (
                  <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {i}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="Frequently Asked Questions About Yacht Rental in Dubai"
          subtitle="Discover key answers about yacht rental in Dubai — including prices, booking, duration, available services, and what you need to know before your trip."
        />
        <Accordion items={faqs} />
      </section>

      {/* Customer reviews */}
      <section className="cv-auto bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="What Our Guests Say"
            subtitle="Discover guest reviews of yacht rental experiences in Dubai, from private trips and celebrations to the finest moments aboard our yachts."
          />
          <Testimonials items={testimonials} />
        </div>
      </section>

      <ContactCta
        title="Yacht Rental Prices in Dubai Marina"
        subtitle="Book your yacht now and take advantage of the best yacht rental offers in Dubai."
      />

      {/* Keyword cloud — LAST section (matches other pages) */}
      <section className="cv-auto mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Searches for Yachts and Sea Trips in Dubai"
          subtitle="Discover the most popular searches about yacht rental and sea trips in Dubai to quickly reach the service or experience that suits you."
        />
        <KeywordCloud items={keywordCloudFlat} />
      </section>
    </>
  );
}
