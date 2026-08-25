import { CONTACT } from "@/data/site";
import { cn } from "@/lib/utils";

export function BookButton({ className, label = "Book Now" }: { className?: string; label?: string }) {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-bold text-secondary-foreground transition-all hover:bg-gold-deep hover:-translate-y-0.5 shadow-gold",
        className,
      )}
    >
      {label}
    </a>
  );
}

export function CallButton({ className, label = "Call Us" }: { className?: string; label?: string }) {
  return (
    <a
      href={`tel:${CONTACT.phone}`}
      className={cn(
        "inline-flex items-center justify-center rounded-full border-2 border-gold bg-primary-deep/80 px-6 py-3 text-sm font-bold text-gold shadow-lg backdrop-blur-md transition-all hover:bg-gold hover:text-secondary-foreground hover:-translate-y-0.5",
        className,
      )}
    >
      {label}
    </a>
  );
}
