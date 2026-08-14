import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Bed, Ruler, Clock, Phone, CheckCircle2, X, Sparkles, Info } from "lucide-react";
import type { Product } from "@/data/site";
import { CONTACT } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

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

const container = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const { guests, bedrooms, length, duration, extras } = parseSpecs(product.specs);
  const priceNumber = product.price.match(/[\d,]+/)?.[0] ?? product.price;
  const priceUnit = product.price.replace(priceNumber, "").trim();
  const waLink = buildWhatsAppLink(product.title, product.price);
  const [modalOpen, setModalOpen] = useState(false);
  const hasIncluded = Boolean(product.included && product.included.length);

  return (
    <>
      <motion.article
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-luxe ring-1 ring-black/5"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        custom={delay}
        whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-primary-deep">
          <motion.img
            src={product.image}
            alt={product.title}
            loading="lazy"
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            initial={{ scale: 1.05 }}
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-2">
            {length ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md ring-1 ring-white/15">
                <Ruler className="h-3 w-3 text-gold" />
                {length}
              </span>
            ) : null}
            {guests ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md ring-1 ring-white/15">
                <Users className="h-3 w-3 text-gold" />
                {guests}
              </span>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="relative inline-block text-[17px] font-extrabold leading-snug text-primary md:text-lg">
            <span className="bg-gradient-to-l from-gold to-gold-deep bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
              {product.title}
            </span>
          </h3>

          <div className="flex items-baseline gap-2 border-y border-gold/20 py-2.5">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">تبدأ من</span>
            <span className="text-2xl font-extrabold text-gold-deep">{priceNumber}</span>
            <span className="text-xs font-bold text-muted-foreground">{priceUnit}</span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{product.desc}</p>

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
            <motion.a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-deep px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg ring-1 ring-black/5 hover:bg-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              data-product-title={product.title}
            >
              <WhatsAppIcon className="h-4 w-4 text-gold" />
              احجز الآن
            </motion.a>

            {hasIncluded ? (
              <motion.button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gold bg-gold px-4 py-3 text-sm font-bold text-primary-deep hover:bg-gold-deep hover:text-primary-foreground"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Info className="h-4 w-4" />
                ماذا يشمل
              </motion.button>
            ) : (
              <motion.a
                href={`tel:${CONTACT.phone}`}
                aria-label="اتصل بنا"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/60 text-gold hover:bg-gold hover:text-primary-deep"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.article>

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
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`incl-title-${product.title}`}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-primary-deep/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-card shadow-luxe ring-1 ring-gold/40"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header with image */}
            <div className="relative aspect-[16/7] overflow-hidden bg-primary-deep">
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

            {/* Body */}
            <div className="max-h-[55vh] overflow-y-auto p-6">
              <h4 className="mb-4 text-base font-bold text-gold-deep">
                <CheckCircle2 className="me-2 inline h-5 w-5" />
                يشمل السعر
              </h4>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {product.included?.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-3 text-sm leading-relaxed text-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                    <span>{item}</span>
                  </motion.li>
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

            {/* Footer CTAs */}
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
