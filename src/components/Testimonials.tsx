import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/data/site";

function GoogleG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export function Testimonials({ items }: { items: readonly Testimonial[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    // For RTL, scrollLeft is negative in some browsers; use Math.abs
    const sl = Math.abs(el.scrollLeft);
    setCanScrollPrev(sl > 4);
    setCanScrollNext(sl < max - 4);
    const cardW = (el.querySelector("[data-card]") as HTMLElement | null)?.offsetWidth ?? 320;
    setActiveIdx(Math.round(sl / cardW));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  function scrollBy(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    // RTL: prev/next visually flip — pass -dir on RTL doc
    const isRtl = document.documentElement.dir === "rtl";
    el.scrollBy({ left: (isRtl ? -1 : 1) * dir * step, behavior: "smooth" });
  }

  function goToIndex(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 340;
    const isRtl = document.documentElement.dir === "rtl";
    el.scrollTo({ left: (isRtl ? -1 : 1) * step * i, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* Scroller */}
      <div
        ref={scrollerRef}
        className="testimonials-scroll flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
      >
        {items.map((t, i) => (
          <article
            key={i}
            data-card
            className="relative flex w-[85%] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-luxe sm:w-[46%] lg:w-[31%]"
          >
            <Quote aria-hidden className="absolute end-5 top-5 h-8 w-8 rotate-180 text-gold/25" />
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-deep text-lg font-black text-gold">
                {t.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.city} · {t.date}
                </p>
              </div>
              <GoogleG className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1" aria-label={`${t.rating} من 5`}>
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={si}
                  className={`h-4 w-4 ${si < t.rating ? "fill-gold text-gold" : "text-muted"}`}
                />
              ))}
              <span className="ms-2 text-xs font-bold text-muted-foreground">{t.rating}.0</span>
            </div>
            <p className="text-sm leading-loose text-muted-foreground">{t.text}</p>
          </article>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="السابق"
          onClick={() => scrollBy(-1)}
          disabled={!canScrollPrev}
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-primary-deep disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`مراجعة ${i + 1}`}
              onClick={() => goToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx ? "w-8 bg-gold" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="التالي"
          onClick={() => scrollBy(1)}
          disabled={!canScrollNext}
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-primary-deep disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <GoogleG />
        <span>مراجعات من ضيوفنا على Google</span>
      </div>
    </div>
  );
}
