import { Link } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, Instagram, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { CONTACT } from "@/data/site";

const quick = [
  { to: "/من-نحن", label: "من نحن" },
  { to: "/اتصل-بنا", label: "اتصل بنا" },
  { to: "/الشروط-والأحكام", label: "الشروط والأحكام" },
  { to: "/سياسة-الخصوصية", label: "سياسة الخصوصية" },
  { to: "/سياسة-الإلغاء", label: "سياسة الإلغاء" },
] as const;

const discover = [
  { to: "/تأجير-يخوت-في-دبي", label: "يخوت للإيجار في دبي" },
  { to: "/حفلات-اليخوت-في-دبي", label: "حفلات اليخوت" },
  { to: "/رحلات-صيد-السمك-في-دبي", label: "رحلات صيد السمك" },
  { to: "/باقات-تأجير-اليخوت-في-دبي", label: "الباقات والعروض" },
  { to: "/خريطة-الموقع", label: "خريطة الموقع" },
] as const;

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative mb-6 pb-3 text-base font-bold text-gold">
      {children}
      <span className="absolute bottom-0 start-0 h-px w-12 bg-gold/70" />
    </h3>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gold/40 bg-primary-deep">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-14 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <img
            src={logo}
            alt="توت فن لليخوت"
            loading="lazy"
            width={220}
            height={130}
            className="h-24 w-auto object-contain"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            توت فن لليخوت — تأجير يخوت في دبي مع رحلات خاصة، حفلات، ورحلات صيد بأسعار تبدأ من 400 درهم للساعة.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="واتساب"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-primary-deep"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إنستغرام"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-primary-deep"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <ColTitle>روابط سريعة</ColTitle>
          <ul className="space-y-3">
            {quick.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Discover */}
        <div>
          <ColTitle>اكتشف</ColTitle>
          <ul className="space-y-3">
            {discover.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-primary-foreground/70 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <ColTitle>تواصل معنا</ColTitle>
          <ul className="space-y-4">
            <li>
              <a href={`tel:${CONTACT.phone}`} className="group flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold">
                  <Phone className="h-4 w-4" />
                </span>
                <span dir="ltr" className="text-sm text-primary-foreground/80 group-hover:text-gold">
                  +971 544 420 441
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="text-sm text-primary-foreground/80 group-hover:text-gold">{CONTACT.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="text-sm text-primary-foreground/80">دبي مارينا، الإمارات العربية المتحدة</span>
            </li>
          </ul>

          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold px-6 py-3 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-primary-deep"
          >
            احجز الآن
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-primary-foreground/55 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} توت فن لليخوت — جميع الحقوق محفوظة</p>
          <div className="flex items-center gap-5">
            <Link to="/الشروط-والأحكام" className="hover:text-gold">
              الشروط والأحكام
            </Link>
            <Link to="/سياسة-الخصوصية" className="hover:text-gold">
              سياسة الخصوصية
            </Link>
            <Link to="/سياسة-الإلغاء" className="hover:text-gold">
              سياسة الإلغاء
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
