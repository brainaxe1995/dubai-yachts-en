import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { KeywordCloud } from "@/components/KeywordCloud";
import { SmartContactForm } from "@/components/SmartContactForm";
import { CONTACT, faqs, keywordCloudFlat } from "@/data/site";

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
      { property: "og:url", content: "https://dubai-yacht.ae/اتصل-بنا/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/اتصل-بنا/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/اتصل-بنا/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/اتصل-بنا/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "توت فن لليخوت",
          alternateName: "Toot Fun Yacht Rental",
          url: "https://dubai-yacht.ae/اتصل-بنا/",
          image: "https://dubai-yacht.ae/favicon.png",
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

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="طرق التواصل معنا"
          subtitle="اختر الوسيلة الأنسب لك — واتساب، هاتف، بريد إلكتروني، أو زيارة لمارينا دبي."
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
            title="نموذج استفسار سريع وأسئلة شائعة"
            subtitle="أرسل استفسارك عبر النموذج أو تصفّح الأسئلة الشائعة للحصول على إجابات فورية قبل التواصل معنا."
          />
          <div className="space-y-10">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-luxe md:p-10">
                <h3 className="text-xl font-bold text-foreground md:text-2xl">أرسل استفسارك</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  املأ النموذج التالي وسنعاود التواصل معك خلال أقل من ساعة. للحجز الفوري استخدم زر واتساب.
                </p>
                <div className="mt-6">
                  <SmartContactForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-luxe md:p-10">
                <h3 className="text-xl font-bold text-foreground md:text-2xl">أسئلة شائعة قبل التواصل</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  إجابات سريعة على أكثر الأسئلة التي يطرحها ضيوفنا قبل الحجز.
                </p>
                <div className="mt-6">
                  <Accordion items={faqs.slice(0, 5)} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          title="زُرنا في دبي مارينا"
          subtitle="مكاتبنا ومرسى انطلاق اليخوت في قلب دبي مارينا — قريب من عين دبي و JBR."
        />
        <div className="group relative overflow-hidden rounded-3xl border border-gold/30 shadow-luxe">
          {/* Gold gradient decorative border */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-4 ring-gold/10 ring-inset" />
          <iframe
            title="موقعنا في دبي مارينا — توت فن لليخوت"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.501044656973!2d55.1489261!3d25.084895199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b1214477091%3A0xee255d5c8937fdd6!2sToot%20Fun%20Yachts%20-%20Yacht%20Rental%20Dubai%20Marina!5e0!3m2!1sen!2sbd!4v1787041551994!5m2!1sen!2sbd"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[420px] w-full grayscale transition-all duration-700 group-hover:grayscale-0"
          />
          <a
            href="https://maps.app.goo.gl/YdWJEY77WLmcdDBT9?g_st=awb"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute end-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary-deep px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg ring-1 ring-gold/40 transition-transform hover:scale-105"
          >
            <MapPin className="h-4 w-4 text-gold" />
            افتح في خرائط Google
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <SectionHeading
          title="أشهر عمليات البحث عن اليخوت والرحلات البحرية في دبي"
          subtitle="اكتشف أكثر عمليات البحث شيوعًا حول تأجير اليخوت والرحلات البحرية في دبي للوصول بسرعة إلى الخدمة أو التجربة التي تناسبك."
        />
        <KeywordCloud items={keywordCloudFlat} />
      </section>
    </>
  );
}
