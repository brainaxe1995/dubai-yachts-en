import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { LegalSection } from "@/components/LegalSection";
import { CallButton } from "@/components/CtaButtons";

export const Route = createFileRoute("/سياسة-الخصوصية")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية | توت فن لليخوت" },
      {
        name: "description",
        content:
          "توضح سياسة الخصوصية التزامنا بحماية معلوماتك الشخصية والحفاظ على سريتها عند استخدام موقع وخدمات توت فن لليخوت.",
      },
      { property: "og:title", content: "سياسة الخصوصية | توت فن لليخوت" },
      { property: "og:description", content: "كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها." },
      { property: "og:url", content: "https://doc-whisperer-750.lovable.app/سياسة-الخصوصية" },
    ],
    links: [
      { rel: "canonical", href: "https://doc-whisperer-750.lovable.app/سياسة-الخصوصية" },
      { rel: "alternate", hreflang: "ar", href: "https://doc-whisperer-750.lovable.app/سياسة-الخصوصية" },
      { rel: "alternate", hreflang: "x-default", href: "https://doc-whisperer-750.lovable.app/سياسة-الخصوصية" },
    ],
  }),
  component: Page,
});

const blocks = [
  {
    h: "سياسة الخصوصية وحماية البيانات",
    p: ["تعرّف على كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها عند استخدام موقع وخدمات توت فن لليخوت."],
  },
  {
    h: "المعلومات التي نجمعها",
    p: ["نجمع الاسم، رقم الهاتف، والبريد الإلكتروني، وتفاصيل الحجز الضرورية لتقديم الخدمة فقط."],
  },
  {
    h: "كيفية استخدام المعلومات",
    p: [
      "تُستخدم بياناتك لتأكيد الحجز، التواصل بخصوص الرحلة، وتحسين جودة خدماتنا.",
      "لا نبيع أو نشارك بياناتك مع أطراف ثالثة لأغراض تسويقية.",
    ],
  },
  {
    h: "حماية البيانات",
    p: ["نتخذ إجراءات تقنية وتنظيمية مناسبة للحفاظ على سرية معلوماتك ومنع الوصول غير المصرح به."],
  },
  {
    h: "حقوقك",
    p: ["يمكنك طلب تعديل أو حذف بياناتك في أي وقت عبر التواصل معنا."],
  },
];

function Page() {
  return (
    <>
      <PageHero
        compact
        eyebrow="سياسة الخصوصية"
        title="سياسة الخصوصية"
        subtitle="توضح سياسة الخصوصية التزامنا بحماية معلوماتك الشخصية والحفاظ على سريتها عند استخدام موقع وخدمات توت فن لليخوت."
      >
        <CallButton label="تواصل معنا" />
      </PageHero>
      <LegalSection blocks={blocks} />
    </>
  );
}
