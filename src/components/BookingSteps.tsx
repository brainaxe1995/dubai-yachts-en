import { Reveal } from "./Reveal";

type Step = { t: string; d: string };

export function BookingSteps({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.t} delay={i * 60}>
          <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-luxe transition-transform hover:-translate-y-1">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 -end-2 select-none text-[80px] font-black leading-none text-gold/10 transition-colors group-hover:text-gold/20"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-secondary-foreground">
              {i + 1}
            </span>
            <h3 className="relative text-base font-bold text-foreground">{s.t}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
