import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import logo from "@/assets/toot-fun-yachts-dubai-logo.webp";
import { CONTACT } from "@/data/site";
import { getConfig, DEFAULT_CONFIG } from "@/data/config";

const nav = [
  { to: "/تأجير-يخوت-في-دبي", label: "يخوت للإيجار" },
  { to: "/حفلات-اليخوت-في-دبي", label: "حفلات اليخوت" },
  { to: "/رحلات-صيد-السمك-في-دبي", label: "رحلات الصيد" },
  { to: "/باقات-تأجير-اليخوت-في-دبي", label: "العروض" },
  { to: "/من-نحن", label: "عن الشركة" },
  { to: "/المدونة", label: "المدونة" },
  { to: "/اتصل-بنا", label: "اتصل بنا" },
] as const;

const navLeft = nav.slice(0, 4);
const navRight = nav.slice(4);

const EASE = "cubic-bezier(0.22,1,0.36,1)";

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

function UkFlag({ className = "h-4 w-6" }: { className?: string }) {
  // Unique clipPath id per instance so multiple LangSwitcher renders
  // (LEFT expanded + RIGHT shrunk cross-fade) don't clash and blank the flag.
  const clipId = useId();
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden role="img" focusable="false">
      <clipPath id={clipId}>
        <path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z" />
      </clipPath>
      <path d="M0,0v30h60v-30z" fill="#012169" />
      <path d="M0,0 60,30M60,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 60,30M60,0 0,30" clipPath={`url(#${clipId})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function LangSwitcher({ align = "start" }: { align?: "start" | "end" }) {
  const [open, setOpen] = useState(false);
  const [englishUrl, setEnglishUrl] = useState(DEFAULT_CONFIG.englishSiteUrl);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnglishUrl(getConfig().englishSiteUrl || DEFAULT_CONFIG.englishSiteUrl);
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
        className="flex items-center gap-1.5 text-primary-foreground"
      >
        <UaeFlag className="h-4 w-6 rounded-[2px]" />
        <span className="text-sm font-bold">AR</span>
        <ChevronDown className={`h-4 w-4 text-primary-foreground/70 transition-transform ${open ? "rotate-180" : ""}`} />
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
              href={englishUrl}
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm font-bold text-primary-foreground/80 hover:text-gold"
            >
              <UkFlag className="h-3.5 w-5 rounded-[2px]" /> EN
            </a>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    // Measure hero (first <section> after header). Shrink at scroll past 50% of it,
    // expand back only after scroll drops below 35% — hysteresis kills the flap-jump
    // that happens when scroll oscillates around a single threshold.
    const measure = () => {
      const hero = document.querySelector("main section, section") as HTMLElement | null;
      const heroHeight = hero?.offsetHeight ?? 600;
      return {
        shrinkAt: Math.max(160, Math.floor(heroHeight * 0.5)),
        expandAt: Math.max(80, Math.floor(heroHeight * 0.35)),
      };
    };
    let bounds = measure();
    let currentShrunk = window.scrollY > bounds.shrinkAt;
    setShrunk(currentShrunk);
    const onScroll = () => {
      const y = window.scrollY;
      if (!currentShrunk && y > bounds.shrinkAt) {
        currentShrunk = true;
        setShrunk(true);
      } else if (currentShrunk && y < bounds.expandAt) {
        currentShrunk = false;
        setShrunk(false);
      }
    };
    const onResize = () => {
      bounds = measure();
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      style={{ transition: `background-color 500ms ${EASE}, backdrop-filter 500ms ${EASE}, box-shadow 500ms ${EASE}` }}
      className={`sticky top-0 z-50 ${
        shrunk
          ? "bg-primary-deep/90 shadow-luxe backdrop-blur-md"
          : "bg-primary-deep shadow-none"
      }`}
    >
      {/* ============================== */}
      {/* TOP BAR — always rendered      */}
      {/* Elements smoothly resize/fade  */}
      {/* ============================== */}
      <div
        dir="ltr"
        style={{ transition: `padding 500ms ${EASE}` }}
        className={`mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:px-8 ${
          shrunk ? "py-2" : "py-3 md:py-4"
        }`}
      >
        {/* LEFT cluster: hamburger (mobile) + LEFT split nav (desktop shrunk) + phone/lang (desktop expanded) */}
        <div className="flex min-w-0 items-center gap-4">
          {/* Mobile hamburger — always mobile-only */}
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gold/70 text-gold transition-colors hover:bg-gold hover:text-primary-deep lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop expanded: phone + langswitcher */}
          <a
            href={`tel:${CONTACT.phone}`}
            style={{ transition: `opacity 400ms ${EASE}, max-width 500ms ${EASE}, margin 400ms ${EASE}` }}
            className={`hidden items-center gap-2.5 overflow-hidden md:flex ${
              shrunk ? "pointer-events-none max-w-0 opacity-0" : "max-w-[400px] opacity-100"
            }`}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/70 text-gold">
              <Phone className="h-4 w-4" />
            </span>
            <span className="whitespace-nowrap text-base font-bold text-primary-foreground">+971 544 420 441</span>
          </a>

          {/* Divider + LangSwitcher — visually beside the phone (original position) */}
          <span
            style={{ transition: `opacity 400ms ${EASE}, max-width 500ms ${EASE}` }}
            className={`hidden h-7 w-px overflow-hidden bg-primary-foreground/25 lg:block ${
              shrunk ? "pointer-events-none max-w-0 opacity-0" : "max-w-[2px] opacity-100"
            }`}
          />
          <div
            style={{ transition: `opacity 400ms ${EASE}, max-width 500ms ${EASE}` }}
            className={`hidden lg:block ${
              shrunk ? "pointer-events-none max-w-0 overflow-hidden opacity-0" : "max-w-[120px] opacity-100"
            }`}
          >
            <LangSwitcher />
          </div>

          {/* Desktop shrunk: physical-LEFT cluster shows the TAIL of nav (items 5-7)
              so Arabic RTL reader hits items 1-4 first on the right side, matching
              the non-shrunk 7-col grid order. */}
          <ul
            dir="rtl"
            style={{ transition: `opacity 500ms ${EASE} ${shrunk ? "200ms" : "0ms"}, max-width 500ms ${EASE}` }}
            className={`hidden flex-1 items-center justify-end gap-2 overflow-hidden whitespace-nowrap lg:flex ${
              shrunk ? "max-w-[1000px] opacity-100" : "pointer-events-none max-w-0 opacity-0"
            }`}
          >
            {navRight.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeProps={{ className: "border-gold bg-gold/10 text-gold" }}
                  className="rounded-full border border-gold/40 px-3 py-1.5 text-sm font-bold text-primary-foreground transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER logo — smoothly resizes */}
        <Link to="/" onClick={() => setOpen(false)} className="justify-self-center">
          <img
            src={logo}
            alt="توت فن لليخوت"
            width={240}
            height={140}
            style={{ transition: `height 500ms ${EASE}` }}
            className={`w-auto object-contain ${shrunk ? "h-10 md:h-12" : "h-16 md:h-28"}`}
          />
        </Link>

        {/* RIGHT cluster: RIGHT split nav (shrunk) + CTA (expanded) + shrunk-lang + mobile-lang */}
        <div className="flex items-center justify-end gap-4">
          {/* Desktop shrunk: physical-RIGHT cluster (Arabic reader's start) shows
              items 1-4 to preserve non-shrunk nav order. */}
          <ul
            dir="rtl"
            style={{ transition: `opacity 500ms ${EASE} ${shrunk ? "200ms" : "0ms"}, max-width 500ms ${EASE}` }}
            className={`hidden flex-1 items-center justify-start gap-2 overflow-hidden whitespace-nowrap lg:flex ${
              shrunk ? "max-w-[1000px] opacity-100" : "pointer-events-none max-w-0 opacity-0"
            }`}
          >
            {navLeft.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeProps={{ className: "border-gold bg-gold/10 text-gold" }}
                  className="rounded-full border border-gold/40 px-3 py-1.5 text-sm font-bold text-primary-foreground transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop expanded: احجز الآن CTA */}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            dir="rtl"
            style={{ transition: `opacity 400ms ${EASE}, max-width 500ms ${EASE}` }}
            className={`hidden items-center gap-3 overflow-hidden whitespace-nowrap rounded-full border border-gold px-6 py-3 text-base font-bold text-gold hover:bg-gold hover:text-primary-deep md:inline-flex ${
              shrunk ? "pointer-events-none max-w-0 border-transparent px-0 opacity-0" : "max-w-[300px] opacity-100"
            }`}
          >
            احجز الآن
            <WhatsAppIcon className="h-5 w-5" />
          </a>

          {/* Desktop shrunk-only LangSwitcher on RIGHT (LEFT cluster's copy fades out when shrunk) */}
          <div
            style={{ transition: `opacity 400ms ${EASE}, max-width 500ms ${EASE}` }}
            className={`hidden lg:block ${
              shrunk ? "max-w-[120px] opacity-100" : "pointer-events-none max-w-0 overflow-hidden opacity-0"
            }`}
          >
            <LangSwitcher align="end" />
          </div>

          {/* Mobile: always visible pill on RIGHT */}
          <div className="rounded-full border border-gold/70 px-3 py-2 lg:hidden">
            <LangSwitcher align="end" />
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* Full 7-column nav — collapses  */}
      {/* ============================== */}
      <div
        style={{ transition: `max-height 500ms ${EASE}, opacity 400ms ${EASE}, padding 500ms ${EASE}` }}
        className={`hidden overflow-hidden md:px-8 lg:block ${
          shrunk ? "max-h-0 px-4 pb-0 opacity-0" : "max-h-24 px-4 pb-4 opacity-100"
        }`}
      >
        <ul className="mx-auto grid max-w-[1600px] grid-cols-7 overflow-hidden rounded-sm border border-gold/70">
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
      </div>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

// Portaled to document.body so header's shrunk-state backdrop-blur stacking context
// can't obscure/hide the drawer (mobile Safari bug). z-index competes at root, not
// inside header.
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (typeof document === "undefined") return null;

  const drawer = (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-[100] bg-primary-deep/70 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[110] flex w-[82%] max-w-xs flex-col border-e border-gold/40 bg-primary-deep shadow-luxe transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/25 px-4 py-4">
          <img
            src={logo}
            alt="توت فن لليخوت"
            width={200}
            height={100}
            className="h-12 w-auto object-contain"
          />
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg border border-gold/70 text-gold transition-colors hover:bg-gold hover:text-primary-deep"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-4 pb-6 pt-2">
          <Link
            to="/"
            onClick={onClose}
            className="border-b border-gold/15 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:text-gold"
          >
            الرئيسية
          </Link>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={onClose}
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
    </>
  );

  return createPortal(drawer, document.body);
}
