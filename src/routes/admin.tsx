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
  ExternalLink,
  LayoutDashboard,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X as XIcon,
} from "lucide-react";
import { DEFAULT_CONFIG, EDITABLE_PAGES, PAGE_META_DEFAULTS, getConfig, saveConfig, type SiteConfig } from "@/data/config";
import { ProductManager } from "@/components/admin/ProductManager";
import {
  changeAdminPasswordOnServer,
  getAdminPassword,
  resetAdminPassword,
  sendPasswordResetOtp,
  setAdminPassword,
  verifyAdminPasswordOnServer,
  verifyOtp,
} from "@/lib/admin-auth";
import { getProductOverrides, saveProductOverrides } from "@/lib/overrides";
import { invalidateOverridesCache } from "@/hooks/useProductOverrides";
import { EMPTY_OVERRIDES, type ProductOverrides } from "@/lib/overrides-types";

const AUTH_KEY = "toot-fun-admin-auth";
const AUTH_START_KEY = "toot-fun-admin-auth-started-at";
const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour

function deepMergeClient<T>(base: T, patch: Partial<T>): T {
  if (typeof base !== "object" || base === null) return (patch as T) ?? base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const k of Object.keys(patch as Record<string, unknown>)) {
    const bv = (base as Record<string, unknown>)[k];
    const pv = (patch as Record<string, unknown>)[k];
    if (typeof bv === "object" && bv !== null && typeof pv === "object" && pv !== null && !Array.isArray(bv)) {
      out[k] = deepMergeClient(bv, pv as Partial<typeof bv>);
    } else if (pv !== undefined) {
      out[k] = pv;
    }
  }
  return out as T;
}

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

const AUTH_PW_KEY = "toot-fun-admin-pw-cache";

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [cfg, setCfg] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [overrides, setOverrides] = useState<ProductOverrides>(EMPTY_OVERRIDES);
  const [overridesLoading, setOverridesLoading] = useState(true);
  const [saveState, setSaveState] = useState<{ tone: "idle" | "saving" | "ok" | "err"; text: string }>({
    tone: "idle",
    text: "",
  });
  const [tab, setTab] = useState<TabKey>("company");
  const [forgotStage, setForgotStage] = useState<"idle" | "sending" | "challenge" | "reset">("idle");
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [purging, setPurging] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error"; title: string; body?: string } | null>(null);

  function showToast(next: { tone: "success" | "error"; title: string; body?: string }, ttlMs = 6000) {
    setToast(next);
    if (ttlMs > 0) window.setTimeout(() => setToast((t) => (t === next ? null : t)), ttlMs);
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem(AUTH_KEY) === "1") {
      const cached = window.sessionStorage.getItem(AUTH_PW_KEY) ?? "";
      const startedAt = Number(window.sessionStorage.getItem(AUTH_START_KEY) ?? 0);
      const expired = !startedAt || Date.now() - startedAt > SESSION_TTL_MS;
      // Trust the session only if the cached pw still verifies server-side AND
      // the 1-hour idle-since-login window has not elapsed.
      if (expired || cached.length === 0) {
        window.sessionStorage.removeItem(AUTH_KEY);
        window.sessionStorage.removeItem(AUTH_PW_KEY);
        window.sessionStorage.removeItem(AUTH_START_KEY);
      } else {
        (async () => {
          const ok = await verifyAdminPasswordOnServer(cached);
          if (ok) {
            setPw(cached);
            setAuthed(true);
          } else {
            window.sessionStorage.removeItem(AUTH_KEY);
            window.sessionStorage.removeItem(AUTH_PW_KEY);
            window.sessionStorage.removeItem(AUTH_START_KEY);
            resetAdminPassword();
            setPw("");
          }
        })();
      }
    } else {
      // Autofill login field from last-successful pw so returning admins don't retype.
      const stored = getAdminPassword();
      if (stored) setPw(stored);
    }
    // Load client localStorage first for instant preview, then merge server-side stored config over it.
    setCfg(getConfig());
    (async () => {
      try {
        const res = await fetch("/api/config", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { config?: Partial<SiteConfig> };
        if (data.config && Object.keys(data.config).length > 0) {
          setCfg((prev) => deepMergeClient(prev, data.config as Partial<SiteConfig>));
        }
      } catch {
        // Non-fatal — admin still works with localStorage-only preview.
      }
    })();
    getProductOverrides()
      .then((data) => setOverrides(data))
      .catch(() => setOverrides(EMPTY_OVERRIDES))
      .finally(() => setOverridesLoading(false));
  }, []);

  function logout() {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(AUTH_KEY);
      window.sessionStorage.removeItem(AUTH_PW_KEY);
      window.sessionStorage.removeItem(AUTH_START_KEY);
    }
    setAuthed(false);
    setPw("");
  }

  // Auto-logout after SESSION_TTL_MS from login. Poll once per minute so the
  // check survives across tab-focus changes without needing a setTimeout that
  // dies with the page. Kept BEFORE the !authed early-return so the hook
  // ordering stays stable across auth transitions.
  useEffect(() => {
    if (!authed || typeof window === "undefined") return;
    const check = () => {
      const startedAt = Number(window.sessionStorage.getItem(AUTH_START_KEY) ?? 0);
      if (!startedAt || Date.now() - startedAt > SESSION_TTL_MS) logout();
    };
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

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
              onSubmit={async (e) => {
                e.preventDefault();
                setLoginError("");
                setLoginBusy(true);
                try {
                  const ok = await verifyAdminPasswordOnServer(pw);
                  if (!ok) {
                    setLoginError("Incorrect password.");
                    return;
                  }
                  setAdminPassword(pw); // cache last-successful pw for autofill
                  window.sessionStorage.setItem(AUTH_KEY, "1");
                  window.sessionStorage.setItem(AUTH_PW_KEY, pw);
                  window.sessionStorage.setItem(AUTH_START_KEY, String(Date.now()));
                  setAuthed(true);
                } finally {
                  setLoginBusy(false);
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
              {loginError ? (
                <p className="mt-2 text-xs font-semibold text-red-600">{loginError}</p>
              ) : null}
              <button
                type="submit"
                disabled={loginBusy}
                className="mt-3 w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loginBusy ? "Checking…" : "Log in"}
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
                Local password cache cleared. Try logging in with the default{" "}
                <code className="rounded bg-muted px-1.5 py-0.5">Tootfun321+</code>. If the server rejects it (because
                a custom password was previously saved server-side), recovery requires SSH access to remove{" "}
                <code className="rounded bg-muted px-1.5 py-0.5">hbuilds/admin-password.json</code>.
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

  async function purgeCache() {
    if (purging) return;
    setPurging(true);
    try {
      const res = await fetch("/api/cache-purge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; purgedAt?: string };
      if (!res.ok || !data.ok) {
        showToast({ tone: "error", title: "Cache purge failed", body: data.error ?? `HTTP ${res.status}` });
        return;
      }
      showToast({
        tone: "success",
        title: "Cache cleared",
        body: "Server version bumped, this browser's cache dropped. Visitors need a hard-refresh (Ctrl+Shift+R) to pick up changes.",
      });
    } catch (e) {
      showToast({ tone: "error", title: "Network error", body: e instanceof Error ? e.message : String(e) });
    } finally {
      setPurging(false);
    }
  }

  async function saveToServer() {
    setSaveState({ tone: "saving", text: "Saving…" });
    saveConfig(cfg); // optimistic local mirror
    const results = await Promise.allSettled([
      (async () => {
        const res = await fetch("/api/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: pw, config: cfg }),
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) throw new Error(data.error ?? `Config save failed (${res.status})`);
      })(),
      saveProductOverrides({ password: pw, overrides }),
    ]);
    const failures = results
      .map((r) => (r.status === "rejected" ? (r.reason instanceof Error ? r.reason.message : String(r.reason)) : null))
      .filter((s): s is string => Boolean(s));
    if (failures.length > 0) {
      setSaveState({ tone: "err", text: failures.join(" · ") });
      return;
    }
    invalidateOverridesCache();
    setSaveState({ tone: "ok", text: "Saved. Live for everyone visiting the site." });
    setTimeout(() => setSaveState({ tone: "idle", text: "" }), 4000);
  }

  return (
    <div dir="ltr" className="min-h-screen bg-slate-100 text-slate-900">
      {/* WordPress-style top toolbar. Sticky so it stays visible while scrolling long tabs. */}
      <div className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900 text-slate-100 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-4 w-4 text-gold" aria-hidden />
            <span className="text-sm font-bold tracking-wide">Toot Fun Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-800 hover:text-gold"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Visit Site
            </a>
            <button
              onClick={purgeCache}
              disabled={purging}
              title="Bumps server cache version + clears this browser's HTTP cache. Ask visitors to hard-refresh to pick up changes."
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:border-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 className="h-3.5 w-3.5" /> {purging ? "Purging…" : "Clear Cache"}
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:border-gold hover:text-gold"
            >
              <LogOut className="h-3.5 w-3.5" /> Log out
            </button>
          </div>
        </div>
      </div>

      {/* Floating toast — slides in top-right, auto-dismisses after 6s. */}
      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed end-4 top-16 z-50 flex max-w-sm items-start gap-3 rounded-xl border-l-4 bg-white p-4 shadow-xl transition-all ${
            toast.tone === "success" ? "border-emerald-500" : "border-red-500"
          }`}
        >
          {toast.tone === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          ) : (
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          )}
          <div className="flex-1 text-sm text-slate-800">
            <p className="font-semibold text-slate-900">{toast.title}</p>
            {toast.body ? <p className="mt-1 text-xs text-slate-600">{toast.body}</p> : null}
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss"
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Edit each section on the right, then click <strong className="text-slate-700">Save Changes</strong> at
            the top of that section to publish live.
          </p>
        </header>

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <nav className="flex flex-row flex-wrap gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm md:sticky md:top-20 md:flex-col md:self-start">
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
          {tab === "company" ? (
            <>
              <SaveBar onSave={saveToServer} state={saveState} />
              <CompanyTab cfg={cfg} update={update} />
            </>
          ) : null}
          {tab === "contact" ? (
            <>
              <SaveBar onSave={saveToServer} state={saveState} />
              <ContactTab cfg={cfg} update={update} />
            </>
          ) : null}
          {tab === "social" ? (
            <>
              <SaveBar onSave={saveToServer} state={saveState} />
              <SocialTab cfg={cfg} update={update} />
            </>
          ) : null}
          {tab === "tracking" ? (
            <>
              <SaveBar onSave={saveToServer} state={saveState} />
              <TrackingTab cfg={cfg} update={update} />
            </>
          ) : null}
          {tab === "pagemeta" ? (
            <>
              <SaveBar onSave={saveToServer} state={saveState} />
              <PageMetaTab cfg={cfg} updatePageMeta={updatePageMeta} />
            </>
          ) : null}
          {tab === "sitemap" ? <SitemapTab cfg={cfg} /> : null}
          {tab === "products" ? (
            <ProductManager
              overrides={overrides}
              setOverrides={setOverrides}
              loading={overridesLoading}
              onSave={saveToServer}
              saveState={saveState}
            />
          ) : null}
          {tab === "security" ? (
            <SecurityTab
              cfg={cfg}
              update={update}
              currentPw={pw}
              onPwChanged={(next) => setPw(next)}
            />
          ) : null}
        </div>
      </div>
      </div>
    </div>
  );
}

export type AdminSaveState = { tone: "idle" | "saving" | "ok" | "err"; text: string };

function SaveBar({ onSave, state }: { onSave: () => void; state: AdminSaveState }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gold/40 bg-card p-4 shadow-luxe">
      <button
        onClick={onSave}
        disabled={state.tone === "saving"}
        className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-bold text-primary-deep hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Save className="h-4 w-4" /> {state.tone === "saving" ? "Saving…" : "Save Changes"}
      </button>
      {state.text ? (
        <span
          className={`text-sm font-semibold ${
            state.tone === "ok"
              ? "text-emerald-600"
              : state.tone === "err"
                ? "text-red-600"
                : "text-muted-foreground"
          }`}
        >
          {state.text}
        </span>
      ) : null}
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
  const defaults = PAGE_META_DEFAULTS[selected] ?? { title: "", description: "" };
  const overrideTitle = cfg.pageMeta[selected]?.title ?? "";
  const overrideDesc = cfg.pageMeta[selected]?.description ?? "";
  // Show override when present, otherwise show baked-in default so editors see
  // the current live text and can edit from it directly.
  const effectiveTitle = overrideTitle.length > 0 ? overrideTitle : defaults.title;
  const effectiveDesc = overrideDesc.length > 0 ? overrideDesc : defaults.description;

  function onTitleChange(v: string) {
    // If user types the default back, store empty so future default-changes still flow through.
    updatePageMeta(selected, "title", v === defaults.title ? "" : v);
  }
  function onDescChange(v: string) {
    updatePageMeta(selected, "description", v === defaults.description ? "" : v);
  }

  return (
    <Section
      title="Page SEO — Meta Title & Description"
      subtitle="Pick a page, then edit how it shows in Google. Fields are pre-filled with the current live text — edit freely, no length limits enforced."
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
        <span className="text-xs font-bold text-muted-foreground">
          Meta Title (shown in browser tab and Google results)
        </span>
        <input
          type="text"
          value={effectiveTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Type the meta title for this page"
          className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
        />
      </label>

      <label className="flex flex-col gap-1.5 md:col-span-2">
        <span className="text-xs font-bold text-muted-foreground">
          Meta Description (2-3 sentences that appear under the title in Google)
        </span>
        <textarea
          rows={3}
          value={effectiveDesc}
          onChange={(e) => onDescChange(e.target.value)}
          placeholder="Type the meta description for this page"
          className="resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
        />
      </label>

      <div className="md:col-span-2">
        <p className="rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
          <strong className="text-foreground">How it works:</strong> Fields are pre-filled with the current
          production text. Edit and click <strong>Save Changes</strong> at the top — the update is written
          server-side and takes effect for every visitor. If you clear a field, the page falls back to its
          built-in default.
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

function SecurityTab({
  cfg,
  update,
  currentPw,
  onPwChanged,
}: {
  cfg: SiteConfig;
  update: (p: string, v: string) => void;
  currentPw: string;
  onPwChanged: (next: string) => void;
}) {
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submitPw(e: React.FormEvent) {
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
    setBusy(true);
    const res = await changeAdminPasswordOnServer(currentPw, next);
    setBusy(false);
    if (!res.ok) {
      setMsg({ tone: "err", text: `Server rejected the change: ${res.error}` });
      return;
    }
    onPwChanged(next);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("toot-fun-admin-pw-cache", next);
    }
    setNext("");
    setConfirm("");
    setMsg({ tone: "ok", text: "Password updated on the server. Use the new password on every device from now on." });
  }

  return (
    <div className="space-y-6">
      <Section
        title="Change Admin Password"
        subtitle="Rotates the password on the server for all devices. Min 6 characters. If you forget it, recovery requires SSH access to the server (remove hbuilds/admin-password.json)."
      >
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
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-bold text-primary-deep hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              <KeyRound className="h-4 w-4" /> {busy ? "Updating…" : "Update password"}
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
