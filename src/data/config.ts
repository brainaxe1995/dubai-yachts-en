// Central site config — edit this file to change site-wide settings.
// Values here are the DEFAULTS. Admin panel overrides via localStorage
// (browser-only preview). For production, edit these constants and redeploy.

export type SiteConfig = {
  brand: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  siteUrl: string;
  arabicSiteUrl: string;
  social: {
    instagram: string;
    tiktok: string;
    snapchat: string;
    facebook: string;
    youtube: string;
    x: string;
    linkedin: string;
  };
  tracking: {
    ga4Id: string;
    gtmId: string;
    googleAdsId: string;
    googleAdsConversionLabel: string;
    metaPixelId: string;
    tiktokPixelId: string;
    snapchatPixelId: string;
    googleSiteVerification: string;
    bingSiteVerification: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
    priceStartAed: number;
  };
  adminEmail: {
    recipient: string;
    emailjsServiceId: string;
    emailjsTemplateId: string;
    emailjsPublicKey: string;
  };
  pageMeta: Record<string, { title: string; description: string }>;
};

export const PAGE_META_DEFAULTS: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Yacht Rental in Dubai | Best Prices - Toot Fun Yachts",
    description:
      "Luxury yacht rental in Dubai with competitive rates, private cruises, and a professional crew for every occasion. Book your yacht today.",
  },
  "/yacht-rental-dubai": {
    title: "Yacht Rental in Dubai | Fleet & Prices - Toot Fun",
    description:
      "Yacht rental services in Dubai with private cruises, diverse yachts, and rates from AED 450/hour for all occasions.",
  },
  "/rent-a-yacht-dubai": {
    title: "Yacht Hire in Dubai | Toot Fun Yachts",
    description:
      "Yacht hire in Dubai at competitive rates from AED 450/hour, with a varied fleet and options for private trips and events.",
  },
  "/yacht-booking-dubai": {
    title: "Yacht Booking in Dubai | Toot Fun Yachts",
    description:
      "Discover the best yacht booking options in Dubai from AED 450/hour, with luxury yachts and private cruises for every occasion.",
  },
  "/yacht-charter-dubai": {
    title: "Yachts for Rent in Dubai | 15 Luxury Yachts from AED 450 - Toot Fun",
    description:
      "The best yachts for rent in Dubai from AED 450/hour. Varied fleet from 40 to 105 ft, private cruises, and options for every occasion.",
  },
  "/yacht-party-dubai": {
    title: "Best Yacht Parties in Dubai | Premium Packages - Toot Fun Yachts",
    description:
      "Book yacht parties in Dubai for celebrations, birthdays, and weddings with luxury yachts, styling, a professional crew, and packages from AED 1,500.",
  },
  "/fishing-trip-dubai": {
    title: "Best Fishing Trips in Dubai | Toot Fun Yachts",
    description:
      "Book the best fishing trips in Dubai with fully-equipped boats, tackle, a professional crew, and private or shared options at great rates.",
  },
  "/yacht-packages-dubai": {
    title: "Yacht Rental Packages in Dubai | Breakfast & Dinner - Toot Fun",
    description:
      "Discover the best yacht rental packages in Dubai for private trips, parties, and events with flexible pricing from AED 1,800.",
  },
  "/about-us": {
    title: "About Us | Toot Fun Yachts",
    description:
      "Meet Toot Fun Yachts and our experience delivering luxury yacht rental and private cruise services in Dubai.",
  },
  "/contact-us": {
    title: "Contact Us | Toot Fun Yachts",
    description: "Contact us to book your yacht, see prices and packages, and choose the trip that fits you.",
  },
  "/blog": {
    title: "Blog | Dubai Yacht Rental Tips & Guides | Toot Fun Yachts",
    description:
      "Read our blog for the latest tips and ideas on yacht rental, private cruises, yacht parties, and fishing trips in Dubai.",
  },
  "/sitemap": {
    title: "Sitemap | Toot Fun Yachts Dubai",
    description:
      "Browse the Toot Fun Yachts sitemap to easily reach yacht rental, party, cruise, and package pages in Dubai.",
  },
  "/cancellation-policy": {
    title: "Easy Cancellation Policy | Toot Fun Yachts",
    description:
      "Read the cancellation and refund policy at Toot Fun Yachts, including cancellation terms, rescheduling, refunds, and no-show cases.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Toot Fun Yachts",
    description:
      "Read the terms and conditions of Toot Fun Yachts, covering booking, payment, cancellation, customer responsibilities, and use of our services in Dubai.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Toot Fun Yachts",
    description:
      "Our privacy policy explains our commitment to protecting your personal information when you use the Toot Fun Yachts website and services.",
  },
};

export const EDITABLE_PAGES: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/yacht-rental-dubai", label: "Yacht Rental in Dubai" },
  { path: "/rent-a-yacht-dubai", label: "Yacht Hire in Dubai" },
  { path: "/yacht-booking-dubai", label: "Yacht Booking in Dubai" },
  { path: "/yacht-charter-dubai", label: "Yachts for Rent in Dubai" },
  { path: "/yacht-party-dubai", label: "Yacht Parties" },
  { path: "/fishing-trip-dubai", label: "Fishing Trips" },
  { path: "/yacht-packages-dubai", label: "Yacht Rental Packages" },
  { path: "/about-us", label: "About Us" },
  { path: "/contact-us", label: "Contact Us" },
  { path: "/blog", label: "Blog" },
  { path: "/sitemap", label: "Sitemap" },
  { path: "/cancellation-policy", label: "Cancellation Policy" },
  { path: "/terms-and-conditions", label: "Terms & Conditions" },
  { path: "/privacy-policy", label: "Privacy Policy" },
];

export const DEFAULT_CONFIG: SiteConfig = {
  brand: "Toot Fun Yachts",
  phone: "+971544420441",
  phoneDisplay: "+971 54 442 0441",
  whatsapp: "https://wa.me/971544420441",
  email: "info@tootfunyachts.com",
  address: "Dubai Marina, United Arab Emirates",
  siteUrl: "https://seashell-spoonbill-893561.hostingersite.com",
  arabicSiteUrl: "https://dubai-yacht.ae",
  social: {
    instagram: "https://www.instagram.com/tootfun.yachts/",
    tiktok: "https://www.tiktok.com/@tootfunyachts",
    snapchat: "",
    facebook: "https://www.facebook.com/tootyachts",
    youtube: "https://www.youtube.com/@tootfunyachts",
    x: "",
    linkedin: "https://www.linkedin.com/in/toot-fun-yachts-169a77271/",
  },
  tracking: {
    ga4Id: "",
    gtmId: "",
    googleAdsId: "",
    googleAdsConversionLabel: "",
    metaPixelId: "",
    tiktokPixelId: "",
    snapchatPixelId: "",
    googleSiteVerification: "",
    bingSiteVerification: "",
  },
  seo: {
    defaultTitle: "Yacht Rental in Dubai | Best Prices - Toot Fun Yachts",
    defaultDescription:
      "Luxury yacht rental in Dubai with competitive rates, private cruises, and a professional crew for every occasion. Book your yacht today.",
    ogImage: "https://seashell-spoonbill-893561.hostingersite.com/og-cover.jpg",
    priceStartAed: 450,
  },
  adminEmail: {
    recipient: "info@tootfunyachts.com",
    emailjsServiceId: "service_31orv7d",
    emailjsTemplateId: "template_sb7ah6o",
    emailjsPublicKey: "",
  },
  pageMeta: {},
};

const STORAGE_KEY = "toot-fun-admin-config";

export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  let base: SiteConfig = DEFAULT_CONFIG;
  try {
    const serverOverride = (window as unknown as { __TFC__?: Partial<SiteConfig> }).__TFC__;
    if (serverOverride && typeof serverOverride === "object" && Object.keys(serverOverride).length > 0) {
      base = deepMerge(DEFAULT_CONFIG, serverOverride);
    }
  } catch {
    // Ignore malformed injected globals.
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const override = JSON.parse(raw) as Partial<SiteConfig>;
    return deepMerge(base, override);
  } catch {
    return base;
  }
}

export function saveConfig(cfg: SiteConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

export function resetConfig() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

function deepMerge<T>(base: T, patch: Partial<T>): T {
  if (typeof base !== "object" || base === null) return (patch as T) ?? base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const k of Object.keys(patch as Record<string, unknown>)) {
    const bv = (base as Record<string, unknown>)[k];
    const pv = (patch as Record<string, unknown>)[k];
    if (typeof bv === "object" && bv !== null && typeof pv === "object" && pv !== null && !Array.isArray(bv)) {
      out[k] = deepMerge(bv, pv as Partial<typeof bv>);
    } else if (pv !== undefined) {
      out[k] = pv;
    }
  }
  return out as T;
}
