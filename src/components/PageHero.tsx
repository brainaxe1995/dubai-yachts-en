import type { ReactNode } from "react";
import heroImg from "@/assets/hero-yacht.jpg";
import { BookButton, CallButton } from "./CtaButtons";
import { Reveal } from "./Reveal";

export function PageHero({
  title,
  subtitle,
  eyebrow,
  image = heroImg,
  compact = false,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden surface-navy">
      <img
        src={image}
        alt={title}
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-deep via-primary/70 to-primary/40" />
      <div
        className={`mx-auto flex max-w-6xl flex-col items-center px-4 text-center ${
          compact ? "py-20 md:py-28" : "py-28 md:py-40"
        }`}
      >
        {eyebrow ? (
          <Reveal className="mb-4 rounded-full border border-gold/40 px-4 py-1.5 text-xs font-bold tracking-wide text-gold">
            {eyebrow}
          </Reveal>
        ) : null}
        <Reveal delay={60}>
          <h1 className="text-3xl leading-tight text-primary-foreground md:text-5xl">{title}</h1>
        </Reveal>
        {subtitle ? (
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 md:text-base">
              {subtitle}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={220} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {children ?? (
            <>
              <BookButton />
              <CallButton />
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center">
      <h2 className="text-2xl text-foreground md:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{subtitle}</p> : null}
      <span className="mx-auto mt-5 block h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
    </Reveal>
  );
}
