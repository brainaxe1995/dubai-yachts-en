import type { ReactNode } from "react";

const STRONG_CLASS = "font-extrabold text-gold-deep dark:text-gold";

// Sorted longest-first so multi-word phrases match before their sub-words
const AUTO_KEYWORDS = [
  "Toot Fun Yachts",
  "Toot Fun",
  "Luxury Yacht Charter Dubai",
  "Private Yacht Rental Dubai",
  "yacht rental in Dubai",
  "yacht charter in Dubai",
  "yacht booking in Dubai",
  "yacht packages in Dubai",
  "yacht party in Dubai",
  "yacht parties in Dubai",
  "fishing trip in Dubai",
  "fishing trips in Dubai",
  "yacht rental Dubai",
  "yacht charter Dubai",
  "yacht booking Dubai",
  "yacht packages Dubai",
  "yacht party Dubai",
  "fishing trip Dubai",
  "rent a yacht Dubai",
  "rent a yacht",
  "yacht hire Dubai",
  "yacht hire",
  "yacht rental",
  "yacht charter",
  "yacht booking",
  "yacht parties",
  "yacht party",
  "yacht packages",
  "fishing trips",
  "fishing trip",
  "private yacht",
  "luxury yacht",
  "luxury yachts",
  "superyacht",
  "professional captain",
  "professional crew",
  "licensed captain",
  "AED 450 per hour",
  "AED 1,800",
  "AED 1,500",
  "AED 450",
  "Palm Jumeirah",
  "Burj Al Arab",
  "Dubai Marina",
  "Burj Khalifa",
  "Atlantis",
  "Ain Dubai",
  "Bluewaters",
  "JBR Beach",
  "JBR",
  "Jumeirah Beach",
  "Jumeirah",
  "hammour",
  "sheri",
  "kingfish",
  "barracuda",
  "tuna",
  "captain",
  "licensed",
  "insured",
  "yachts",
  "yacht",
  "charter",
  "booking",
  "party",
  "parties",
  "fishing",
  "packages",
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
