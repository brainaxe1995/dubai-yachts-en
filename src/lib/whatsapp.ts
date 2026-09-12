import { CONTACT } from "@/data/site";

/** One line of the outgoing WhatsApp message: label + the value the visitor typed. */
type Row = { label: string; value: string };

const BRAND = "Toot Fun";

/** Order + labels for every booking field, matching the form's field order. */
const FIELDS: Array<[name: string, label: string]> = [
  ["name", "Name"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["service", "Service"],
  ["date", "Date"],
];

function clean(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Turn "/dinner-cruise-dubai/" into "dinner cruise dubai". */
function readablePage(pathname?: string): string {
  if (!pathname) return "";
  let p = pathname;
  try {
    p = decodeURIComponent(pathname);
  } catch {
    // malformed escape sequence — fall back to the raw value
  }
  p = p.replace(/^\/+|\/+$/g, "").replace(/-/g, " ");
  return p || "home page";
}

/**
 * Build the booking summary sent to WhatsApp.
 *
 * The form used to submit itself with method="get" straight at wa.me. WhatsApp
 * reads only the `text` query parameter, so the free-text box arrived and every
 * other field — name, phone, email, service, date — was silently dropped. This
 * folds them all into one message instead.
 *
 * Laid out like a received email: title, blank line, labelled fields one per
 * line, then the customer's own message, then a short source footer. Empty
 * fields are dropped so the operator never gets blank lines. `*text*` is
 * WhatsApp's bold syntax.
 */
export function buildBookingMessage(form: HTMLFormElement, pagePath?: string): string {
  const data = new FormData(form);

  const rows: Row[] = [];
  for (const [name, label] of FIELDS) {
    const value = clean(data.get(name));
    if (value) rows.push({ label, value });
  }

  // The textarea is named `text` because of the old wa.me GET trick.
  const message = clean(data.get("text"));
  const lines: string[] = [];

  lines.push(`*New booking enquiry*`);
  lines.push(`${BRAND} — Dubai yacht charters`);
  lines.push("");

  if (rows.length) {
    for (const r of rows) lines.push(`*${r.label}:* ${r.value}`);
  } else {
    lines.push("_No details were entered in the form._");
  }

  if (message) {
    lines.push("");
    lines.push("*Customer message:*");
    lines.push(message);
  }

  const page = readablePage(pagePath);
  if (page) {
    lines.push("");
    lines.push(`_Sent from: ${page}_`);
  }

  return lines.join("\n");
}

/* ------------------------------------------------------------------ *
 * Contextual WhatsApp links.
 *
 * Every WhatsApp button on the site opens the chat with an opening line
 * describing the thing the visitor was actually looking at, so the operator
 * knows what the enquiry is about before replying. Keep these SHORT — the
 * visitor sees the text in their compose box and has to be willing to send it.
 * ------------------------------------------------------------------ */

/** wa.me deep link carrying an arbitrary pre-filled opening message. */
export function waLink(message: string): string {
  // encodeURIComponent leaves an apostrophe untouched, which React then escapes
  // to &#x27; inside the href attribute. Encode it so the link stays clean.
  const text = encodeURIComponent(message).replace(/'/g, "%27");
  return `${CONTACT.whatsapp}?text=${text}`;
}

/** wa.me deep link carrying the pre-filled booking summary. */
export function buildWhatsAppUrl(form: HTMLFormElement, pagePath?: string): string {
  return waLink(buildBookingMessage(form, pagePath));
}

/** Enquiry about one yacht or package, from its card. */
export function waYacht(title: string, price?: string): string {
  const p = price ? `\nPrice: ${price}` : "";
  return waLink(
    `Hi ${BRAND},\nI'd like to enquire about booking:\n${title}${p}\nPlease share availability and details. Thank you.`,
  );
}

/** Enquiry raised from a named page, section or article. */
export function waAbout(topic: string): string {
  return waLink(`Hi ${BRAND}, I'd like to know more about ${topic}.`);
}

/**
 * The general "book now" button in the header, footer, hero and floating
 * action button. `base` lets the footer keep honouring an admin-overridden
 * WhatsApp number.
 */
export function waBooking(base?: string): string {
  const msg = `Hi ${BRAND}, I'd like to book a yacht in Dubai. Could you share availability and prices?`;
  const text = encodeURIComponent(msg).replace(/'/g, "%27");
  return `${base || CONTACT.whatsapp}?text=${text}`;
}
