import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: readonly FaqItem[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = i === open;
        return (
          <div
            key={it.q}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-luxe transition-colors data-[open=true]:border-gold/60"
            data-open={isOpen}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-start"
            >
              <h3 className="text-base font-bold text-foreground md:text-[17px]">{it.q}</h3>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "rotate-180 bg-gold/10" : ""
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-loose text-muted-foreground md:text-[15px]">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
