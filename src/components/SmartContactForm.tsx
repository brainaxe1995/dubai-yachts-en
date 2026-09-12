import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Fields = typeof import("./contact-fields");

const INPUT_CLASS =
  "rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold";
const LABEL_CLASS = "text-xs font-bold text-muted-foreground";

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** yyyy-MM-dd without pulling in date-fns, which lives in the lazy chunk. */
function isoDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * The enquiry form.
 *
 * The phone and date controls are the two heavy ones — libphonenumber's
 * metadata and react-day-picker/date-fns — and they were sitting in the initial
 * bundle even though the form is below the fold. They now arrive from
 * `contact-fields.tsx` via a dynamic import, kicked off when the form comes
 * within 600px of the viewport or anyone touches it, whichever is first.
 *
 * Until then the same two slots hold native `<input type="tel">` and
 * `<input type="date">`: server-rendered, working without JavaScript, posting
 * the identical field names, so the form is never in a broken state. The first
 * client render deliberately matches the server's, so there is no hydration
 * mismatch; the swap happens in an effect afterwards.
 */
export function SmartContactForm() {
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  // resolved after mount so server and client markup agree
  const [today, setToday] = useState<Date | undefined>(undefined);
  const [fields, setFields] = useState<Fields | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setToday(startOfToday());
  }, []);

  useEffect(() => {
    if (fields) return;
    const el = formRef.current;
    if (!el) return;
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      void import("./contact-fields").then(setFields);
    };

    // Whichever comes first: the form nears the viewport, or someone reaches
    // for it. The pointer/focus path matters for anyone who lands mid-page.
    el.addEventListener("pointerdown", load, { once: true });
    el.addEventListener("focusin", load, { once: true });

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) load();
        },
        { rootMargin: "600px" },
      );
      io.observe(el);
    } else {
      load();
    }
    return () => {
      io?.disconnect();
      el.removeEventListener("pointerdown", load);
      el.removeEventListener("focusin", load);
    };
  }, [fields]);

  const dateValue = date ? isoDate(date) : "";
  // Only the enhanced field can tell a complete number from an incomplete one,
  // so before it loads the submit button is never blocked.
  const blocked = Boolean(fields && phone && phone.length > 3 && !fields.isPhoneValid(phone));

  return (
    <form
      ref={formRef}
      className="grid gap-4"
      onSubmit={(e) => {
        // The old method="get" submitted straight to wa.me, which reads only the
        // `text` parameter — so the free-text box arrived and name, phone, email,
        // service and date were dropped. Fold them all into one message instead.
        e.preventDefault();
        const path = typeof window === "undefined" ? undefined : window.location.pathname;
        window.location.href = buildWhatsAppUrl(e.currentTarget, path);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={LABEL_CLASS}>Full Name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. John Smith"
            className={INPUT_CLASS}
          />
        </label>

        {fields ? (
          <fields.PhoneField
            value={phone}
            onChange={setPhone}
            label="Phone Number"
            placeholder="Enter phone number"
            invalidText="Invalid phone number — check the digit count"
          />
        ) : (
          <label className="grid gap-1.5">
            <span className={LABEL_CLASS}>Phone Number</span>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+971 50 123 4567"
              value={phone ?? ""}
              onChange={(e) => setPhone(e.target.value)}
              className={INPUT_CLASS}
            />
          </label>
        )}
        {/* The visible control is unnamed in both states; this carries the value.
            The phone input's own field holds national digits only, so naming it
            directly submitted a number with no country code. */}
        <input type="hidden" name="phone" value={phone ?? ""} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={LABEL_CLASS}>Email (optional)</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            dir="ltr"
            className={INPUT_CLASS}
          />
        </label>

        <label className="grid gap-1.5">
          <span className={LABEL_CLASS}>Service Type</span>
          <div className="relative">
            <select
              name="service"
              className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-3 pe-10 text-sm outline-none transition-colors focus:border-gold"
            >
              <option value="">Select service</option>
              <option>Yacht Rental</option>
              <option>Yacht Party</option>
              <option>Fishing Trip</option>
              <option>Dinner / Breakfast Package</option>
              <option>Wedding / Proposal</option>
            </select>
            <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </label>
      </div>

      <div className="grid gap-1.5 sm:max-w-[calc(50%-0.5rem)]">
        {fields ? (
          <fields.DateField
            value={date}
            onChange={setDate}
            today={today}
            label="Preferred Date"
            emptyLabel="Pick a date"
            pickerTitle="Pick your booking date"
          />
        ) : (
          <>
            <span className={LABEL_CLASS}>Preferred Date</span>
            <input
              type="date"
              value={dateValue}
              min={today ? isoDate(today) : undefined}
              onChange={(e) =>
                setDate(e.target.value ? new Date(`${e.target.value}T00:00:00`) : undefined)
              }
              className={INPUT_CLASS}
            />
          </>
        )}
        <input type="hidden" name="date" value={dateValue} />
      </div>

      <label className="grid gap-1.5">
        <span className={LABEL_CLASS}>Booking Details or Enquiry</span>
        <textarea
          name="text"
          rows={5}
          placeholder="Tell us the guest count, occasion, and preferred time..."
          className={INPUT_CLASS}
        />
      </label>

      <button
        type="submit"
        disabled={blocked}
        className="mt-2 rounded-xl bg-primary-deep px-6 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        Send Enquiry via WhatsApp
      </button>
    </form>
  );
}
