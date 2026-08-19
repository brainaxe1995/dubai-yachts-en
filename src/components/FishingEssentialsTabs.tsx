import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Clock,
  Fish,
  Anchor,
  Compass,
  Shield,
  GlassWater,
  Flame,
  Utensils,
  BadgeCheck,
  FileCheck2,
  Sun,
  Umbrella,
  Snowflake,
  Footprints,
  Waves,
  Pill,
  Camera,
  Music,
  BatteryFull,
  MapPin,
} from "lucide-react";
import { Reveal } from "./Reveal";

type Item = { icon: LucideIcon; t: string };

const included: Item[] = [
  { icon: Clock, t: "رحلة صيد سمك لمدة 4 ساعات في دبي" },
  { icon: Fish, t: "طُعم ومعدات الصيد" },
  { icon: Fish, t: "الصيد بطريقة الجيغينغ" },
  { icon: Anchor, t: "خطافات وخيوط الصيد" },
  { icon: Compass, t: "جهاز كشف الأسماك" },
  { icon: Fish, t: "الصيد بالتّرولينغ" },
  { icon: Fish, t: "صنارات الصيد وبكرات الصيد" },
  { icon: Fish, t: "جميع معدات الصيد اللازمة" },
  { icon: Shield, t: "معدات السلامة" },
  { icon: GlassWater, t: "المشروبات الغازية والمياه والثلج" },
  { icon: Flame, t: "الصيد والشوي على متن اليخت أو القارب" },
  { icon: Utensils, t: "أدوات المائدة – أطباق وأكواب وأدوات تناول الطعام" },
  { icon: BadgeCheck, t: "قبطان وطاقم ذو خبرة" },
  { icon: FileCheck2, t: "يشمل الترخيص والتأمين والوقود" },
];

const bring: Item[] = [
  { icon: Clock, t: "جواز السفر الأصلي أو بطاقة الهوية الإماراتية مطلوبة." },
  { icon: Sun, t: "كريم واقي شمس" },
  { icon: Umbrella, t: "ملابس بأكمام طويلة وقبعة." },
  { icon: Snowflake, t: "جاكيت خفيف خلال أشهر الشتاء." },
  { icon: Footprints, t: "أحذية رياضية أو صنادل بنعال مطاطية." },
  { icon: Waves, t: "ملابس سباحة إذا كنت ترغب في السباحة." },
  { icon: Pill, t: "أقراص دوار البحر إذا لزم الأمر." },
  { icon: Camera, t: "كاميرات للتصوير." },
  { icon: Music, t: "هواتف محمولة تحتوي على موسيقاك المفضلة." },
  { icon: BatteryFull, t: "شواحن وبطاريات إضافية." },
];

const sites: string[] = [
  "دبي مارينا",
  "شاطئ جي بي آر (جميرا بيتش ريزيدنس)",
  "نخلة جميرا",
  "فندق أتلانتس بالم",
  "مناطق الصيد في البحر المفتوح لصيد أعماق البحر",
];

type TabId = "included" | "bring" | "sites";
const TABS: { id: TabId; label: string }[] = [
  { id: "included", label: "ما الذي يشمله الحجز؟" },
  { id: "bring", label: "ما تحتاجه قبل الرحلة" },
  { id: "sites", label: "المواقع الرئيسية" },
];

function IconList({ items }: { items: Item[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.t + i} delay={i * 30}>
          <li className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-luxe transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md">
              <it.icon className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span className="pt-1.5 text-sm font-semibold leading-relaxed text-foreground">{it.t}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export function FishingEssentialsTabs() {
  const [active, setActive] = useState<TabId>("included");

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="mx-auto flex max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-luxe">
          {TABS.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.id)}
                className={`flex-1 px-3 py-4 text-sm font-bold transition-all sm:text-base ${
                  isActive ? "bg-gold text-primary-deep shadow-inner" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          {active === "included" ? (
            <Reveal key="included">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">ما الذي تشمله رحلات صيد سمك في دبي؟</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  استمتع بتجربة صيد بحري متكاملة في دبي مع كل ما تحتاجه لرحلة ممتعة وناجحة.
                </p>
              </div>
              <IconList items={included} />
            </Reveal>
          ) : null}

          {active === "bring" ? (
            <Reveal key="bring">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">ما تحتاجه قبل رحلة الصيد في دبي</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  حجز رحلة الصيد في دبي سهل وبسيط. اختر مدة الرحلة، وأكد عدد الضيوف، وأحضر بطاقة هوية سارية، واستعد للاستمتاع بتجربة صيد بحري ممتعة ومريحة في أعماق البحر.
                </p>
              </div>
              <IconList items={bring} />
            </Reveal>
          ) : null}

          {active === "sites" ? (
            <Reveal key="sites">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
                  أهم المواقع التي يمكنك الوصول إليها خلال رحلة الصيد في دبي
                </h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  استمتع بتجربة الصيد في أعماق البحر في دبي أثناء استكشاف أشهر مواقع الصيد البحرية والاستمتاع بالمناظر الساحلية الخلابة.
                </p>
              </div>
              <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
                {sites.map((s, i) => (
                  <Reveal key={s} delay={i * 50}>
                    <li className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-luxe transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md">
                        <MapPin className="h-5 w-5" strokeWidth={2.25} />
                      </span>
                      <span className="text-sm font-semibold text-foreground">{s}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
