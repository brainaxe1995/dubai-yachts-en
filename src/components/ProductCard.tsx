import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Users,
  Bed,
  Ruler,
  Clock,
  Phone,
  CheckCircle2,
  X,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  Share2,
  Anchor,
  Utensils,
  Wine,
  Cake,
  Coffee,
  Waves,
  Sunrise,
  Timer,
  Tag,
} from "lucide-react";

function iconForMeta(s: string): LucideIcon {
  if (/شمبانيا|خمر|كأس|زجاجة/.test(s)) return Wine;
  if (/كيك|كيكة|كعك/.test(s)) return Cake;
  if (/إفطار|فطور|قهوة/.test(s)) return Coffee;
  if (/مشاوي|طعام|وجبة|بوفيه|سي فود|ميكس/.test(s)) return Utensils;
  if (/جيت سكي|بانانا|دونات|رياض/.test(s)) return Waves;
  if (/صباح|الصعود|الساعة|شروق/.test(s)) return Sunrise;
  if (/دقيق|ساع|مدة|رحلة\b/.test(s)) return Timer;
  return Tag;
}
import type { Product } from "@/data/site";
import { CONTACT } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Reveal } from "./Reveal";
import { renderInline } from "@/lib/rich-text";

function parseSpecs(specs: string[]) {
  let guests = "";
  let bedrooms = "";
  let length = "";
  let duration = "";

  // Preserve insertion order but dedupe
  const seen = new Set<string>();
  const uniq = specs.filter((s) => {
    const k = s.trim();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  // Track which original strings were consumed by primary slots
  const consumed = new Set<string>();
  for (const s of uniq) {
    if (!guests && /ضيف|ضيوف|شخص|أشخاص/.test(s)) {
      guests = s;
      consumed.add(s);
    } else if (!bedrooms && (/غرف|نوم|غرفة/.test(s) || /بدون غرف/.test(s))) {
      bedrooms = /بدون/.test(s) ? "بدون غرف نوم" : s;
      consumed.add(s);
    } else if (!length && /قدم/.test(s)) {
      length = s;
      consumed.add(s);
    } else if (!duration && (/رحلة/.test(s) || /ساع/.test(s))) {
      duration = s;
      consumed.add(s);
    }
  }

  // Everything else = extra metadata (e.g. boarding time, min booking, breakfast)
  const meta = uniq.filter((s) => !consumed.has(s));
  return { guests, bedrooms, length, duration, meta };
}

function buildWhatsAppLink(title: string, price: string) {
  const msg = `مرحبًا توت فن،\nأود الاستفسار عن حجز:\n${title}\nالسعر: ${price}\nأرجو تزويدي بالتوفر والتفاصيل. شكرًا.`;
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
}

// -------- ImageSlider (auto-advance slow, hover pause, click opens lightbox) --------

function ImageSlider({
  images,
  alt,
  length,
  guests,
  meta,
  shareTitle,
  shareUrl,
  onOpenLightbox,
}: {
  images: string[];
  alt: string;
  length: string;
  guests: string;
  meta: string[];
  shareTitle: string;
  shareUrl: string;
  onOpenLightbox?: (index: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const count = images.length;

  // Prefetch neighbors when active slide changes → next click is instant, no black flash.
  useEffect(() => {
    if (typeof window === "undefined" || count <= 1) return;
    const preload = (i: number) => {
      const src = images[i];
      if (!src) return;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => setLoaded((prev) => (prev.has(i) ? prev : new Set([...prev, i])));
      img.src = src;
    };
    preload((idx + 1) % count);
    if (count > 2) preload((idx - 1 + count) % count);
  }, [idx, count, images]);

  return (
    <div className="group/slider relative aspect-[16/10] cursor-zoom-in overflow-hidden bg-muted">
      <div
        dir="ltr"
        className="absolute inset-0 flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translate3d(${-idx * 100}%, 0, 0)` }}
      >
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            aria-label={`عرض الصورة ${i + 1}`}
            className="relative h-full w-full shrink-0 bg-muted"
            onClick={() => onOpenLightbox?.(idx)}
          >
            <img
              src={src}
              alt={i === 0 ? alt : `${alt} — ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              width={1600}
              height={1000}
              onLoad={() => setLoaded((prev) => (prev.has(i) ? prev : new Set([...prev, i])))}
              className={`pointer-events-none h-full w-full object-cover transition-opacity duration-300 ${
                loaded.has(i) ? "opacity-100" : "opacity-0"
              }`}
              draggable={false}
            />
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-primary-deep/25" />

      {/* Info pills — length + guests only (meta pills moved to card body per client request) */}
      <div className="pointer-events-none absolute inset-x-4 bottom-10 flex flex-wrap items-center gap-2">
        {length ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md ring-1 ring-white/15">
            <Ruler className="h-3 w-3 text-gold" />
            {length}
          </span>
        ) : null}
        {guests ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md ring-1 ring-white/15">
            <Users className="h-3 w-3 text-gold" />
            {guests}
          </span>
        ) : null}
      </div>

      {/* Share badge — top-start corner (RTL right) */}
      <button
        type="button"
        aria-label="مشاركة"
        onClick={(e) => {
          e.stopPropagation();
          if (typeof navigator !== "undefined" && "share" in navigator) {
            navigator.share({ title: shareTitle, url: shareUrl }).catch(() => openWa());
          } else {
            openWa();
          }
          function openWa() {
            const wa = `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`;
            window.open(wa, "_blank", "noopener,noreferrer");
          }
        }}
        className="absolute start-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md ring-1 ring-white/20 transition-all duration-300 hover:bg-gold hover:text-primary-deep"
      >
        <Share2 className="h-4 w-4" />
      </button>

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="السابق"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i - 1 + count) % count);
            }}
            className="absolute start-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md ring-1 ring-white/20 transition-all duration-300 hover:bg-gold hover:text-primary-deep group-hover/slider:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="التالي"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i + 1) % count);
            }}
            className="absolute end-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md ring-1 ring-white/20 transition-all duration-300 hover:bg-gold hover:text-primary-deep group-hover/slider:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Progress dots — bottom center, below pills */}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`صورة ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx(i);
                }}
                className={`pointer-events-auto h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? "w-8 bg-gold" : "w-1.5 bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

// -------- Lightbox (fullscreen image gallery) --------

function Lightbox({
  open,
  images,
  startIndex,
  alt,
  onClose,
}: {
  open: boolean;
  images: string[];
  startIndex: number;
  alt: string;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIdx(startIndex);
      setMounted(true);
      const t = setTimeout(() => setVisible(true), 10);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [open, mounted, startIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center bg-primary-deep/60 backdrop-blur-2xl backdrop-saturate-150 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="إغلاق"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute start-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/25"
      >
        <X className="h-6 w-6" />
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="السابق"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i - 1 + images.length) % images.length);
            }}
            className="absolute start-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-gold hover:text-primary-deep md:start-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="التالي"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i + 1) % images.length);
            }}
            className="absolute end-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-gold hover:text-primary-deep md:end-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </>
      ) : null}

      <div className="flex max-h-[85vh] max-w-[92vw] items-center justify-center">
        <img
          key={idx}
          src={images[idx]}
          alt={`${alt} — ${idx + 1}`}
          className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain animate-in fade-in duration-300"
        />
      </div>

      {images.length > 1 ? (
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`صورة ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === idx ? "w-10 bg-gold" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

// -------- ProductCard --------

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const { guests, bedrooms, length, duration, meta } = parseSpecs(product.specs);
  const priceNumber = product.price.match(/[\d,]+/)?.[0] ?? product.price;
  const priceUnit = product.price.replace(priceNumber, "").trim();
  const waLink = buildWhatsAppLink(product.title, product.price);
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);
  const hasIncluded = Boolean(product.included && product.included.length);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://dubai-yacht.ae/";

  return (
    <>
      <Reveal as="article" delay={delay} className="h-full">
        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-luxe ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2">
          <ImageSlider
            images={images}
            alt={product.title}
            length={length}
            guests={guests}
            meta={meta}
            shareTitle={product.title}
            shareUrl={shareUrl}
            onOpenLightbox={(i) => {
              setLightboxStart(i);
              setLightboxOpen(true);
            }}
          />

          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="relative inline-block text-[17px] font-extrabold leading-snug text-primary md:text-lg">
              <span className="bg-gradient-to-l from-gold to-gold-deep bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {product.title}
              </span>
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">{renderInline(product.desc)}</p>

            <div className="flex items-baseline gap-2 border-y border-gold/20 py-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">تبدأ من</span>
              <span className="text-2xl font-extrabold text-gold-deep">{priceNumber}</span>
              <span className="text-xs font-bold text-muted-foreground">{priceUnit}</span>
            </div>

            <div className="mt-1 grid grid-cols-3 gap-2 rounded-xl border border-border bg-muted/60 p-3 text-center text-xs">
              <div className="flex flex-col items-center gap-1">
                {bedrooms ? (
                  <>
                    <Bed className="h-4 w-4 text-gold-deep" />
                    <span className="font-bold text-foreground">{bedrooms}</span>
                  </>
                ) : (
                  <>
                    <Anchor className="h-4 w-4 text-gold-deep" />
                    <span className="font-bold text-foreground">قبطان محترف</span>
                  </>
                )}
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

            {/* Meta feature strip — 3-col grid, icon on top + label below, always fits width */}
            {meta.length > 0 ? (
              <ul className="grid grid-cols-3 gap-1.5 pt-1">
                {meta.map((s) => {
                  const MetaIcon = iconForMeta(s);
                  return (
                    <li
                      key={s}
                      title={s}
                      className="group flex min-w-0 flex-col items-center gap-1 rounded-lg border border-gold/25 bg-gradient-to-b from-gold/10 to-transparent px-1.5 py-2 text-center text-[10px] font-semibold text-foreground transition-all duration-300 hover:border-gold/60 hover:from-gold/20"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-gradient-to-br from-gold via-gold-soft to-gold-deep text-primary-deep shadow-sm ring-1 ring-gold/40 transition-transform duration-300 group-hover:scale-110">
                        <MetaIcon className="h-3.5 w-3.5" strokeWidth={2.75} />
                      </span>
                      <span className="line-clamp-2 leading-tight">{s}</span>
                    </li>
                  );
                })}
              </ul>
            ) : null}

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

      <Lightbox
        open={lightboxOpen}
        images={images}
        startIndex={lightboxStart}
        alt={product.title}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

// -------- IncludedModal (existing) --------

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
        className={`relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-gold/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
        }`}
      >
        <div className="relative aspect-[16/10] max-h-[32vh] shrink-0 overflow-hidden bg-primary-deep sm:max-h-[38vh]">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute start-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/95 px-3 py-1 text-xs font-bold text-primary-deep">
              <Sparkles className="h-3 w-3" />
              ماذا تشمل هذه الباقة
            </div>
            <h3
              id={`incl-title-${product.title}`}
              className="mt-2 text-lg font-extrabold leading-tight text-primary-foreground sm:text-xl md:text-2xl"
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

        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
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

        <div className="flex shrink-0 flex-wrap gap-3 border-t border-border bg-muted/40 p-4 sm:p-5">
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
