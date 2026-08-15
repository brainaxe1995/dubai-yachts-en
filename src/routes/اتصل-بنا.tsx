import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { KeywordCloud } from "@/components/KeywordCloud";
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
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h3 className="text-xl font-bold text-foreground md:text-2xl">أرسل استفسارك</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                املأ النموذج التالي وسنعاود التواصل معك خلال أقل من ساعة. للحجز الفوري استخدم زر واتساب.
              </p>
              <form
                className="mt-6 grid gap-4"
                action={CONTACT.whatsapp}
                method="get"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="الاسم الكامل"
                    className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="رقم الهاتف"
                    className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="البريد الإلكتروني (اختياري)"
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <select
                    name="service"
                    className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold"
                  >
                    <option value="">نوع الخدمة</option>
                    <option>تأجير يخت</option>
                    <option>حفلة على يخت</option>
                    <option>رحلة صيد</option>
                    <option>باقة عشاء / إفطار</option>
                    <option>حفل زفاف / طلب زواج</option>
                  </select>
                  <input
                    type="date"
                    name="date"
                    className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <textarea
                  name="text"
                  rows={5}
                  placeholder="تفاصيل الحجز أو الاستفسار"
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-deep"
                >
                  إرسال الاستفسار عبر واتساب
                </button>
              </form>
            </Reveal>

            <Reveal delay={120}>
              <h3 className="text-xl font-bold text-foreground md:text-2xl">أسئلة شائعة قبل التواصل</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                إجابات سريعة على أكثر الأسئلة التي يطرحها ضيوفنا قبل الحجز.
              </p>
              <div className="mt-6">
                <Accordion items={faqs.slice(0, 5)} />
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
        <div className="overflow-hidden rounded-2xl border border-border shadow-luxe">
          <iframe
            title="موقعنا في دبي مارينا"
            src="https://www.google.com/maps?q=Dubai+Marina&output=embed"
            width="100%"
            height="380"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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
