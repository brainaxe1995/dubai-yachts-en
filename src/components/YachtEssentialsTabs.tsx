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
  { icon: Anchor, t: "Professional captain and crew throughout the trip" },
  { icon: Fuel, t: "Fuel included in the price" },
  { icon: Shield, t: "Comprehensive insurance and licensing" },
  { icon: GlassWater, t: "Bottled water and soft drinks" },
  { icon: Utensils, t: "Full tableware (plates, cups, ice)" },
  { icon: Music2, t: "Premium Bluetooth sound system" },
  { icon: LifeBuoy, t: "Certified life jackets and safety gear" },
  { icon: Snowflake, t: "Air-conditioned indoor cabins" },
  { icon: BadgeCheck, t: "Crew speaks Arabic and English" },
];

const bring: Item[] = [
  { icon: Clock, t: "Original passport or Emirates ID required." },
  { icon: Sun, t: "Sunscreen (SPF 50+)." },
  { icon: Shirt, t: "Light summer clothing and a jacket for evenings." },
  { icon: Camera, t: "Camera or phone for photos." },
  { icon: Sparkles, t: "Your own food or drinks (allowed at no extra charge)." },
];

const sites: string[] = [
  "Dubai Marina",
  "JBR Beach (Jumeirah Beach Residence)",
  "Ain Dubai (Bluewaters Island)",
  "Palm Jumeirah",
  "Atlantis The Palm",
  "Burj Al Arab",
];

type TabId = "included" | "bring" | "sites";
const TABS: { id: TabId; label: string }[] = [
  { id: "included", label: "What does the rental include?" },
  { id: "bring", label: "What you need before the trip" },
  { id: "sites", label: "Key locations" },
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
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">What does yacht rental in Dubai include?</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Every yacht rental with us in Dubai includes everything you need for a safe and comfortable sea trip — with no hidden fees.
                </p>
              </div>
              <IconList items={included} />
            </Reveal>
          ) : null}

          {active === "bring" ? (
            <Reveal key="bring">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">What you need before your yacht trip in Dubai</h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Getting ready for a yacht trip in Dubai is simple — bring a valid ID and the items below for the complete on-board experience.
                </p>
              </div>
              <IconList items={bring} />
            </Reveal>
          ) : null}

          {active === "sites" ? (
            <Reveal key="sites">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
                  Top locations you can reach when renting a yacht in Dubai
                </h2>
                <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Enjoy a sea trip that passes Dubai's most famous marine landmarks, with stunning skyline views and perfect photo spots throughout the ride.
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
