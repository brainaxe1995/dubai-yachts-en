import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, Globe, ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import logo from "@/assets/logo.png";
import { CONTACT } from "@/data/site";

const nav = [
  { to: "/تأجير-يخوت-في-دبي", label: "يخوت للإيجار" },
  { to: "/حفلات-اليخوت-في-دبي", label: "حفلات اليخوت" },
  { to: "/رحلات-صيد-السمك-في-دبي", label: "رحلات الصيد" },
  { to: "/باقات-تأجير-اليخوت-في-دبي", label: "العروض" },
  { to: "/من-نحن", label: "عن الشركة" },
  { to: "/المدونة", label: "المدونة" },
  { to: "/اتصل-بنا", label: "اتصل بنا" },
] as const;

function UaeFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 6" className={className} aria-hidden role="img" focusable="false">
      <rect width="9" height="6" fill="#fff" />
      <rect width="9" height="2" fill="#00732f" />
      <rect y="4" width="9" height="2" fill="#000" />
      <rect width="2.25" height="6" fill="#ff0000" />
    </svg>
  );
}

function LangSwitcher({ align = "start" }: { align?: "start" | "end" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 text-primary-foreground"
      >
        <Globe className="h-5 w-5 text-gold" />
        <span className="text-sm font-bold">AR</span>
        <ChevronDown className={`h-4 w-4 text-primary-foreground/70 transition-transform ${open ? "rotate-180" : ""}`} />
        <UaeFlag className="h-4 w-6 rounded-[2px]" />
      </button>

      {open ? (
        <ul
          role="listbox"
          className={`absolute ${align === "end" ? "end-0" : "start-0"} top-[calc(100%+0.5rem)] z-50 w-36 overflow-hidden rounded-lg border border-gold/50 bg-primary-deep py-1 shadow-luxe`}
        >
          <li>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm font-bold text-gold"
            >
              <UaeFlag className="h-3.5 w-5 rounded-[2px]" /> AR
            </button>
          </li>
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm font-bold text-primary-foreground/80 hover:text-gold"
            >
              <svg viewBox="0 0 60 30" className="h-3.5 w-5 rounded-[2px]" aria-hidden><clipPath id="t"><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath><path d="M0,0v30h60v-30z" fill="#012169"/><path d="M0,0 60,30M60,0 0,30" stroke="#fff" strokeWidth="6"/><path d="M0,0 60,30M60,0 0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/><path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6"/></svg> EN
            </a>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

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
      {/* Top bar — physical LTR positioning: menu/phone/lang left, logo center, CTA right */}
      <div
        dir="ltr"
        className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 md:px-8 md:py-4"
      >
        {/* LEFT cluster */}
        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gold/70 text-gold transition-colors hover:bg-gold hover:text-primary-deep lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-6 w-6" />}
          </button>

          <a href={`tel:${CONTACT.phone}`} className="hidden items-center gap-2.5 md:flex">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/70 text-gold">
              <Phone className="h-4 w-4" />
            </span>
            <span className="text-base font-bold text-primary-foreground">+971 544 420 441</span>
          </a>

          <span className="hidden h-7 w-px bg-primary-foreground/25 lg:block" />

          <div className="hidden lg:block">
            <LangSwitcher />
          </div>
        </div>

        {/* CENTER logo */}
        <Link to="/" onClick={() => setOpen(false)} className="justify-self-center">
          <img
            src={logo}
            alt="توت فن لليخوت"
            width={240}
            height={140}
            className="h-16 w-auto object-contain md:h-28"
          />
        </Link>

        {/* RIGHT CTA */}
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          dir="rtl"
          className="hidden items-center justify-self-end gap-3 rounded-full border border-gold px-6 py-3 text-base font-bold text-gold transition-colors hover:bg-gold hover:text-primary-deep md:inline-flex"
        >
          احجز الآن
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <div className="justify-self-end rounded-full border border-gold/70 px-3 py-2 md:hidden">
          <LangSwitcher align="end" />
        </div>
      </div>

      {/* Nav row */}
      <nav className="hidden pb-4 lg:block">
        <ul className="mx-auto grid max-w-[1600px] grid-cols-7 overflow-hidden rounded-sm border border-gold/70 md:mx-8">
          {nav.map((n) => (
            <li key={n.to} className="border-s border-gold/70 first:border-s-0">
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

      {/* Mobile side drawer */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-primary-deep/70 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-xs flex-col border-e border-gold/40 bg-primary-deep shadow-luxe transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/25 px-4 py-4">
          <img src={logo} alt="توت فن لليخوت" className="h-12 w-auto object-contain" />
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-gold/70 text-gold transition-colors hover:bg-gold hover:text-primary-deep"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-4 pb-6 pt-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="border-b border-gold/15 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:text-gold"
          >
            الرئيسية
          </Link>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-gold" }}
              className="border-b border-gold/15 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:text-gold"
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-5 flex items-center justify-between gap-3">
            <a
              href={`tel:${CONTACT.phone}`}
              dir="ltr"
              className="flex-1 rounded-lg border border-gold px-4 py-3 text-center text-sm font-bold text-gold"
            >
              +971 544 420 441
            </a>
            <LangSwitcher />
          </div>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-secondary-foreground"
          >
            <WhatsAppIcon className="h-4 w-4" /> احجز الآن
          </a>
        </nav>
      </aside>

    </header>
  );
}
