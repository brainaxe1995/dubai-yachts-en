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

function BlockChapter({ i }: { i: number }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
      <span className="h-px w-8 bg-gold" />
      Chapter {String(i + 1).padStart(2, "0")}
      <span className="h-px w-8 bg-gold" />
    </span>
  );
}

function VariantSplit({ b, i }: { b: FeatureBlock; i: number }) {
  const Icon = b.icon;
  // In a 3-variant cycle: Split is i=0. Force image on RTL start (physical right).
  return (
    <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-12">
      {b.image ? (
        <div className="md:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20">
            <img
              src={b.image}
              alt={b.imageAlt ?? b.h}
              loading="lazy"
              width={1200}
              height={900}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {Icon ? (
              <span className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-gold text-primary-deep shadow-md">
                <Icon className="h-5 w-5" />
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="md:order-2">
        <BlockChapter i={i} />
        <h3 className="mt-3 text-2xl font-extrabold text-primary md:text-3xl">{b.h}</h3>
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
  );
}

function VariantOverlay({ b, i }: { b: FeatureBlock; i: number }) {
  const Icon = b.icon;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary-deep shadow-luxe ring-1 ring-gold/20 md:min-h-[420px]">
      {b.image ? (
        <div className="relative md:absolute md:inset-0">
          <img
            src={b.image}
            alt={b.imageAlt ?? b.h}
            loading="lazy"
            width={1600}
            height={900}
            className="aspect-[16/10] w-full object-cover md:aspect-auto md:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/70 to-primary-deep/20 md:bg-gradient-to-r md:from-transparent md:via-primary-deep/60 md:to-primary-deep/95" />
        </div>
      ) : null}
      <div className="relative md:absolute md:inset-0 md:flex md:items-center md:justify-end">
        <div className="w-full max-w-xl p-6 text-primary-foreground md:p-10 lg:p-14">
          <BlockChapter i={i} />
          <div className="mt-3 flex items-center gap-3">
            {Icon ? (
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-primary-deep shadow-md">
                <Icon className="h-5 w-5" />
              </span>
            ) : null}
            <h3 className="text-2xl font-extrabold md:text-3xl">{b.h}</h3>
          </div>
          <span className="mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
          <div className="mt-5 space-y-3">
            {b.p.map((par, pi) => (
              <p key={pi} className="text-sm leading-loose text-primary-foreground/85 md:text-base">
                {renderInline(par)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VariantCardStack({ b, i }: { b: FeatureBlock; i: number }) {
  const Icon = b.icon;
  // Text on right, image on left — matches VariantSplit/Overlay right-align convention.
  return (
    <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-12">
      {b.image ? (
        <div className="md:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20">
            <img
              src={b.image}
              alt={b.imageAlt ?? b.h}
              loading="lazy"
              width={1200}
              height={900}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      ) : null}
      <div className="md:order-2">
        <BlockChapter i={i} />
        <div className="mt-3 flex items-center gap-3">
          {Icon ? (
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-md">
              <Icon className="h-6 w-6" />
            </span>
          ) : null}
          <h3 className="text-2xl font-extrabold text-primary md:text-3xl">{b.h}</h3>
        </div>
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
  );
}

/**
 * Rotating 3-variant layout for visual rhythm — split / full-bleed overlay / stacked card.
 * All variants use the same 4/3 image aspect so pictures never feel bigger/smaller between blocks.
 */
export function FeatureBlocks({ blocks }: { blocks: FeatureBlock[] }) {
  return (
    <div className="space-y-14 md:space-y-20">
      {blocks.map((b, i) => {
        const variant = i % 3;
        return (
          <Reveal key={b.h} delay={i * 40}>
            {variant === 0 ? <VariantSplit b={b} i={i} /> : null}
            {variant === 1 ? <VariantOverlay b={b} i={i} /> : null}
            {variant === 2 ? <VariantCardStack b={b} i={i} /> : null}
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
