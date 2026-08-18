import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Tag } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { posts } from "@/data/blog";

export const Route = createFileRoute("/المدونة")({
  head: () => ({
    meta: [
      { title: "المدونة | نصائح ودليل تأجير اليخوت في دبي | توت فن لليخوت" },
      {
        name: "description",
        content:
          "اكتشف المدونة وتعرّف على أحدث النصائح والأفكار حول تأجير اليخوت، الرحلات البحرية، حفلات اليخوت، ورحلات الصيد في دبي.",
      },
      { property: "og:title", content: "المدونة | دليل تأجير اليخوت في دبي" },
      { property: "og:description", content: "نصائح وأفكار حول الرحلات البحرية وحفلات اليخوت في دبي." },
      { property: "og:url", content: "https://dubai-yacht.ae/المدونة/" },
    ],
    links: [
      { rel: "canonical", href: "https://dubai-yacht.ae/المدونة/" },
      { rel: "alternate", hrefLang: "ar", href: "https://dubai-yacht.ae/المدونة/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://dubai-yacht.ae/المدونة/" },
    ],
  }),
  component: Blog,
});

function Blog() {
  const [activeTag, setActiveTag] = useState<string>("الكل");
  const tags = ["الكل", ...Array.from(new Set(posts.map((p) => p.tag)))];
  const filtered = activeTag === "الكل" ? posts : posts.filter((p) => p.tag === activeTag);

  return (
    <>
      <PageHero
        compact
        eyebrow="المدونة"
        title="المدونة"
        subtitle="اكتشف أحدث النصائح والأفكار حول تأجير اليخوت، الرحلات البحرية، حفلات اليخوت، ورحلات الصيد في دبي."
      />

      <section className="mx-auto max-w-[1440px] px-4 py-12 md:py-16">
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((t) => {
            const active = activeTag === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTag(t)}
                className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-colors md:text-sm ${
                  active
                    ? "border-gold bg-gold text-primary-deep"
                    : "border-gold/40 bg-card text-foreground hover:border-gold/70"
                }`}
              >
                #{t}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 md:pb-24">
        <SectionHeading
          title="أحدث مقالات ونصائح اليخوت في دبي"
          subtitle="مقالات متخصّصة من فريق توت فن الخبير في تأجير اليخوت، الحفلات، والرحلات البحرية."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal as="article" key={p.slug} delay={i * 60}>
              <Link
                to="/المدونة/$slug"
                params={{ slug: p.slug }}
                className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-luxe transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute end-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-primary-deep">
                    {p.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {p.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-lg font-bold text-foreground group-hover:text-gold-deep">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-gold-deep">اقرأ المقال ←</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
