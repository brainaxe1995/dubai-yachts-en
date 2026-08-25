import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronLeftIcon, ChevronRightIcon, XCircle, ChevronDown } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CONTACT } from "@/data/site";

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function SmartContactForm() {
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [today, setToday] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setToday(startOfToday());
  }, []);

  const valid = useMemo(() => (phone ? isValidPhoneNumber(phone) : false), [phone]);
  const showStatus = Boolean(phone && phone.length > 3);
  const dateValue = date ? format(date, "yyyy-MM-dd") : "";
  const dateLabel = date ? format(date, "EEEE, d MMMM yyyy", { locale: enUS }) : "Pick a date";

  return (
    <form
      className="grid gap-4"
      action={CONTACT.whatsapp}
      method="get"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-xs font-bold text-muted-foreground">Full Name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. John Smith"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
        </label>

        <div className="grid gap-1.5">
          <span className="text-xs font-bold text-muted-foreground">Phone Number</span>
          <div
            className={`smart-phone flex items-center gap-2 overflow-hidden rounded-xl border bg-background px-3 transition-colors ${
              showStatus ? (valid ? "border-emerald-500/60" : "border-red-500/60") : "border-border focus-within:border-gold"
            }`}
          >
            <PhoneInput
              international
              defaultCountry="AE"
              value={phone}
              onChange={setPhone}
              name="phone"
              placeholder="Enter phone number"
              className="flex-1"
            />
            {showStatus ? (
              valid ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
              ) : (
                <XCircle className="h-5 w-5 shrink-0 text-red-500" />
              )
            ) : null}
          </div>
          {showStatus && !valid ? (
            <span className="text-xs text-red-500">Invalid phone number — check the digit count</span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-xs font-bold text-muted-foreground">Email (optional)</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            dir="ltr"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-bold text-muted-foreground">Service Type</span>
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
        <span className="text-xs font-bold text-muted-foreground">Preferred Date</span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`group flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-start text-sm outline-none transition-all hover:border-gold/60 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                date ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <span className="truncate">{dateLabel}</span>
              <CalendarDays className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:scale-110" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto overflow-hidden rounded-2xl border-gold/30 bg-background p-0 shadow-gold"
          >
            <div className="border-b border-gold/20 bg-gradient-to-l from-primary-deep via-primary to-primary-deep px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gold-soft">
                <CalendarDays className="h-4 w-4" />
                <span>Pick your booking date</span>
              </div>
              <div className="mt-1 text-sm font-medium text-primary-foreground/90">{dateLabel}</div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }}>
              <Calendar
                mode="single"
                locale={enUS}
                dir="ltr"
                weekStartsOn={0}
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  if (d) setOpen(false);
                }}
                disabled={today ? { before: today } : undefined}
                startMonth={today}
                defaultMonth={date ?? today}
                className="p-3 [--cell-size:2.25rem]"
                components={{
                  Chevron: ({ orientation, className, ...p }) => {
                    const cls = `size-4 ${className ?? ""}`;
                    const style = { transform: "rotate(0deg)" };
                    if (orientation === "left") return <ChevronLeftIcon className={cls} style={style} {...p} />;
                    if (orientation === "right") return <ChevronRightIcon className={cls} style={style} {...p} />;
                    return <ChevronDown className={cls} style={style} {...p} />;
                  },
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
        <input type="hidden" name="date" value={dateValue} />
      </div>

      <label className="grid gap-1.5">
        <span className="text-xs font-bold text-muted-foreground">Booking Details or Enquiry</span>
        <textarea
          name="text"
          rows={5}
          placeholder="Tell us the guest count, occasion, and preferred time..."
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
        />
      </label>

      <button
        type="submit"
        disabled={showStatus && !valid}
        className="mt-2 rounded-xl bg-primary-deep px-6 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        Send Enquiry via WhatsApp
      </button>
    </form>
  );
}
