import { createFileRoute } from "@tanstack/react-router";
import {
  XCircle,
  Calendar,
  UserX,
  CloudLightning,
  CheckCheck,
  TrendingUp,
  Sparkles,
  Trophy,
} from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { LegalSection, type LegalBlock } from "@/components/LegalSection";
import { CallButton } from "@/components/CtaButtons";
import { ContactCta } from "@/components/ContactCta";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Easy Cancellation Policy | Toot Fun Yachts Dubai" },
      {
        name: "description",
        content:"Learn about Toot Fun Yachts’ Cancellation Policy, including cancellation terms, rescheduling, refunds, and no-show conditions.",
      },
      { property: "og:title", content: "Easy Cancellation Policy | Toot Fun Yachts Dubai" },
      { property: "og:description", content: "Learn about Toot Fun Yachts’ Cancellation Policy, including cancellation terms, rescheduling, refunds, and no-show conditions." },
      { property: "og:url", content: "https://tootfunyachts.com/cancellation-policy/" },
    ],
    links: [
      { rel: "canonical", href: "https://tootfunyachts.com/cancellation-policy/" },
      { rel: "alternate", hrefLang: "en", href: "https://tootfunyachts.com/cancellation-policy/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://tootfunyachts.com/cancellation-policy/" },
    ],
  }),
  component: Page,
});

const blocks: LegalBlock[] = [
  {
    h: "Trip cancellation",
    icon: XCircle,
    p: [
      "- All __deposit payments__ made to confirm a booking are non-refundable.",
      "- If the trip is cancelled __72 hours or more__ before the trip time, the client is entitled to a refund of __80% of the amount paid__.",
      "- If the cancellation is made less than 72 hours before the trip time, no refund will be issued.",
      "- The 72-hour window is calculated from the departure time listed on the booking confirmation.",
    ],
  },
  {
    h: "Rescheduling and date changes",
    icon: Calendar,
    p: [
      "- The client may request a __free date or time change once__ if the request is made at least 72 hours before the trip.",
      "- All rescheduling requests are subject to yacht availability for the requested date and time.",
      "- If rescheduling is requested less than 72 hours in advance, the change may not be possible and the cancellation terms will apply.",
    ],
  },
  {
    h: "No-shows and late arrival",
    icon: UserX,
    p: [
      "- In the case of a __no-show__ at the trip time, no refund will be issued.",
      "- Guests must arrive at the boarding point at least __15 minutes before__ the trip time.",
      "- The trip clock starts at the scheduled booking time and will not be extended due to guest or client delays.",
    ],
  },
  {
    h: "Trip cancellations from our side",
    icon: CloudLightning,
    p: [
      "If the trip cannot go ahead due to circumstances outside our control — such as __bad weather, sea restrictions, coast guard instructions, or a technical fault affecting safety__ — we will try to offer one of the following:",
      "- Reschedule the trip to another time.",
      "- Provide a suitable replacement yacht, subject to availability.",
      "- __A full refund__ if no replacement or reschedule can be arranged.",
    ],
  },
  {
    h: "Booking confirmation",
    icon: CheckCheck,
    p: [
      "The booking is confirmed once the deposit or required payment is received. Booking details, date, time, and boarding location will be sent to the client via __WhatsApp__ or __email__.",
      "If the booked yacht becomes unavailable due to a technical fault or operational reason, we will provide a suitable replacement or reschedule the trip. If the client does not accept the alternatives offered, a refund will be issued based on the situation.",
    ],
  },
  {
    h: "Peak-demand bookings",
    icon: TrendingUp,
    p: [
      "Bookings during __weekends, public holidays, and peak-demand seasons__ may be subject to special terms. Any additional conditions will be shared with the client before payment and booking confirmation.",
    ],
  },
  {
    h: "Dubai New Year's Eve bookings",
    icon: Sparkles,
    p: [
      "All payments for __Dubai New Year's Eve bookings__, including private yacht charters and cruise tickets, are __non-refundable and non-cancellable__ once confirmed.",
    ],
  },
  {
    h: "Abu Dhabi Formula 1 bookings",
    icon: Trophy,
    p: [
      "All payments for __Abu Dhabi Formula 1 yacht and event bookings__, including private trips and tickets, are __non-refundable and non-cancellable__ once confirmed.",
    ],
  },
];

function Page() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Cancellation Policy"
        title="Cancellation Policy"
        subtitle="Learn about Toot Fun Yachts' cancellation and refund policy, including cancellation terms, rescheduling, refunds, and no-show conditions."
      >
        <CallButton label="Get in Touch" />
      </PageHero>

      <section className="mx-auto max-w-4xl px-4 pt-14">
        <SectionHeading
          title="Yacht Rental Cancellation Policy & Refund Terms in Dubai"
          subtitle="Learn about Toot Fun Yachts' booking cancellation, rescheduling, and refund terms."
        />
      </section>

      <LegalSection
        intro="Please review the __yacht booking cancellation and rescheduling policy__ before confirming your booking. All changes are subject to availability, and additional charges may apply depending on the booking type or service."
        blocks={blocks}
      />

      <ContactCta title="Need to cancel or change a booking?" subtitle="Get in touch as soon as possible so we can help." />
    </>
  );
}
