import { motion } from "framer-motion";
import { Users, Bed, Ruler, Clock, Phone, CheckCircle2 } from "lucide-react";
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

  return (
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
        {/* Floating specs on image */}
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
        {/* Title */}
        <h3 className="relative inline-block text-[17px] font-extrabold leading-snug text-primary md:text-lg">
          <span className="bg-gradient-to-l from-gold to-gold-deep bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
            {product.title}
          </span>
        </h3>

        {/* Price under title */}
        <div className="flex items-baseline gap-2 border-y border-gold/20 py-2.5">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">تبدأ من</span>
          <span className="text-2xl font-extrabold text-gold-deep">{priceNumber}</span>
          <span className="text-xs font-bold text-muted-foreground">{priceUnit}</span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{product.desc}</p>

        {/* Icon spec row */}
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
          <motion.a
            href={`tel:${CONTACT.phone}`}
            aria-label="اتصل بنا"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/60 text-gold hover:bg-gold hover:text-primary-deep"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
