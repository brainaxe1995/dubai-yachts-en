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
  ArrowLeft,
} from "lucide-react";
import { Reveal } from "./Reveal";
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

// -------- Panel 1: Included — uniform grid, first card featured navy --------

function IncludedPanel({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => {
        const featured = i === 0;
        const Icon = it.icon;
        if (featured) {
          return (
            <Reveal key={it.t}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-primary-deep via-primary to-primary-deep p-5 text-primary-foreground shadow-luxe">
                <div aria-hidden className="absolute -end-10 -top-10 h-32 w-32 rounded-full bg-gold/20 blur-3xl" />
                <span className="relative mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-primary-deep shadow-md">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="relative text-sm font-extrabold">{it.t}</h3>
                <p className="relative mt-1.5 text-xs leading-relaxed text-primary-foreground/80">{it.d}</p>
                <span className="relative mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold">
                  <Sparkles className="h-2.5 w-2.5" />
                  الأساس في كل رحلة
                </span>
              </div>
            </Reveal>
          );
        }
        return (
          <Reveal key={it.t} delay={60 + i * 40}>
            <div className="group h-full rounded-2xl border border-border bg-card p-5 shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
              <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-sm font-bold text-foreground">{it.t}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{it.d}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

// -------- Panel 2: What to bring — numbered steps horizontal --------

function BringSteps({ items }: { items: Item[] }) {
  return (
    <div className="relative">
      {/* Connector line — centered through icon (top-8 = 32px = icon center of h-16) */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-8 hidden h-px bg-gradient-to-l from-gold/0 via-gold/50 to-gold/0 md:block"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-4 lg:gap-6">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 80}>
            <div className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
              <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md ring-[6px] ring-muted transition-transform duration-500 group-hover:scale-110">
                <it.icon className="h-7 w-7" />
                <span className="absolute -end-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-primary-deep text-[10px] font-black text-gold ring-2 ring-muted">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{it.t}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// -------- Panel 3: Destinations — masonry-style image tiles --------

function DestinationsMasonry({ items }: { items: Destination[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d, i) => (
        <Reveal key={d.en} delay={i * 60}>
          <a
            href="#book"
            className="group relative block h-full min-h-[240px] overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20"
          >
            <img
              src={d.img}
              alt={d.t}
              loading="lazy"
              width={800}
              height={600}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground sm:p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-deep">
                {d.en}
              </span>
              <h3 className="mt-2 text-lg font-extrabold leading-tight sm:text-xl">{d.t}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/85 line-clamp-2">{d.d}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-gold transition-transform duration-500 group-hover:translate-x-1">
                استكشف الوجهة
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

// -------- Panel heading --------

function PanelHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto mb-8 flex max-w-2xl flex-col items-center gap-3 text-center md:mb-10">
      <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-bold text-gold-deep">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        {eyebrow}
      </span>
      <h2 className="text-xl font-extrabold text-primary md:text-2xl">{title}</h2>
      <span className="block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
      <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{subtitle}</p>
    </div>
  );
}

/**
 * Three-panel essentials block for category pages.
 * Each panel uses a distinct, responsive visual treatment.
 */
export function CharterEssentials({ showDestinations = true }: { showDestinations?: boolean }) {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="space-y-16 md:space-y-24">
          <div>
            <PanelHeading
              eyebrow="مشمول في السعر"
              title="ما هو مشمول في السعر"
              subtitle="كل رحلة تشمل الأساسيات — بدون رسوم مخفية أو إضافات مفاجئة."
            />
            <IncludedPanel items={included} />
          </div>

          <div>
            <PanelHeading
              eyebrow="حقيبتك الذكية"
              title="ماذا تحضر معك"
              subtitle="أربع خطوات بسيطة تحضّرك لتجربة كاملة على متن اليخت."
            />
            <BringSteps items={bring} />
          </div>

          {showDestinations ? (
            <div>
              <PanelHeading
                eyebrow="مسارات الإبحار"
                title="أشهر الوجهات التي نبحر إليها"
                subtitle="أيقونات دبي البحرية — يمكن تخصيص المسار بالكامل مع القبطان."
              />
              <DestinationsMasonry items={destinations} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
