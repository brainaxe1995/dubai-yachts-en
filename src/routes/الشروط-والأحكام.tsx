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
import { PageHero } from "@/components/PageHero";
import { LegalSection, type LegalBlock } from "@/components/LegalSection";
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
      { property: "og:url", content: "https://dubai-yacht.ae/الشروط-والأحكام/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/الشروط-والأحكام/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/الشروط-والأحكام/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/الشروط-والأحكام/" },
    ],
  }),
  component: Page,
});

const blocks: LegalBlock[] = [
  {
    h: "الحجز والتأكيد",
    icon: Handshake,
    p: [
      "- يتم تأكيد الحجز بعد دفع __العربون__ المتفق عليه.",
      "- يتم إرسال تفاصيل الحجز وموقع الصعود بعد تأكيد الدفع.",
      "- تختلف مدة الحجز الدنيا حسب نوع اليخت والباقة المختارة.",
      "- يخضع توفر اليخت والتوقيت للتأكيد النهائي عند الحجز.",
    ],
  },
  {
    h: "الدفع",
    icon: CreditCard,
    p: [
      "- يجب سداد المبلغ المتبقي __قبل الصعود على متن اليخت__.",
      "- جميع الأسعار بـ__الدرهم الإماراتي__ ما لم يُذكر خلاف ذلك.",
      "- أي خدمات أو إضافات يتم طلبها بعد تأكيد الحجز قد تتطلب رسومًا إضافية.",
    ],
  },
  {
    h: "الحضور وموعد الانطلاق",
    icon: Clock,
    p: [
      "- يجب الوصول إلى موقع الصعود قبل موعد الرحلة بـ __15 دقيقة على الأقل__.",
      "- يبدأ وقت الرحلة من الموعد المحدد في الحجز، ولا يتم تمديده في حال تأخر العميل أو الضيوف.",
      "- سيتم إرسال موقع الصعود وتفاصيل التواصل قبل موعد الرحلة.",
    ],
  },
  {
    h: "الهوية المطلوبة",
    icon: IdCard,
    p: [
      "يجب على جميع الضيوف حمل __بطاقة الهوية الإماراتية الأصلية أو جواز السفر الأصلي__ عند الصعود، وفقًا للمتطلبات المعمول بها.",
    ],
  },
  {
    h: "السلامة على متن اليخت",
    icon: ShieldCheck,
    p: [
      "- يجب الالتزام بتعليمات __القبطان والطاقم__ طوال الرحلة.",
      "- يملك القبطان صلاحية تعديل المسار أو إيقاف أي نشاط إذا كانت هناك مخاطر تتعلق بالسلامة.",
      "- يجب على الآباء والأوصياء الإشراف على الأطفال طوال الوقت.",
      "- يتم توفير معدات السلامة المناسبة على متن اليخت.",
    ],
  },
  {
    h: "السباحة والأنشطة البحرية",
    icon: Waves,
    p: [
      "- تخضع السباحة والأنشطة البحرية لحالة الطقس والبحر و__موافقة القبطان__.",
      "- يجب الحصول على موافقة القبطان قبل دخول المياه.",
      "- تُمارس الرياضات المائية وفق تعليمات السلامة والقوانين المعمول بها.",
      "- قد يتم إيقاف أي نشاط إذا رأى القبطان أنه غير آمن.",
    ],
  },
  {
    h: "مسؤولية الضيوف",
    icon: UserCheck,
    p: [
      "- يتحمل العميل مسؤولية أي أضرار ناتجة عن سوء الاستخدام أو التصرف المتعمد من قبله أو من قبل ضيوفه.",
      "- يجب المحافظة على أثاث ومعدات وممتلكات اليخت.",
      "- الشركة غير مسؤولة عن __الأغراض الشخصية المفقودة__ أو المتروكة على متن اليخت.",
    ],
  },
  {
    h: "المواد والممارسات الممنوعة",
    icon: Ban,
    p: [
      "يُمنع حمل أو استخدام __المخدرات أو أي مواد محظورة قانونًا__ على متن اليخت. كما يُمنع أي سلوك قد يعرض سلامة الضيوف أو الطاقم أو اليخت للخطر.",
    ],
  },
  {
    h: "الطعام والمشروبات",
    icon: Utensils,
    p: [
      "يمكن إحضار الطعام والمشروبات غير الكحولية ما لم تنص الباقة على خلاف ذلك. وتخضع المشروبات الكحولية وأي خدمات خاصة للقوانين واللوائح المعمول بها.",
    ],
  },
  {
    h: "الحيوانات الأليفة",
    icon: PawPrint,
    p: ["__لا يُسمح بإحضار الحيوانات الأليفة__ على متن اليخت."],
  },
  {
    h: "الطقس والظروف البحرية",
    icon: CloudRain,
    p: [
      "تخضع الرحلات لظروف الطقس والبحر وتعليمات الجهات المختصة. إذا تعذر تنفيذ الرحلة لأسباب تتعلق بالسلامة أو ظروف خارجة عن السيطرة، سيتم التواصل مع العميل بشأن الخيارات المتاحة لإعادة الجدولة أو أي ترتيبات أخرى وفق سياسة الحجز.",
    ],
  },
  {
    h: "الأعطال الفنية",
    icon: Wrench,
    p: [
      "في حال حدوث عطل فني يمنع تشغيل اليخت بأمان، قد يتم توفير __يخت بديل مناسب__ أو إعادة جدولة الرحلة أو اتخاذ الترتيب المناسب حسب توفر اليخوت وظروف الحجز.",
    ],
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

      <LegalSection
        intro="يرجى قراءة __شروط وأحكام حجز وتأجير اليخوت مع توت فن لليخوت__ قبل تأكيد الحجز. تهدف هذه الشروط إلى توضيح إجراءات الحجز والدفع، متطلبات السلامة، ومسؤوليات الضيوف لضمان رحلة آمنة وممتعة."
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
              <h3 className="text-lg font-bold text-primary-foreground">سياسة الإلغاء</h3>
              <p className="mt-1 text-sm text-primary-foreground/75">
                تخضع جميع الحجوزات لسياسة الإلغاء والاسترداد الخاصة بتوت فن لليخوت.
              </p>
            </div>
          </div>
          <Link
            to="/سياسة-الإلغاء"
            className="inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2.5 text-sm font-bold text-gold hover:bg-gold hover:text-primary-deep"
          >
            اطّلع على سياسة الإلغاء
          </Link>
        </div>

        {/* Acceptance */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
          <p className="text-sm leading-relaxed text-foreground">
            يعتبر دفع العربون أو تأكيد الحجز __موافقة من العميل__ على هذه الشروط والأحكام وعلى الالتزام بتعليمات
            السلامة والقبطان والطاقم طوال مدة الرحلة.
          </p>
        </div>
      </section>

      <ContactCta title="هل لديك سؤال قانوني؟" subtitle="فريقنا جاهز لتوضيح أي بند من الشروط قبل الحجز." />
    </>
  );
}
