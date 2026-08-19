import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Fuel,
  Shield,
  GlassWater,
  Utensils,
  Music2,
  LifeBuoy,
  Snowflake,
  BadgeCheck,
  Clock,
  Sun,
  Shirt,
  Camera,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Reveal } from "./Reveal";

type Item = { icon: LucideIcon; t: string };

const included: Item[] = [
  { icon: Anchor, t: "قبطان وطاقم محترف طوال الرحلة" },
  { icon: Fuel, t: "الوقود مشمول ضمن السعر" },
  { icon: Shield, t: "التأمين الشامل والترخيص" },
  { icon: GlassWater, t: "مياه معدنية ومشروبات غازية" },
  { icon: Utensils, t: "أدوات مائدة كاملة (أطباق، أكواب، ثلج)" },
  { icon: Music2, t: "نظام صوت بلوتوث عالي الجودة" },
  { icon: LifeBuoy, t: "سترات نجاة ومعدات سلامة معتمدة" },
  { icon: Snowflake, t: "مقصورات مكيّفة داخلية" },
  { icon: BadgeCheck, t: "طاقم يتحدث العربية والإنجليزية" },
];

const bring: Item[] = [
  { icon: Clock, t: "جواز السفر الأصلي أو بطاقة الهوية الإماراتية." },
  { icon: Sun, t: "كريم واقي شمس (SPF 50+)." },
  { icon: Shirt, t: "ملابس صيفية خفيفة وسترة للسهرات." },
  { icon: Camera, t: "كاميرا أو هاتف لالتقاط الصور." },
  { icon: Sparkles, t: "طعامك أو مشروباتك الخاصة (مسموح بدون رسوم)." },
];

const sites: string[] = [
  "دبي مارينا",
  "شاطئ جي بي آر (جميرا بيتش ريزيدنس)",
  "عين دبي (جزيرة بلوواترز)",
  "نخلة جميرا",
  "فندق أتلانتس بالم",
  "برج العرب",
];

type TabId = "included" | "bring" | "sites";
const TABS: { id: TabId; label: string }[] = [
  { id: "included", label: "ما الذي يشمله الإيجار؟" },
  { id: "bring", label: "ما تحتاجه قبل الرحلة" },
  { id: "sites", label: "المواقع الرئيسية" },
];

function IconList({ items }: { items: Item[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.t} delay={i * 30}>
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

export function YachtEssentialsTabs() {
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
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">ما الذي يشمله إيجار اليخت في دبي؟</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  كل إيجار يخت لدينا في دبي يشمل كل ما تحتاجه لرحلة بحرية آمنة ومريحة — بدون رسوم مخفية.
                </p>
              </div>
              <IconList items={included} />
            </Reveal>
          ) : null}

          {active === "bring" ? (
            <Reveal key="bring">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">ما تحتاجه قبل رحلة اليخت في دبي</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  الاستعداد لرحلة يخت في دبي بسيط — أحضر بطاقة هوية سارية والأشياء التالية لتجربة كاملة على متن اليخت.
                </p>
              </div>
              <IconList items={bring} />
            </Reveal>
          ) : null}

          {active === "sites" ? (
            <Reveal key="sites">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
                  أهم المواقع التي يمكنك الوصول إليها عند إيجار يخت في دبي
                </h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  استمتع برحلة بحرية تمر عبر أشهر معالم دبي البحرية، مع إطلالات خلابة على أفق المدينة وأماكن مثالية
                  لالتقاط الصور طوال الرحلة.
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
