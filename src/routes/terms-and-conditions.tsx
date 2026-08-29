import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Handshake,
  CreditCard,
  Clock,
  IdCard,
  ShieldCheck,
  Waves,
  UserCheck,
  Ban,
  Utensils,
  PawPrint,
  CloudRain,
  Wrench,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { LegalSection, type LegalBlock } from "@/components/LegalSection";
import { CallButton } from "@/components/CtaButtons";
import { ContactCta } from "@/components/ContactCta";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Toot Fun Yachts Dubai" },
      {
        name: "description",
        content:"Learn about Toot Fun Yachts’ terms and conditions, including booking, payment, cancellation, customer responsibilities, and the use of yacht rental services in Dubai.",
      },
      { property: "og:title", content: "Terms and Conditions | Toot Fun Yachts Dubai" },
      { property: "og:description", content: "Learn about Toot Fun Yachts’ terms and conditions, including booking, payment, cancellation, customer responsibilities, and the use of yacht rental services in Dubai." },
      { property: "og:url", content: "https://dubai-yachts.ae/terms-and-conditions/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yachts.ae/terms-and-conditions/" },
      { rel: "alternate", hrefLang: "en", href: "https://dubai-yachts.ae/terms-and-conditions/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yachts.ae/terms-and-conditions/" },
    ],
  }),
  component: Page,
});

const blocks: LegalBlock[] = [
  {
    h: "Booking and confirmation",
    icon: Handshake,
    p: [
      "- Bookings are confirmed once the agreed __deposit__ is paid.",
      "- Booking details and the boarding location are sent once payment is confirmed.",
      "- The minimum booking duration varies by yacht type and selected package.",
      "- Yacht availability and timing are subject to final confirmation at time of booking.",
    ],
  },
  {
    h: "Payment",
    icon: CreditCard,
    p: [
      "- The remaining balance must be paid __before boarding the yacht__.",
      "- All prices are in __UAE Dirhams (AED)__ unless stated otherwise.",
      "- Any services or add-ons requested after booking confirmation may incur additional charges.",
    ],
  },
  {
    h: "Arrival and departure time",
    icon: Clock,
    p: [
      "- Guests must arrive at the boarding location at least __15 minutes before__ the trip time.",
      "- The trip clock starts at the scheduled booking time and will not be extended due to guest delays.",
      "- The boarding location and contact details will be sent before the trip.",
    ],
  },
  {
    h: "ID requirements",
    icon: IdCard,
    p: [
      "All guests must carry their __original Emirates ID or original passport__ at boarding, in line with applicable requirements.",
    ],
  },
  {
    h: "Safety on board",
    icon: ShieldCheck,
    p: [
      "- Guests must follow the __captain and crew's__ instructions throughout the trip.",
      "- The captain has the authority to change the route or stop any activity if there is a safety concern.",
      "- Parents and guardians are responsible for supervising children at all times.",
      "- Appropriate safety equipment is provided on board.",
    ],
  },
  {
    h: "Swimming and water activities",
    icon: Waves,
    p: [
      "- Swimming and water activities are subject to weather, sea conditions, and __the captain's approval__.",
      "- Guests must have the captain's approval before entering the water.",
      "- Water sports are carried out in line with safety instructions and applicable regulations.",
      "- Any activity may be stopped if the captain considers it unsafe.",
    ],
  },
  {
    h: "Guest responsibility",
    icon: UserCheck,
    p: [
      "- The client is responsible for any damage caused by misuse or deliberate action by them or their guests.",
      "- Yacht furniture, equipment, and property must be kept in good condition.",
      "- The company is not responsible for __lost personal items__ or belongings left on board.",
    ],
  },
  {
    h: "Prohibited items and behaviour",
    icon: Ban,
    p: [
      "Carrying or using __drugs or any legally prohibited substances__ on board is not allowed. Any behaviour that puts the safety of guests, crew, or the yacht at risk is also not permitted.",
    ],
  },
  {
    h: "Food and drinks",
    icon: Utensils,
    p: [
      "Guests are welcome to bring food and non-alcoholic drinks unless the package states otherwise. Alcoholic drinks and any special services are subject to applicable laws and regulations.",
    ],
  },
  {
    h: "Pets",
    icon: PawPrint,
    p: ["__Pets are not allowed__ on board."],
  },
  {
    h: "Weather and sea conditions",
    icon: CloudRain,
    p: [
      "Trips are subject to weather, sea conditions, and instructions from the relevant authorities. If a trip cannot go ahead for safety reasons or due to circumstances outside our control, we will contact the client to arrange rescheduling or other options under our booking policy.",
    ],
  },
  {
    h: "Technical faults",
    icon: Wrench,
    p: [
      "If a technical fault prevents the yacht from operating safely, we may provide a __suitable replacement yacht__, reschedule the trip, or arrange another suitable option depending on availability and booking terms.",
    ],
  },
];

function Page() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Terms and Conditions"
        title="Terms and Conditions"
        subtitle="Learn about Toot Fun Yachts' terms and conditions for booking, payment, cancellation, and use of our yacht services."
      >
        <CallButton label="Get in Touch" />
      </PageHero>

      <section className="mx-auto max-w-4xl px-4 pt-14">
        <SectionHeading
          title="Booking Terms and Conditions"
          subtitle="Learn about booking, payment, cancellation terms, and customer responsibilities when using Toot Fun Yachts' services."
        />
      </section>

      <LegalSection
        intro="Please read the __yacht booking and rental terms and conditions of Toot Fun Yachts__ before confirming your booking. These terms set out the booking and payment process, safety requirements, and guest responsibilities to keep every trip safe and enjoyable."
        blocks={blocks}
      />

      {/* Cancellation cross-link */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold/40 bg-gradient-to-br from-primary-deep to-primary p-6 shadow-luxe md:p-8">
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-primary-deep">
              <RotateCcw className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-primary-foreground">Cancellation policy</h3>
              <p className="mt-1 text-sm text-primary-foreground/75">
                All bookings are subject to the Toot Fun Yachts cancellation and refund policy.
              </p>
            </div>
          </div>
          <Link
            to="/cancellation-policy/"
            className="inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2.5 text-sm font-bold text-gold hover:bg-gold hover:text-primary-deep"
          >
            View cancellation policy
          </Link>
        </div>

        {/* Acceptance */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
          <p className="text-sm leading-relaxed text-foreground">
            Payment of the deposit or confirmation of the booking is considered __the client's acceptance__ of these terms and conditions and their commitment to follow the safety, captain, and crew instructions throughout the trip.
          </p>
        </div>
      </section>

      <ContactCta title="Have a legal question?" subtitle="Our team is on hand to walk you through any clause before you book." />
    </>
  );
}
