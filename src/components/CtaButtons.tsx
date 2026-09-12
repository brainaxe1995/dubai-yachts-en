import { CONTACT } from "@/data/site";
import { waAbout, waBooking } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * `topic` names what the visitor was reading, so the WhatsApp chat opens with
 * an opening line about it. Without one the button falls back to the generic
 * booking enquiry.
 */
export function BookButton({
  className,
  label = "Book Now",
  topic,
}: {
  className?: string;
  label?: string;
  topic?: string;
}) {
  return (
    <a
      href={topic ? waAbout(topic) : waBooking()}
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
