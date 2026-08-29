import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Database,
  Target,
  MessageSquare,
  Megaphone,
  Share2,
  Boxes,
  CreditCard,
  Cookie,
  BarChart3,
  Lock,
  Archive,
  Baby,
  UserCog,
  RefreshCcw,
  Heart,
  Mail,
} from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { LegalSection, type LegalBlock } from "@/components/LegalSection";
import { CallButton } from "@/components/CtaButtons";
import { ContactCta } from "@/components/ContactCta";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Toot Fun Yachts Dubai" },
      {
        name: "description",
        content:"Our Privacy Policy outlines our commitment to protecting your personal information and maintaining its confidentiality when using the Toot Fun Yachts website and services.",
      },
      { property: "og:title", content: "Privacy Policy | Toot Fun Yachts Dubai" },
      { property: "og:description", content: "Our Privacy Policy outlines our commitment to protecting your personal information and maintaining its confidentiality when using the Toot Fun Yachts website and services." },
      { property: "og:url", content: "https://dubai-yachts.ae/privacy-policy/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yachts.ae/privacy-policy/" },
      { rel: "alternate", hrefLang: "en", href: "https://dubai-yachts.ae/privacy-policy/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yachts.ae/privacy-policy/" },
    ],
  }),
  component: Page,
});

const blocks: LegalBlock[] = [
  {
    h: "Data protection in the United Arab Emirates",
    icon: ShieldCheck,
    p: [
      "We handle personal data in line with __the applicable requirements and regulations of the United Arab Emirates__, and take reasonable steps to help protect your information from unauthorised access, use, or disclosure.",
    ],
  },
  {
    h: "What personal data do we collect?",
    icon: Database,
    p: [
      "When you send an enquiry or make a booking, we may collect information such as:",
      "- Name",
      "- Phone number",
      "- Email address",
      "- Booking details",
      "- Trip date and time",
      "- Number of guests",
      "- Requested services or packages",
      "- Any additional information you share with us during contact",
      "We may also collect technical information when you use the site, such as your __IP__ address, device and browser type, pages visited, and how the site is used.",
    ],
  },
  {
    h: "Why do we collect your data?",
    icon: Target,
    p: [
      "We use the information you provide to:",
      "- Respond to enquiries",
      "- Manage and confirm bookings",
      "- Contact you about your trip",
      "- Send boarding location and trip time details",
      "- Process payments when required",
      "- Provide customer support",
      "- Improve our services and the site experience",
      "- Prevent fraud or misuse of our services",
      "- Send marketing offers or updates where permitted",
    ],
  },
  {
    h: "Booking-related communication",
    icon: MessageSquare,
    p: [
      "When you contact us through the website, phone, __WhatsApp__, or email, we may use the information you share to respond to your enquiry and complete the booking process.",
      "Booking-related messages may include booking confirmation, trip details, safety instructions, boarding location information, schedule updates, or any other necessary service-related information.",
    ],
  },
  {
    h: "Marketing and promotional messages",
    icon: Megaphone,
    p: [
      "We may use your contact information to send offers, news, or updates related to yacht rentals and sea cruises where appropriate and permitted.",
      "You can request to __opt out of marketing messages__ at any time by contacting us.",
    ],
  },
  {
    h: "How do we share your data?",
    icon: Share2,
    p: [
      "__We do not sell or rent your personal information__.",
      "We may share limited information with trusted parties when needed to complete a booking or deliver the service — for example yacht operators, payment providers, website service providers, or legal authorities where required by law.",
    ],
  },
  {
    h: "Third-party services",
    icon: Boxes,
    p: [
      "Our site may use third-party services to help operate the site and improve our services — for example __analytics tools, maps, payment services, ad platforms, or social media__.",
      "These parties may process limited information under their own privacy policies.",
    ],
  },
  {
    h: "Payment information",
    icon: CreditCard,
    p: [
      "When you make an online payment, payment information may be processed through a __third-party payment provider__.",
      "We do not intentionally store full credit card details on our servers, except where required by the payment provider or by law.",
    ],
  },
  {
    h: "Cookies",
    icon: Cookie,
    p: [
      "Our site may use __cookies__ and similar technologies to improve site performance, remember user preferences, measure visits, and improve advertising campaigns.",
      "You can manage or disable cookies through your browser settings, but this may affect some features of the site.",
    ],
  },
  {
    h: "Site analytics and improvement",
    icon: BarChart3,
    p: [
      "We may use analytics tools to understand how visitors use the site, see which pages are visited most, and improve the user experience and services provided.",
      "Data collected may include technical information such as device, browser, general geographic region, and how you interact with the site.",
    ],
  },
  {
    h: "Data security",
    icon: Lock,
    p: [
      "We take __reasonable technical and organisational measures__ to help protect your personal data from unauthorised access, loss, alteration, or misuse.",
      "Access to information is granted only to people or service providers who need it to deliver the service or carry out the required tasks.",
    ],
  },
  {
    h: "Data retention",
    icon: Archive,
    p: [
      "We keep personal information for as long as needed to deliver the services, manage bookings, meet legal and commercial requirements, and resolve any disputes when required.",
    ],
  },
  {
    h: "Children's privacy",
    icon: Baby,
    p: [
      "Booking and payment services on our site are intended for people __aged 18 or over__.",
      "We do not knowingly collect personal information from children without the consent of a parent or legal guardian where such consent is required.",
    ],
  },
  {
    h: "Your rights",
    icon: UserCog,
    p: [
      "You can contact us to request:",
      "- Access to your personal information",
      "- Correction of inaccurate information",
      "- Deletion of your data where possible",
      "- Restriction of the use of your data",
      "- Opt out of marketing messages",
      "We may need to retain some information where necessary for booking, accounting, or legal purposes.",
    ],
  },
  {
    h: "Privacy policy updates",
    icon: RefreshCcw,
    p: [
      "We may update the privacy policy from time to time to reflect changes in our services, how the site operates, or legal requirements.",
      "The updated version of the policy will be published on this page.",
    ],
  },
  {
    h: "Customer trust",
    icon: Heart,
    p: [
      "Your privacy matters to us at __Toot Fun Yachts__. We aim to handle your personal information responsibly and transparently and provide a safe, comfortable booking experience.",
    ],
  },
  {
    h: "Contact us",
    icon: Mail,
    p: [
      "If you have any questions about the privacy policy or how your personal information is used, you can contact us:",
      "- __Toot Fun Yachts LLC__ — Dubai, United Arab Emirates",
      "- Email: __info@dubai-yachts.ae__",
    ],
  },
];

function Page() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        subtitle="Our Privacy Policy explains our commitment to protecting your personal information and maintaining its confidentiality when using the Toot Fun Yachts website and services."
      >
        <CallButton label="Get in Touch" />
      </PageHero>

      <section className="mx-auto max-w-4xl px-4 pt-14">
        <SectionHeading
          title="Privacy Policy & Data Protection"
          subtitle="Learn how your personal information is collected, used, and protected when using the Toot Fun Yachts website and services."
        />
      </section>

      <LegalSection
        intro="__Toot Fun Yachts__ respects your privacy and is committed to protecting the personal information you share when you use our website, contact us, or make a booking. This policy explains what information we may collect and how we use, protect, and share it."
        blocks={blocks}
      />

      <ContactCta title="Questions about your privacy?" subtitle="Your data stays protected — reach out with any question." />
    </>
  );
}
