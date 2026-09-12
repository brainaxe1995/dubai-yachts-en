import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircle,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * The two expensive fields in the contact form, kept in their own module.
 *
 * react-phone-number-input drags in libphonenumber's metadata and
 * react-day-picker drags in date-fns — together the largest single block of the
 * initial JavaScript bundle, for two controls that sit below the fold and that
 * most visitors never touch. SmartContactForm imports this with a dynamic
 * import() once the form nears the viewport, so the bytes stay out of the
 * critical path. Until then it renders native <input type="tel"> and
 * <input type="date"> in the same slots, which work with no JavaScript at all.
 */

export function PhoneField({
  value,
  onChange,
  label,
  placeholder,
  invalidText,
}: {
  value: string | undefined;
  onChange: (v: string | undefined) => void;
  label: string;
  placeholder: string;
  invalidText: string;
}) {
  const valid = value ? isValidPhoneNumber(value) : false;
  const showStatus = Boolean(value && value.length > 3);
  return (
    <div className="grid gap-1.5">
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      <div
        className={`smart-phone flex items-center gap-2 overflow-hidden rounded-xl border bg-background px-3 transition-colors ${
          showStatus
            ? valid
              ? "border-emerald-500/60"
              : "border-red-500/60"
            : "border-border focus-within:border-gold"
        }`}
      >
        <PhoneInput
          international
          defaultCountry="AE"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
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
      {showStatus && !valid ? <span className="text-xs text-red-500">{invalidText}</span> : null}
    </div>
  );
}

/** Whether the number is complete enough to submit. Exported so the light shell
 *  can disable the button without owning libphonenumber itself. */
export function isPhoneValid(value: string | undefined): boolean {
  return value ? isValidPhoneNumber(value) : false;
}

export function DateField({
  value,
  onChange,
  today,
  label,
  emptyLabel,
  pickerTitle,
}: {
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  today: Date | undefined;
  label: string;
  emptyLabel: string;
  pickerTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const dateLabel = value ? format(value, "EEEE, d MMMM yyyy", { locale: enUS }) : emptyLabel;
  return (
    <>
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={`group flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-start text-sm outline-none transition-all hover:border-gold/60 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
              value ? "text-foreground" : "text-muted-foreground"
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
              <span>{pickerTitle}</span>
            </div>
            <div className="mt-1 text-sm font-medium text-primary-foreground/90">{dateLabel}</div>
          </div>
          <div dir="ltr" style={{ direction: "ltr" }}>
            <Calendar
              mode="single"
              locale={enUS}
              dir="ltr"
              weekStartsOn={0}
              selected={value}
              onSelect={(d) => {
                onChange(d);
                if (d) setOpen(false);
              }}
              disabled={today ? { before: today } : undefined}
              startMonth={today}
              defaultMonth={value ?? today}
              className="p-3 [--cell-size:2.25rem]"
              components={{
                Chevron: ({ orientation, className, ...p }) => {
                  const cls = `size-4 ${className ?? ""}`;
                  const style = { transform: "rotate(0deg)" };
                  if (orientation === "left")
                    return <ChevronLeftIcon className={cls} style={style} {...p} />;
                  if (orientation === "right")
                    return <ChevronRightIcon className={cls} style={style} {...p} />;
                  return <ChevronDown className={cls} style={style} {...p} />;
                },
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
