import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { LegalSection } from "@/components/LegalSection";
import { CallButton } from "@/components/CtaButtons";

export const Route = createFileRoute("/سياسة-الإلغاء")({
  head: () => ({
    meta: [
      { title: "سياسة الإلغاء سهلة | توت فن لليخوت" },
      {
        name: "description",
        content:
          "تعرّف على سياسة الإلغاء والاسترداد لدى توت فن لليخوت، بما يشمل شروط الإلغاء، إعادة الجدولة، المبالغ المستردة، وحالات عدم الحضور.",
      },
      { property: "og:title", content: "سياسة الإلغاء | توت فن لليخوت" },
      { property: "og:description", content: "شروط الإلغاء، إعادة الجدولة واسترداد المبالغ." },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/سياسة-الإلغاء" },
    ],
    links: [{ rel: "canonical", href: "https://doc-whisperer-750.lovable.app/سياسة-الإلغاء" }],
  }),
  component: Page,
});

const blocks = [
  {
    h: "سياسة الإلغاء والاسترداد الخاصة بتأجير اليخوت في دبي",
    p: ["تعرّف على شروط إلغاء الحجز، إعادة الجدولة، واسترداد المبالغ لدى توت فن لليخوت."],
  },
  {
    h: "الإلغاء قبل موعد الرحلة",
    p: [
      "يمكن إلغاء الحجز قبل 48 ساعة من موعد الرحلة مع إمكانية استرداد العربون أو استخدامه في حجز لاحق.",
      "الإلغاء خلال أقل من 24 ساعة من موعد الرحلة يعتبر غير قابل للاسترداد.",
    ],
  },
  {
    h: "إعادة الجدولة",
    p: ["يمكن إعادة جدولة الرحلة مرة واحدة مجانًا حسب توفر اليخت، بشرط الإبلاغ قبل 24 ساعة على الأقل."],
  },
  {
    h: "الأحوال الجوية",
    p: ["في حال إلغاء الرحلة بسبب سوء الأحوال الجوية أو أسباب تشغيلية، يتم تحديد موعد بديل أو استرداد المبلغ كاملًا."],
  },
  {
    h: "عدم الحضور",
    p: ["في حال عدم حضور العميل في الموعد المحدد دون إبلاغ مسبق، يعتبر الحجز مستهلكًا ولا يتم استرداد أي مبالغ."],
  },
];

function Page() {
  return (
    <>
      <PageHero
        compact
        eyebrow="سياسة الإلغاء"
        title="سياسة الإلغاء"
        subtitle="تعرّف على سياسة الإلغاء والاسترداد لدى توت فن لليخوت، بما يشمل شروط الإلغاء، إعادة الجدولة، المبالغ المستردة، وحالات عدم الحضور."
      >
        <CallButton label="تواصل معنا" />
      </PageHero>
      <LegalSection blocks={blocks} />
    </>
  );
}
