import { BookButton, CallButton } from "./CtaButtons";
import { Reveal } from "./Reveal";

export function ContactCta({
  title = "جاهز لرحلتك البحرية في دبي؟",
  subtitle = "احجز يختك الآن أو تواصل معنا للاستفسار وتخصيص باقتك.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="surface-navy py-16">
      <Reveal className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl text-primary-foreground md:text-3xl">{title}</h2>
        <p className="mt-4 text-sm text-primary-foreground/70 md:text-base">{subtitle}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <BookButton />
          <CallButton />
        </div>
      </Reveal>
    </section>
  );
}
