import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { KeywordCloud } from "@/components/KeywordCloud";
import { SmartContactForm } from "@/components/SmartContactForm";
import { faqSchema } from "@/components/SeoJsonLd";
import { CONTACT, faqs, keywordCloudFlat } from "@/data/site";
import pageHero from "@/assets/heroes/contact-us.webp";

const contactFaqs = faqs.slice(0, 5);

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us | Toot Fun Yachts Dubai" },
      {
        name: "description",
        content: "Contact us to book your yacht, check prices and packages, and choose the right trip with Toot Fun Yachts.",
      },
      { property: "og:title", content: "Contact Us | Toot Fun Yachts Dubai" },
      { property: "og:description", content: "Contact us to book your yacht, check prices and packages, and choose the right trip with Toot Fun Yachts." },
      { property: "og:url", content: "https://dubai-yachts.ae/contact-us/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yachts.ae/contact-us/" },
      { rel: "alternate", hrefLang: "en", href: "https://dubai-yachts.ae/contact-us/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yachts.ae/contact-us/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Toot Fun Yachts",
          alternateName: "Toot Fun Yacht Rental",
          url: "https://dubai-yachts.ae/contact-us/",
          image: "https://dubai-yachts.ae/favicon.png",
          telephone: CONTACT.phone,
          email: CONTACT.email,
          priceRange: "AED 450+",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Dubai Marina",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
          areaServed: "Dubai, United Arab Emirates",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          ],
        }),
      },
      faqSchema(contactFaqs),
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Phone, t: "Phone", v: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
    { icon: MessageCircle, t: "WhatsApp", v: "Instant booking chat", href: CONTACT.whatsapp },
    { icon: Mail, t: "Email", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, t: "Location", v: "Dubai Marina, United Arab Emirates", href: undefined },
    { icon: Clock, t: "Working Hours", v: "24 hours daily", href: undefined },
  ];

  return (
    <>
      <PageHero
        compact
        image={pageHero}
        eyebrow="Contact Us"
        title="Contact Us"
        subtitle="Contact the Toot Fun Yachts team for bookings, inquiries, and help choose the right yacht for your trip in Dubai."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="Contact Us to Book Your Yacht in Dubai"
          subtitle="Contact the Toot Fun Yachts team to check prices and packages and choose the right yacht for your trip or special occasion."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const inner = (
              <div className="h-full rounded-2xl border border-border bg-card p-6 text-center transition-transform hover:-translate-y-1 shadow-luxe">
                <it.icon className="mx-auto mb-3 h-7 w-7 text-gold-deep" />
                <h3 className="text-base text-foreground">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.v}</p>
              </div>
            );
            return (
              <Reveal key={it.t} delay={i * 70}>
                {it.href ? (
                  <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Enquiry form + FAQ — single parent H2, two child H3 columns */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title="Quick Enquiry Form and FAQs"
            subtitle="Send an enquiry via the form or browse the FAQs for instant answers before reaching out."
          />
          <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-luxe md:p-8">
                <h3 className="text-xl font-bold text-foreground md:text-2xl">Send Your Enquiry</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Fill out the form below and we'll get back to you in under an hour. For instant booking, use the WhatsApp button.
                </p>
                <div className="mt-6">
                  <SmartContactForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-luxe md:p-8">
                <h3 className="text-xl font-bold text-foreground md:text-2xl">Common Questions Before You Reach Out</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Quick answers to the questions our guests ask most before booking.
                </p>
                <div className="mt-6">
                  <Accordion items={contactFaqs} titleAs="h4" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          title="Visit Us in Dubai Marina"
          subtitle="Our offices and yacht departure marina are in the heart of Dubai Marina — close to Ain Dubai and JBR."
        />
        <div className="group relative overflow-hidden rounded-3xl border border-gold/30 shadow-luxe">
          {/* Gold gradient decorative border */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-4 ring-gold/10 ring-inset" />
          <iframe
            title="Our location in Dubai Marina — Toot Fun Yachts"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.501044656973!2d55.1489261!3d25.084895199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b1214477091%3A0xee255d5c8937fdd6!2sToot%20Fun%20Yachts%20-%20Yacht%20Rental%20Dubai%20Marina!5e0!3m2!1sen!2sbd!4v1787041551994!5m2!1sen!2sbd"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[420px] w-full"
          />
          <a
            href="https://maps.app.goo.gl/YdWJEY77WLmcdDBT9?g_st=awb"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute end-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary-deep px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg ring-1 ring-gold/40 transition-transform hover:scale-105"
          >
            <MapPin className="h-4 w-4 text-gold" />
            Open in Google Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <SectionHeading
          title="Top Yacht and Cruise Searches in Dubai"
          subtitle="Explore the most-searched terms for yacht rental and sea trips in Dubai — find the service or experience you need in seconds."
        />
        <KeywordCloud items={keywordCloudFlat} />
      </section>
    </>
  );
}
