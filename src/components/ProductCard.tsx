import type { Product } from "@/data/site";
import { CONTACT } from "@/data/site";
import { Users } from "lucide-react";
import { Reveal } from "./Reveal";

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const guests = product.specs.find((s) => s.includes("ضيف") || s.includes("شخص"));
  const rest = product.specs.filter((s) => s !== guests);

  return (
    <Reveal as="article" delay={delay} className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-black/5 bg-card shadow-luxe transition-transform duration-500 hover:-translate-y-1.5">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            width={1200}
            height={900}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <h3 className="text-lg font-bold leading-snug text-primary">{product.title}</h3>
          {guests ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 shrink-0 text-primary/70" />
              {guests}
            </p>
          ) : null}
          <p className="text-sm leading-relaxed text-muted-foreground">{product.desc}</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {rest.map((s) => (
              <li key={s} className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {s}
              </li>
            ))}
          </ul>
          <p className="pt-1 text-base font-bold text-gold-deep">من {product.price}</p>
          <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              احجز الآن
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="rounded-lg border border-gold bg-gold px-4 py-2.5 text-center text-sm font-bold text-primary-deep transition-colors hover:bg-gold-deep"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
