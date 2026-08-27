import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import logo from "@/assets/toot-fun-yachts-dubai-logo.webp";
import { CONTACT } from "@/data/site";
import { getConfig, DEFAULT_CONFIG } from "@/data/config";

const nav = [
  { to: "/yacht-rental-dubai", label: "Yacht Rental" },
  { to: "/yacht-party-dubai", label: "Yacht Party" },
  { to: "/fishing-trip-dubai", label: "Fishing Trip" },
  { to: "/yacht-packages-dubai", label: "Packages" },
  { to: "/about-us", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/contact-us", label: "Contact Us" },
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
  const [englishUrl, setEnglishUrl] = useState(DEFAULT_CONFIG.arabicSiteUrl);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnglishUrl(getConfig().arabicSiteUrl || DEFAULT_CONFIG.arabicSiteUrl);
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
        <UkFlag className="h-4 w-6 rounded-[2px]" />
        <span className="text-sm font-bold">EN</span>
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
              <UkFlag className="h-3.5 w-5 rounded-[2px]" /> EN
            </button>
          </li>
          <li>
            <a
              href={englishUrl}
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm font-bold text-primary-foreground/80 hover:text-gold"
            >
              <UaeFlag className="h-3.5 w-5 rounded-[2px]" /> AR
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
    // Hero-relative shrink with hysteresis + post-change cooldown + rAF throttle.
    // shrinkAt 60% / expandAt 25% gives a wide safety band. After each state
    // change, ignore scroll thresholds for 500ms (matches header CSS transition)
    // so animations can settle before the next flip is allowed. Re-measure on
    // window `load` so late-arriving hero image sets the correct threshold.
    const TRANSITION_MS = 500;
    const measure = () => {
      const hero = document.querySelector("main section, section") as HTMLElement | null;
      const heroHeight = hero?.offsetHeight ?? 600;
      return {
        shrinkAt: Math.max(180, Math.floor(heroHeight * 0.6)),
        expandAt: Math.max(80, Math.floor(heroHeight * 0.25)),
      };
    };
    let bounds = measure();
    let currentShrunk = window.scrollY > bounds.shrinkAt;
    let lockedUntil = 0;
    let rafId = 0;
    setShrunk(currentShrunk);

    const evaluate = () => {
      rafId = 0;
      if (performance.now() < lockedUntil) return;
      const y = window.scrollY;
      if (!currentShrunk && y > bounds.shrinkAt) {
        currentShrunk = true;
        lockedUntil = performance.now() + TRANSITION_MS;
        setShrunk(true);
      } else if (currentShrunk && y < bounds.expandAt) {
        currentShrunk = false;
        lockedUntil = performance.now() + TRANSITION_MS;
        setShrunk(false);
      }
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(evaluate);
    };
    const onResize = () => {
      bounds = measure();
      onScroll();
    };
    const onLoad = () => {
      bounds = measure();
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
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
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gold/70 text-gold transition-colors hover:bg-gold hover:text-primary-deep lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop expanded: phone + divider + langswitcher wrapped as ONE
              collapsing unit so gap-4 between them doesn't leak margin when shrunk. */}
          <div
            style={{ transition: `opacity 400ms ${EASE}, max-width 500ms ${EASE}` }}
            className={`hidden items-center gap-4 overflow-hidden md:flex ${
              shrunk ? "pointer-events-none max-w-0 opacity-0" : "max-w-[600px] opacity-100"
            }`}
          >
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2.5 whitespace-nowrap">
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

          {/* Desktop shrunk: physical-LEFT cluster shows items 1-4 (LTR reader
              hits nav in order left-to-right). */}
          <ul
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
        </div>

        {/* CENTER logo — smoothly resizes */}
        <Link to="/" onClick={() => setOpen(false)} className="justify-self-center">
          <img
            src={logo}
            alt="Toot Fun Yachts"
            width={240}
            height={140}
            style={{ transition: `height 500ms ${EASE}` }}
            className={`w-auto object-contain ${shrunk ? "h-10 md:h-12" : "h-16 md:h-28"}`}
          />
        </Link>

        {/* RIGHT cluster: RIGHT split nav (shrunk) + CTA (expanded) + shrunk-lang + mobile-lang */}
        <div className="flex items-center justify-end gap-4">
          {/* Desktop shrunk: physical-RIGHT cluster shows tail items 5-7. */}
          <ul
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

          {/* Desktop expanded: Book Now CTA — collapses to zero when shrunk
              so there's no gap-4 leak between navRight and the shrunk lang switcher. */}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transition: `opacity 400ms ${EASE}, max-width 500ms ${EASE}, margin 400ms ${EASE}, padding 400ms ${EASE}` }}
            className={`hidden items-center gap-3 overflow-hidden whitespace-nowrap rounded-full border font-bold hover:bg-gold hover:text-primary-deep md:inline-flex ${
              shrunk
                ? "pointer-events-none -mx-2 max-w-0 border-transparent px-0 py-0 text-transparent opacity-0"
                : "max-w-[300px] border-gold px-6 py-3 text-base text-gold opacity-100"
            }`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book Now
          </a>

          {/* Desktop shrunk-only LangSwitcher on RIGHT (LEFT cluster's copy fades out when shrunk) */}
          <div
            style={{ transition: `opacity 400ms ${EASE}, max-width 500ms ${EASE}, margin 400ms ${EASE}` }}
            className={`hidden lg:block ${
              shrunk ? "max-w-[120px] opacity-100" : "pointer-events-none -ml-4 max-w-0 overflow-hidden opacity-0"
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
            alt="Toot Fun Yachts"
            width={200}
            height={100}
            className="h-12 w-auto object-contain"
          />
          <button
            type="button"
            aria-label="Close menu"
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
            Home
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
            <WhatsAppIcon className="h-4 w-4" /> Book Now
          </a>
        </nav>
      </aside>
    </>
  );

  return createPortal(drawer, document.body);
}
