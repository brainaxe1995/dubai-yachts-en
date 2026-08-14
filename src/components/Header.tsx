import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { CONTACT } from "@/data/site";

const nav = [
  { to: "/", label: "الرئيسية" },
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-primary-deep/95 shadow-luxe backdrop-blur" : "bg-primary-deep/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="توت فن لليخوت" width={56} height={56} className="h-11 w-11 object-contain" />
          <span className="hidden text-sm font-bold text-primary-foreground sm:block">توت فن لليخوت</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="rounded-full px-3 py-2 text-sm font-semibold text-primary-foreground/80 transition-colors hover:text-gold"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${CONTACT.phone}`}
            className="hidden items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-secondary-foreground transition-colors hover:bg-gold-deep md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            احجز الآن
          </a>
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-primary-foreground lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-primary-foreground/10 bg-primary-deep transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[520px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="border-b border-primary-foreground/5 py-3 text-sm font-semibold text-primary-foreground/85"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full bg-gold px-4 py-3 text-center text-sm font-bold text-secondary-foreground"
          >
            احجز عبر واتساب
          </a>
        </nav>
      </div>
    </header>
  );
}
