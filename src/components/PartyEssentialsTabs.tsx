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
  { icon: GlassWater, t: "Soft drinks, water, and ice" },
  { icon: Utensils, t: "Tableware — plates, cups, and dining utensils" },
  { icon: BadgeCheck, t: "Experienced captain and crew" },
  { icon: FileCheck2, t: "Licensed yacht, insurance, and fuel included" },
];

const bring: Item[] = [
  { icon: Clock, t: "Original passport or Emirates ID required." },
  { icon: Sun, t: "Sunscreen" },
  { icon: Umbrella, t: "Hat and sunglasses" },
  { icon: Snowflake, t: "Light jacket during winter months." },
  { icon: Footprints, t: "Sneakers or sandals with rubber soles." },
  { icon: Waves, t: "Swimwear if you plan to swim." },
  { icon: Pill, t: "Seasickness tablets if needed." },
  { icon: Camera, t: "Cameras for photos." },
  { icon: Music, t: "Mobile phones with your favorite music." },
  { icon: BatteryFull, t: "Extra chargers and batteries." },
];

type Route = { h: string; sub?: string; landmarks: string[] };
type RouteGroup = { h: string; intro?: string; routes: Route[] };

const routeGroups: RouteGroup[] = [
  {
    h: "2-hour yacht trip",
    intro: "You can choose between these two options:",
    routes: [
      {
        h: "Option 1: 2-hour yacht trip (Burj Al Arab route)",
        landmarks: [
          "Dubai Marina",
          "JBR Beach (Jumeirah Beach Residence)",
          "Ain Dubai (Bluewaters Island)",
          "Dedicated swimming lagoon area",
          "Palm Jumeirah",
          "Burj Al Arab",
        ],
      },
      {
        h: "Option 2: 2-hour yacht trip (Atlantis route)",
        landmarks: [
          "Dubai Marina",
          "JBR Beach (Jumeirah Beach Residence)",
          "Ain Dubai (Bluewaters Island)",
          "Dedicated swimming lagoon area",
          "Palm Jumeirah",
          "Atlantis The Palm",
        ],
      },
    ],
  },
  {
    h: "3-hour yacht trip",
    routes: [
      {
        h: "The route",
        landmarks: [
          "Dubai Marina",
          "JBR Beach (Jumeirah Beach Residence)",
          "Ain Dubai (Bluewaters Island)",
          "Dedicated swimming lagoon area",
          "Palm Jumeirah",
          "Atlantis The Palm",
          "Burj Al Arab",
        ],
      },
    ],
  },
  {
    h: "4-hour yacht trip (Original route)",
    routes: [
      {
        h: "The route",
        landmarks: [
          "Dubai Marina",
          "JBR Beach (Jumeirah Beach Residence)",
          "Ain Dubai (Bluewaters Island)",
          "Dedicated swimming lagoon area",
          "Palm Jumeirah",
          "Atlantis The Palm",
          "Burj Al Arab",
          "Zabeel Saray (Jumeirah Zabeel Saray)",
        ],
      },
    ],
  },
  {
    h: "6-hour yacht trip (Premium tour)",
    routes: [
      {
        h: "The route",
        landmarks: [
          "Dubai Marina",
          "JBR Beach (Jumeirah Beach Residence)",
          "Ain Dubai (Bluewaters Island)",
          "Dedicated swimming lagoon area",
          "Palm Jumeirah",
          "Atlantis The Palm",
          "Burj Al Arab",
          "Zabeel Saray (Jumeirah Zabeel Saray)",
          "Anantara The Palm Dubai Resort",
          "Sofitel Dubai The Palm — Resort & Spa",
          "Dubai Water Canal",
          "Burj Khalifa",
          "Dubai Creek",
          "Dubai Water Canal Waterfall",
          "Marasi Marina Business Bay",
        ],
      },
    ],
  },
];

type TabId = "included" | "bring" | "sites";
const TABS: { id: TabId; label: string }[] = [
  { id: "included", label: "What Is Included" },
  { id: "bring", label: "What You Need" },
  { id: "sites", label: "Key Sites" },
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
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">What does a yacht party in Dubai include?</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Enjoy a luxurious, all-inclusive yacht party experience in Dubai with premium services designed to deliver comfort, fun, and unforgettable moments on the water.
                </p>
              </div>
              <IconList items={included} />
            </Reveal>
          ) : null}

          {active === "bring" ? (
            <Reveal key="bring">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">What you need before your yacht party in Dubai</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Planning a yacht party in Dubai is easy and simple. Pick your favorite yacht, confirm your guest count and cruise duration, bring a valid ID such as an Emirates ID or passport, and get ready for a fun and unforgettable party on the water.
                </p>
              </div>
              <IconList items={bring} />
            </Reveal>
          ) : null}

          {active === "sites" ? (
            <Reveal key="sites">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
                  Top landmarks you can reach during a yacht party in Dubai
                </h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Enjoy a sea trip that passes Dubai's most famous marine destinations during your yacht party, with stunning skyline views and perfect photo spots throughout the ride.
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
