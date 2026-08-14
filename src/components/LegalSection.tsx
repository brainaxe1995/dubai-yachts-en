import { Reveal } from "./Reveal";

export function LegalSection({ blocks }: { blocks: { h: string; p: string[] }[] }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      <div className="space-y-8">
        {blocks.map((b, i) => (
          <Reveal key={b.h} delay={i * 60}>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl text-foreground">{b.h}</h2>
              {b.p.map((t) => (
                <p key={t} className="mt-3 text-sm leading-loose text-muted-foreground">
                  {t}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
