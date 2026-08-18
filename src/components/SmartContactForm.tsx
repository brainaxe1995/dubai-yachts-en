import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { CONTACT } from "@/data/site";

type Country = { code: string; flag: string; iso: string; min: number; max: number; name: string };

const COUNTRIES: Country[] = [
  { code: "+971", flag: "🇦🇪", iso: "AE", min: 9, max: 9, name: "الإمارات" },
  { code: "+966", flag: "🇸🇦", iso: "SA", min: 9, max: 9, name: "السعودية" },
  { code: "+965", flag: "🇰🇼", iso: "KW", min: 8, max: 8, name: "الكويت" },
  { code: "+973", flag: "🇧🇭", iso: "BH", min: 8, max: 8, name: "البحرين" },
  { code: "+974", flag: "🇶🇦", iso: "QA", min: 8, max: 8, name: "قطر" },
  { code: "+968", flag: "🇴🇲", iso: "OM", min: 8, max: 8, name: "عُمان" },
  { code: "+20", flag: "🇪🇬", iso: "EG", min: 10, max: 10, name: "مصر" },
  { code: "+962", flag: "🇯🇴", iso: "JO", min: 9, max: 9, name: "الأردن" },
  { code: "+961", flag: "🇱🇧", iso: "LB", min: 7, max: 8, name: "لبنان" },
  { code: "+90", flag: "🇹🇷", iso: "TR", min: 10, max: 10, name: "تركيا" },
  { code: "+92", flag: "🇵🇰", iso: "PK", min: 10, max: 10, name: "باكستان" },
  { code: "+91", flag: "🇮🇳", iso: "IN", min: 10, max: 10, name: "الهند" },
  { code: "+44", flag: "🇬🇧", iso: "GB", min: 10, max: 10, name: "المملكة المتحدة" },
  { code: "+1", flag: "🇺🇸", iso: "US", min: 10, max: 10, name: "الولايات المتحدة" },
  { code: "+33", flag: "🇫🇷", iso: "FR", min: 9, max: 9, name: "فرنسا" },
  { code: "+49", flag: "🇩🇪", iso: "DE", min: 10, max: 11, name: "ألمانيا" },
  { code: "+7", flag: "🇷🇺", iso: "RU", min: 10, max: 10, name: "روسيا" },
  { code: "+86", flag: "🇨🇳", iso: "CN", min: 11, max: 11, name: "الصين" },
];

const BY_ISO = new Map(COUNTRIES.map((c) => [c.iso, c]));

function detectDefault(): Country {
  if (typeof navigator === "undefined") return BY_ISO.get("AE")!;
  const langs = navigator.languages ?? [navigator.language];
  for (const l of langs) {
    const iso = l.split("-")[1]?.toUpperCase();
    if (iso && BY_ISO.has(iso)) return BY_ISO.get(iso)!;
  }
  return BY_ISO.get("AE")!;
}

export function SmartContactForm() {
  const [country, setCountry] = useState<Country>(() => BY_ISO.get("AE")!);
  const [phone, setPhone] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCountry(detectDefault());
  }, []);

  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!pickerRef.current?.contains(e.target as Node)) setPickerOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [pickerOpen]);

  const digits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const valid = digits.length >= country.min && digits.length <= country.max;
  const showStatus = phone.length > 0;

  return (
    <form
      className="grid gap-4"
      action={CONTACT.whatsapp}
      method="get"
      target="_blank"
      rel="noopener noreferrer"
    >
      <input type="hidden" name="country_code" value={country.code} />

      <label className="grid gap-1.5">
        <span className="text-xs font-bold text-muted-foreground">الاسم الكامل</span>
        <input
          type="text"
          name="name"
          required
          placeholder="مثال: أحمد الشامسي"
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
        />
      </label>

      <label className="grid gap-1.5">
        <span className="text-xs font-bold text-muted-foreground">رقم الهاتف</span>
        <div
          dir="ltr"
          className={`flex overflow-visible rounded-xl border bg-background transition-colors ${
            showStatus ? (valid ? "border-emerald-500/60" : "border-red-500/60") : "border-border focus-within:border-gold"
          }`}
        >
          <div ref={pickerRef} className="relative shrink-0">
            <button
              type="button"
              aria-label="اختيار الدولة"
              onClick={() => setPickerOpen((v) => !v)}
              className="flex h-full items-center gap-2 border-e border-border bg-muted/40 px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted/60"
            >
              <span className="text-lg leading-none">{country.flag}</span>
              <span className="tabular-nums">{country.code}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
            {pickerOpen ? (
              <ul
                dir="rtl"
                role="listbox"
                className="absolute start-0 top-full z-30 mt-1 max-h-64 w-64 overflow-y-auto rounded-xl border border-border bg-card p-1 shadow-luxe"
              >
                {COUNTRIES.map((c) => (
                  <li key={c.iso}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={c.iso === country.iso}
                      onClick={() => {
                        setCountry(c);
                        setPickerOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted ${
                        c.iso === country.iso ? "bg-gold/10 font-bold" : ""
                      }`}
                    >
                      <span className="text-lg leading-none">{c.flag}</span>
                      <span className="flex-1 text-start">{c.name}</span>
                      <span dir="ltr" className="text-xs tabular-nums text-muted-foreground">{c.code}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <input
            type="tel"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="numeric"
            placeholder="5X XXX XXXX"
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
          />

          {showStatus ? (
            <span className="grid w-11 shrink-0 place-items-center border-s border-border/60">
              {valid ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </span>
          ) : null}
        </div>
        {showStatus && !valid ? (
          <span className="text-xs text-red-500">
            رقم {country.name} يتكون من {country.min === country.max ? country.min : `${country.min}-${country.max}`} أرقام
          </span>
        ) : null}
      </label>

      <label className="grid gap-1.5">
        <span className="text-xs font-bold text-muted-foreground">البريد الإلكتروني (اختياري)</span>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          dir="ltr"
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-xs font-bold text-muted-foreground">نوع الخدمة</span>
          <div className="relative">
            <select
              name="service"
              className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-3 pe-10 text-sm outline-none transition-colors focus:border-gold"
            >
              <option value="">اختر الخدمة</option>
              <option>تأجير يخت</option>
              <option>حفلة على يخت</option>
              <option>رحلة صيد</option>
              <option>باقة عشاء / إفطار</option>
              <option>حفل زفاف / طلب زواج</option>
            </select>
            <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-bold text-muted-foreground">التاريخ المرغوب</span>
          <input
            type="date"
            name="date"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className="text-xs font-bold text-muted-foreground">تفاصيل الحجز أو الاستفسار</span>
        <textarea
          name="text"
          rows={5}
          placeholder="اكتب هنا عدد الضيوف، المناسبة، والوقت المفضل..."
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
        />
      </label>

      <button
        type="submit"
        disabled={showStatus && !valid}
        className="mt-2 rounded-xl bg-primary-deep px-6 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        إرسال الاستفسار عبر واتساب
      </button>
    </form>
  );
}
