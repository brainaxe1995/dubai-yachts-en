import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactCta } from "@/components/ContactCta";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap | Toot Fun Yacht Rental Dubai" },
      {
        name: "description",
        content:
          "Browse the Toot Fun Yachts sitemap to easily find pages for yacht rentals, parties, sea cruises, and packages available in Dubai.",
      },
      { property: "og:title", content: "Sitemap | Toot Fun Yachts" },
      { property: "og:description", content: "Links to every page and service on Toot Fun Yachts in Dubai." },
      { property: "og:url", content: "https://tootfunyachts.com/sitemap/" },
    ],
    links: [
      { rel: "canonical", href: "https://tootfunyachts.com/sitemap/" },
      { rel: "alternate", hrefLang: "en", href: "https://tootfunyachts.com/sitemap/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://tootfunyachts.com/sitemap/" },
    ],
  }),
  component: Sitemap,
});

const groups = [
  {
    title: "Core services",
    links: [
      { to: "/", label: "Home" },
      { to: "/yacht-rental-dubai", label: "Yacht rental in Dubai" },
      { to: "/rent-a-yacht-dubai", label: "Yacht hire in Dubai" },
      { to: "/yacht-booking-dubai", label: "Yacht booking in Dubai" },
      { to: "/yacht-charter-dubai", label: "Yachts for rent in Dubai" },
    ],
  },
  {
    title: "Parties & packages",
    links: [
      { to: "/yacht-party-dubai", label: "Yacht parties in Dubai" },
      { to: "/yacht-packages-dubai", label: "Yacht packages & offers" },
      { to: "/fishing-trip-dubai", label: "Fishing trips in Dubai" },
    ],
  },
  {
    title: "About the company",
    links: [
      { to: "/about-us", label: "About us" },
      { to: "/blog", label: "Blog" },
      { to: "/contact-us", label: "Contact us" },
    ],
  },
  {
    title: "Terms & policies",
    links: [
      { to: "/terms-and-conditions", label: "Terms and conditions" },
      { to: "/privacy-policy", label: "Privacy policy" },
      { to: "/cancellation-policy", label: "Cancellation policy" },
    ],
  },
] as const;

function Sitemap() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Sitemap"
        title="Sitemap"
        subtitle="Browse the Toot Fun sitemap to easily find pages for yacht rentals, parties, sea cruises, fishing, and packages available in Dubai."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="Explore every Toot Fun yacht rental service in Dubai"
          subtitle="Browse our full range of services and pick what fits — yacht rentals, party packages, fishing trips, and private sea experiences in Dubai."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 90}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
                <h3 className="mb-4 border-b border-border pb-3 text-lg font-bold text-gold-deep">{g.title}</h3>
                <ul className="space-y-2">
                  {g.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted hover:text-gold-deep"
                      >
                        <span className="text-gold">←</span>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
