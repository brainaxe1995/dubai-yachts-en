import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/site";

export function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-5 start-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-secondary-foreground shadow-gold transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
