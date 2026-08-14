import { Link } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";
import { CONTACT } from "@/data/site";

const quick = [
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "اتصل بنا" },
  { to: "/terms", label: "الشروط والأحكام" },
  { to: "/privacy", label: "سياسة الخصوصية" },
  { to: "/cancellation", label: "سياسة الإلغاء" },
] as const;

const discover = [
  { to: "/packages", label: "باقات اليخوت" },
  { to: "/yacht-rental", label: "حجز يخت في دبي" },
  { to: "/yacht-rental", label: "إيجار يخوت في دبي" },
  { to: "/yacht-parties", label: "الحفلات الخاصة" },
  { to: "/sitemap", label: "خريطة الموقع" },
] as const;

export function Footer() {
  return (
    <footer className="surface-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <img src={logo} alt="توت فن لليخوت" loading="lazy" width={72} height={72} className="h-16 w-16 object-contain" />
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            توت فن لليخوت — تأجير يخوت في دبي مع رحلات خاصة، حفلات، ورحلات صيد بأسعار تبدأ من 400 درهم للساعة.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-base text-gold">روابط سريعة</h3>
          <ul className="space-y-2.5">
            {quick.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base text-gold">اكتشف</h3>
          <ul className="space-y-2.5">
            {discover.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base text-gold">الدعم</h3>
          <ul className="space-y-3">
            <li>
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold">
                <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold">
                <Mail className="h-4 w-4" /> {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-3 pt-1">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="واتساب" className="rounded-full border border-gold/40 p-2 text-gold hover:bg-gold hover:text-secondary-foreground">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="إنستغرام" className="rounded-full border border-gold/40 p-2 text-gold hover:bg-gold hover:text-secondary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} توت فن لليخوت — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
