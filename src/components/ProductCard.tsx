import type { Product } from "@/data/site";
import { CONTACT } from "@/data/site";
import { Reveal } from "./Reveal";

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <Reveal as="article" delay={delay} className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-luxe transition-transform duration-500 hover:-translate-y-1.5">
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            width={1200}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute bottom-3 start-3 rounded-full bg-primary/85 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur">
            {product.price}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg leading-snug text-foreground">{product.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{product.desc}</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {product.specs.map((s) => (
              <li key={s} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-2 pt-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-gold px-4 py-2.5 text-center text-sm font-bold text-secondary-foreground transition-colors hover:bg-gold-deep"
            >
              احجز الآن
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex-1 rounded-full border border-primary/20 px-4 py-2.5 text-center text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
