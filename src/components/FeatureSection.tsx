import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { renderInline } from "@/lib/rich-text";

export type FeatureBlock = {
  h: string;
  icon?: LucideIcon;
  image?: string;
  imageAlt?: string;
  p: string[];
};

export function FeatureBlocks({ blocks }: { blocks: FeatureBlock[] }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {blocks.map((b, i) => {
        const Icon = b.icon;
        const flip = i % 2 === 1;
        return (
          <Reveal key={b.h} delay={i * 40}>
            <div
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                flip ? "md:[direction:ltr]" : ""
              }`}
            >
              {b.image ? (
                <div
                  className={`relative overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20 ${
                    flip ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={b.image}
                    alt={b.imageAlt ?? b.h}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {Icon ? (
                    <span className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-gold text-primary-deep shadow-md">
                      <Icon className="h-5 w-5" />
                    </span>
                  ) : null}
                </div>
              ) : null}
              <div className={flip ? "md:order-1 md:[direction:rtl]" : ""}>
                <h3 className="text-2xl font-extrabold text-primary md:text-3xl">{b.h}</h3>
                <span className="mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <div className="mt-5 space-y-4">
                  {b.p.map((par, pi) => (
                    <p key={pi} className="text-sm leading-loose text-muted-foreground md:text-base">
                      {renderInline(par)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/**
 * Icon grid — 3-6 cards with big icon + short body.
 */
export function IconGrid({
  items,
  cols = 3,
}: {
  items: { icon: LucideIcon; t: string; d: string }[];
  cols?: 2 | 3 | 4;
}) {
  const colsClass =
    cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid gap-5 ${colsClass}`}>
      {items.map((it, i) => (
        <Reveal key={it.t} delay={i * 60}>
          <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <it.icon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-bold text-foreground">{it.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
