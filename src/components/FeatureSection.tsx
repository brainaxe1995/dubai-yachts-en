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
      الفصل {String(i + 1).padStart(2, "0")}
      <span className="h-px w-8 bg-gold" />
    </span>
  );
}

function VariantSplit({ b, i }: { b: FeatureBlock; i: number }) {
  const Icon = b.icon;
  const flip = i % 2 === 0;
  return (
    <div className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${flip ? "md:[direction:ltr]" : ""}`}>
      {b.image ? (
        <div className={`relative overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20 ${flip ? "md:order-2" : ""}`}>
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
    <div className="relative overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/20">
      {b.image ? (
        <div className="relative">
          <img
            src={b.image}
            alt={b.imageAlt ?? b.h}
            loading="lazy"
            width={1600}
            height={900}
            className="aspect-[21/9] w-full object-cover md:aspect-[24/10]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary-deep/95 via-primary-deep/60 to-transparent" />
        </div>
      ) : null}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-xl p-6 text-primary-foreground md:p-12 lg:p-16">
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
  return (
    <div className="relative rounded-3xl border-2 border-gold/25 bg-gradient-to-br from-muted/50 via-card to-card p-6 shadow-luxe md:p-10">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
        <div>
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
        {b.image ? (
          <div className="relative">
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-gold/10 blur-lg" />
            <img
              src={b.image}
              alt={b.imageAlt ?? b.h}
              loading="lazy"
              width={800}
              height={800}
              className="aspect-square w-full rounded-2xl object-cover shadow-md ring-1 ring-gold/30"
            />
            <span className="absolute -bottom-3 -end-3 grid h-16 w-16 place-items-center rounded-2xl bg-primary-deep text-primary-foreground shadow-luxe">
              <span className="text-xs font-bold text-gold">TOOT</span>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Renders story blocks with rotating layout variants so consecutive sections
 * never look identical. Variants: split (0), full-bleed overlay (1), stacked card (2).
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
