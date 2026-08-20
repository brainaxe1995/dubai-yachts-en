// Client-side admin password helpers. Since TanStack Start's server functions
// are blocked by createCsrfMiddleware bug, credentials live in localStorage.
// The default constant is the fallback when no override is stored (or after reset).

const PASSWORD_KEY = "toot-fun-admin-password";
const DEFAULT_PASSWORD = "Tootfun321+";

// Last 4 digits of the site master phone (+971 544 420 441) — used as
// forgot-password challenge answer. Change in step with CONTACT.phone if it rotates.
export const FORGOT_CHALLENGE_ANSWER = "0441";

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

export function verifyForgotAnswer(answer: string): boolean {
  return answer.trim() === FORGOT_CHALLENGE_ANSWER;
}
