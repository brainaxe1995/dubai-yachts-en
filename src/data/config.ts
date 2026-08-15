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
};

export const DEFAULT_CONFIG: SiteConfig = {
  brand: "توت فن لليخوت",
  phone: "+971544420441",
  phoneDisplay: "‎+971 54 442 0441",
  whatsapp: "https://wa.me/971544420441",
  email: "info@tootfunyachts.com",
  address: "دبي مارينا، الإمارات العربية المتحدة",
  siteUrl: "https://dubai-yacht.ae",
  social: {
    instagram: "https://www.instagram.com/tootfun.yachts/",
    tiktok: "https://www.tiktok.com/@tootfunyachts",
    snapchat: "",
    facebook: "https://www.facebook.com/tootyachts",
    youtube: "https://www.youtube.com/@tootfunyachts",
    x: "https://x.com/tootyachts",
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
    defaultTitle: "تأجير يخوت في دبي | توت فن لليخوت",
    defaultDescription:
      "استمتع بخدمة تأجير يخوت في دبي مع يخوت فاخرة، أسعار تنافسية، رحلات خاصة، وطاقم محترف لجميع المناسبات. احجز يختك الآن.",
    ogImage: "https://dubai-yacht.ae/og-cover.jpg",
    priceStartAed: 450,
  },
};

const STORAGE_KEY = "toot-fun-admin-config";

export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const override = JSON.parse(raw) as Partial<SiteConfig>;
    return deepMerge(DEFAULT_CONFIG, override);
  } catch {
    return DEFAULT_CONFIG;
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
