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
  { icon: Clock, t: "4-hour fishing trip in Dubai" },
  { icon: Fish, t: "Bait and fishing gear" },
  { icon: Fish, t: "Jigging fishing" },
  { icon: Anchor, t: "Fishing hooks and lines" },
  { icon: Compass, t: "Fish finder device" },
  { icon: Fish, t: "Trolling fishing" },
  { icon: Fish, t: "Fishing rods and reels" },
  { icon: Fish, t: "All necessary fishing equipment" },
  { icon: Shield, t: "Safety gear" },
  { icon: GlassWater, t: "Soft drinks, water, and ice" },
  { icon: Flame, t: "Fish and grill on board the yacht or boat" },
  { icon: Utensils, t: "Tableware — plates, cups, and dining utensils" },
  { icon: BadgeCheck, t: "Experienced captain and crew" },
  { icon: FileCheck2, t: "License, insurance, and fuel included" },
];

const bring: Item[] = [
  { icon: Clock, t: "Original passport or Emirates ID required." },
  { icon: Sun, t: "Sunscreen" },
  { icon: Umbrella, t: "Long-sleeved clothing and a hat." },
  { icon: Snowflake, t: "Light jacket during winter months." },
  { icon: Footprints, t: "Sneakers or sandals with rubber soles." },
  { icon: Waves, t: "Swimwear if you plan to swim." },
  { icon: Pill, t: "Seasickness tablets if needed." },
  { icon: Camera, t: "Cameras for photos." },
  { icon: Music, t: "Mobile phones with your favorite music." },
  { icon: BatteryFull, t: "Extra chargers and batteries." },
];

const sites: string[] = [
  "Dubai Marina",
  "JBR Beach (Jumeirah Beach Residence)",
  "Palm Jumeirah",
  "Atlantis The Palm",
  "Open-sea fishing zones for deep-sea fishing",
];

type TabId = "included" | "bring" | "sites";
const TABS: { id: TabId; label: string }[] = [
  { id: "included", label: "What Is Included" },
  { id: "bring", label: "What You Need" },
  { id: "sites", label: "Key Sites" },
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
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">What do fishing trips in Dubai include?</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Enjoy a complete deep-sea fishing experience in Dubai with everything you need for a fun and successful trip.
                </p>
              </div>
              <IconList items={included} />
            </Reveal>
          ) : null}

          {active === "bring" ? (
            <Reveal key="bring">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">What you need before your fishing trip in Dubai</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Booking a fishing trip in Dubai is easy and simple. Pick your trip duration, confirm your guest count, bring a valid ID, and get ready for a fun and comfortable deep-sea fishing experience.
                </p>
              </div>
              <IconList items={bring} />
            </Reveal>
          ) : null}

          {active === "sites" ? (
            <Reveal key="sites">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
                  Key Sites You Can Reach with Fishing Trip Dubai
                </h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Enjoy the deep-sea fishing experience in Dubai while exploring the most famous marine fishing sites and enjoying stunning coastal views.
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
