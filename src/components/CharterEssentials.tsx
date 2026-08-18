import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Users,
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
  Waves,
  MapPin,
  Camera,
  Star,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./PageHero";

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

const destinations: Item[] = [
  { icon: MapPin, t: "مرسى دبي (Dubai Marina)", d: "نقطة الانطلاق الأشهر — ناطحات السحاب من الماء." },
  { icon: Star, t: "نخلة جميرا", d: "أطول جزيرة اصطناعية بالعالم — منظر جوي من البحر." },
  { icon: Star, t: "برج العرب", d: "أفضل زاوية تصوير لأشهر فنادق العالم." },
  { icon: Star, t: "أتلانتس النخلة", d: "منتجع فاخر يطل على مياه الخليج." },
  { icon: Star, t: "عين دبي (Ain Dubai)", d: "أكبر عجلة مراقبة بالعالم — إضاءة ليلية ساحرة." },
  { icon: Waves, t: "شاطئ JBR وميناء دبي", d: "الكورنيش الحديث ومارينا الجديدة — إبحار هادئ." },
];

function Panel({ title, subtitle, items, cols = 4 }: { title: string; subtitle: string; items: Item[]; cols?: 2 | 3 | 4 }) {
  const colsClass = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-extrabold text-primary md:text-3xl">{title}</h3>
        <span className="mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{subtitle}</p>
      </div>
      <div className={`grid gap-4 ${colsClass}`}>
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 40}>
            <div className="group h-full rounded-2xl border border-border bg-card p-5 shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
              <span className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <it.icon className="h-5 w-5" />
              </span>
              <h4 className="text-base font-bold text-foreground">{it.t}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders the "what's included / what to bring / key destinations" trio — dense info block for category pages.
 */
export function CharterEssentials({
  showDestinations = true,
  variant = "full",
}: {
  showDestinations?: boolean;
  variant?: "full" | "compact";
}) {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <SectionHeading
          title="كل ما تحتاج معرفته قبل الإبحار"
          subtitle="ما هو مشمول في السعر، ماذا تحضر معك، وأشهر الوجهات التي نبحر إليها."
        />
        <div className="space-y-14 md:space-y-20">
          <Panel
            title="ما هو مشمول في السعر"
            subtitle="كل رحلة تشمل الأساسيات — بدون رسوم مخفية أو إضافات مفاجئة."
            items={included}
            cols={4}
          />
          <Panel
            title="ماذا تحضر معك"
            subtitle="أحضر هذه الأشياء البسيطة لتستمتع بتجربة كاملة على متن اليخت."
            items={bring}
            cols={variant === "compact" ? 2 : 4}
          />
          {showDestinations ? (
            <Panel
              title="أشهر الوجهات التي نبحر إليها"
              subtitle="مسارات الإبحار الأكثر شعبية — يمكن تخصيص المسار حسب رغبتك مع القبطان."
              items={destinations}
              cols={3}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
