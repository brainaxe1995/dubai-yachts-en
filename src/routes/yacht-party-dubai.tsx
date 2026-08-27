import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Music, Cake, Camera, HeartHandshake, GraduationCap, Palette, Wand2, PartyPopper, Lock, Landmark, Ship } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { PartyEssentialsTabs } from "@/components/PartyEssentialsTabs";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { faqSchema, breadcrumbSchema } from "@/components/SeoJsonLd";
import { parties, stepsParty, keywordCloud } from "@/data/site";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import partyImg from "@/assets/parties/wedding.webp";
import partyWeddingImg from "@/assets/parties/wedding/wedding-1.webp";
import partyBirthdayImg from "@/assets/parties/birthday/birthday-1.webp";
import partyProposalImg from "@/assets/parties/proposal/proposal-1.webp";

const partyFaqs = [
  {
    q: "How much does a yacht party in Dubai cost?",
    a: "A __yacht party in Dubai starts from AED 1,500 for 2 hours__. The price varies with yacht size, guest count, party duration, and any add-on services you choose.",
  },
  {
    q: "Can I customise my yacht party in Dubai?",
    a: "Yes — you can fully customise your __yacht party in Dubai__ to suit the occasion. Add decor, catering, food, music, entertainment, and any other service on request.",
  },
  { q: "How many guests fit on a party yacht?", a: "Our yachts host anywhere from 12 guests (48 ft yacht) up to 45 guests (95 ft yacht) and 90 guests (105 ft). We match the yacht to your headcount." },
  { q: "Does the package include decor and cake?", a: "The base package covers the cruise and catering. Decor, cake, and photographer are optional add-ons at special rates." },
  { q: "Can I bring a DJ or live music?", a: "Yes — all our yachts come with sound systems. We can supply a professional DJ as an add-on, or you can bring your own band." },
  { q: "Is loud music and dancing allowed on the yacht?", a: "Yes, subject to quiet-hours rules near the marina after midnight. While cruising there are no restrictions." },
  { q: "How long does a typical yacht party run?", a: "Parties run from 2 hours up to 6 hours. Sweet spot: 3-4 hours to cover arrival, food, cake, and dancing." },
  { q: "Do you organise surprise parties?", a: "Yes! We work with you on every detail in secret — decor, cake, music, and photographer." },
  { q: "Can we hold a wedding ceremony on the yacht?", a: "Yes — we offer yachts suited to marriage ceremonies with a dedicated officiant and full coordination. Contact us for details." },
  { q: "How much deposit is required?", a: "Usually 30% of the total to lock in the booking, with the balance due on the day of the cruise." },
];

const partyFeatures = [
  {
    h: "Why a yacht party beats every other venue",
    icon: Wand2,
    image: partyWeddingImg,
    imageAlt: "Luxury yacht party in Dubai",
    p: [
      "Nothing compares to a __yacht party in Dubai__ — total privacy, a cinematic view of the city skyline, and an atmosphere no hotel or hall can replicate. The yacht is your space and your guests' alone.",
      "From __Burj Al Arab__ to __Palm Jumeirah__, your party glides past Dubai's most famous marine landmarks — a luxury backdrop for every photo and every memory you make.",
    ],
  },
  {
    h: "Fresh ideas for an unforgettable party",
    icon: Palette,
    image: partyBirthdayImg,
    imageAlt: "Yacht party decor ideas",
    p: [
      "We design each party to your brief: __premium decor__, __custom cake__, __professional DJ__, __photo and video crew__, balloons, light columns, and a rose-petal walkway for a signature arrival.",
      "Popular ideas: __sunset party__, __romantic dinner on the sundeck__, __neon-lit night disco__, or __live jazz evening__ — anything is possible.",
    ],
  },
  {
    h: "How we help you plan the party",
    icon: PartyPopper,
    image: partyProposalImg,
    imageAlt: "Yacht party planning in Dubai",
    p: [
      "Full planning service from the __Toot Fun__ team: we take your brief, recommend the right yacht for your headcount, then handle decor, catering, and vendor coordination — all you do is show up and enjoy.",
      "For surprise parties we keep it __completely confidential__ and work every detail with you out of sight of the guest of honour — from decor to arrival timing.",
    ],
  },
];

const occasionTypes = [
  { icon: Cake, t: "Birthdays", d: "From kids' birthdays to upscale friends' parties." },
  { icon: HeartHandshake, t: "Engagements & Weddings", d: "Unforgettable moments against Dubai's best sunset." },
  { icon: GraduationCap, t: "Graduation Parties", d: "Celebrate the milestone with friends on a private yacht." },
  { icon: Sparkles, t: "Marriage Proposals", d: "Romance, rose petals, and a Burj Al Arab view." },
  { icon: Music, t: "Anniversaries", d: "Total privacy, a romantic dinner, and hand-picked music." },
  { icon: Camera, t: "Corporate Events", d: "Meetings, product launches, and year-end parties." },
];

export const Route = createFileRoute("/yacht-party-dubai")({
  head: () => ({
    meta: [
      { title: "Best Yacht Parties in Dubai | Signature Packages — Toot Fun Yachts" },
      {
        name: "description",
        content:
          "Book yacht parties in Dubai for special occasions, birthdays, and weddings with luxury yachts, standout decor, professional crew, and competitive packages starting from AED 1,500.",
      },
      { name: "keywords", content: "yacht parties dubai, birthday yacht party, wedding yacht party, marriage proposal on yacht, graduation party, anniversary, dubai marina yacht" },
      { property: "og:title", content: "Best Yacht Parties in Dubai | Toot Fun Yachts" },
      { property: "og:description", content: "Weddings, engagements, graduations, and birthdays on board a yacht in Dubai." },
      { property: "og:url", content: "https://tootfunyachts.com/yacht-party-dubai/" },
    ],
    links: [
      { rel: "canonical", href: "https://tootfunyachts.com/yacht-party-dubai/" },
      { rel: "alternate", hrefLang: "en", href: "https://tootfunyachts.com/yacht-party-dubai/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://tootfunyachts.com/yacht-party-dubai/" },
    ],
    scripts: [
      faqSchema(partyFaqs),
      breadcrumbSchema([
        { name: "Home", url: "https://tootfunyachts.com/" },
        { name: "Yacht Parties", url: "https://tootfunyachts.com/yacht-party-dubai/" },
      ]),
    ],
  }),
  component: Parties,
});

function Parties() {
  const visibleParties = useOverriddenProducts(parties, "parties");
  return (
    <>
      <PageHero
        compact
        image={partyImg}
        eyebrow="Yacht Parties"
        title="Yacht Party Dubai"
        subtitle="Enjoy the best yacht parties in Dubai with luxury yachts, private cruises, and ideal options for birthdays and special occasions."
      />

      {/* Products FIRST (right after hero) */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Yacht Party Packages for All Occasions in Dubai"
          subtitle="Choose the yacht party that suits your budget and celebrate onboard a yacht in Dubai."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleParties.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      {/* Why choose yacht party Dubai — right after products */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">Why Choose a Yacht Party in Dubai?</h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              A <strong className="font-extrabold text-gold-deep">yacht party in Dubai</strong> gives you a private, distinctive
              setting for a birthday, engagement, anniversary, or any special occasion — set against Dubai's most stunning marine views.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Lock, t: "Complete Privacy", d: "The yacht is yours and your guests' alone." },
              { icon: Landmark, t: "Spectacular Views", d: "Of Dubai Marina, Palm Jumeirah, and Burj Al Arab." },
              { icon: Palette, t: "Fully Customisable", d: "Decor, cake, food, and music — all on request." },
              { icon: Ship, t: "Wide Yacht Choice", d: "Matched to your guest count and budget." },
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

      {/* Occasion types — RIGHT AFTER products per doc */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Types of Parties We Host"
          subtitle="Pick your occasion — we handle the rest."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {occasionTypes.map((o, i) => (
            <Reveal key={o.t} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe transition-transform hover:-translate-y-1">
                <o.icon className="mb-3 h-8 w-8 text-gold-deep" />
                <h3 className="text-lg font-bold text-primary">{o.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Long intro */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center">
            <h2 className="text-2xl text-foreground md:text-3xl">Your Guide to an Unforgettable Yacht Party in Dubai</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Everything you need to plan an exceptional party on board a luxury yacht in Dubai — from picking the yacht to nailing the decor.
            </p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-6 text-start text-sm leading-loose text-muted-foreground md:text-base">
              <strong>Yacht parties in Dubai</strong> have become the top choice for anyone who wants a stand-out celebration —
              from birthdays and engagements to weddings, romantic proposals, and corporate events. Toot Fun Yachts operates
              a diverse fleet of luxury yachts from 48 ft up to 105 ft, with tailored packages for every occasion.
            </p>
            <p className="mt-4 text-start text-sm leading-loose text-muted-foreground md:text-base">
              We cover every party detail: decor, cake, music, photography, and catering. Parties depart from Dubai Marina with
              breathtaking views of Ain Dubai, JBR, Palm Jumeirah, and Burj Al Arab.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <FeatureBlocks blocks={partyFeatures} />
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="How to Book a Yacht Party in Dubai"
            subtitle="Simple steps to organise a standout yacht party in Dubai."
          />
          <BookingSteps steps={stepsParty} />
        </div>
      </section>

      <section className="surface-navy py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <SectionHeading
            onDark
            title="Why a Yacht Party Is Different"
            subtitle="Four reasons a yacht party in Dubai is an experience no venue can match."
          />
          <div className="grid gap-4 text-start sm:grid-cols-2">
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <h3 className="text-base font-bold text-primary-foreground">Complete Privacy</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">The yacht is reserved for you and your guests only — no one else shares the experience.</p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <h3 className="text-base font-bold text-primary-foreground">Exceptional Views</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">Dubai skyline, sunset, marina lights — a cinematic backdrop for every moment.</p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <h3 className="text-base font-bold text-primary-foreground">Full Package</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">Decor, catering, music, photographer — we handle every detail.</p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <h3 className="text-base font-bold text-primary-foreground">Unforgettable Moments</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">A one-of-a-kind experience that creates memories for life.</p>
            </div>
          </div>
        </div>
      </section>

      <PartyEssentialsTabs />

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="Frequently Asked Questions About Yacht Rental in Dubai"
          subtitle="Answers to the most common questions on yacht rental in Dubai — pricing, booking, duration, what's included, and everything to know before you sail."
        />
        <Accordion items={partyFaqs} />
      </section>

      <ContactCta
        title="Ready for Your Yacht Party?"
        subtitle="Get in touch to tailor the right package and secure the best rate."
      />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Yacht and Cruise Searches in Dubai"
          subtitle="Explore the most-searched terms for yacht parties and celebrations at sea in Dubai — find the service or experience you need in seconds."
        />
        <KeywordCloud items={keywordCloud["/yacht-party-dubai/"].map((k) => ({ keyword: k, to: "/yacht-party-dubai/" }))} />
      </section>
    </>
  );
}
