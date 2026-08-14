import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { LegalSection } from "@/components/LegalSection";
import { CallButton } from "@/components/CtaButtons";
import { ContactCta } from "@/components/ContactCta";

export const Route = createFileRoute("/الشروط-والأحكام")({
  head: () => ({
    meta: [
      { title: "الشروط والأحكام | توت فن لليخوت" },
      {
        name: "description",
        content:
          "اطلع على الشروط والأحكام الخاصة بتوت فن لليخوت، بما يشمل الحجز، الدفع، الإلغاء، مسؤوليات العملاء، واستخدام خدمات تأجير اليخوت في دبي.",
      },
      { property: "og:title", content: "الشروط والأحكام | توت فن لليخوت" },
      { property: "og:description", content: "شروط الحجز والدفع والإلغاء ومسؤوليات العملاء." },
      { property: "og:url", content: "https://dubai-yacht.ae/الشروط-والأحكام" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/الشروط-والأحكام" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/الشروط-والأحكام" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/الشروط-والأحكام" },
    ],
  }),
  component: Page,
});

const blocks = [
  {
    h: "الشروط والأحكام الخاصة بالحجز",
    p: ["تعرّف على شروط الحجز، الدفع، الإلغاء، ومسؤوليات العملاء عند استخدام خدمات توت فن لليخوت."],
  },
  {
    h: "الحجز والتأكيد",
    p: [
      "يتم تأكيد الحجز بعد دفع العربون واستلام رسالة التأكيد التي تتضمن موعد وموقع الانطلاق.",
      "الحد الأدنى لمدة الحجز يختلف حسب اليخت، ويبدأ عادة من ساعتين.",
    ],
  },
  {
    h: "الدفع",
    p: ["يمكن سداد المبلغ المتبقي قبل الصعود على متن اليخت. جميع الأسعار بالدرهم الإماراتي."],
  },
  {
    h: "مسؤوليات العميل",
    p: [
      "يلتزم الضيوف بتعليمات السلامة الصادرة عن الطاقم طوال الرحلة.",
      "يتحمل العميل مسؤولية أي أضرار متعمدة تلحق باليخت أو محتوياته.",
      "يُمنع اصطحاب المواد الممنوعة قانونًا على متن اليخت.",
    ],
  },
  {
    h: "التأخير",
    p: ["يُحتسب وقت الرحلة من الموعد المحدد للانطلاق، ولا يتم تمديدها في حال تأخر العميل."],
  },
];

function Page() {
  return (
    <>
      <PageHero
        compact
        eyebrow="الشروط والأحكام"
        title="الشروط والأحكام"
        subtitle="اطلع على الشروط والأحكام الخاصة بالحجز، الدفع، الإلغاء، واستخدام خدمات توت فن لليخوت."
      >
        <CallButton label="تواصل معنا" />
      </PageHero>
      <LegalSection blocks={blocks} />
      <ContactCta title="هل لديك سؤال قانوني؟" subtitle="فريقنا جاهز لتوضيح أي بند من الشروط قبل الحجز." />
    </>
  );
}
