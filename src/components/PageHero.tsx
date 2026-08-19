import type { ReactNode } from "react";
import heroImg from "@/assets/hero-yacht.webp";
import { BookButton, CallButton } from "./CtaButtons";
import { Reveal } from "./Reveal";
import { renderInline } from "@/lib/rich-text";

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
  // Fixed aspect ratio so mobile + desktop show identical horizontal banner shape.
  // Min height floors keep tiny screens usable.
  // Mobile: 16:9 banner shape (with min-h floor for text comfort).
  // Desktop: fixed standard hero height (no aspect ratio bloat on wide screens).
  const shape = compact
    ? "aspect-[16/9] min-h-[380px] md:aspect-auto md:h-[420px] lg:h-[460px]"
    : "aspect-[16/9] min-h-[440px] md:aspect-auto md:h-[500px] lg:h-[560px]";
  return (
    <section className={`relative isolate flex w-full overflow-hidden surface-navy ${shape}`}>
      <img
        src={image}
        alt={title}
        width={1920}
        height={1088}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div
        className={`mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 py-14 text-center md:py-20`}
      >
        {eyebrow ? (
          <Reveal className="mb-4 rounded-full border border-gold/60 bg-primary-deep/70 px-4 py-1.5 text-xs font-bold tracking-wide text-gold shadow-lg">
            {eyebrow}
          </Reveal>
        ) : null}
        <Reveal delay={60}>
          <h1
            className="text-3xl font-extrabold leading-tight text-primary-foreground md:text-5xl"
            style={{
              textShadow:
                "-1px -1px 0 rgba(7,20,38,0.9), 1px -1px 0 rgba(7,20,38,0.9), -1px 1px 0 rgba(7,20,38,0.9), 1px 1px 0 rgba(7,20,38,0.9), 0 4px 24px rgba(0,0,0,0.55)",
            }}
          >
            {title}
          </h1>
        </Reveal>
        {subtitle ? (
          <Reveal delay={140}>
            <p
              className="mt-5 max-w-2xl text-sm font-semibold leading-relaxed text-primary-foreground md:text-base"
              style={{
                textShadow:
                  "-0.5px -0.5px 0 rgba(7,20,38,0.9), 0.5px -0.5px 0 rgba(7,20,38,0.9), -0.5px 0.5px 0 rgba(7,20,38,0.9), 0.5px 0.5px 0 rgba(7,20,38,0.9), 0 2px 16px rgba(0,0,0,0.6)",
              }}
            >
              {renderInline(subtitle)}
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

export function SectionHeading({
  title,
  subtitle,
  onDark = false,
}: {
  title: string;
  subtitle?: string;
  onDark?: boolean;
}) {
  const titleColor = onDark ? "text-primary-foreground" : "text-foreground";
  const subColor = onDark ? "text-primary-foreground/75" : "text-muted-foreground";
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center">
      <h2 className={`text-2xl md:text-3xl ${titleColor}`}>{title}</h2>
      {subtitle ? <p className={`mt-4 text-sm leading-relaxed md:text-base ${subColor}`}>{renderInline(subtitle)}</p> : null}
      <span className="mx-auto mt-5 block h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
    </Reveal>
  );
}
