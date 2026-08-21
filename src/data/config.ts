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
  englishSiteUrl: string;
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
    // Address that receives password-reset OTP emails
    recipient: string;
    // EmailJS credentials (create free account at emailjs.com — service, template, public key)
    emailjsServiceId: string;
    emailjsTemplateId: string;
    emailjsPublicKey: string;
  };
  // Per-page meta title/description overrides — keyed by pathname (with or without trailing slash).
  // Applied client-side on route match. Empty string = fall back to route's baked-in default.
  pageMeta: Record<string, { title: string; description: string }>;
};

// Baked-in title + description per editable page — kept in sync with each
// route's own `head.meta`. The admin PageMeta tab pre-fills fields from this
// map so editors can see the current default before overriding it. When the
// override string equals the default, it is stored as empty (falls back to
// route default at runtime, so future default-changes flow through).
export const PAGE_META_DEFAULTS: Record<string, { title: string; description: string }> = {
  "/": {
    title: "تأجير يخوت في دبي | أفضل الأسعار - توت فن لليخوت",
    description:
      "استمتع بخدمة تأجير يخوت في دبي مع يخوت فاخرة، أسعار تنافسية، رحلات خاصة، وطاقم محترف لجميع المناسبات. احجز يختك الآن.",
  },
  "/تأجير-يخوت-في-دبي": {
    title: "تأجير يخوت في دبي | أسطول اليخوت والأسعار – توت فن",
    description:
      "نوفر خدمات تأجير يخوت في دبي مع رحلات خاصة، يخوت متنوعة، وأسعار تبدأ من 450 درهم للساعة لجميع المناسبات.",
  },
  "/إيجار-يخوت-في-دبي": {
    title: "إيجار يخوت في دبي | توت فن لليخوت",
    description:
      "نوفر خدمات إيجار يخوت في دبي بأسعار تنافسية تبدأ من 450 درهم للساعة، مع أسطول متنوع وخيارات مناسبة للرحلات الخاصة والمناسبات.",
  },
  "/حجز-يخوت-في-دبي": {
    title: "حجز يخوت في دبي | توت فن لليخوت",
    description:
      "اكتشف أفضل خيارات حجز يخوت في دبي بأسعار تبدأ من 450 درهم للساعة، مع يخوت فاخرة ورحلات خاصة تناسب جميع المناسبات.",
  },
  "/يخوت-للإيجار-في-دبي": {
    title: "يخوت للإيجار في دبي | 15 يخت فاخر من 450 د.إ — توت فن",
    description:
      "اكتشف أفضل يخوت للإيجار في دبي بأسعار تبدأ من 450 درهم للساعة. أسطول متنوع من 40 حتى 105 قدم، مع رحلات خاصة وخيارات تناسب جميع المناسبات.",
  },
  "/حفلات-اليخوت-في-دبي": {
    title: "أفضل حفلات اليخوت في دبي | باقات مميزة — توت فن لليخوت",
    description:
      "احجز حفلات اليخوت في دبي للمناسبات وأعياد الميلاد وحفلات الزفاف مع يخوت فاخرة، ديكورات مميزة، طاقم محترف، وباقات خاصة بأسعار تنافسية تبدأ من 1,500 د.إ.",
  },
  "/رحلات-صيد-السمك-في-دبي": {
    title: "أفضل رحلات صيد السمك في دبي | توت فن لليخوت",
    description:
      "احجز أفضل رحلات صيد السمك في دبي مع قوارب مجهزة، معدات صيد، طاقم محترف، وخيارات خاصة أو مشتركة بأسعار مميزة.",
  },
  "/باقات-تأجير-اليخوت-في-دبي": {
    title: "باقات تأجير اليخوت في دبي | إفطار وعشاء — توت فن",
    description:
      "اكتشف أفضل باقات تأجير اليخوت في دبي بخيارات متنوعة تناسب الرحلات الخاصة، الحفلات والمناسبات بأسعار مرنة تبدأ من 1,800 د.إ.",
  },
  "/من-نحن": {
    title: "من نحن | توت فن لليخوت",
    description:
      "تعرّف على من نحن في توت فن لليخوت، وخبرتنا في تقديم خدمات تأجير اليخوت والرحلات البحرية الفاخرة في دبي.",
  },
  "/اتصل-بنا": {
    title: "اتصل بنا | توت فن لليخوت",
    description: "اتصل بنا لحجز يختك، معرفة الأسعار والباقات، واختيار الرحلة المناسبة لك مع توت فن لليخوت.",
  },
  "/المدونة": {
    title: "المدونة | نصائح ودليل تأجير اليخوت في دبي | توت فن لليخوت",
    description:
      "اكتشف المدونة وتعرّف على أحدث النصائح والأفكار حول تأجير اليخوت، الرحلات البحرية، حفلات اليخوت، ورحلات الصيد في دبي.",
  },
  "/خريطة-الموقع": {
    title: "خريطة الموقع | توت فن لتأجير اليخوت في دبي",
    description:
      "تصفح خريطة الموقع لتوت فن لليخوت للوصول بسهولة إلى صفحات تأجير اليخوت، الحفلات، الرحلات البحرية، والباقات المتوفرة في دبي.",
  },
  "/سياسة-الإلغاء": {
    title: "سياسة الإلغاء سهلة | توت فن لليخوت",
    description:
      "تعرّف على سياسة الإلغاء والاسترداد لدى توت فن لليخوت، بما يشمل شروط الإلغاء، إعادة الجدولة، المبالغ المستردة، وحالات عدم الحضور.",
  },
  "/الشروط-والأحكام": {
    title: "الشروط والأحكام | توت فن لليخوت",
    description:
      "اطلع على الشروط والأحكام الخاصة بتوت فن لليخوت، بما يشمل الحجز، الدفع، الإلغاء، مسؤوليات العملاء، واستخدام خدمات تأجير اليخوت في دبي.",
  },
  "/سياسة-الخصوصية": {
    title: "سياسة الخصوصية | توت فن لليخوت",
    description:
      "توضح سياسة الخصوصية التزامنا بحماية معلوماتك الشخصية والحفاظ على سريتها عند استخدام موقع وخدمات توت فن لليخوت.",
  },
};

export const EDITABLE_PAGES: { path: string; label: string }[] = [
  { path: "/", label: "الرئيسية (Home)" },
  { path: "/تأجير-يخوت-في-دبي", label: "تأجير يخوت في دبي" },
  { path: "/إيجار-يخوت-في-دبي", label: "إيجار يخوت في دبي" },
  { path: "/حجز-يخوت-في-دبي", label: "حجز يخوت في دبي" },
  { path: "/يخوت-للإيجار-في-دبي", label: "يخوت للإيجار في دبي" },
  { path: "/حفلات-اليخوت-في-دبي", label: "حفلات اليخوت" },
  { path: "/رحلات-صيد-السمك-في-دبي", label: "رحلات صيد السمك" },
  { path: "/باقات-تأجير-اليخوت-في-دبي", label: "باقات تأجير اليخوت" },
  { path: "/من-نحن", label: "من نحن" },
  { path: "/اتصل-بنا", label: "اتصل بنا" },
  { path: "/المدونة", label: "المدونة" },
  { path: "/خريطة-الموقع", label: "خريطة الموقع" },
  { path: "/سياسة-الإلغاء", label: "سياسة الإلغاء" },
  { path: "/الشروط-والأحكام", label: "الشروط والأحكام" },
  { path: "/سياسة-الخصوصية", label: "سياسة الخصوصية" },
];

export const DEFAULT_CONFIG: SiteConfig = {
  brand: "توت فن لليخوت",
  phone: "+971544420441",
  phoneDisplay: "‎+971 54 442 0441",
  whatsapp: "https://wa.me/971544420441",
  email: "info@tootfunyachts.com",
  address: "دبي مارينا، الإمارات العربية المتحدة",
  siteUrl: "https://dubai-yacht.ae",
  englishSiteUrl: "https://tootfunyachts.com",
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
    defaultTitle: "تأجير يخوت في دبي | أفضل الأسعار - توت فن لليخوت",
    defaultDescription:
      "استمتع بخدمة تأجير يخوت في دبي مع يخوت فاخرة، أسعار تنافسية، رحلات خاصة، وطاقم محترف لجميع المناسبات. احجز يختك الآن.",
    ogImage: "https://dubai-yacht.ae/og-cover.jpg",
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
  // Base: server-persisted overrides injected in root head as window.__TFC__ (SSR),
  // then per-browser admin preview overrides in localStorage on top.
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
