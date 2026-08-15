import { useState, useEffect, useRef } from "react";
import { Users, Bed, Ruler, Clock, Phone, CheckCircle2, X, Sparkles, Info, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/site";
import { CONTACT } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Reveal } from "./Reveal";

function parseSpecs(specs: string[]) {
  let guests = "";
  let bedrooms = "";
  let length = "";
  let duration = "";

  for (const s of specs) {
    if (/ضيف|شخص/.test(s)) guests = s;
    else if (/غرف|نوم|غرفة/.test(s) && !/بدون/.test(s)) bedrooms = s;
    else if (/بدون غرف/.test(s)) bedrooms = "بدون غرف";
    else if (/قدم/.test(s)) length = s;
    else if (/ساع|رحلة/.test(s)) duration = s;
  }

  const extras = specs.filter((s) => s !== guests && s !== bedrooms && s !== length && s !== duration);
  return { guests, bedrooms, length, duration, extras };
}

function buildWhatsAppLink(title: string, price: string) {
  const msg = `مرحبًا توت فن،\nأود الاستفسار عن حجز:\n${title}\nالسعر: ${price}\nأرجو تزويدي بالتوفر والتفاصيل. شكرًا.`;
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function ImageSlider({ images, alt, length, guests }: { images: string[]; alt: string; length: string; guests: string }) {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const count = images.length;

  function go(delta: number) {
    setIdx((i) => (i + delta + count) % count);
  }

  return (
    <div className="group/slider relative aspect-[16/10] overflow-hidden bg-primary-deep">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex h-full w-full transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(${idx * (100 / count)}%)`, width: `${count * 100}%` }}
      >
        {images.map((src, i) => (
          <div key={i} className="flex h-full items-center justify-center" style={{ width: `${100 / count}%` }}>
            <img
              src={src}
              alt={i === 0 ? alt : `${alt} — ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Overlay + specs */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-2">
        {length ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md ring-1 ring-white/15">
            <Ruler className="h-3 w-3 text-gold" />
            {length}
          </span>
        ) : null}
        {guests ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md ring-1 ring-white/15">
            <Users className="h-3 w-3 text-gold" />
            {guests}
          </span>
        ) : null}
      </div>

      {/* Arrows — only visible on card or slider hover */}
      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="السابق"
            onClick={() => go(-1)}
            className="absolute end-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md ring-1 ring-white/20 transition-all duration-300 hover:bg-gold hover:text-primary-deep group-hover/slider:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="التالي"
            onClick={() => go(1)}
            className="absolute start-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md ring-1 ring-white/20 transition-all duration-300 hover:bg-gold hover:text-primary-deep group-hover/slider:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dots */}
          <div className="absolute inset-x-0 top-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`صورة ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? "w-6 bg-gold" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const { guests, bedrooms, length, duration, extras } = parseSpecs(product.specs);
  const priceNumber = product.price.match(/[\d,]+/)?.[0] ?? product.price;
  const priceUnit = product.price.replace(priceNumber, "").trim();
  const waLink = buildWhatsAppLink(product.title, product.price);
  const [modalOpen, setModalOpen] = useState(false);
  const hasIncluded = Boolean(product.included && product.included.length);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <Reveal as="article" delay={delay} className="h-full">
        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-luxe ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2">
          <ImageSlider images={images} alt={product.title} length={length} guests={guests} />

          {/* Content */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="relative inline-block text-[17px] font-extrabold leading-snug text-primary md:text-lg">
              <span className="bg-gradient-to-l from-gold to-gold-deep bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {product.title}
              </span>
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">{product.desc}</p>

            {/* Price after description */}
            <div className="flex items-baseline gap-2 border-y border-gold/20 py-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">تبدأ من</span>
              <span className="text-2xl font-extrabold text-gold-deep">{priceNumber}</span>
              <span className="text-xs font-bold text-muted-foreground">{priceUnit}</span>
            </div>

            <div className="mt-1 grid grid-cols-3 gap-2 rounded-xl border border-border bg-muted/60 p-3 text-center text-xs">
              <div className="flex flex-col items-center gap-1">
                <Bed className="h-4 w-4 text-gold-deep" />
                <span className="font-bold text-foreground">{bedrooms || "—"}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Clock className="h-4 w-4 text-gold-deep" />
                <span className="font-bold text-foreground">{duration || "ساعتان+"}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-gold-deep" />
                <span className="font-bold text-foreground">مرخّص</span>
              </div>
            </div>

            {extras.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {extras.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* CTAs */}
            <div className="mt-auto flex gap-2 pt-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-deep px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg ring-1 ring-black/5 transition-all hover:bg-primary hover:scale-[1.02] active:scale-[0.97]"
              >
                <WhatsAppIcon className="h-4 w-4 text-gold" />
                احجز الآن
              </a>

              {hasIncluded ? (
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gold bg-gold px-4 py-3 text-sm font-bold text-primary-deep transition-all hover:bg-gold-deep hover:text-primary-foreground hover:scale-[1.02] active:scale-[0.97]"
                >
                  <Info className="h-4 w-4" />
                  ماذا يشمل
                </button>
              ) : (
                <a
                  href={`tel:${CONTACT.phone}`}
                  aria-label="اتصل بنا"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/60 text-gold transition-all hover:bg-gold hover:text-primary-deep hover:scale-105 active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {hasIncluded ? (
        <IncludedModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          product={product}
          waLink={waLink}
          priceNumber={priceNumber}
          priceUnit={priceUnit}
        />
      ) : null}
    </>
  );
}

function IncludedModal({
  open,
  onClose,
  product,
  waLink,
  priceNumber,
  priceUnit,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
  waLink: string;
  priceNumber: string;
  priceUnit: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const t = setTimeout(() => setVisible(true), 10);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 350);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`incl-title-${product.title}`}
    >
      <div
        className={`absolute inset-0 bg-primary-deep/80 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-gold/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-primary-deep">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/95 px-3 py-1 text-xs font-bold text-primary-deep">
              <Sparkles className="h-3 w-3" />
              ماذا تشمل هذه الباقة
            </div>
            <h3
              id={`incl-title-${product.title}`}
              className="mt-2 text-xl font-extrabold text-primary-foreground md:text-2xl"
            >
              {product.title}
            </h3>
            <div className="mt-1 flex items-baseline gap-2 text-primary-foreground/90">
              <span className="text-xs">تبدأ من</span>
              <span className="text-lg font-extrabold text-gold">{priceNumber}</span>
              <span className="text-xs">{priceUnit}</span>
            </div>
          </div>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-6">
          <h4 className="mb-4 text-base font-bold text-gold-deep">
            <CheckCircle2 className="me-2 inline h-5 w-5" />
            يشمل السعر
          </h4>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {product.included?.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-3 text-sm leading-relaxed text-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {product.addOns && product.addOns.length > 0 ? (
            <>
              <h4 className="mb-3 mt-6 text-base font-bold text-gold-deep">
                <Sparkles className="me-2 inline h-5 w-5" />
                إضافات اختيارية
              </h4>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.addOns.map((a) => (
                  <li
                    key={a.name}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gold/30 bg-accent/40 p-3 text-sm"
                  >
                    <span className="text-foreground">{a.name}</span>
                    <span className="text-xs font-bold text-gold-deep">{a.price}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border bg-muted/40 p-5">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-deep px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary"
          >
            <WhatsAppIcon className="h-4 w-4 text-gold" />
            احجز الآن عبر واتساب
          </a>
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex items-center gap-2 rounded-xl border border-gold bg-gold px-4 py-3 text-sm font-bold text-primary-deep hover:bg-gold-deep hover:text-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            اتصل
          </a>
        </div>
      </div>
    </div>
  );
}
