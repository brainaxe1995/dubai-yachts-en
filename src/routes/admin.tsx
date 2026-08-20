import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Save, Lock, LogOut, KeyRound, HelpCircle } from "lucide-react";
import { DEFAULT_CONFIG, getConfig, saveConfig, type SiteConfig } from "@/data/config";
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

function ChangePasswordCard() {
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  function submit(e: React.FormEvent) {
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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
      <div className="mb-3 flex items-center gap-3">
        <KeyRound className="h-5 w-5 text-gold-deep" />
        <h2 className="text-lg font-bold text-foreground">Change Admin Password</h2>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Password stored per-browser (localStorage). To reset when forgotten, use the "Forgot password?" link on the login
        screen — an OTP is emailed to the recipient set in the "Admin Email &amp; OTP" section below.
      </p>
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-xs font-bold text-muted-foreground">New password</span>
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            minLength={6}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-bold text-muted-foreground">Confirm new password</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
          />
        </label>
        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-bold text-primary-deep hover:bg-gold-deep"
          >
            <Save className="h-4 w-4" /> Update password
          </button>
          {msg ? (
            <span className={`text-sm ${msg.tone === "ok" ? "text-emerald-600" : "text-red-600"}`}>{msg.text}</span>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [cfg, setCfg] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);
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
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Password"
                autoFocus
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
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
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]] as Record<string, unknown>;
      obj[keys[keys.length - 1]] = value;
      return clone;
    });
  }

  function copyTsSnippet() {
    const snippet = `// Paste the object below into src/data/config.ts as the new DEFAULT_CONFIG value.\nexport const DEFAULT_CONFIG: SiteConfig = ${JSON.stringify(
      cfg,
      null,
      2
    )};`;
    navigator.clipboard.writeText(snippet);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div dir="ltr" className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8 flex items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Toot Fun Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit site settings, contact info, and tracking IDs (Google Ads, GA4, Meta Pixel, etc.).
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

      <div className="space-y-6">
        <ChangePasswordCard />

        <Section title="Company Info">
          <Field label="Brand Name" v={cfg.brand} onChange={(v) => update("brand", v)} />
          <Field label="Site URL" v={cfg.siteUrl} onChange={(v) => update("siteUrl", v)} />
          <Field
            label="English Site URL (EN flag redirect)"
            v={cfg.englishSiteUrl}
            onChange={(v) => update("englishSiteUrl", v)}
          />
          <Field label="Company Address" v={cfg.address} onChange={(v) => update("address", v)} />
        </Section>

        <Section title="Admin Email & OTP (EmailJS)">
          <Field
            label="Admin Recipient Email (receives password-reset OTP)"
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
          <p className="mt-2 text-xs text-muted-foreground">
            Sign up free at <code className="rounded bg-muted px-1">emailjs.com</code>. Create a Service (e.g. Gmail) +
            Template with variables <code className="rounded bg-muted px-1">to_email</code>,{" "}
            <code className="rounded bg-muted px-1">otp_code</code>,{" "}
            <code className="rounded bg-muted px-1">subject</code>,{" "}
            <code className="rounded bg-muted px-1">message</code>. Copy Service ID, Template ID, and Public Key into
            fields above. Then "Save Preview" — Forgot Password on login sends OTP to Admin Recipient.
          </p>
        </Section>

        <Section title="Contact Details">
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

        <Section title="Social Media Handles">
          <Field label="Instagram URL" v={cfg.social.instagram} onChange={(v) => update("social.instagram", v)} />
          <Field label="TikTok URL" v={cfg.social.tiktok} onChange={(v) => update("social.tiktok", v)} />
          <Field label="Snapchat URL" v={cfg.social.snapchat} onChange={(v) => update("social.snapchat", v)} />
          <Field label="Facebook URL" v={cfg.social.facebook} onChange={(v) => update("social.facebook", v)} />
          <Field label="YouTube URL" v={cfg.social.youtube} onChange={(v) => update("social.youtube", v)} />
          <Field label="X (Twitter) URL" v={cfg.social.x} onChange={(v) => update("social.x", v)} />
        </Section>

        <Section title="Google Analytics + Search Console">
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

        <Section title="Google Ads + Meta / TikTok / Snapchat Pixels">
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

        <div className="mt-10">
          <ProductManager />
        </div>

        <Section title="Default SEO">
          <Field label="Default Title" v={cfg.seo.defaultTitle} onChange={(v) => update("seo.defaultTitle", v)} />
          <Field
            label="Default Description"
            v={cfg.seo.defaultDescription}
            onChange={(v) => update("seo.defaultDescription", v)}
          />
          <Field label="OG Image (absolute URL)" v={cfg.seo.ogImage} onChange={(v) => update("seo.ogImage", v)} />
          <Field
            label="Starting Price (AED)"
            v={String(cfg.seo.priceStartAed)}
            onChange={(v) => setCfg((p) => ({ ...p, seo: { ...p.seo, priceStartAed: Number(v) || 0 } }))}
          />
        </Section>

        <div className="sticky bottom-4 z-10 flex flex-wrap gap-3 rounded-2xl border border-gold/40 bg-card p-4 shadow-luxe">
          <button
            onClick={() => {
              saveConfig(cfg);
              alert("Saved to this browser (preview only). For permanent publish, copy the code and replace it in config.ts.");
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep"
          >
            <Save className="h-4 w-4" /> Save Preview (localStorage)
          </button>
          <button
            onClick={copyTsSnippet}
            className="inline-flex items-center gap-2 rounded-lg border border-gold bg-gold px-4 py-3 text-sm font-bold text-primary-deep hover:bg-gold-deep"
          >
            <Copy className="h-4 w-4" /> {saved ? "Copied ✓" : "Copy config.ts code (publish)"}
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-muted p-5 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">How does publishing work?</p>
          <ul className="mt-2 list-disc ps-5 space-y-1">
            <li><strong>Save Preview</strong> only stores in your browser — good for testing before publish.</li>
            <li>
              <strong>Copy code</strong> copies the changes as TypeScript. Replace the contents of
              <code className="mx-1 rounded bg-background px-1">src/data/config.ts</code> then push to GitHub to
              auto-deploy on Hostinger.
            </li>
            <li>
              Google Ads / GA4 / Meta Pixel scripts load automatically when a value is present. Leave a field empty
              to disable it.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-luxe">
      <h2 className="mb-4 border-b border-border pb-3 text-lg font-bold text-gold-deep">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
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
