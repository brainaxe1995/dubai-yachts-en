import type { ReactNode } from "react";

const STRONG_CLASS = "font-extrabold text-gold-deep dark:text-gold";

// Sorted longest-first so multi-word phrases match before their sub-words
const AUTO_KEYWORDS = [
  "Toot Fun Yachts",
  "Toot Fun",
  "yacht rental in Dubai",
  "yacht rental",
  "yacht parties",
  "fishing trips",
  "yacht packages",
  "Palm Jumeirah",
  "Burj Al Arab",
  "Dubai Marina",
  "Atlantis",
  "Ain Dubai",
  "Bluewaters",
  "Jumeirah Beach",
  "professional captain",
  "captain",
  "professional crew",
  "licensed",
  "insured",
  "yachts",
  "yacht",
  "charter",
  "party",
  "fishing",
  "package",
  "Marina",
  "Dubai",
];

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const AUTO_REGEX = new RegExp(`(${AUTO_KEYWORDS.map(escapeRegex).join("|")})`, "g");

function autoHighlight(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(AUTO_REGEX);
  const seen = new Set<string>();
  return parts.map((part, idx) => {
    if (AUTO_KEYWORDS.includes(part) && !seen.has(part)) {
      seen.add(part);
      return (
        <strong key={`${keyPrefix}-${idx}`} className={STRONG_CLASS}>
          {part}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-${idx}`}>{part}</span>;
  });
}

/**
 * Splits text on `__word__` markers and returns a ReactNode array with
 * gold-highlighted <strong> for the marked spans. If no explicit markers are
 * present, auto-highlights the first occurrence of any known brand/SEO keyword.
 */
export function renderInline(text: string): ReactNode[] {
  if (text.includes("__")) {
    const parts = text.split(/(__[^_]+__)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("__") && part.endsWith("__")) {
        return (
          <strong key={idx} className={STRONG_CLASS}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  }
  return autoHighlight(text, "auto");
}
