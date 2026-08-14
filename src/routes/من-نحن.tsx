import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CallButton, BookButton } from "@/components/CtaButtons";
import yacht1 from "@/assets/yacht-1.jpg";

export const Route = createFileRoute("/من-نحن")({
  head: () => ({
    meta: [
      { title: "من نحن | توت فن لليخوت" },
      {
        name: "description",
        content:
          "تعرّف على من نحن في توت فن لليخوت، وخبرتنا في تقديم خدمات تأجير اليخوت والرحلات البحرية الفاخرة في دبي.",
      },
      { property: "og:title", content: "من نحن | توت فن لليخوت" },
      { property: "og:description", content: "خبرتنا في تأجير اليخوت والرحلات البحرية الفاخرة في دبي." },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/من-نحن" },
    ],
    links: [{ rel: "canonical", href: "https://doc-whisperer-750.lovable.app/من-نحن" }],
  }),
  component: About,
});

const stats = [
  { n: "+10", l: "يخوت وقوارب فاخرة" },
  { n: "400 د.إ", l: "تبدأ الأسعار من" },
  { n: "24/7", l: "خدمة عملاء" },
  { n: "+1000", l: "رحلة بحرية" },
];

function About() {
  return (
    <>
      <PageHero
        compact
        eyebrow="عن الشركة"
        title="من نحن"
        subtitle="تعرّف على من نحن في توت فن لليخوت، وخبرتنا في تقديم خدمات تأجير اليخوت والرحلات البحرية الفاخرة في دبي."
      >
        <CallButton label="تواصل معنا" />
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <img
              src={yacht1}
              alt="أسطول توت فن لليخوت في دبي"
              loading="lazy"
              width={1200}
              height={800}
              className="rounded-2xl object-cover shadow-luxe"
            />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-2xl text-foreground md:text-3xl">من نحن في توت فن لليخوت</h2>
            <p className="mt-4 text-sm leading-loose text-muted-foreground md:text-base">
              نقدّم خدمات تأجير اليخوت والرحلات البحرية الخاصة في دبي مع أسطول متنوع وطاقم محترف. نحرص على تقديم تجربة
              بحرية آمنة ومريحة تناسب جميع المناسبات، من الرحلات العائلية والجولات الخاصة إلى الحفلات ورحلات الصيد.
            </p>
            <p className="mt-3 text-sm leading-loose text-muted-foreground md:text-base">
              نؤمن بالشفافية في الأسعار ووضوح التفاصيل قبل الحجز، مع دعم متواصل على مدار الساعة لمساعدتك في اختيار اليخت
              والباقة الأنسب لك.
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

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading title="قيمنا في كل رحلة" subtitle="خدمة احترافية، أسعار واضحة، وتجربة بحرية لا تُنسى." />
      </section>
    </>
  );
}
