import { createFileRoute } from "@tanstack/react-router";
import { Fish, Sun, Users, Anchor, Waves, CheckCircle2, Target, Sparkles } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { CharterEssentials } from "@/components/CharterEssentials";
import { KeywordCloud } from "@/components/KeywordCloud";
import { fishingTrips, stepsFishing, keywordCloud } from "@/data/site";
import fishingImg from "@/assets/fishing/shared.webp";

export const Route = createFileRoute("/رحلات-صيد-السمك-في-دبي")({
  head: () => ({
    meta: [
      { title: "أفضل رحلات صيد السمك في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "احجز أفضل رحلات صيد السمك في دبي مع قوارب مجهزة، معدات صيد، طاقم محترف، وخيارات خاصة أو مشتركة بأسعار مميزة.",
      },
      { property: "og:title", content: "أفضل رحلات صيد السمك في دبي | توت فن لليخوت" },
      { property: "og:description", content: "رحلات صيد خاصة ومشتركة في دبي مع تجهيزات كاملة." },
      { property: "og:url", content: "https://dubai-yacht.ae/رحلات-صيد-السمك-في-دبي/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/رحلات-صيد-السمك-في-دبي/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/رحلات-صيد-السمك-في-دبي/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/رحلات-صيد-السمك-في-دبي/" },
    ],
  }),
  component: Fishing,
});

const species = [
  { n: "الهامور", d: "من أشهر أسماك الخليج، يوجد قرب الشعاب المرجانية وأعماق 20–60م." },
  { n: "الشعري", d: "سمكة شعبية تُصطاد في المياه المتوسطة العمق، لذيذة ومطلوبة." },
  { n: "الكنعد", d: "سريع وقوي — تجربة صيد مثيرة للمحترفين." },
  { n: "الباراكودا", d: "متوفر طوال العام، صيد رياضي ممتع." },
  { n: "الفرش", d: "سمكة كبيرة توجد في الأعماق، مناسبة للصيد الطويل." },
  { n: "التونا", d: "الأفضل في المواسم الحارة، رحلات صيد أعمق." },
];

const seasons = [
  { t: "الشتاء (نوفمبر – فبراير)", d: "أفضل موسم صيد — طقس معتدل، مياه هادئة، وفرة في الهامور والشعري." },
  { t: "الربيع (مارس – مايو)", d: "موسم ممتاز للكنعد والباراكودا، درجة حرارة مثالية." },
  { t: "الصيف (يونيو – سبتمبر)", d: "رحلات صباحية باكرة أو مسائية، وفرة في التونا." },
  { t: "الخريف (أكتوبر – نوفمبر)", d: "بداية موسم الذروة، تجارب صيد متنوعة." },
];

const included = [
  "معدات صيد كاملة (سنارات، خيوط، طعم)",
  "طعم حي طازج",
  "طاقم متمرّس ومرخّص",
  "مياه معدنية ومشروبات",
  "ثلج لحفظ الصيد",
  "سترات نجاة لجميع الركاب",
  "تأمين شامل",
  "الوقود مشمول",
];

const locations = [
  { n: "شعاب دبي", d: "15–30 دقيقة من المارينا — هامور وشعري." },
  { n: "مياه دبي العميقة", d: "45–60 دقيقة إبحار — تونا وكنعد وباراكودا." },
  { n: "شعاب رأس الخيمة", d: "رحلات نصف يوم — تنوّع كبير في الأنواع." },
];

const fishingTechniques = [
  { n: "Trolling (السحب)", d: "الأكثر شعبية في الصيد العميق — طعم متحرك خلف القارب لجذب الأسماك الكبيرة." },
  { n: "الطعم الحي", d: "استخدام أسماك حية لجذب الأنواع الأكبر مثل التونا والكنعد." },
  { n: "صيد القاع", d: "إنزال الطعم لأعماق كبيرة — مناسب لأسماك الشعاب مثل الهامور." },
  { n: "Jigging", d: "طعم صناعي يتحرك عموديًا — للأسماك المتوسطة." },
];

const fishSpecies = [
  "الهامور",
  "الشعري",
  "الكنعد",
  "الباراكودا",
  "الفرش",
  "التونا",
  "الطرابيدي",
  "الماكريل",
  "سمك الملك",
  "الترفلي",
  "سمك الشراع (Sailfish)",
];

const fishingFaqs = [
  {
    q: "كم تكلفة رحلة صيد السمك في دبي؟",
    a: "تبدأ رحلات الصيد المشتركة من 350 د.إ للشخص لمدة 4 ساعات، والرحلات الخاصة على القارب من 1,200 د.إ (4 ساعات، حتى 10 ضيوف)، والرحلات على اليخت من 2,000 د.إ / 4 ساعات.",
  },
  {
    q: "ما الأسماك التي يمكن اصطيادها في دبي؟",
    a: "تشمل الأنواع الشائعة: الهامور، الشعري، الكنعد، الباراكودا، الفرش، التونا، الطرابيدي، وسمك الملك. الأنواع تختلف حسب الموسم والموقع.",
  },
  {
    q: "ما أفضل وقت لصيد السمك في دبي؟",
    a: "الفجر الباكر (6:00 صباحًا) والعصر (3:00–6:00 مساءً). أفضل موسم = الشتاء (نوفمبر – فبراير) للهامور والشعري، والصيف للتونا.",
  },
  {
    q: "هل معدات الصيد مشمولة؟",
    a: "نعم — كل الرحلات تشمل سنارات، خيوط، طعم حي، معدات السلامة، وتوجيه من الطاقم المحترف.",
  },
  { q: "هل تحتاج رخصة صيد للانطلاق في دبي؟", a: "لا تحتاج للحصول على رخصة شخصية — جميع رحلاتنا تنطلق بموجب تراخيص القارب واليخت وتخضع لأنظمة هيئة الموانئ الإماراتية." },
  { q: "ما الفرق بين رحلة الصيد المشتركة والخاصة؟", a: "المشتركة تجمعك مع ركاب آخرين بسعر أقل للفرد (350 د.إ)، والخاصة تخصص القارب أو اليخت لك ولمجموعتك فقط بخصوصية كاملة." },
  { q: "هل يمكنني الاحتفاظ بالسمك الذي أصطاده؟", a: "نعم، السمك الذي تصطاده ملكك. نوفر ثلج ومبردات لحفظه، وبعض المطاعم القريبة تطبخ لك صيدك مقابل رسوم رمزية." },
  { q: "ما الملابس المناسبة لرحلة الصيد؟", a: "ملابس مريحة، حذاء مغلق مقاوم للانزلاق، قبعة، نظارة شمسية، وواقي شمس. في الشتاء نوصي بجاكيت خفيف." },
  { q: "هل الرحلة مناسبة للأطفال؟", a: "نعم — الرحلات المشتركة الصباحية القصيرة مناسبة للأطفال فوق 5 سنوات مع سترات نجاة مخصّصة." },
  { q: "ما موعد الانطلاق وكم تستمر الرحلة؟", a: "الرحلات الصباحية المشتركة تنطلق 7:00 صباحًا لمدة 4 ساعات. الرحلات الخاصة مرنة — ابدأ متى أردت من ساعتين وحتى يوم كامل." },
  { q: "ماذا لو لم أصطد أي سمكة؟", a: "طاقمنا خبير في مواقع الصيد ونضمن تجربة ممتعة، لكن الطبيعة لا تُتحكّم بها. نضمن على الأقل استمتاعك بالأجواء والإبحار." },
  { q: "هل يمكنني إحضار طعامي الخاص؟", a: "نعم، يمكنك إحضار وجبات خفيفة. الرحلة المشتركة تشمل إفطاراً مشتركاً. للرحلات الخاصة نوفر خدمات ضيافة حسب الطلب." },
];

function Fishing() {
  return (
    <>
      <PageHero
        compact
        image={fishingImg}
        eyebrow="رحلات الصيد"
        title="رحلات صيد السمك في دبي"
        subtitle="اكتشف أفضل رحلات صيد السمك في دبي مع قوارب مجهزة، طاقم محترف، وتجربة بحرية ممتعة."
      />

      {/* Products FIRST */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
        <SectionHeading
          title="أفضل خيارات رحلات صيد السمك في دبي"
          subtitle="اختر من بين رحلات الصيد الخاصة والمشتركة مع قوارب مجهزة وطاقم محترف."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fishingTrips.map((p, i) => (
            <ProductCard key={p.title} product={p} delay={i * 80} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center">
            <h2 className="text-2xl text-foreground md:text-3xl">دليلك الكامل لرحلات صيد السمك في دبي</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              كل ما تحتاج معرفته قبل حجز رحلة صيد في مياه دبي — من الأنواع الشائعة حتى المواسم والمعدات.
            </p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="mt-6 text-start text-sm leading-loose text-muted-foreground md:text-base">
              تُعد <strong>رحلات صيد السمك في دبي</strong> من أفضل التجارب البحرية في الخليج العربي، حيث تجمع بين متعة
              الإبحار في مياه المارينا الفاخرة وتجربة صيد أصيلة في أعماق الخليج. سواء كنت من هواة الصيد المبتدئين أو
              المحترفين، توفّر توت فن لليخوت رحلات صيد خاصة ومشتركة تناسب جميع المستويات والميزانيات.
            </p>
            <p className="mt-4 text-start text-sm leading-loose text-muted-foreground md:text-base">
              تنطلق رحلاتنا من مارينا دبي بأحدث القوارب واليخوت المجهّزة بمعدات صيد احترافية، مع طاقم مرخّص يعرف أفضل
              مواقع الصيد في المياه الإماراتية.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أشهر أنواع الأسماك في مياه دبي"
          subtitle="تعرّف على أنواع الأسماك التي يمكنك اصطيادها خلال رحلتك."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {species.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-luxe">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-deep text-gold">
                    <Fish className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold text-primary">{s.n}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="أفضل مواسم الصيد في دبي"
            subtitle="متى تنطلق للحصول على أفضل تجربة صيد."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe">
                  <Sun className="mb-3 h-7 w-7 text-gold-deep" />
                  <h3 className="text-base font-bold text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-navy py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            onDark
            title="ماذا تشمل رحلة الصيد"
            subtitle="سعر واحد يشمل كل ما تحتاجه — بدون رسوم مخفية."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((i, idx) => (
              <Reveal key={i} delay={idx * 40}>
                <div className="flex items-start gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm text-primary-foreground/85">{i}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="مواقع الصيد الرئيسية"
          subtitle="نصطاد في أفضل مناطق الخليج العربي."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {locations.map((l, i) => (
            <Reveal key={l.n} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold-deep">
                    <Anchor className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold text-primary">{l.n}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{l.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fishing techniques */}
      <section className="bg-gradient-to-b from-muted via-background to-muted py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title="أفضل تقنيات الصيد في دبي"
            subtitle="أربع تقنيات يستخدمها طاقمنا لتحقيق أفضل صيد ممكن."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {fishingTechniques.map((t, i) => (
              <Reveal key={t.n} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-luxe transition-transform hover:-translate-y-1">
                  <Target className="mb-3 h-7 w-7 text-gold-deep" />
                  <h3 className="text-base font-bold text-primary">{t.n}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fish species you can catch */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أنواع الأسماك التي يمكنك اصطيادها في دبي"
          subtitle="أشهر الأنواع المتوفرة في مياه الخليج العربي طوال السنة."
        />
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {fishSpecies.map((s, i) => (
            <Reveal key={s} delay={i * 30}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10">
                <Sparkles className="h-3 w-3 text-gold-deep" />
                {s}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <SectionHeading
            title="كيف تحجز رحلة صيد في دبي"
            subtitle="خطوات بسيطة لحجز رحلة صيد ممتعة في دبي."
          />
          <BookingSteps steps={stepsFishing} />
        </div>
      </section>

      <section className="bg-gradient-to-b from-muted via-background to-muted py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title="كل ما تحتاج معرفته قبل رحلة الصيد"
            subtitle="نصائح ذهبية من الطاقم لتجربة صيد ناجحة، وقائمة بمن تناسبهم رحلاتنا."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tips card — dark navy */}
            <Reveal>
              <div className="group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-primary-deep via-primary to-primary-deep p-8 shadow-luxe ring-1 ring-gold/20 md:p-10">
                {/* Decorative wave */}
                <Waves aria-hidden className="absolute -end-8 -top-8 h-40 w-40 text-gold/10 transition-transform duration-700 group-hover:rotate-12" />
                <div className="relative">
                  <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold">
                    <Waves className="h-4 w-4" />
                    نصائح الطاقم
                  </div>
                  <h3 className="text-2xl font-extrabold text-primary-foreground md:text-3xl">نصائح لرحلة صيد ناجحة</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70">إرشادات مباشرة من الطاقم لتحقيق أفضل تجربة صيد.</p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "احجز مبكرًا خصوصًا في نهاية الأسبوع والعطلات.",
                      "احضر إلى المرسى قبل الموعد بـ 15 دقيقة على الأقل.",
                      "تحقق من حالة الطقس قبل يوم الرحلة.",
                      "أحضر هوية سارية المفعول (جواز سفر أو هوية إماراتية).",
                      "ارتد ملابس مريحة وحذاء مقاوم للانزلاق.",
                      "استمع لتعليمات السلامة من الطاقم قبل الانطلاق.",
                    ].map((t, i) => (
                      <li
                        key={t}
                        className="flex items-start gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-3 text-sm text-primary-foreground/90 backdrop-blur-sm"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-xs font-black text-primary-deep">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Who card — light gold accent */}
            <Reveal delay={120}>
              <div className="group relative h-full overflow-hidden rounded-3xl bg-card p-8 shadow-luxe ring-1 ring-gold/25 md:p-10">
                <Users aria-hidden className="absolute -start-8 -bottom-8 h-40 w-40 text-gold/10 transition-transform duration-700 group-hover:-rotate-12" />
                <div className="relative">
                  <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-deep">
                    <Users className="h-4 w-4" />
                    الفئات المستهدفة
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground md:text-3xl">لمن تناسب رحلات الصيد</h3>
                  <p className="mt-2 text-sm text-muted-foreground">من العائلات إلى الشركات — رحلاتنا تناسب الجميع.</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      { t: "العائلات", d: "رحلات مشتركة صباحية" },
                      { t: "الأصدقاء", d: "رحلات خاصة على القارب" },
                      { t: "المحترفون", d: "رحلات الأعماق" },
                      { t: "السياح", d: "تجربة من مارينا دبي" },
                      { t: "الشركات", d: "رحلات جماعية على اليخت" },
                      { t: "المبتدئون", d: "الطاقم يعلّمك من الصفر" },
                    ].map((it) => (
                      <li
                        key={it.t}
                        className="group/it rounded-xl border border-border bg-muted/40 p-3 transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/5"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          {it.t}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{it.d}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CharterEssentials showDestinations={false} />

      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading
          title="أسئلة شائعة عن رحلات صيد السمك في دبي"
          subtitle="إجابات لأكثر الأسئلة شيوعًا قبل رحلة الصيد."
        />
        <Accordion items={fishingFaqs} />
      </section>

      <ContactCta
        title="احجز رحلة صيد اليوم"
        subtitle="تواصل معنا لاختيار الرحلة الأنسب لك ومعرفة توفر التواريخ."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="أشهر عمليات البحث عن اليخوت والرحلات البحرية في دبي"
          subtitle="اكتشف أكثر عمليات البحث شيوعًا حول رحلات صيد السمك والتجارب البحرية في دبي للوصول بسرعة إلى ما يناسبك."
        />
        <KeywordCloud items={keywordCloud["/رحلات-صيد-السمك-في-دبي/"].map((k) => ({ keyword: k, to: "/رحلات-صيد-السمك-في-دبي/" }))} />
      </section>
    </>
  );
}
