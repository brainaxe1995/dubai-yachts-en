import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { renderInline } from "@/lib/rich-text";

export type LegalBlock = {
  h: string;
  icon?: LucideIcon;
  p: string[];
};

function renderParagraph(text: string, index: number) {
  const trimmed = text.trim();
  if (trimmed.startsWith("- ")) {
    return (
      <li
        key={index}
        className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2.5 text-sm leading-relaxed text-foreground md:text-[15px]"
      >
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
        <span>{renderInline(trimmed.slice(2))}</span>
      </li>
    );
  }
  return (
    <p key={index} className="text-sm leading-loose text-muted-foreground md:text-[15px]">
      {renderInline(trimmed)}
    </p>
  );
}

export function LegalSection({ blocks, intro }: { blocks: LegalBlock[]; intro?: string }) {
  return (
    <>
      {intro ? (
        <section className="mx-auto max-w-4xl px-4 pt-14">
          <Reveal>
            <p className="rounded-2xl border-s-4 border-gold/60 bg-muted/40 p-5 text-base leading-loose text-foreground md:text-lg">
              {renderInline(intro)}
            </p>
          </Reveal>
        </section>
      ) : null}

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-20">
        <div className="space-y-6 md:space-y-8">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            const listItems = b.p.filter((t) => t.trim().startsWith("- "));
            const paras = b.p.filter((t) => !t.trim().startsWith("- "));
            return (
              <Reveal key={b.h} delay={i * 50}>
                <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-luxe transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/40 md:p-8">
                  {/* Number badge start-corner */}
                  <span
                    aria-hidden
                    className="absolute -end-3 -top-3 grid h-11 w-11 place-items-center rounded-full bg-gold text-sm font-black text-primary-deep shadow-md md:h-12 md:w-12"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-3">
                    {Icon ? (
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-deep transition-colors group-hover:bg-gold/25">
                        <Icon className="h-5 w-5" />
                      </span>
                    ) : null}
                    <h3 className="text-lg font-extrabold text-primary md:text-xl">{b.h}</h3>
                  </div>

                  <div className="mt-4 space-y-3">{paras.map((t, pi) => renderParagraph(t, pi))}</div>

                  {listItems.length > 0 ? (
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {listItems.map((t, li) => renderParagraph(t, li))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
