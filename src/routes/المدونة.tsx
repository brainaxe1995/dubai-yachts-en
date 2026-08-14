import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import yacht1 from "@/assets/yacht-1.jpg";
import partyImg from "@/assets/party.jpg";
import fishingImg from "@/assets/fishing.jpg";

export const Route = createFileRoute("/المدونة")({
  head: () => ({
    meta: [
      { title: "المدونة | نصائح ودليل تأجير اليخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "اكتشف المدونة وتعرّف على أحدث النصائح والأفكار حول تأجير اليخوت، الرحلات البحرية، حفلات اليخوت، ورحلات الصيد في دبي.",
      },
      { property: "og:title", content: "المدونة | دليل تأجير اليخوت في دبي" },
      { property: "og:description", content: "نصائح وأفكار حول الرحلات البحرية وحفلات اليخوت في دبي." },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/المدونة" },
    ],
    links: [
      { rel: "canonical", href: "https://doc-whisperer-750.lovable.app/المدونة" },
      { rel: "alternate", hreflang: "ar", href: "https://doc-whisperer-750.lovable.app/المدونة" },
      { rel: "alternate", hreflang: "x-default", href: "https://doc-whisperer-750.lovable.app/المدونة" },
    ],
  }),
  component: Blog,
});

const posts = [
  {
    img: yacht1,
    t: "دليل اختيار اليخت المناسب لرحلتك في دبي",
    d: "كيف تختار حجم اليخت وعدد الساعات المناسب حسب عدد ضيوفك ونوع مناسبتك.",
  },
  {
    img: partyImg,
    t: "أفكار لحفلة عيد ميلاد لا تُنسى على يخت",
    d: "ديكورات، كيك، موسيقى وتنسيق كامل لحفلة مميزة وسط البحر.",
  },
  {
    img: fishingImg,
    t: "أفضل أوقات رحلات صيد السمك في دبي",
    d: "نصائح عملية حول الطقس، المواعيد، والتجهيزات قبل الانطلاق.",
  },
];

function Blog() {
  return (
    <>
      <PageHero
        compact
        eyebrow="المدونة"
        title="المدونة"
        subtitle="اكتشف أحدث النصائح والأفكار حول تأجير اليخوت، الرحلات البحرية، حفلات اليخوت، ورحلات الصيد في دبي."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أحدث مقالات ونصائح اليخوت في دبي"
          subtitle="اكتشف أحدث المقالات والنصائح حول تأجير اليخوت، حفلات اليخوت، رحلات الصيد، والتجارب البحرية في دبي."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal as="article" key={p.t} delay={i * 80}>
              <div className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-luxe">
                <img src={p.img} alt={p.t} loading="lazy" width={1200} height={800} className="aspect-[3/2] w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-lg text-foreground">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
