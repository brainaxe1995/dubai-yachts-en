import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Copy,
  Save,
  Lock,
  LogOut,
  KeyRound,
  HelpCircle,
  Building2,
  Phone,
  Share2,
  BarChart3,
  FileText,
  Package,
  Map,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { DEFAULT_CONFIG, EDITABLE_PAGES, getConfig, saveConfig, type SiteConfig } from "@/data/config";
import { ProductManager } from "@/components/admin/ProductManager";
import {
  getAdminPassword,
  resetAdminPassword,
  sendPasswordResetOtp,
  setAdminPassword,
  verifyOtp,
} from "@/lib/admin-auth";

const AUTH_KEY = "toot-fun-admin-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Toot Fun Yachts" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

type TabKey =
  | "company"
  | "contact"
  | "social"
  | "tracking"
  | "pagemeta"
  | "sitemap"
  | "products"
  | "security";

const TABS: { key: TabKey; label: string; icon: typeof Building2 }[] = [
  { key: "company", label: "Company Info", icon: Building2 },
  { key: "contact", label: "Contact", icon: Phone },
  { key: "social", label: "Social Links", icon: Share2 },
  { key: "tracking", label: "Tracking & Ads", icon: BarChart3 },
  { key: "pagemeta", label: "Page SEO (Title & Description)", icon: FileText },
  { key: "sitemap", label: "Sitemap & Search Console", icon: Map },
  { key: "products", label: "Products", icon: Package },
  { key: "security", label: "Password & Security", icon: Shield },
];

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [cfg, setCfg] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<TabKey>("company");
  const [forgotStage, setForgotStage] = useState<"idle" | "sending" | "challenge" | "reset">("idle");
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
    setCfg(getConfig());
  }, []);

  if (!authed) {
    return (
      <div dir="ltr" className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4">
        <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-luxe">
          <div className="mb-4 flex items-center gap-3">
            <Lock className="h-6 w-6 text-gold" />
            <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
          </div>

          {forgotStage === "idle" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (pw === getAdminPassword()) {
                  window.sessionStorage.setItem(AUTH_KEY, "1");
                  setAuthed(true);
                } else {
                  alert("Incorrect password");
                }
              }}
            >
              <PasswordInput
                value={pw}
                onChange={setPw}
                placeholder="Password"
                autoFocus
                className="py-3 px-4"
              />
              <button
                type="submit"
                className="mt-3 w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={async () => {
                  setForgotStage("sending");
                  const res = await sendPasswordResetOtp();
                  if (res.ok) {
                    setForgotStage("challenge");
                    setForgotMsg(`OTP sent to ${res.sentTo}. Check inbox (may take 30 sec).`);
                  } else {
                    setForgotStage("idle");
                    alert(res.reason);
                  }
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-gold-deep hover:text-gold"
              >
                <HelpCircle className="h-3.5 w-3.5" /> Forgot password?
              </button>
            </form>
          ) : forgotStage === "sending" ? (
            <div className="text-center text-sm text-muted-foreground">Sending OTP…</div>
          ) : forgotStage === "challenge" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (verifyOtp(challengeAnswer)) {
                  resetAdminPassword();
                  setForgotStage("reset");
                } else {
                  alert("Incorrect or expired OTP");
                }
              }}
            >
              {forgotMsg ? <p className="mb-3 text-xs text-emerald-600">{forgotMsg}</p> : null}
              <p className="mb-3 text-sm text-muted-foreground">
                Enter the <strong className="text-foreground">6-digit code</strong> sent to the admin email.
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={challengeAnswer}
                onChange={(e) => setChallengeAnswer(e.target.value)}
                placeholder="XXXXXX"
                autoFocus
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-center text-lg font-bold tracking-widest outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="mt-3 w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={() => {
                  setForgotStage("idle");
                  setChallengeAnswer("");
                  setForgotMsg("");
                }}
                className="mt-3 text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                ← Back to login
              </button>
            </form>
          ) : (
            <div>
              <p className="text-sm text-emerald-600">
                Password reset to default. Log in with <code className="rounded bg-muted px-1.5 py-0.5">Tootfun321+</code>{" "}
                then change it from the dashboard.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForgotStage("idle");
                  setChallengeAnswer("");
                  setForgotMsg("");
                  setPw("");
                }}
                className="mt-3 w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep"
              >
                Go to login
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  function update(path: string, value: string) {
    setCfg((prev) => {
      const clone = JSON.parse(JSON.stringify(prev)) as SiteConfig;
      const keys = path.split(".");
      let obj: Record<string, unknown> = clone as unknown as Record<string, unknown>;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!k) continue;
        obj = obj[k] as Record<string, unknown>;
      }
      const lastKey = keys[keys.length - 1];
      if (lastKey) obj[lastKey] = value;
      return clone;
    });
  }

  function updatePageMeta(path: string, field: "title" | "description", value: string) {
    setCfg((prev) => {
      const clone = JSON.parse(JSON.stringify(prev)) as SiteConfig;
      const current = clone.pageMeta[path] || { title: "", description: "" };
      clone.pageMeta[path] = { ...current, [field]: value };
      return clone;
    });
  }

  function copyTsSnippet() {
    const snippet = `// Paste the object below into src/data/config.ts as the new DEFAULT_CONFIG value.\nexport const DEFAULT_CONFIG: SiteConfig = ${JSON.stringify(
      cfg,
      null,
      2,
    )};`;
    navigator.clipboard.writeText(snippet);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div dir="ltr" className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Toot Fun Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a tab on the left to edit that part of the site. Changes preview in your browser instantly — publish
            by clicking "Copy config code" at the bottom and sending to your developer.
          </p>
        </div>
        <button
          onClick={() => {
            window.sessionStorage.removeItem(AUTH_KEY);
            setAuthed(false);
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:border-gold hover:text-gold"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <nav className="flex flex-row flex-wrap gap-1 rounded-2xl border border-border bg-card p-2 shadow-luxe md:sticky md:top-24 md:flex-col md:self-start">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="space-y-6">
          {tab === "company" ? <CompanyTab cfg={cfg} update={update} /> : null}
          {tab === "contact" ? <ContactTab cfg={cfg} update={update} /> : null}
          {tab === "social" ? <SocialTab cfg={cfg} update={update} /> : null}
          {tab === "tracking" ? <TrackingTab cfg={cfg} update={update} /> : null}
          {tab === "pagemeta" ? <PageMetaTab cfg={cfg} updatePageMeta={updatePageMeta} /> : null}
          {tab === "sitemap" ? <SitemapTab cfg={cfg} /> : null}
          {tab === "products" ? <ProductManager /> : null}
          {tab === "security" ? <SecurityTab cfg={cfg} update={update} /> : null}

          <div className="sticky bottom-4 z-10 flex flex-wrap gap-3 rounded-2xl border border-gold/40 bg-card p-4 shadow-luxe">
            <button
              onClick={() => {
                saveConfig(cfg);
                alert(
                  "Saved to this browser (preview only). For permanent publish, copy the code and send to developer.",
                );
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep"
            >
              <Save className="h-4 w-4" /> Save Preview (this browser)
            </button>
            <button
              onClick={copyTsSnippet}
              className="inline-flex items-center gap-2 rounded-lg border border-gold bg-gold px-4 py-3 text-sm font-bold text-primary-deep hover:bg-gold-deep"
            >
              <Copy className="h-4 w-4" /> {saved ? "Copied ✓" : "Copy config code (for developer to publish)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyTab({ cfg, update }: { cfg: SiteConfig; update: (p: string, v: string) => void }) {
  return (
    <Section title="Company Info" subtitle="Brand name, main URLs, and physical address.">
      <Field label="Brand Name" v={cfg.brand} onChange={(v) => update("brand", v)} />
      <Field label="Site URL" v={cfg.siteUrl} onChange={(v) => update("siteUrl", v)} />
      <Field
        label="English Site URL (used by EN flag redirect)"
        v={cfg.englishSiteUrl}
        onChange={(v) => update("englishSiteUrl", v)}
      />
      <Field label="Company Address" v={cfg.address} onChange={(v) => update("address", v)} />
    </Section>
  );
}

function ContactTab({ cfg, update }: { cfg: SiteConfig; update: (p: string, v: string) => void }) {
  return (
    <Section title="Contact Details" subtitle="Phone numbers, WhatsApp link, and email used across the site.">
      <Field
        label="Phone (international format, e.g. +971544420441)"
        v={cfg.phone}
        onChange={(v) => update("phone", v)}
      />
      <Field label="Phone Display (with spaces)" v={cfg.phoneDisplay} onChange={(v) => update("phoneDisplay", v)} />
      <Field
        label="WhatsApp URL (e.g. https://wa.me/971544420441)"
        v={cfg.whatsapp}
        onChange={(v) => update("whatsapp", v)}
      />
      <Field label="Email" v={cfg.email} onChange={(v) => update("email", v)} />
    </Section>
  );
}

function SocialTab({ cfg, update }: { cfg: SiteConfig; update: (p: string, v: string) => void }) {
  return (
    <Section title="Social Media Handles" subtitle="Leave any field empty to hide that icon from the footer.">
      <Field label="Instagram URL" v={cfg.social.instagram} onChange={(v) => update("social.instagram", v)} />
      <Field label="TikTok URL" v={cfg.social.tiktok} onChange={(v) => update("social.tiktok", v)} />
      <Field label="Snapchat URL" v={cfg.social.snapchat} onChange={(v) => update("social.snapchat", v)} />
      <Field label="Facebook URL" v={cfg.social.facebook} onChange={(v) => update("social.facebook", v)} />
      <Field label="YouTube URL" v={cfg.social.youtube} onChange={(v) => update("social.youtube", v)} />
      <Field label="X (Twitter) URL" v={cfg.social.x} onChange={(v) => update("social.x", v)} />
    </Section>
  );
}

function TrackingTab({ cfg, update }: { cfg: SiteConfig; update: (p: string, v: string) => void }) {
  return (
    <div className="space-y-6">
      <Section
        title="Google Analytics & Search Console"
        subtitle="Enter IDs from your Google accounts. Leave empty to disable that script."
      >
        <Field
          label="GA4 Measurement ID (G-XXXXXXX)"
          v={cfg.tracking.ga4Id}
          onChange={(v) => update("tracking.ga4Id", v)}
        />
        <Field
          label="Google Tag Manager (GTM-XXXXXX)"
          v={cfg.tracking.gtmId}
          onChange={(v) => update("tracking.gtmId", v)}
        />
        <Field
          label="Google Site Verification (meta content)"
          v={cfg.tracking.googleSiteVerification}
          onChange={(v) => update("tracking.googleSiteVerification", v)}
        />
        <Field
          label="Bing Site Verification"
          v={cfg.tracking.bingSiteVerification}
          onChange={(v) => update("tracking.bingSiteVerification", v)}
        />
      </Section>

      <Section
        title="Google Ads & Marketing Pixels"
        subtitle="Retargeting and conversion tracking. Fill in only the ones you use."
      >
        <Field
          label="Google Ads ID (AW-XXXXXXXXX)"
          v={cfg.tracking.googleAdsId}
          onChange={(v) => update("tracking.googleAdsId", v)}
        />
        <Field
          label="Google Ads Conversion Label"
          v={cfg.tracking.googleAdsConversionLabel}
          onChange={(v) => update("tracking.googleAdsConversionLabel", v)}
        />
        <Field
          label="Meta (Facebook) Pixel ID"
          v={cfg.tracking.metaPixelId}
          onChange={(v) => update("tracking.metaPixelId", v)}
        />
        <Field
          label="TikTok Pixel ID"
          v={cfg.tracking.tiktokPixelId}
          onChange={(v) => update("tracking.tiktokPixelId", v)}
        />
        <Field
          label="Snapchat Pixel ID"
          v={cfg.tracking.snapchatPixelId}
          onChange={(v) => update("tracking.snapchatPixelId", v)}
        />
      </Section>
    </div>
  );
}

function PageMetaTab({
  cfg,
  updatePageMeta,
}: {
  cfg: SiteConfig;
  updatePageMeta: (path: string, field: "title" | "description", value: string) => void;
}) {
  const [selected, setSelected] = useState(EDITABLE_PAGES[0]?.path ?? "/");
  const currentTitle = cfg.pageMeta[selected]?.title ?? "";
  const currentDesc = cfg.pageMeta[selected]?.description ?? "";
  const titleLen = currentTitle.length;
  const descLen = currentDesc.length;

  return (
    <Section
      title="Page SEO — Meta Title & Description"
      subtitle="Pick a page, then edit how it shows in Google. Aim for title 50-60 chars and description 140-160 chars for best results."
      fullWidth
    >
      <label className="flex flex-col gap-1.5 md:col-span-2">
        <span className="text-xs font-bold text-muted-foreground">Choose the page you want to edit</span>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
        >
          {EDITABLE_PAGES.map((p) => (
            <option key={p.path} value={p.path}>
              {p.label} — {p.path}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 md:col-span-2">
        <span className="flex items-center justify-between text-xs font-bold text-muted-foreground">
          <span>Meta Title (shown in browser tab and Google results)</span>
          <span className={titleLen > 60 ? "text-red-600" : titleLen < 30 && titleLen > 0 ? "text-amber-600" : ""}>
            {titleLen}/60
          </span>
        </span>
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => updatePageMeta(selected, "title", e.target.value)}
          placeholder="Leave empty to use the built-in default for this page"
          className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
        />
      </label>

      <label className="flex flex-col gap-1.5 md:col-span-2">
        <span className="flex items-center justify-between text-xs font-bold text-muted-foreground">
          <span>Meta Description (2-3 sentences that appear under the title in Google)</span>
          <span className={descLen > 160 ? "text-red-600" : descLen < 80 && descLen > 0 ? "text-amber-600" : ""}>
            {descLen}/160
          </span>
        </span>
        <textarea
          rows={3}
          value={currentDesc}
          onChange={(e) => updatePageMeta(selected, "description", e.target.value)}
          placeholder="Leave empty to use the built-in default"
          className="resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
        />
      </label>

      <div className="md:col-span-2">
        <p className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
          <strong className="text-foreground">How it works:</strong> After you Save Preview, open the page in a new
          tab in this browser — the new title appears in the tab and Google-style meta will update. For search engines
          to see the change permanently, click "Copy config code" at the bottom and send it to your developer to
          publish.
        </p>
      </div>
    </Section>
  );
}

function SitemapTab({ cfg }: { cfg: SiteConfig }) {
  const [copied, setCopied] = useState<"url" | "list" | null>(null);
  const [liveOrigin, setLiveOrigin] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") setLiveOrigin(window.location.origin);
  }, []);
  const configured = cfg.siteUrl.replace(/\/+$/, "");
  // Prefer the actual browsing domain so admin visiting on hostingersite.com sees that URL,
  // but if they visit on their production domain it stays production.
  const base = (liveOrigin ?? configured).replace(/\/+$/, "");
  const sitemapUrl = `${base}/sitemap.xml`;
  const listedPages = useMemo(() => EDITABLE_PAGES.map((p) => `${base}${p.path}/`).join("\n"), [base]);
  const domainMismatch = liveOrigin && configured && !liveOrigin.startsWith(configured);

  function copy(text: string, kind: "url" | "list") {
    navigator.clipboard.writeText(text);
    setCopied(kind);
    setTimeout(() => setCopied(null), 2500);
  }

  return (
    <div className="space-y-6">
      <Section
        title="Sitemap URL"
        subtitle="Copy this and paste into Google Search Console → Sitemaps → Add a new sitemap. Also works for Bing Webmaster."
        fullWidth
      >
        {domainMismatch ? (
          <div className="md:col-span-2 rounded-lg border border-amber-400/60 bg-amber-50 p-3 text-xs text-amber-900">
            <strong>Heads up:</strong> You're viewing the admin on{" "}
            <code className="rounded bg-amber-100 px-1">{liveOrigin}</code> but your production Site URL in
            Company Info is <code className="rounded bg-amber-100 px-1">{configured}</code>. The URLs below use
            the current browsing domain so what you submit matches what visitors actually see. Switch to your
            production domain before submitting to Search Console if this is not final.
          </div>
        ) : null}
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <code className="grow rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground">
            {sitemapUrl}
          </code>
          <button
            onClick={() => copy(sitemapUrl, "url")}
            className="inline-flex items-center gap-2 rounded-lg border border-gold bg-gold px-4 py-3 text-sm font-bold text-primary-deep hover:bg-gold-deep"
          >
            <Copy className="h-4 w-4" /> {copied === "url" ? "Copied ✓" : "Copy Sitemap URL"}
          </button>
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-3">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:border-gold hover:text-gold"
          >
            → Open Google Search Console
          </a>
          <a
            href="https://www.bing.com/webmasters"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:border-gold hover:text-gold"
          >
            → Open Bing Webmaster Tools
          </a>
        </div>
      </Section>

      <Section
        title="All Site Pages"
        subtitle="Full list of live URLs. Copy this if you need to submit them one-by-one to Search Console URL inspection."
        fullWidth
      >
        <div className="md:col-span-2">
          <textarea
            readOnly
            rows={8}
            value={listedPages}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-xs outline-none"
          />
          <button
            onClick={() => copy(listedPages, "list")}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gold bg-gold px-4 py-3 text-sm font-bold text-primary-deep hover:bg-gold-deep"
          >
            <Copy className="h-4 w-4" /> {copied === "list" ? "Copied ✓" : "Copy All URLs"}
          </button>
        </div>
        <div className="md:col-span-2">
          <p className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
            <strong className="text-foreground">First time setup:</strong> 1) Verify site ownership in Search
            Console (paste the code in Tracking &amp; Ads → Google Site Verification). 2) Wait 5 min then reload
            site. 3) Come back here, click "Copy Sitemap URL", open Search Console, add sitemap.
          </p>
        </div>
      </Section>
    </div>
  );
}

function SecurityTab({ cfg, update }: { cfg: SiteConfig; update: (p: string, v: string) => void }) {
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  function submitPw(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (next.length < 6) {
      setMsg({ tone: "err", text: "New password must be at least 6 characters." });
      return;
    }
    if (next !== confirm) {
      setMsg({ tone: "err", text: "New password and confirmation do not match." });
      return;
    }
    setAdminPassword(next);
    setNext("");
    setConfirm("");
    setMsg({ tone: "ok", text: "Password updated. Next login will require the new password." });
  }

  return (
    <div className="space-y-6">
      <Section title="Change Admin Password" subtitle="Password stored per-browser. Min 6 characters.">
        <form onSubmit={submitPw} className="contents">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-muted-foreground">New password</span>
            <PasswordInput value={next} onChange={setNext} required minLength={6} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-muted-foreground">Confirm new password</span>
            <PasswordInput value={confirm} onChange={setConfirm} required />
          </label>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-bold text-primary-deep hover:bg-gold-deep"
            >
              <KeyRound className="h-4 w-4" /> Update password
            </button>
            {msg ? (
              <span className={`text-sm ${msg.tone === "ok" ? "text-emerald-600" : "text-red-600"}`}>{msg.text}</span>
            ) : null}
          </div>
        </form>
      </Section>

      <Section
        title="Password-Reset Email (EmailJS)"
        subtitle="OTP for the Forgot Password flow is emailed via EmailJS. Sign up free at emailjs.com."
      >
        <Field
          label="Admin Recipient Email (where OTP is sent)"
          v={cfg.adminEmail.recipient}
          onChange={(v) => update("adminEmail.recipient", v)}
        />
        <Field
          label="EmailJS Service ID"
          v={cfg.adminEmail.emailjsServiceId}
          onChange={(v) => update("adminEmail.emailjsServiceId", v)}
        />
        <Field
          label="EmailJS Template ID"
          v={cfg.adminEmail.emailjsTemplateId}
          onChange={(v) => update("adminEmail.emailjsTemplateId", v)}
        />
        <Field
          label="EmailJS Public Key"
          v={cfg.adminEmail.emailjsPublicKey}
          onChange={(v) => update("adminEmail.emailjsPublicKey", v)}
        />
        <div className="md:col-span-2">
          <p className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
            EmailJS template must include variables:{" "}
            <code className="rounded bg-background px-1">to_email</code>,{" "}
            <code className="rounded bg-background px-1">otp_code</code>,{" "}
            <code className="rounded bg-background px-1">subject</code>,{" "}
            <code className="rounded bg-background px-1">message</code>.
          </p>
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
  fullWidth,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
      <h2 className="text-lg font-bold text-gold-deep">{title}</h2>
      {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
      <div className={`mt-4 grid gap-4 ${fullWidth ? "md:grid-cols-2" : "md:grid-cols-2"}`}>{children}</div>
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  autoFocus,
  required,
  minLength,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  minLength?: number;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        minLength={minLength}
        className={`w-full rounded-lg border border-border bg-background px-3 py-2.5 pe-10 text-sm outline-none focus:border-gold ${className ?? ""}`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute end-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function Field({ label, v, onChange }: { label: string; v: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      <input
        type="text"
        value={v}
        onChange={(e) => onChange(e.target.value)}
        dir="ltr"
        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}
