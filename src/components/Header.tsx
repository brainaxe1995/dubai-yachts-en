import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Globe, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { CONTACT } from "@/data/site";

const nav = [
  { to: "/yacht-rental", label: "يخوت للإيجار" },
  { to: "/yacht-parties", label: "حفلات اليخوت" },
  { to: "/fishing-trips", label: "رحلات الصيد" },
  { to: "/packages", label: "العروض" },
  { to: "/about", label: "عن الشركة" },
  { to: "/blog", label: "المدونة" },
  { to: "/contact", label: "اتصل بنا" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-primary-deep">
      {/* Top bar */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 md:px-8 md:py-4">
        {/* start cluster */}
        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gold/70 text-gold transition-colors hover:bg-gold hover:text-primary-deep"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-6 w-6" />}
          </button>

          <a href={`tel:${CONTACT.phone}`} className="hidden items-center gap-2.5 lg:flex">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/70 text-gold">
              <Phone className="h-4 w-4" />
            </span>
            <span dir="ltr" className="text-base font-bold text-primary-foreground">
              +971 544 420 441
            </span>
          </a>

          <span className="hidden h-7 w-px bg-primary-foreground/25 xl:block" />

          <div className="hidden items-center gap-2 xl:flex">
            <Globe className="h-5 w-5 text-gold" />
            <span className="text-sm font-bold text-primary-foreground">AR</span>
            <span className="text-xs text-primary-foreground/60">▾</span>
            <span aria-hidden className="text-lg leading-none">🇦🇪</span>
          </div>
        </div>

        {/* logo */}
        <Link to="/" onClick={() => setOpen(false)} className="justify-self-center">
          <img
            src={logo}
            alt="توت فن لليخوت"
            width={220}
            height={130}
            className="h-14 w-auto object-contain md:h-20"
          />
        </Link>

        {/* end cluster */}
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-3 rounded-full border border-gold px-6 py-3 text-base font-bold text-gold transition-colors hover:bg-gold hover:text-primary-deep md:inline-flex"
        >
          احجز الآن
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="احجز الآن"
          className="grid h-11 w-11 place-items-center rounded-full border border-gold text-gold md:hidden"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>

      {/* Nav row */}
      <nav className="hidden border-y border-gold/60 lg:block">
        <ul className="mx-auto grid max-w-[1600px] grid-cols-7 divide-x divide-gold/60 divide-x-reverse px-4 md:px-8">
          {nav.map((n) => (
            <li key={n.to} className="border-x border-gold/0 first:border-s last:border-e">
              <Link
                to={n.to}
                activeProps={{ className: "text-gold" }}
                className="block px-3 py-3.5 text-center text-sm font-bold text-primary-foreground transition-colors hover:text-gold"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-gold/40 bg-primary-deep transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[620px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 pb-5 pt-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="border-b border-gold/15 py-3.5 text-sm font-bold text-primary-foreground"
          >
            الرئيسية
          </Link>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-gold" }}
              className="border-b border-gold/15 py-3.5 text-sm font-bold text-primary-foreground"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={`tel:${CONTACT.phone}`}
            dir="ltr"
            className="mt-4 rounded-lg border border-gold px-4 py-3 text-center text-sm font-bold text-gold"
          >
            +971 544 420 441
          </a>
        </nav>
      </div>
    </header>
  );
}
