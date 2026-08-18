import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CONTACT } from "@/data/site";

export function SmartContactForm() {
  const [phone, setPhone] = useState<string | undefined>(undefined);

  const valid = useMemo(() => (phone ? isValidPhoneNumber(phone) : false), [phone]);
  const showStatus = Boolean(phone && phone.length > 3);

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
          <span className="text-xs font-bold text-muted-foreground">الاسم الكامل</span>
          <input
            type="text"
            name="name"
            required
            placeholder="مثال: أحمد الشامسي"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
          />
        </label>

        <div className="grid gap-1.5">
          <span className="text-xs font-bold text-muted-foreground">رقم الهاتف</span>
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
              placeholder="أدخل رقم الهاتف"
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
            <span className="text-xs text-red-500">رقم غير صحيح — تحقق من عدد الأرقام</span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

      <label className="grid gap-1.5 sm:max-w-[calc(50%-0.5rem)]">
        <span className="text-xs font-bold text-muted-foreground">التاريخ المرغوب</span>
        <input
          type="date"
          name="date"
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
        />
      </label>

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
