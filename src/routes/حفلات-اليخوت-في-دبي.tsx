import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Music, Cake, Camera, HeartHandshake, GraduationCap, Palette, Wand2, PartyPopper } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { CharterEssentials } from "@/components/CharterEssentials";
import { FeatureBlocks } from "@/components/FeatureSection";
import { KeywordCloud } from "@/components/KeywordCloud";
import { faqSchema, breadcrumbSchema } from "@/components/SeoJsonLd";
import { parties, stepsParty, keywordCloud } from "@/data/site";
import partyImg from "@/assets/parties/wedding.webp";
import partyWeddingImg from "@/assets/parties/wedding/wedding-1.webp";
import partyBirthdayImg from "@/assets/parties/birthday/birthday-1.webp";
import partyProposalImg from "@/assets/parties/proposal/proposal-1.webp";

const partyFaqs = [
  {
    q: "كم تكلفة حفلة على يخت في دبي؟",
    a: "تبدأ تكلفة حفلات اليخوت في دبي من 1,500 د.إ لساعتين (يخت 48 قدم يستوعب 12 ضيفًا)، وتصل إلى 4,500+ د.إ للساعة لليخوت الأكبر مثل يخت 95 قدم للأعراس. السعر يشمل اليخت والطاقم والوقود — الإضافات (كيك، ديكور، مصور، دي جي) اختيارية.",
  },
  { q: "كم عدد الضيوف الذي يستوعبه اليخت للحفلات؟", a: "لدينا يخوت تستوعب من 12 ضيفًا (يخت 48 قدم) حتى 45 ضيفًا (يخت 95 قدم) و90 ضيفًا (105 قدم). نختار لك اليخت الأنسب حسب حجم حفلتك." },
  { q: "هل تشمل الباقة الديكور والكيك؟", a: "الباقة الأساسية تشمل الرحلة والضيافة. الديكور والكيك والمصور من الإضافات الاختيارية بأسعار خاصة." },
  { q: "هل يمكن إحضار DJ أو موسيقى مباشرة؟", a: "نعم — جميع يخوتنا مجهزة بأنظمة صوتية. نوفر DJ محترف كإضافة، أو يمكنك إحضار فرقتك الخاصة." },
  { q: "هل يجوز الرقص والموسيقى الصاخبة على اليخت؟", a: "نعم مع مراعاة قواعد الهدوء بعد منتصف الليل قرب المرسى. أثناء الإبحار لا توجد قيود." },
  { q: "ما مدة حفلة اليخت المعتادة؟", a: "الحفلات تبدأ من ساعتين وحتى 6 ساعات. الأمثل: 3-4 ساعات لتغطي الاستقبال، الطعام، الكيك، والرقص." },
  { q: "هل تنظمون حفلات مفاجأة؟", a: "نعم! نتعاون معك لتنظيم كل التفاصيل سرًا: الديكور، الكيك، الموسيقى، والمصور." },
  { q: "هل يمكن إقامة عقد قران على اليخت؟", a: "نعم، نوفر يخوت تناسب مراسم عقد القران مع مأذون خاص وتنظيم كامل — تواصل معنا للتفاصيل." },
  { q: "كم مقدم الحجز المطلوب؟", a: "عادة 30% من إجمالي المبلغ لتثبيت الحجز، والباقي يوم الرحلة." },
];

const partyFeatures = [
  {
    h: "لماذا حفلة اليخت مختلفة عن أي مكان آخر",
    icon: Wand2,
    image: partyWeddingImg,
    imageAlt: "حفلة يخت فاخرة في دبي",
    p: [
      "لا شيء يقارَن بـ__حفلة على يخت في دبي__ — خصوصية تامة، إطلالة سينمائية على أفق المدينة، وأجواء لا يمكن استنساخها في أي فندق أو قاعة. اليخت مساحتك أنت وضيوفك فقط.",
      "من __برج العرب__ إلى __نخلة جميرا__، تمر حفلتك بأشهر معالم دبي البحرية — خلفية فاخرة لكل صورة تلتقطها ولكل ذكرى تصنعها.",
    ],
  },
  {
    h: "أفكار مبتكرة لحفلة لا تُنسى",
    icon: Palette,
    image: partyBirthdayImg,
    imageAlt: "أفكار ديكور حفلة يخت",
    p: [
      "نصمّم كل حفلة حسب طلبك: __ديكور فاخر__، __كيك مخصّص__، __دي جي محترف__، __مصوّر فوتوغرافي وفيديو__، بالونات، أعمدة ضوء، وممر ورد للحظات الوصول المميزة.",
      "أفكار شائعة: __حفلة على ضوء الغروب__، __عشاء رومانسي على السطح العلوي__، __ديسكو ليلية بأضواء نيون__، أو __أمسية جاز حية__ — كل شيء ممكن.",
    ],
  },
  {
    h: "كيف نساعدك في التخطيط للحفلة",
    icon: PartyPopper,
    image: partyProposalImg,
    imageAlt: "تخطيط حفلة يخت في دبي",
    p: [
      "خدمة تخطيط كاملة من فريق __توت فن__: ندرس أفكارك، نقترح اليخت المناسب لعدد ضيوفك، ثم نتولى الديكور والضيافة والتنسيق مع الموردين — كل ما عليك هو الحضور والاستمتاع.",
      "للحفلات المفاجئة، نحافظ على __السرية التامة__ ونتعاون معك على كل تفصيل بعيدًا عن نظر الضيف الرئيسي — من الديكور إلى توقيت الوصول.",
    ],
  },
];

const occasionTypes = [
  { icon: Cake, t: "أعياد الميلاد", d: "من عيد ميلاد الأطفال حتى حفلات الأصدقاء الفاخرة." },
  { icon: HeartHandshake, t: "الخطوبة والزفاف", d: "لحظات لا تُنسى مع أجمل غروب في دبي." },
  { icon: GraduationCap, t: "حفلات التخرج", d: "احتفل بإنجازك مع أصدقائك على متن يخت خاص." },
  { icon: Sparkles, t: "طلبات الزواج", d: "أجواء رومانسية، بتلات ورد، وإطلالة برج العرب." },
  { icon: Music, t: "الذكرى السنوية", d: "خصوصية تامة، عشاء رومانسي، وموسيقى مختارة." },
  { icon: Camera, t: "فعاليات الشركات", d: "اجتماعات، إطلاق منتجات، وحفلات نهاية العام." },
];

export const Route = createFileRoute("/حفلات-اليخوت-في-دبي")({
  head: () => ({
    meta: [
      { title: "أفضل حفلات اليخوت في دبي | باقات مميزة — توت فن لليخوت" },
      {
        name: "description",
        content:
          "احجز حفلات اليخوت في دبي للمناسبات وأعياد الميلاد وحفلات الزفاف مع يخوت فاخرة، ديكورات مميزة، طاقم محترف، وباقات خاصة بأسعار تنافسية تبدأ من 1,500 د.إ.",
      },
      { name: "keywords", content: "حفلات يخوت دبي, حفلة عيد ميلاد يخت, حفل زفاف يخت, طلب زواج على يخت, حفلة تخرج, ذكرى سنوية, يخت مارينا دبي" },
      { property: "og:title", content: "أفضل حفلات اليخوت في دبي | توت فن لليخوت" },
      { property: "og:description", content: "حفلات زفاف، خطوبة، تخرج وأعياد ميلاد على متن يخت في دبي." },
      { property: "og:url", content: "https://dubai-yacht.ae/حفلات-اليخوت-في-دبي/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/حفلات-اليخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/حفلات-اليخوت-في-دبي/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/حفلات-اليخوت-في-دبي/" },
    ],
    scripts: [
      faqSchema(partyFaqs),
      breadcrumbSchema([
        { name: "الرئيسية", url: "https://dubai-yacht.ae/" },
        { name: "حفلات اليخوت", url: "https://dubai-yacht.ae/حفلات-اليخوت-في-دبي/" },
      ]),
    ],
  }),
  component: Parties,
});

function Parties() {
  return (
    <>
      <PageHero
        compact
        image={partyImg}
        eyebrow="حفلات اليخوت"
        title="حفلات اليخوت في دبي"
        subtitle="استمتع بأفضل حفلات اليخوت في دبي مع يخوت فاخرة، رحلات خاصة، وخيارات مثالية لأعياد الميلاد والمناسبات."
      />

      {/* Products FIRST (right after hero) */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="باقات لجميع حفلات اليخوت في دبي"
          subtitle="اختر نوع الحفلة التي تناسب ميزانيتك واحتفل على متن يخت في دبي."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parties.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={(i % 3) * 80} />
          ))}
        </div>
      </section>

      {/* Long intro */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center">
            <h2 className="text-2xl text-foreground md:text-3xl">دليلك لتنظيم حفلة يخت لا تُنسى في دبي</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              كل ما تحتاج معرفته لتنظيم حفلة استثنائية على متن يخت فاخر في دبي — من اختيار اليخت وحتى تفاصيل الديكور.
            </p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-6 text-start text-sm leading-loose text-muted-foreground md:text-base">
              تحوّلت <strong>حفلات اليخوت في دبي</strong> إلى الخيار الأول لعشاق الاحتفالات المميزة — من أعياد الميلاد
              وحفلات الخطوبة والزفاف، إلى طلبات الزواج الرومانسية وفعاليات الشركات. توفّر توت فن لليخوت أسطولاً متنوعًا
              من اليخوت الفاخرة يبدأ من 48 قدم ويصل إلى 105 قدم، مع باقات مخصّصة لكل مناسبة.
            </p>
            <p className="mt-4 text-start text-sm leading-loose text-muted-foreground md:text-base">
              نغطّي لك كل تفاصيل الحفلة: الديكور، الكيك، الموسيقى، التصوير، والضيافة. تنطلق الحفلات من دبي مارينا مع
              إطلالات ساحرة على عين دبي، JBR، نخلة جميرا، وبرج العرب.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <FeatureBlocks blocks={partyFeatures} />
      </section>

      {/* Occasion types */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="أنواع الحفلات التي ننظّمها"
          subtitle="اختر نوع مناسبتك ونحن نتكفّل بالباقي."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {occasionTypes.map((o, i) => (
            <Reveal key={o.t} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe transition-transform hover:-translate-y-1">
                <o.icon className="mb-3 h-8 w-8 text-gold-deep" />
                <h3 className="text-lg font-bold text-primary">{o.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="كيف تحجز حفلة يخت في دبي"
            subtitle="خطوات بسيطة لتنظيم حفلة يخت مميزة في دبي."
          />
          <BookingSteps steps={stepsParty} />
        </div>
      </section>

      <section className="surface-navy py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <SectionHeading
            onDark
            title="لماذا حفلة اليخت مختلفة"
            subtitle="أربعة أسباب تجعل حفلة يخت في دبي تجربة استثنائية لا تنافسها أي قاعة."
          />
          <div className="grid gap-4 text-start sm:grid-cols-2">
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <h3 className="text-base font-bold text-primary-foreground">خصوصية تامة</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">اليخت مخصّص لك ولضيوفك فقط — لا يشاركك أحد التجربة.</p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <h3 className="text-base font-bold text-primary-foreground">إطلالة استثنائية</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">أفق دبي، غروب الشمس، أضواء المارينا — خلفية سينمائية للحظاتك.</p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <h3 className="text-base font-bold text-primary-foreground">حزمة كاملة</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">ديكور، ضيافة، موسيقى، مصور — نتكفّل بكل التفاصيل.</p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <h3 className="text-base font-bold text-primary-foreground">لحظات لا تُنسى</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">تجربة فريدة تصنع ذكريات تدوم مدى الحياة.</p>
            </div>
          </div>
        </div>
      </section>

      <CharterEssentials />

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أسئلة شائعة عن حفلات اليخوت في دبي"
          subtitle="إجابات سريعة على أهم الأسئلة قبل حجز حفلتك."
        />
        <Accordion items={partyFaqs} />
      </section>

      <ContactCta
        title="جاهز لحفلتك على اليخت؟"
        subtitle="تواصل معنا لتخصيص الباقة المناسبة والحصول على أفضل الأسعار."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أشهر عمليات البحث عن اليخوت والرحلات البحرية في دبي"
          subtitle="اكتشف أكثر عمليات البحث شيوعًا حول حفلات اليخوت والاحتفالات البحرية في دبي للوصول بسرعة إلى الخدمة أو التجربة التي تناسبك."
        />
        <KeywordCloud items={keywordCloud["/حفلات-اليخوت-في-دبي/"].map((k) => ({ keyword: k, to: "/حفلات-اليخوت-في-دبي/" }))} />
      </section>
    </>
  );
}
