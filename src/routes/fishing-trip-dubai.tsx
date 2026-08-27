import { createFileRoute } from "@tanstack/react-router";
import { Fish, Sun, Users, Anchor, Waves, CheckCircle2, Target, Sparkles, Compass, Award, LifeBuoy, MapPin, UserCheck } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { FishingEssentialsTabs } from "@/components/FishingEssentialsTabs";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { fishingTrips, stepsFishing, keywordCloud } from "@/data/site";
import { useOverriddenProducts } from "@/hooks/useProductOverrides";
import fishingImg from "@/assets/fishing/shared.webp";
import fishingSharedImg from "@/assets/fishing/shared/shared-1.webp";
import fishingBoatImg from "@/assets/fishing/private-boat/private-boat-1.webp";
import fishingYachtImg from "@/assets/fishing/private-yacht/private-yacht-1.webp";

export const Route = createFileRoute("/fishing-trip-dubai")({
  head: () => ({
    meta: [
      { title: "Best Fishing Trips in Dubai | Toot Fun Yachts" },
      {
        name: "description",
        content:
          "Book the best fishing trips in Dubai with fully equipped boats, tackle provided, professional crew, and private or shared options at competitive rates.",
      },
      { property: "og:title", content: "Best Fishing Trips in Dubai | Toot Fun Yachts" },
      { property: "og:description", content: "Private and shared fishing trips in Dubai — fully equipped." },
      { property: "og:url", content: "https://tootfunyachts.com/fishing-trip-dubai/" },
    ],
    links: [
      { rel: "canonical", href: "https://tootfunyachts.com/fishing-trip-dubai/" },
      { rel: "alternate", hrefLang: "en", href: "https://tootfunyachts.com/fishing-trip-dubai/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://tootfunyachts.com/fishing-trip-dubai/" },
    ],
  }),
  component: Fishing,
});

const fishingFeatures = [
  {
    h: "Why fishing in Dubai is a one-of-a-kind experience",
    icon: Compass,
    image: fishingSharedImg,
    imageAlt: "Fishing trip in Dubai",
    p: [
      "__Fishing trips in Dubai__ are among the most sought-after marine experiences in the Gulf. Dubai's waters are rich in prized species like __hammour, sheri, and kingfish__, with weather ideal for fishing almost year-round.",
      "Our fleet departs from __Dubai Marina__ and reaches the top fishing spots near reefs and artificial islands within minutes — short on transit, long on action.",
    ],
  },
  {
    h: "How to pick the right fishing boat",
    icon: Award,
    image: fishingYachtImg,
    imageAlt: "Private fishing boats in Dubai",
    p: [
      "We offer three trip types: __private yacht fishing__ (full luxury and total privacy), __private boat fishing__ (economical and fast), and __shared trips__ (ideal for solo anglers who want a great-value fishing experience).",
      "Every boat is kitted out with professional fishing gear, __GPS navigation__, and certified life jackets — with a __licensed captain__ who knows the best fishing spots for every season.",
    ],
  },
  {
    h: "Tips for a successful fishing trip",
    icon: LifeBuoy,
    image: fishingBoatImg,
    imageAlt: "Fishing tips in Dubai",
    p: [
      "Start the trip early — __early morning__ or __before sunset__ are peak feeding windows for fish. Skip the midday heat for a comfortable trip and better bites.",
      "Bring __strong sunscreen__, a hat, and polarised sunglasses for clearer water visibility. No gear needed — our crew provides everything from __rods to live bait__.",
    ],
  },
];

const species = [
  { n: "Hammour", d: "One of the Gulf's most famous fish, found near reefs at depths of 20-60m." },
  { n: "Sheri", d: "A popular species caught in mid-depth waters — delicious and in high demand." },
  { n: "Kingfish", d: "Fast and powerful — an exciting catch for experienced anglers." },
  { n: "Barracuda", d: "Available year-round — a fun sport-fishing target." },
  { n: "Farsh", d: "A large deep-water fish, great for longer fishing runs." },
  { n: "Tuna", d: "Best in the hotter months on deeper offshore trips." },
];

const seasons = [
  { t: "Winter (November – February)", d: "The best fishing season — mild weather, calm seas, and abundant hammour and sheri." },
  { t: "Spring (March – May)", d: "Excellent season for kingfish and barracuda, with ideal temperatures." },
  { t: "Summer (June – September)", d: "Early morning or evening trips, with plenty of tuna." },
  { t: "Autumn (October – November)", d: "Start of peak season — diverse fishing experiences." },
];

const included = [
  "Complete fishing gear (rods, lines, bait)",
  "Fresh live bait",
  "Experienced, licensed crew",
  "Mineral water and drinks",
  "Ice to keep your catch fresh",
  "Life jackets for every passenger",
  "Comprehensive insurance",
  "Fuel included",
];

const locations = [
  { n: "Dubai Marina & Open Waters", d: "Enjoyable fishing trips — good species variety and beautiful sea views." },
  { n: "Jebel Ali", d: "One of the best fishing zones — ideal for longer trips and bigger catches." },
  { n: "Jumeirah", d: "Close and convenient — great for short trips and mixed-species fishing." },
];

const fishingTechniques = [
  { n: "Trolling", d: "The most popular method for deep-water fishing — a moving bait trailed behind the boat to attract big fish." },
  { n: "Live Bait", d: "Using live fish to lure larger species like tuna and kingfish." },
  { n: "Bottom Fishing", d: "Dropping bait to significant depths — perfect for reef species like hammour." },
  { n: "Jigging", d: "A vertically worked artificial lure — great for mid-sized fish." },
];

const fishSpecies = [
  "Hammour",
  "Sheri",
  "Kingfish",
  "Barracuda",
  "Farsh",
  "Tuna",
  "Trabidi",
  "Mackerel",
  "King Fish",
  "Trevally",
  "Sailfish",
];

const fishingFaqs = [
  {
    q: "How much does a fishing trip in Dubai cost?",
    a: "Prices for __fishing trips in Dubai__ depend on boat or yacht type, trip duration, and number of guests. Both private and shared fishing trips are available at different price points.",
  },
  {
    q: "Can I bring my own fishing gear?",
    a: "Yes, you can bring your own gear. Basic fishing equipment is also included in many of our trips depending on the package you choose.",
  },
  {
    q: "What fish can I catch in Dubai?",
    a: "Common species include hammour, sheri, kingfish, barracuda, farsh, tuna, trabidi, and king fish. Species vary by season and location.",
  },
  {
    q: "What's the best time to fish in Dubai?",
    a: "Early dawn (6:00 AM) and late afternoon (3:00-6:00 PM). Best season = winter (November – February) for hammour and sheri, and summer for tuna.",
  },
  {
    q: "Is fishing gear included?",
    a: "Yes — every trip includes rods, lines, live bait, safety equipment, and guidance from the professional crew.",
  },
  { q: "Do you need a fishing licence to head out in Dubai?", a: "No personal licence needed — all our trips operate under the boat's and yacht's own licences and are regulated by the UAE ports authority." },
  { q: "What's the difference between a shared and a private fishing trip?", a: "Shared trips group you with other passengers at a lower per-person rate (AED 350). Private trips reserve the boat or yacht for you and your group only, with full privacy." },
  { q: "Can I keep the fish I catch?", a: "Yes, the fish you catch is yours. We provide ice and coolers to preserve it, and some nearby restaurants will cook your catch for a small fee." },
  { q: "What should I wear on a fishing trip?", a: "Comfortable clothing, closed-toe non-slip shoes, a hat, sunglasses, and sunscreen. In winter we recommend a light jacket." },
  { q: "Is the trip suitable for kids?", a: "Yes — the short morning shared trips are suitable for kids over 5 with dedicated child-sized life jackets." },
  { q: "What time does the trip leave and how long does it last?", a: "Morning shared trips depart at 7:00 AM for 4 hours. Private trips are flexible — start when you want, from 2 hours up to a full day." },
  { q: "What if I don't catch any fish?", a: "Our crew are experts at knowing the fishing spots and we guarantee a fun trip, but nature isn't controllable. At minimum we guarantee you'll enjoy the atmosphere and the cruise." },
  { q: "Can I bring my own food?", a: "Yes, you can bring snacks. Shared trips include a shared breakfast. For private trips we provide catering services on request." },
];

function Fishing() {
  const visibleFishing = useOverriddenProducts(fishingTrips, "fishing");
  return (
    <>
      <PageHero
        compact
        image={fishingImg}
        eyebrow="Fishing Trips"
        title="Fishing Trip Dubai"
        subtitle="Discover the best fishing trips in Dubai with fully equipped boats, a professional crew, and an enjoyable experience on the water."
      />

      {/* Products FIRST */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Fishing Trip Options in Dubai"
          subtitle="Choose from private and shared fishing trips with fully equipped boats and a professional crew."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleFishing.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* Why choose fishing Dubai — right after products */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">Why Choose a Fishing Trip in Dubai?</h2>
            <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              A <strong className="font-extrabold text-gold-deep">fishing trip in Dubai</strong> is a great day at sea that combines
              fishing, relaxation, and Arabian Gulf atmosphere — with options that suit both beginners and seasoned anglers.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPin, t: "Varied Fishing Spots", d: "In Jumeirah, Jebel Ali, and open waters." },
              { icon: Anchor, t: "Fishing Gear Available", d: "According to your chosen package." },
              { icon: UserCheck, t: "Professional Crew", d: "Assists you throughout the trip." },
              { icon: Users, t: "Private & Shared Trips", d: "Suited to solo travellers, families, and groups." },
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
            <h2 className="text-2xl text-foreground md:text-3xl">Your Complete Guide to Fishing Trips in Dubai</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Everything you need to know before booking a fishing trip in Dubai's waters — from common species to seasons and gear.
            </p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-6 text-start text-sm leading-loose text-muted-foreground md:text-base">
              <strong>Fishing trips in Dubai</strong> are among the finest marine experiences in the Arabian Gulf, combining the
              enjoyment of cruising luxury marina waters with authentic fishing deep in the Gulf. Whether you're a beginner or a
              seasoned angler, Toot Fun Yachts offers private and shared fishing trips to suit every level and budget.
            </p>
            <p className="mt-4 text-start text-sm leading-loose text-muted-foreground md:text-base">
              Our trips depart from Dubai Marina on modern boats and yachts fitted with professional fishing gear, with a licensed
              crew that knows the best fishing spots in UAE waters.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <FeatureBlocks blocks={fishingFeatures} />
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Fish Species in Dubai Waters"
          subtitle="Get to know the species you can catch on your trip."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {species.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-luxe">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-deep text-gold">
                    <Fish className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold text-primary">{s.n}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="Best Fishing Seasons in Dubai"
            subtitle="When to head out for the best fishing experience."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe">
                  <Sun className="mb-3 h-7 w-7 text-gold-deep" />
                  <h3 className="text-base font-bold text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-navy py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            onDark
            title="What's Included in the Fishing Trip"
            subtitle="One price includes everything you need — with no hidden fees."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((i, idx) => (
              <Reveal key={i} delay={idx * 40}>
                <div className="flex items-start gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm text-primary-foreground/85">{i}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Key Fishing Locations in Dubai"
          subtitle="Enjoy your __fishing trip in Dubai__ across a range of top sea locations. The fishing zone is selected based on sea state, weather, and target species."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {locations.map((l, i) => (
            <Reveal key={l.n} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold-deep">
                    <Anchor className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold text-primary">{l.n}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{l.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fishing techniques */}
      <section className="bg-gradient-to-b from-muted via-background to-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="Top Fishing Techniques in Dubai"
            subtitle="Four techniques our crew uses to land the best possible catch."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {fishingTechniques.map((t, i) => (
              <Reveal key={t.n} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe transition-transform hover:-translate-y-1">
                  <Target className="mb-3 h-7 w-7 text-gold-deep" />
                  <h3 className="text-base font-bold text-primary">{t.n}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fish species you can catch */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Fish Species You Can Catch in Dubai"
          subtitle="The top species available in Arabian Gulf waters year-round."
        />
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {fishSpecies.map((s, i) => (
            <Reveal key={s} delay={i * 30}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10">
                <Sparkles className="h-3 w-3 text-gold-deep" />
                {s}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="How to Book a Fishing Trip in Dubai"
            subtitle="Simple steps to book a great fishing trip in Dubai."
          />
          <BookingSteps steps={stepsFishing} />
        </div>
      </section>

      <section className="bg-gradient-to-b from-muted via-background to-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="Everything to Know Before Your Fishing Trip"
            subtitle="Golden tips from the crew for a successful trip, plus who our trips suit best."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tips card — dark navy */}
            <Reveal>
              <div className="group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-primary-deep via-primary to-primary-deep p-8 shadow-luxe ring-1 ring-gold/20 md:p-10">
                {/* Decorative wave */}
                <Waves aria-hidden className="absolute -end-8 -top-8 h-40 w-40 text-gold/10 transition-transform duration-700 group-hover:rotate-12" />
                <div className="relative">
                  <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold">
                    <Waves className="h-4 w-4" />
                    Crew Tips
                  </div>
                  <h3 className="text-2xl font-extrabold text-primary-foreground md:text-3xl">Tips for a Successful Fishing Trip</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70">Direct guidance from the crew for the best fishing experience.</p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Book early, especially for weekends and holidays.",
                      "Arrive at the marina at least 15 minutes before your slot.",
                      "Check the weather the day before your trip.",
                      "Bring a valid ID (passport or Emirates ID).",
                      "Wear comfortable clothing and non-slip shoes.",
                      "Listen to the crew's safety briefing before departure.",
                    ].map((t, i) => (
                      <li
                        key={t}
                        className="flex items-start gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-3 text-sm text-primary-foreground/90 backdrop-blur-sm"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-xs font-black text-primary-deep">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Who card — light gold accent */}
            <Reveal delay={120}>
              <div className="group relative h-full overflow-hidden rounded-3xl bg-card p-8 shadow-luxe ring-1 ring-gold/25 md:p-10">
                <Users aria-hidden className="absolute -start-8 -bottom-8 h-40 w-40 text-gold/10 transition-transform duration-700 group-hover:-rotate-12" />
                <div className="relative">
                  <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-deep">
                    <Users className="h-4 w-4" />
                    Who It's For
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground md:text-3xl">Who Our Fishing Trips Suit</h3>
                  <p className="mt-2 text-sm text-muted-foreground">From families to companies — our trips suit everyone.</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      { t: "Families", d: "Shared morning trips" },
                      { t: "Friends", d: "Private boat trips" },
                      { t: "Pros", d: "Deep-water trips" },
                      { t: "Tourists", d: "Experience from Dubai Marina" },
                      { t: "Corporates", d: "Group trips on the yacht" },
                      { t: "Beginners", d: "Crew teaches you from scratch" },
                    ].map((it) => (
                      <li
                        key={it.t}
                        className="group/it rounded-xl border border-border bg-muted/40 p-3 transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/5"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          {it.t}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{it.d}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FishingEssentialsTabs />

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading
          title="Frequently Asked Questions About Yacht Rental in Dubai"
          subtitle="Answers to the most common questions on yacht rental in Dubai — pricing, booking, duration, what's included, and everything to know before you sail."
        />
        <Accordion items={fishingFaqs} />
      </section>

      <ContactCta
        title="Book a Fishing Trip Today"
        subtitle="Get in touch to pick the best trip for you and check date availability."
      />

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="Top Yacht and Cruise Searches in Dubai"
          subtitle="Explore the most-searched terms for fishing trips and sea experiences in Dubai — find what fits you in seconds."
        />
        <KeywordCloud items={keywordCloud["/fishing-trip-dubai/"].map((k) => ({ keyword: k, to: "/fishing-trip-dubai/" }))} />
      </section>
    </>
  );
}
