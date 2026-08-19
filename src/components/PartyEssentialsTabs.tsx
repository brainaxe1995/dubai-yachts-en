import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  GlassWater,
  Utensils,
  BadgeCheck,
  FileCheck2,
  Clock,
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
  ChevronDown,
} from "lucide-react";
import { Reveal } from "./Reveal";

type Item = { icon: LucideIcon; t: string };

const included: Item[] = [
  { icon: GlassWater, t: "المشروبات الغازية والمياه والثلج" },
  { icon: Utensils, t: "أدوات المائدة – أطباق وأكواب وأدوات تناول الطعام" },
  { icon: BadgeCheck, t: "قبطان وطاقم ذو خبرة" },
  { icon: FileCheck2, t: "يخت مرخّص، تأمين، ووقود مشمولون" },
];

const bring: Item[] = [
  { icon: Clock, t: "جواز السفر الأصلي أو بطاقة الهوية الإماراتية مطلوبة." },
  { icon: Sun, t: "كريم واقي شمس" },
  { icon: Umbrella, t: "قبعة ونظارات شمسية" },
  { icon: Snowflake, t: "جاكيت خفيف خلال أشهر الشتاء." },
  { icon: Footprints, t: "أحذية رياضية أو صنادل بنعال مطاطية." },
  { icon: Waves, t: "ملابس سباحة إذا كنت ترغب في السباحة." },
  { icon: Pill, t: "أقراص دوار البحر إذا لزم الأمر." },
  { icon: Camera, t: "كاميرات للتصوير." },
  { icon: Music, t: "هواتف محمولة تحتوي على موسيقاك المفضلة." },
  { icon: BatteryFull, t: "شواحن وبطاريات إضافية." },
];

type Route = { h: string; sub?: string; landmarks: string[] };
type RouteGroup = { h: string; intro?: string; routes: Route[] };

const routeGroups: RouteGroup[] = [
  {
    h: "رحلة يخت لمدة ساعتين",
    intro: "يمكنك الاختيار بين هذين الخيارين:",
    routes: [
      {
        h: "الخيار 1: رحلة يخت لمدة ساعتين (مسار برج العرب)",
        landmarks: [
          "دبي مارينا",
          "شاطئ جي بي آر (جميرا بيتش ريزيدنس)",
          "عين دبي (جزيرة بلوواترز)",
          "منطقة اللاجون المخصصة للسباحة",
          "نخلة جميرا",
          "برج العرب",
        ],
      },
      {
        h: "الخيار 2: رحلة يخت لمدة ساعتين (مسار أتلانتس)",
        landmarks: [
          "دبي مارينا",
          "شاطئ جي بي آر (جميرا بيتش ريزيدنس)",
          "عين دبي (جزيرة بلوواترز)",
          "منطقة اللاجون المخصصة للسباحة",
          "نخلة جميرا",
          "فندق أتلانتس بالم",
        ],
      },
    ],
  },
  {
    h: "رحلة يخت لمدة 3 ساعات",
    routes: [
      {
        h: "المسار",
        landmarks: [
          "دبي مارينا",
          "شاطئ جي بي آر (جميرا بيتش ريزيدنس)",
          "عين دبي (جزيرة بلوواترز)",
          "منطقة اللاجون المخصصة للسباحة",
          "نخلة جميرا",
          "فندق أتلانتس بالم",
          "برج العرب",
        ],
      },
    ],
  },
  {
    h: "رحلة يخت لمدة 4 ساعات (المسار الأصلي)",
    routes: [
      {
        h: "المسار",
        landmarks: [
          "دبي مارينا",
          "شاطئ جي بي آر (جميرا بيتش ريزيدنس)",
          "عين دبي (جزيرة بلوواترز)",
          "منطقة اللاجون المخصصة للسباحة",
          "نخلة جميرا",
          "فندق أتلانتس بالم",
          "برج العرب",
          "زعبيل سراي (جميرا زعبيل سراي)",
        ],
      },
    ],
  },
  {
    h: "رحلة يخت لمدة 6 ساعات (جولة بريميوم)",
    routes: [
      {
        h: "المسار",
        landmarks: [
          "دبي مارينا",
          "شاطئ جي بي آر (جميرا بيتش ريزيدنس)",
          "عين دبي (جزيرة بلوواترز)",
          "منطقة اللاجون المخصصة للسباحة",
          "نخلة جميرا",
          "فندق أتلانتس بالم",
          "برج العرب",
          "زعبيل سراي (جميرا زعبيل سراي)",
          "فندق أنانتارا النخلة دبي",
          "سوفيتيل دبي النخلة – منتجع وسبا",
          "قناة دبي المائية",
          "برج خليفة",
          "خور دبي",
          "شلال قناة دبي المائية",
          "مراسي مارينا الخليج التجاري",
        ],
      },
    ],
  },
];

type TabId = "included" | "bring" | "sites";
const TABS: { id: TabId; label: string }[] = [
  { id: "included", label: "ما الذي يشمله الحجز؟" },
  { id: "bring", label: "ما تحتاجه قبل الرحلة" },
  { id: "sites", label: "المواقع الرئيسية" },
];

function IconList({ items }: { items: Item[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <Reveal key={it.t} delay={i * 40}>
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

function RouteAccordion({ group, groupIdx }: { group: RouteGroup; groupIdx: number }) {
  const [openRoute, setOpenRoute] = useState<number | null>(0);
  const [open, setOpen] = useState(groupIdx === 0);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-luxe transition-colors data-[open=true]:border-gold/60" data-open={open}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-start"
      >
        <h3 className="text-base font-bold text-foreground md:text-lg">{group.h}</h3>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition-transform duration-500 ${
            open ? "rotate-180 bg-gold/10" : ""
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/60 px-5 pb-5 pt-4">
            {group.intro ? (
              <p className="mb-3 text-sm text-muted-foreground">{group.intro}</p>
            ) : null}
            {group.routes.length > 1 ? (
              <div className="space-y-3">
                {group.routes.map((r, ri) => {
                  const isOpen = openRoute === ri;
                  return (
                    <div key={r.h} className="rounded-xl border border-border bg-muted/40">
                      <button
                        type="button"
                        onClick={() => setOpenRoute(isOpen ? null : ri)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-3 p-4 text-start"
                      >
                        <h4 className="text-sm font-bold text-primary">{r.h}</h4>
                        <ChevronDown className={`h-4 w-4 text-gold-deep transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen ? <LandmarkList items={r.landmarks} /> : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <LandmarkList items={group.routes[0].landmarks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LandmarkList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 border-t border-border/40 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((l) => (
        <li key={l} className="flex items-center gap-2 text-sm text-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-gold-deep" />
          {l}
        </li>
      ))}
    </ul>
  );
}

export function PartyEssentialsTabs() {
  const [active, setActive] = useState<TabId>("included");

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        {/* Tab strip */}
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
                  isActive
                    ? "bg-gold text-primary-deep shadow-inner"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="mt-10">
          {active === "included" ? (
            <Reveal key="included">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">ما الذي تشمله حفلة يخت في دبي؟</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  استمتع بتجربة حفلة يخت فاخرة ومتكاملة في دبي مع خدمات راقية مصممة لتوفير الراحة، والمتعة، ولحظات لا تُنسى على المياه.
                </p>
              </div>
              <IconList items={included} />
            </Reveal>
          ) : null}

          {active === "bring" ? (
            <Reveal key="bring">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">ما تحتاجه قبل حفلة اليخت في دبي</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  التخطيط لحفلة يخت في دبي سهل وبسيط. اختر اليخت المفضل لديك، وأكد عدد الضيوف ومدة الرحلة البحرية، وأحضر بطاقة هوية سارية مثل الهوية الإماراتية أو جواز السفر، واستعد للاستمتاع بحفلة ممتعة ولا تُنسى على المياه.
                </p>
              </div>
              <IconList items={bring} />
            </Reveal>
          ) : null}

          {active === "sites" ? (
            <Reveal key="sites">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
                  أهم المعالم التي يمكنك الوصول إليها خلال حفلة يخت في دبي
                </h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  استمتع برحلة بحرية تمر عبر أشهر الوجهات البحرية في دبي أثناء حفلة اليخت، مع إطلالات خلابة على أفق المدينة وأماكن مثالية لالتقاط الصور طوال الرحلة.
                </p>
              </div>
              <div className="mx-auto mt-8 max-w-4xl space-y-3">
                {routeGroups.map((g, i) => (
                  <RouteAccordion key={g.h} group={g} groupIdx={i} />
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
