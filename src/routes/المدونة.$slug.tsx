import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactCta } from "@/components/ContactCta";
import { breadcrumbSchema } from "@/components/SeoJsonLd";
import { findPost, posts } from "@/data/blog";

export const Route = createFileRoute("/المدونة/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const p = loaderData;
    if (!p) return {};
    const url = `https://dubai-yacht.ae/المدونة/${p.slug}`;
    return {
      meta: [
        { title: `${p.title} | مدونة توت فن لليخوت` },
        { name: "description", content: p.description },
        { name: "keywords", content: p.keywords },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: p.date },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "ar", href: url },
        { rel: "alternate", hrefLang: "x-default", href: url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            image: p.image,
            datePublished: p.date,
            author: { "@type": "Organization", name: "توت فن لليخوت" },
            publisher: {
              "@type": "Organization",
              name: "توت فن لليخوت",
              logo: { "@type": "ImageObject", url: "https://dubai-yacht.ae/favicon.png" },
            },
            mainEntityOfPage: url,
            keywords: p.keywords,
          }),
        },
        breadcrumbSchema([
          { name: "الرئيسية", url: "https://dubai-yacht.ae/" },
          { name: "المدونة", url: "https://dubai-yacht.ae/المدونة" },
          { name: p.title, url },
        ]),
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const p = Route.useLoaderData();
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <PageHero compact image={p.image} eyebrow={p.tag} title={p.title} subtitle={p.description} />

      <article className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gold-deep" />
            {p.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Tag className="h-4 w-4 text-gold-deep" />
            {p.tag}
          </span>
        </div>

        <Reveal>
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="mb-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-luxe"
          />
        </Reveal>

        <Reveal delay={80}>
          <p className="text-lg leading-loose text-foreground md:text-xl">{p.intro}</p>
        </Reveal>

        <div className="mt-10 space-y-8">
          {p.sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 50}>
              <div>
                <h2 className="mb-3 text-xl font-bold text-primary md:text-2xl">{s.h}</h2>
                <div className="space-y-3">
                  {s.p.map((par, pi) => (
                    <p key={pi} className="text-base leading-loose text-muted-foreground">
                      {par}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <Link
            to="/المدونة"
            className="inline-flex items-center gap-2 text-sm font-bold text-gold-deep hover:text-gold"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            العودة لكل المقالات
          </Link>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="bg-muted py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading title="مقالات ذات صلة" />
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Reveal key={r.slug}>
                  <Link
                    to="/المدونة/$slug"
                    params={{ slug: r.slug }}
                    className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-luxe transition-transform hover:-translate-y-1"
                  >
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-primary-deep">{r.tag}</span>
                      <h3 className="mt-3 text-base font-bold text-foreground">{r.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCta title={p.cta ?? "احجز يختك في دبي الآن"} />
    </>
  );
}
