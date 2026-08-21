import { Link } from "@tanstack/react-router";
import { Search, ArrowLeft, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";

export type KeywordItem = { keyword: string; to?: string; href?: string };

const pillClass =
  "group inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-primary-deep md:text-sm";

// Renders as compact SEO-friendly clickable pill grid. Each keyword links to its target URL.
export function KeywordCloud({ items }: { items: readonly KeywordItem[] }) {
  return (
    <div className="rounded-3xl border border-gold/25 bg-gradient-to-br from-card via-muted/40 to-card p-5 shadow-luxe md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gold/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-deep">
          <Search className="h-4 w-4" />
          الأكثر بحثًا
        </div>
        <span className="text-xs text-muted-foreground">{items.length} مصطلح شائع</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((k, i) => (
          <Reveal key={`${k.keyword}-${i}`} delay={i * 20}>
            {k.href ? (
              <a
                href={k.href}
                target="_blank"
                rel="noopener"
                className={pillClass}
                title={k.keyword}
              >
                <span>{k.keyword}</span>
                <ExternalLink className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </a>
            ) : (
              <Link to={k.to!} className={pillClass}>
                <span>{k.keyword}</span>
                <ArrowLeft className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
