import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Mail, Instagram, MapPin, Facebook, Youtube, Music2, Ghost, Twitter, ShieldCheck, Anchor, Sparkles, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import logo from "@/assets/toot-fun-yachts-dubai-logo.webp";
import payVisa from "@/assets/branding/payments/visa.svg";
import payMastercard from "@/assets/branding/payments/mastercard.svg";
import payAmex from "@/assets/branding/payments/amex.svg";
import payDiscover from "@/assets/branding/payments/discover.svg";
import payDiners from "@/assets/branding/payments/diners.svg";
import payJcb from "@/assets/branding/payments/jcb.svg";
import payUnionpay from "@/assets/branding/payments/unionpay.svg";
import payApple from "@/assets/branding/payments/applepay.svg";
import payGoogle from "@/assets/branding/payments/googlepay.svg";

const paymentMethods = [
  { src: payVisa, alt: "Visa" },
  { src: payMastercard, alt: "Mastercard" },
  { src: payAmex, alt: "American Express" },
  { src: payDiscover, alt: "Discover" },
  { src: payDiners, alt: "Diners Club" },
  { src: payJcb, alt: "JCB" },
  { src: payUnionpay, alt: "UnionPay" },
  { src: payApple, alt: "Apple Pay" },
  { src: payGoogle, alt: "Google Pay" },
];
import { CONTACT } from "@/data/site";
import { DEFAULT_CONFIG, getConfig } from "@/data/config";

const quick = [
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
  { to: "/terms-and-conditions", label: "Terms & Conditions" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/cancellation-policy", label: "Cancellation Policy" },
] as const;

const discover = [
  { to: "/yacht-rental-dubai", label: "Yacht Rental Dubai" },
  { to: "/yacht-party-dubai", label: "Yacht Party Dubai" },
  { to: "/fishing-trip-dubai", label: "Fishing Trip Dubai" },
  { to: "/yacht-packages-dubai", label: "Yacht Packages Dubai" },
  { to: "/blog", label: "Blog" },
  { to: "/sitemap", label: "Sitemap" },
] as const;

const socialDefs = [
  { key: "instagram" as const, icon: Instagram, label: "Instagram" },
  { key: "facebook" as const, icon: Facebook, label: "Facebook" },
  { key: "youtube" as const, icon: Youtube, label: "YouTube" },
  { key: "tiktok" as const, icon: Music2, label: "TikTok" },
  { key: "x" as const, icon: Twitter, label: "X" },
  { key: "snapchat" as const, icon: Ghost, label: "Snapchat" },
];

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="relative mb-4 pb-2 text-sm font-bold text-gold md:mb-6 md:pb-3 md:text-base">
      {children}
      <span className="absolute bottom-0 start-0 h-px w-10 bg-gold/70 md:w-12" />
    </h4>
  );
}

export function Footer() {
  const [social, setSocial] = useState(DEFAULT_CONFIG.social);
  useEffect(() => {
    setSocial(getConfig().social);
  }, []);

  return (
    <footer className="border-t border-gold/40 bg-primary-deep">
      {/* Trust badges row */}
      <div className="border-b border-primary-foreground/10 bg-gradient-to-b from-primary-deep to-primary">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 md:px-8">
          {[
            { icon: ShieldCheck, t: "Licensed Fleet", d: "Fully insured & safety certified" },
            { icon: Anchor, t: "From Dubai Marina", d: "The best departure point in Dubai" },
            { icon: Sparkles, t: "Professional Crew", d: "Trained to the highest standards" },
            { icon: Clock, t: "24/7 Support", d: "Ask or book anytime" },
          ].map((b) => (
            <div
              key={b.t}
              className="flex items-center gap-3 rounded-2xl border border-gold/25 bg-primary-foreground/5 p-3 text-primary-foreground"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold sm:text-sm">{b.t}</p>
                <p className="text-[11px] text-primary-foreground/60 sm:text-xs">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-6 px-4 py-12 sm:gap-8 md:gap-10 md:px-8 md:py-14 lg:grid-cols-4">
        {/* Brand */}
        <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-start">
          <img
            src={logo}
            alt="Toot Fun Yachts"
            loading="lazy"
            width={220}
            height={130}
            className="h-24 w-auto object-contain"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Toot Fun Yachts — yacht rentals in Dubai with private cruises, parties, and fishing trips starting from AED 450 per hour.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {socialDefs.map((s) => {
              const url = social[s.key];
              if (!url) return null;
              const Icon = s.icon;
              return (
                <a
                  key={s.key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-primary-deep"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <ColTitle>Helpful Links</ColTitle>
          <ul className="space-y-2 md:space-y-3">
            {quick.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Discover */}
        <div>
          <ColTitle>Our Products</ColTitle>
          <ul className="space-y-2 md:space-y-3">
            {discover.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-1">
          <ColTitle>Contact Us</ColTitle>
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <li>
              <a href={`tel:${CONTACT.phone}`} className="group flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold">
                  <Phone className="h-4 w-4" />
                </span>
                <span dir="ltr" className="text-xs text-primary-foreground/80 group-hover:text-gold sm:text-sm">
                  +971 544 420 441
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="text-xs text-primary-foreground/80 group-hover:text-gold sm:text-sm">{CONTACT.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="text-xs text-primary-foreground/80 sm:text-sm">Dubai Marina, United Arab Emirates</span>
            </li>
          </ul>

          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 mb-16 inline-flex items-center gap-3 rounded-full border border-gold bg-primary-deep/60 px-6 py-3 text-sm font-bold text-gold shadow-lg transition-colors hover:bg-gold hover:text-primary-deep sm:mb-0"
          >
            Book Now
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-primary-foreground/55 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Toot Fun Yachts — All rights reserved</p>
          <div className="flex items-center gap-2" title="Accepted payment methods">
            <span className="text-[11px] text-primary-foreground/50">Payments:</span>
            <ul className="flex items-center gap-1" aria-label="Accepted payment methods">
              {paymentMethods.map((m) => (
                <li key={m.alt}>
                  <img
                    src={m.src}
                    alt={m.alt}
                    title={m.alt}
                    loading="lazy"
                    width={32}
                    height={20}
                    className="h-5 w-auto rounded-[3px] bg-white/95 px-[3px] py-[1px] ring-1 ring-gold/25 transition-all hover:ring-gold/60 hover:brightness-110"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/terms-and-conditions/" className="hover:text-gold">
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy/" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/cancellation-policy/" className="hover:text-gold">
              Cancellation Policy
            </Link>
            <Link to="/sitemap/" className="hover:text-gold">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
