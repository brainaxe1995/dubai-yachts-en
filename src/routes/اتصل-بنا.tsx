import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/اتصل-بنا")({
  head: () => ({
    meta: [
      { title: "اتصل بنا | توت فن لليخوت" },
      {
        name: "description",
        content: "اتصل بنا لحجز يختك، معرفة الأسعار والباقات، واختيار الرحلة المناسبة لك مع توت فن لليخوت.",
      },
      { property: "og:title", content: "اتصل بنا | توت فن لليخوت" },
      { property: "og:description", content: "تواصل مع فريق توت فن لليخوت للحجز والاستفسارات في دبي." },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/اتصل-بنا" },
    ],
    links: [{ rel: "canonical", href: "https://doc-whisperer-750.lovable.app/اتصل-بنا" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "توت فن لليخوت",
          alternateName: "Toot Fun Yacht Rental",
          url: "https://doc-whisperer-750.lovable.app/اتصل-بنا",
          image: "https://doc-whisperer-750.lovable.app/favicon.png",
          telephone: CONTACT.phone,
          email: CONTACT.email,
          priceRange: "AED 400+",
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
                "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          ],
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Phone, t: "الهاتف", v: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
    { icon: MessageCircle, t: "واتساب", v: "تواصل فوري للحجز", href: CONTACT.whatsapp },
    { icon: Mail, t: "البريد الإلكتروني", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, t: "الموقع", v: "مارينا دبي، الإمارات", href: undefined },
    { icon: Clock, t: "أوقات العمل", v: "يوميًا 24 ساعة", href: undefined },
  ];

  return (
    <>
      <PageHero
        compact
        eyebrow="اتصل بنا"
        title="اتصل بنا لحجز يختك في دبي"
        subtitle="تواصل مع فريق توت فن لليخوت لمعرفة الأسعار والباقات واختيار اليخت المناسب لرحلتك أو مناسبتك."
      />
      <section className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <SectionHeading title="طرق التواصل معنا" />
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
    </>
  );
}
