import { createFileRoute } from "@tanstack/react-router";
import { Fish, Sun, Users, Anchor, Waves, CheckCircle2 } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { BookingSteps } from "@/components/BookingSteps";
import { Accordion } from "@/components/Accordion";
import { ContactCta } from "@/components/ContactCta";
import { fishingTrips, stepsFishing } from "@/data/site";
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
      { property: "og:url", content: "https://dubai-yacht.ae/رحلات-صيد-السمك-في-دبي" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/رحلات-صيد-السمك-في-دبي" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/رحلات-صيد-السمك-في-دبي" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/رحلات-صيد-السمك-في-دبي" },
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

const fishingFaqs = [
  {
    q: "هل تحتاج رخصة صيد للانطلاق في دبي؟",
    a: "لا تحتاج للحصول على رخصة شخصية — جميع رحلاتنا تنطلق بموجب تراخيص القارب واليخت وتخضع لأنظمة هيئة الموانئ الإماراتية.",
  },
  {
    q: "ما الفرق بين رحلة الصيد المشتركة والخاصة؟",
    a: "المشتركة تجمعك مع ركاب آخرين بسعر أقل للفرد (350 د.إ)، والخاصة تخصص القارب أو اليخت لك ولمجموعتك فقط بخصوصية كاملة.",
  },
  {
    q: "هل يمكنني الاحتفاظ بالسمك الذي أصطاده؟",
    a: "نعم، السمك الذي تصطاده ملكك. نوفر ثلج ومبردات لحفظه، وبعض المطاعم القريبة تطبخ لك صيدك مقابل رسوم رمزية.",
  },
  {
    q: "ما الملابس المناسبة لرحلة الصيد؟",
    a: "ملابس مريحة، حذاء مغلق مقاوم للانزلاق، قبعة، نظارة شمسية، وواقي شمس. في الشتاء نوصي بجاكيت خفيف.",
  },
  {
    q: "هل الرحلة مناسبة للأطفال؟",
    a: "نعم — الرحلات المشتركة الصباحية القصيرة مناسبة للأطفال فوق 5 سنوات مع سترات نجاة مخصّصة.",
  },
  {
    q: "ما موعد الانطلاق وكم تستمر الرحلة؟",
    a: "الرحلات الصباحية المشتركة تنطلق 7:00 صباحًا لمدة 4 ساعات. الرحلات الخاصة مرنة — ابدأ متى أردت من ساعتين وحتى يوم كامل.",
  },
  {
    q: "ماذا لو لم أصطد أي سمكة؟",
    a: "طاقمنا خبير في مواقع الصيد ونضمن تجربة ممتعة، لكن الطبيعة لا تُتحكّم بها. نضمن على الأقل استمتاعك بالأجواء والإبحار.",
  },
  {
    q: "هل يمكنني إحضار طعامي الخاص؟",
    a: "نعم، يمكنك إحضار وجبات خفيفة. الرحلة المشتركة تشمل إفطاراً مشتركاً. للرحلات الخاصة نوفر خدمات ضيافة حسب الطلب.",
  },
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

      {/* Intro long-form */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Reveal className="prose prose-lg max-w-none text-center">
          <h2 className="text-2xl text-foreground md:text-3xl">
            دليلك الكامل لرحلات صيد السمك في دبي
          </h2>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
          <p className="mt-6 text-start text-sm leading-loose text-muted-foreground md:text-base">
            تُعد <strong>رحلات صيد السمك في دبي</strong> من أفضل التجارب البحرية في الخليج العربي، حيث تجمع بين متعة
            الإبحار في مياه المارينا الفاخرة وتجربة صيد أصيلة في أعماق الخليج. سواء كنت من هواة الصيد المبتدئين أو
            المحترفين، توفّر توت فن لليخوت رحلات صيد خاصة ومشتركة تناسب جميع المستويات والميزانيات.
          </p>
          <p className="mt-4 text-start text-sm leading-loose text-muted-foreground md:text-base">
            تنطلق رحلاتنا من مارينا دبي بأحدث القوارب واليخوت المجهّزة بمعدات صيد احترافية، مع طاقم مرخّص يعرف أفضل
            مواقع الصيد في المياه الإماراتية. تتراوح مدة الرحلات من 4 ساعات (نصف يوم) وحتى يوم كامل، وتشمل جميع
            التجهيزات والطعم والمشروبات.
          </p>
        </Reveal>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-24">
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

      {/* Fish species */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
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
        </div>
      </section>

      {/* Seasons */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
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
      </section>

      {/* What's included */}
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

      {/* Locations */}
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

      {/* Booking steps */}
      <section className="bg-muted py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="كيف تحجز رحلة صيد في دبي"
            subtitle="خطوات بسيطة لحجز رحلة صيد ممتعة في دبي."
          />
          <BookingSteps steps={stepsFishing} />
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-3">
              <Waves className="h-8 w-8 text-gold-deep" />
              <h2 className="text-2xl text-foreground md:text-3xl">نصائح لرحلة صيد ناجحة</h2>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              <li className="flex gap-2">
                <span className="text-gold">•</span> احجز مبكرًا خصوصًا في نهاية الأسبوع والعطلات.
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span> احضر إلى المرسى قبل الموعد بـ 15 دقيقة على الأقل.
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span> تحقق من حالة الطقس قبل يوم الرحلة.
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span> أحضر هوية سارية المفعول (جواز سفر أو هوية إماراتية).
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span> ارتد ملابس مريحة وحذاء مقاوم للانزلاق.
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span> استمع لتعليمات السلامة من الطاقم قبل الانطلاق.
              </li>
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-gold-deep" />
              <h2 className="text-2xl text-foreground md:text-3xl">لمن تناسب رحلات الصيد</h2>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              <li className="flex gap-2">
                <span className="text-gold">✓</span> العائلات مع الأطفال (الرحلات المشتركة الصباحية).
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span> مجموعات الأصدقاء (الرحلات الخاصة على القارب).
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span> هواة الصيد المحترفون (رحلات الأعماق).
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span> السياح والزوار (تجربة أصيلة من مارينا دبي).
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span> فعاليات الشركات (رحلات جماعية على اليخت).
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span> المبتدئون (طاقمنا يعلّمك من الصفر).
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <SectionHeading title="أسئلة شائعة عن رحلات صيد السمك في دبي" />
        <Accordion items={fishingFaqs} />
      </section>

      <ContactCta
        title="احجز رحلة صيد اليوم"
        subtitle="تواصل معنا لاختيار الرحلة الأنسب لك ومعرفة توفر التواريخ."
      />
    </>
  );
}
