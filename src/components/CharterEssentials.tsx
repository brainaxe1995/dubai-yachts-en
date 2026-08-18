import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Fuel,
  Music2,
  LifeBuoy,
  Utensils,
  Wine,
  Snowflake,
  Shield,
  Sun,
  Shirt,
  Sparkles,
  Camera,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./PageHero";
import marinaImg from "@/assets/yachts/majesty-88.webp";
import palmImg from "@/assets/yachts/floating-100.webp";
import burjImg from "@/assets/yachts/gulfcraft-90.webp";
import atlantisImg from "@/assets/yachts/azimut-80.webp";
import ainImg from "@/assets/yachts/ferretti-78.webp";
import jbrImg from "@/assets/yachts/houseboat-55.webp";

type Item = { icon: LucideIcon; t: string; d: string };

const included: Item[] = [
  { icon: Anchor, t: "قبطان وطاقم محترف", d: "قبطان مرخّص مع طاقم مدرّب يهتم براحتك طوال الرحلة." },
  { icon: Fuel, t: "وقود بدون حدود", d: "الوقود مشمول ضمن السعر — لا رسوم مخفية." },
  { icon: Utensils, t: "أدوات ضيافة", d: "أطباق، أكواب، أدوات مائدة، ثلج، ومياه معدنية." },
  { icon: Wine, t: "مشروبات باردة", d: "مياه ومشروبات غازية مجانية — شمبانيا وعصائر طازجة كإضافة." },
  { icon: Music2, t: "نظام صوت ممتاز", d: "بلوتوث ومكبرات صوت عالية الجودة — اربط قائمتك المفضلة." },
  { icon: LifeBuoy, t: "أمان كامل", d: "سترات نجاة، طفايات حريق، ومعدات إسعافات أولية معتمدة." },
  { icon: Shield, t: "تأمين ورخصة", d: "اليخت مؤمّن بالكامل ومرخّص من هيئة موانئ دبي." },
  { icon: Snowflake, t: "تكييف داخلي", d: "مقصورات مبرّدة للاستراحة بعيدًا عن حرارة النهار." },
];

const bring: Item[] = [
  { icon: Sun, t: "واقي شمس", d: "شمس دبي قوية على البحر — SPF 50+ ضروري خلال ساعات النهار." },
  { icon: Shirt, t: "ملابس مريحة", d: "قماش خفيف نهارًا، وسترة خفيفة للسهرات على السطح." },
  { icon: Sparkles, t: "طعامك المفضل", d: "مسموح إحضار طعامك ومشروباتك بدون رسوم إضافية." },
  { icon: Camera, t: "كاميرا أو هاتف", d: "لحظات الغروب على أفق دبي تستحق التوثيق." },
];

type Destination = { img: string; t: string; d: string; en: string };
const destinations: Destination[] = [
  { img: marinaImg, t: "مرسى دبي", en: "Dubai Marina", d: "نقطة الانطلاق الأشهر — ناطحات السحاب من الماء." },
  { img: palmImg, t: "نخلة جميرا", en: "Palm Jumeirah", d: "أطول جزيرة اصطناعية بالعالم — منظر جوي من البحر." },
  { img: burjImg, t: "برج العرب", en: "Burj Al Arab", d: "أفضل زاوية تصوير لأشهر فنادق العالم." },
  { img: atlantisImg, t: "أتلانتس النخلة", en: "Atlantis The Palm", d: "منتجع فاخر يطل على مياه الخليج." },
  { img: ainImg, t: "عين دبي", en: "Ain Dubai", d: "أكبر عجلة مراقبة بالعالم — إضاءة ليلية ساحرة." },
  { img: jbrImg, t: "شاطئ JBR", en: "JBR Beach", d: "الكورنيش الحديث ومارينا الجديدة — إبحار هادئ." },
];

// -------- Panel 1: Included — Bento with hero card + smaller cards --------

function IncludedBento({ items }: { items: Item[] }) {
  const hero = items[0];
  const rest = items.slice(1);
  const HeroIcon = hero.icon;
  return (
    <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
      {/* Featured card spans 2×2 */}
      <Reveal className="lg:col-span-2 lg:row-span-2">
        <div className="relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-primary-deep via-primary to-primary-deep p-8 text-primary-foreground shadow-luxe">
          <div className="absolute -end-8 -top-8 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute -bottom-10 -start-10 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-primary-deep shadow-md">
            <HeroIcon className="h-7 w-7" />
          </span>
          <h4 className="text-2xl font-extrabold md:text-3xl">{hero.t}</h4>
          <p className="mt-3 text-sm leading-loose text-primary-foreground/85 md:text-base">{hero.d}</p>
          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
            <Sparkles className="h-3 w-3" />
            الأساس في كل رحلة
          </span>
        </div>
      </Reveal>
      {rest.map((it, i) => (
        <Reveal key={it.t} delay={40 + i * 40}>
          <div className="group h-full rounded-2xl border border-border bg-card p-5 shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <it.icon className="h-5 w-5" />
            </span>
            <h4 className="text-sm font-bold text-foreground">{it.t}</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{it.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// -------- Panel 2: What to bring — timeline strip --------

function BringTimeline({ items }: { items: Item[] }) {
  return (
    <div className="relative">
      {/* Connector line */}
      <div aria-hidden className="absolute inset-x-0 top-8 hidden h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent md:block" />
      <div className="grid gap-6 md:grid-cols-4 md:gap-8">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 60}>
            <div className="relative flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md ring-4 ring-muted">
                <it.icon className="h-7 w-7" />
              </span>
              <span className="mt-2 text-[11px] font-bold uppercase tracking-widest text-gold-deep">
                خطوة {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-1 text-base font-bold text-foreground">{it.t}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// -------- Panel 3: Destinations — image tiles --------

function DestinationsTiles({ items }: { items: Destination[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d, i) => (
        <Reveal key={d.en} delay={i * 50}>
          <a
            href="#book"
            className="group relative block h-64 overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20"
          >
            <img
              src={d.img}
              alt={d.t}
              loading="lazy"
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold">
                {d.en}
              </span>
              <h4 className="mt-1 text-lg font-extrabold md:text-xl">{d.t}</h4>
              <p className="mt-1 text-xs leading-relaxed text-primary-foreground/80 line-clamp-2">
                {d.d}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                استكشف الوجهة
                <span aria-hidden>←</span>
              </span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

// -------- Wrapper --------

function PanelHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8 flex flex-col items-start gap-3 md:mb-10">
      <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-bold text-gold-deep">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        {eyebrow}
      </span>
      <div>
        <h3 className="text-2xl font-extrabold text-primary md:text-3xl">{title}</h3>
        <span className="mt-2 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Three-panel essentials block for category pages.
 * Each panel uses a distinct visual treatment so the section never feels repetitive.
 */
export function CharterEssentials({ showDestinations = true }: { showDestinations?: boolean }) {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <SectionHeading
          title="كل ما تحتاج معرفته قبل الإبحار"
          subtitle="ما هو مشمول في السعر، ماذا تحضر معك، وأشهر الوجهات التي نبحر إليها."
        />
        <div className="space-y-16 md:space-y-24">
          <div>
            <PanelHeading
              eyebrow="مشمول في السعر"
              title="ما هو مشمول في السعر"
              subtitle="كل رحلة تشمل الأساسيات — بدون رسوم مخفية أو إضافات مفاجئة."
            />
            <IncludedBento items={included} />
          </div>

          <div>
            <PanelHeading
              eyebrow="حقيبتك الذكية"
              title="ماذا تحضر معك"
              subtitle="أربع خطوات بسيطة تحضّرك لتجربة كاملة على متن اليخت."
            />
            <BringTimeline items={bring} />
          </div>

          {showDestinations ? (
            <div>
              <PanelHeading
                eyebrow="مسارات الإبحار"
                title="أشهر الوجهات التي نبحر إليها"
                subtitle="أيقونات دبي البحرية — يمكن تخصيص المسار بالكامل مع القبطان."
              />
              <DestinationsTiles items={destinations} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
