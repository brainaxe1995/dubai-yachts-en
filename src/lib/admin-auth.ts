// Client-side admin password + OTP helpers. Server persistence via TanStack Start
// server functions is blocked by createCsrfMiddleware bug → all state lives in
// localStorage/sessionStorage. OTP emails are sent via EmailJS (client-side, no backend).

import emailjs from "@emailjs/browser";
import { getConfig } from "@/data/config";

const PASSWORD_KEY = "toot-fun-admin-password";
const OTP_KEY = "toot-fun-admin-otp";
const OTP_EXPIRES_KEY = "toot-fun-admin-otp-expires";
const DEFAULT_PASSWORD = "Tootfun321+";
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function getAdminPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PASSWORD;
  try {
    const stored = window.localStorage.getItem(PASSWORD_KEY);
    return stored && stored.length > 0 ? stored : DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

export function setAdminPassword(next: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PASSWORD_KEY, next);
}

export function resetAdminPassword(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PASSWORD_KEY);
}

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * Generates a 6-digit OTP, stores it in sessionStorage with a 10-min expiry,
 * and emails it to the admin recipient via EmailJS.
 * Returns { ok: true } on success, { ok: false, reason } on failure.
 */
export async function sendPasswordResetOtp(): Promise<{ ok: true; sentTo: string } | { ok: false; reason: string }> {
  if (typeof window === "undefined") return { ok: false, reason: "Client only" };
  const cfg = getConfig();
  const { recipient, emailjsServiceId, emailjsTemplateId, emailjsPublicKey } = cfg.adminEmail;
  if (!recipient) return { ok: false, reason: "Admin recipient email not configured." };
  if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
    return { ok: false, reason: "EmailJS credentials missing. Configure them in the admin dashboard first." };
  }
  const otp = generateOtp();
  window.sessionStorage.setItem(OTP_KEY, otp);
  window.sessionStorage.setItem(OTP_EXPIRES_KEY, String(Date.now() + OTP_TTL_MS));
  try {
    await emailjs.send(
      emailjsServiceId,
      emailjsTemplateId,
      {
        to_email: recipient,
        otp_code: otp,
        subject: "Toot Fun Admin — Password reset OTP",
        message: `Your one-time password reset code is: ${otp}. It expires in 10 minutes.`,
      },
      { publicKey: emailjsPublicKey },
    );
    return { ok: true, sentTo: recipient };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "EmailJS send failed" };
  }
}

export function verifyOtp(input: string): boolean {
  if (typeof window === "undefined") return false;
  const stored = window.sessionStorage.getItem(OTP_KEY);
  const expiresAt = Number(window.sessionStorage.getItem(OTP_EXPIRES_KEY) ?? 0);
  if (!stored) return false;
  if (Date.now() > expiresAt) {
    window.sessionStorage.removeItem(OTP_KEY);
    window.sessionStorage.removeItem(OTP_EXPIRES_KEY);
    return false;
  }
  const ok = input.trim() === stored;
  if (ok) {
    window.sessionStorage.removeItem(OTP_KEY);
    window.sessionStorage.removeItem(OTP_EXPIRES_KEY);
  }
  return ok;
}
