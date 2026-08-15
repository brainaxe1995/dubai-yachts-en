import type { Extra } from "@/data/site";
import { Sparkles, Plus } from "lucide-react";
import { Reveal } from "./Reveal";

// Premium editorial-style extras grid — tall image cards with dark gradient overlay,
// gold badge, floating "+" affordance revealed on hover.
export function ExtrasMarquee({ items }: { items: readonly Extra[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
      {items.map((e, i) => (
        <Reveal key={e.label} delay={(i % 6) * 40} className="h-full">
          <article className="group relative h-full overflow-hidden rounded-2xl bg-primary-deep shadow-luxe ring-1 ring-gold/20 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-gold hover:ring-gold/60">
            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={e.image}
                alt={e.label}
                loading="lazy"
                width={400}
                height={500}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              {/* Dark gradient — deepens on hover for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Top-right gold sparkle badge */}
              <div className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-gold text-primary-deep shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Sparkles className="h-4 w-4" />
              </div>

              {/* Bottom label + subtle overline */}
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">إضافة</p>
                <h3 className="mt-1 text-sm font-extrabold leading-tight text-primary-foreground md:text-base">
                  {e.label}
                </h3>
                {/* Gold underline that grows on hover */}
                <span className="mt-2 block h-[2px] w-8 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>

              {/* Center-appearing "+" on hover */}
              <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-primary-deep ring-4 ring-gold/25">
                  <Plus className="h-5 w-5" />
                </span>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
