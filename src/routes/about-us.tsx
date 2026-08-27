import { createFileRoute } from "@tanstack/react-router";
import { Award, Compass, HeartHandshake, ShieldCheck, Sparkles, Star } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CallButton, BookButton } from "@/components/CtaButtons";
import { occasions, inclusions } from "@/data/site";
import fleetImg from "@/assets/yachts/majesty-88.webp";
import marinaImg from "@/assets/yachts/gulfcraft-90.webp";
import whatIncludedImg from "@/assets/branding/what-included.webp";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us | Toot Fun Yachts" },
      {
        name: "description",
        content:
          "Learn who we are at Toot Fun Yachts and our track record in luxury yacht rentals and sea trips in Dubai.",
      },
      { property: "og:title", content: "About Us | Toot Fun Yachts" },
      { property: "og:description", content: "Our track record in luxury yacht rentals and sea trips in Dubai." },
      { property: "og:url", content: "https://tootfunyachts.com/about-us/" },
    ],
    links: [
      { rel: "canonical", href: "https://tootfunyachts.com/about-us/" },
      { rel: "alternate", hrefLang: "en", href: "https://tootfunyachts.com/about-us/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://tootfunyachts.com/about-us/" },
    ],
  }),
  component: About,
});

const stats = [
  { n: "15+", l: "Luxury yachts and boats" },
  { n: "AED 450", l: "Rates start from / hour" },
  { n: "24/7", l: "Customer service" },
  { n: "+1000", l: "Happy cruises" },
];

const values = [
  { icon: Award, t: "Trusted Experience", d: "Years of running sea trips out of Dubai Marina." },
  { icon: ShieldCheck, t: "Safety & Licensing", d: "All our yachts are licensed and meet marine safety standards." },
  { icon: Sparkles, t: "Refined Service", d: "A crew trained to deliver first-class hospitality." },
  { icon: HeartHandshake, t: "Complete Transparency", d: "Clear pricing with no hidden fees or surprises." },
  { icon: Compass, t: "Full Flexibility", d: "We tailor trips and packages to your brief and occasion." },
  { icon: Star, t: "Outstanding Reviews", d: "Hundreds of happy guests come back to us again and again." },
];

function About() {
  return (
    <>
      <PageHero
        compact
        eyebrow="About the Company"
        title="About Us"
        subtitle="Learn more about Toot Fun Yachts, our experience, and our expertise in providing luxury yacht rental and private cruise services in Dubai."
      >
        <CallButton label="Get in Touch" />
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20">
              <img
                src={fleetImg}
                alt="Toot Fun Yachts fleet in Dubai"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-2xl text-foreground md:text-3xl">About Us – Toot Fun Yachts Dubai</h2>
            <p className="mt-4 text-sm leading-loose text-muted-foreground md:text-base">
              We provide yacht rental and private cruise services in Dubai with a diverse fleet and a professional crew.
            </p>
            <p className="mt-3 text-sm leading-loose text-muted-foreground md:text-base">
              <strong>Toot Fun Yachts</strong> is a company specialised in <strong>yacht and boat rentals in Dubai</strong> since
              2018, with a diverse fleet of yachts to suit private cruises, family trips, parties and occasions, and fishing trips.
            </p>
            <p className="mt-3 text-sm leading-loose text-muted-foreground md:text-base">
              We're committed to a safe, comfortable sea trip with a <strong>professional crew</strong>, clear pricing, and full
              details before you book. Our team is available around the clock to help you pick the right yacht and package and
              enjoy your trip through Dubai Marina, Dubai Harbour, Palm Jumeirah, and the Arabian Gulf.
            </p>
            <p className="mt-3 text-sm leading-loose text-muted-foreground md:text-base">
              We believe in pricing transparency and clear details before booking, backed by continuous support to help you pick
              the yacht and package that suit you best.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <BookButton />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-navy py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 80} className="text-center">
              <div className="text-2xl font-extrabold text-gold md:text-3xl">{s.n}</div>
              <div className="mt-2 text-xs text-primary-foreground/70 md:text-sm">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading title="Our Values on Every Trip" subtitle="Professional service, clear pricing, and an unforgettable sea experience." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1 shadow-luxe">
                <v.icon className="mb-3 h-7 w-7 text-gold-deep" />
                <h3 className="text-base font-bold text-foreground">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="Occasions We Make Unforgettable"
            subtitle="From birthdays to weddings, corporate events to family trips — our yachts are the ideal stage for every occasion worth remembering."
          />
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
          <Reveal delay={120}>
            <h2 className="text-2xl text-foreground md:text-3xl">What's Included in Your Trip</h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              We include everything you need to enjoy your trip without worry — one price covers the crew, fuel, insurance, and basic hospitality.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              {inclusions.map((i) => (
                <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20">
              <img
                src={whatIncludedImg}
                alt="What's included in your yacht trip"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-navy py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20">
              <img
                src={marinaImg}
                alt="Yachts at Dubai Marina"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="text-primary-foreground">
            <h2 className="text-2xl md:text-3xl">Our Location in the Heart of Dubai Marina</h2>
            <p className="mt-4 text-sm leading-loose text-primary-foreground/80 md:text-base">
              Most of our trips depart from Dubai Marina — the best launch point to enjoy Dubai's marine landmarks: Ain Dubai,
              JBR, Palm Jumeirah, Atlantis, and even Burj Al Arab.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookButton />
              <CallButton />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
