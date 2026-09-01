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
  IdCard,
  ArrowLeft,
} from "lucide-react";
import { Reveal } from "./Reveal";
import marinaImg from "@/assets/page-sections/shared-destinations/dubai-marina-yacht-cruise-destination.webp";
import palmImg from "@/assets/page-sections/shared-destinations/palm-jumeirah-yacht-cruise-destination.webp";
import burjImg from "@/assets/page-sections/shared-destinations/burj-al-arab-yacht-cruise-destination.webp";
import atlantisImg from "@/assets/page-sections/shared-destinations/atlantis-the-palm-yacht-cruise-destination.webp";
import ainImg from "@/assets/page-sections/shared-destinations/ain-dubai-yacht-cruise-destination.webp";
import jbrImg from "@/assets/page-sections/shared-destinations/jbr-beach-yacht-cruise-destination.webp";

type Item = { icon: LucideIcon; t: string; d: string };

const included: Item[] = [
  { icon: Anchor, t: "Professional captain and crew", d: "Licensed captain with a trained crew who look after your comfort throughout the trip." },
  { icon: Fuel, t: "Unlimited fuel", d: "Fuel is included in the price — no hidden charges." },
  { icon: Utensils, t: "Hospitality kit", d: "Plates, cups, cutlery, ice, and bottled water." },
  { icon: Wine, t: "Cold beverages", d: "Complimentary water and soft drinks — champagne and fresh juices available as add-ons." },
  { icon: Music2, t: "Premium sound system", d: "Bluetooth and high-quality speakers — connect your favorite playlist." },
  { icon: LifeBuoy, t: "Full safety kit", d: "Life jackets, fire extinguishers, and certified first-aid gear." },
  { icon: Shield, t: "Insurance and license", d: "Yacht is fully insured and licensed by Dubai Ports Authority." },
  { icon: Snowflake, t: "Air-conditioned interior", d: "Cooled cabins for a break away from the daytime heat." },
];

const bring: Item[] = [
  { icon: Sun, t: "Sunscreen", d: "Dubai's sun is strong on the water — SPF 50+ is essential during daylight hours." },
  { icon: Shirt, t: "Comfortable clothing", d: "Light fabric during the day, and a light jacket for evenings on deck." },
  { icon: Sparkles, t: "Your favorite food", d: "Bringing your own food and drinks is welcome at no extra charge." },
  { icon: Camera, t: "Camera or phone", d: "Sunset moments over the Dubai skyline are worth capturing." },
  { icon: IdCard, t: "Original passport or Emirates ID required", d: "Bring your original passport or Emirates ID — needed at the marina check-in for every guest before boarding." },
];

type Destination = { img: string; t: string; d: string; en: string };
const destinations: Destination[] = [
  { img: marinaImg, t: "Dubai Marina", en: "Dubai Marina", d: "The most famous departure point — skyscrapers viewed from the water." },
  { img: palmImg, t: "Palm Jumeirah", en: "Palm Jumeirah", d: "The world's largest man-made island — an aerial view from the sea." },
  { img: burjImg, t: "Burj Al Arab", en: "Burj Al Arab", d: "The best photo angle of the world's most iconic hotel." },
  { img: atlantisImg, t: "Atlantis The Palm", en: "Atlantis The Palm", d: "A luxury resort overlooking the Gulf waters." },
  { img: ainImg, t: "Ain Dubai", en: "Ain Dubai", d: "The world's largest observation wheel — magical night lighting." },
  { img: jbrImg, t: "JBR Beach", en: "JBR Beach", d: "The modern promenade and new marina — calm cruising." },
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
                  The essential in every trip
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5 lg:gap-6">
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
            className="group relative block w-full overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20 bg-primary-deep"
          >
            <img
              src={d.img}
              alt={d.t}
              loading="lazy"
              className="block h-auto w-full transition-transform duration-[900ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground sm:p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-deep">
                {d.en}
              </span>
              <h3 className="mt-2 text-lg font-extrabold leading-tight sm:text-xl">{d.t}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/85 line-clamp-2">{d.d}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-gold transition-transform duration-500 group-hover:translate-x-1">
                Explore destination
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
              eyebrow="Included in the price"
              title="What's included in the price"
              subtitle="Every trip includes the essentials — no hidden fees or surprise add-ons."
            />
            <IncludedPanel items={included} />
          </div>

          <div>
            <PanelHeading
              eyebrow="Your smart pack"
              title="What to bring with you"
              subtitle="Five simple steps to prepare you for the complete on-board yacht experience."
            />
            <BringSteps items={bring} />
          </div>

          {showDestinations ? (
            <div>
              <PanelHeading
                eyebrow="Cruising routes"
                title="The top destinations we cruise to"
                subtitle="Dubai's marine icons — the route can be fully customized with the captain."
              />
              <DestinationsMasonry items={destinations} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
