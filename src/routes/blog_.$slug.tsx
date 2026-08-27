import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Tag, ArrowRight, Clock, Share2, Quote, ChevronUp, Phone } from "lucide-react";
import { SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactCta } from "@/components/ContactCta";
import { breadcrumbSchema } from "@/components/SeoJsonLd";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { findPost, posts } from "@/data/blog";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const p = loaderData;
    if (!p) return {};
    const url = `https://tootfunyachts.com/blog/${p.slug}`;
    return {
      meta: [
        { title: `${p.title} | Toot Fun Yachts Blog` },
        { name: "description", content: p.description },
        { name: "keywords", content: p.keywords },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: p.image },
        { property: "article:published_time", content: p.date },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "en", href: url },
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
            author: { "@type": "Organization", name: "Toot Fun Yachts" },
            publisher: {
              "@type": "Organization",
              name: "Toot Fun Yachts",
              logo: { "@type": "ImageObject", url: "https://tootfunyachts.com/favicon.png" },
            },
            mainEntityOfPage: url,
            keywords: p.keywords,
          }),
        },
        breadcrumbSchema([
          { name: "Home", url: "https://tootfunyachts.com/" },
          { name: "Blog", url: "https://tootfunyachts.com/blog/" },
          { name: p.title, url },
        ]),
      ],
    };
  },
  component: BlogPost,
});

function useReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return pct;
}

function estimateReadMinutes(post: ReturnType<typeof findPost>): number {
  if (!post) return 0;
  const words =
    post.intro.split(/\s+/).length +
    post.sections.reduce((n, s) => n + s.h.split(/\s+/).length + s.p.join(" ").split(/\s+/).length, 0);
  return Math.max(2, Math.round(words / 200));
}

function BlogPost() {
  const p = Route.useLoaderData();
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  const readMin = estimateReadMinutes(p);
  const progress = useReadingProgress();
  const shareUrl = `https://tootfunyachts.com/blog/${p.slug}`;
  const shareMsg = `${p.title}\n${shareUrl}`;
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-l from-gold via-gold-deep to-gold-soft transition-transform duration-150"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden
      />

      {/* Hero — full-bleed magazine style */}
      <header className="relative min-h-[70vh] overflow-hidden bg-primary-deep">
        <img
          src={p.image}
          alt={p.title}
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/70 to-primary-deep/30" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col items-start justify-end px-4 pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link
              to="/blog/"
              className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-black/30 px-3 py-1 text-xs font-bold text-gold backdrop-blur-md hover:bg-gold hover:text-primary-deep"
            >
              <ArrowRight className="h-3 w-3 rotate-180" />
              Blog
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-primary-deep">
              <Tag className="h-3 w-3" />
              {p.tag}
            </span>
          </div>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
            {p.title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 md:text-base">
            {p.description}
          </p>
          {/* Two CTAs — WhatsApp + Call */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md ring-2 ring-white/20 transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-gold/60 bg-primary-deep/70 px-5 py-3 text-sm font-bold text-gold backdrop-blur-md transition-transform hover:scale-105 hover:bg-gold hover:text-primary-deep"
            >
              <Phone className="h-4 w-4" />
              Call now
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-primary-foreground/75 md:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gold" />
              {p.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold" />
              {readMin} min read
            </span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3 py-1 text-xs font-bold text-gold transition-colors hover:bg-gold hover:text-primary-deep"
            >
              <Share2 className="h-3 w-3" />
              Share
            </a>
          </div>
        </div>
      </header>

      {/* H2 hero-adjacent + drop-cap intro + CTAs (moved up from below TOC) */}
      {p.sections.length > 0 ? (
        <section className="mx-auto max-w-3xl px-4 pt-12 md:pt-16">
          <Reveal>
            <h2 className="text-2xl font-extrabold leading-snug text-primary md:text-3xl">
              {p.sections[0].h}
            </h2>
            <span className="mt-3 block h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
            <p className="intro-lead relative mt-6 border-s-4 border-gold/60 bg-muted/40 p-6 text-lg leading-loose text-foreground md:text-xl">
              {p.intro}
            </p>
          </Reveal>
        </section>
      ) : null}

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        {/* Table of contents (excludes hero-adjacent intro) */}
        {p.sections.length > 4 ? (
          <Reveal>
            <nav
              aria-label="Article contents"
              className="mb-12 rounded-2xl border border-gold/30 bg-card p-6 shadow-luxe"
            >
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-gold-deep">In this article</h2>
              <ol className="grid gap-2 sm:grid-cols-2">
                {p.sections.slice(1).map((s, idx) => {
                  const i = idx + 1;
                  return (
                    <li key={s.h}>
                      <a
                        href={`#section-${i}`}
                        className="flex items-start gap-2 text-sm text-foreground transition-colors hover:text-gold-deep"
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/20 text-[10px] font-bold text-gold-deep">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{s.h}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Reveal>
        ) : null}

        {/* Sections (starts at index 1 — index 0 rendered hero-adjacent) */}
        <div className="mt-12 space-y-16">
          {p.sections.slice(1).map((s, idx) => {
            const i = idx + 1;
            const isCallout = idx % 3 === 2 && s.p.length > 0;
            return (
              <Reveal key={s.h} delay={i * 40}>
                <section id={`section-${i}`} className="scroll-mt-24">
                  {/* Big decorative number + heading */}
                  <div className="relative mb-6 flex items-start gap-4">
                    <span
                      aria-hidden
                      className="select-none text-[64px] font-black leading-none text-transparent bg-gradient-to-b from-gold to-gold-deep bg-clip-text md:text-[80px]"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 pt-3 md:pt-6">
                      <h2 className="text-xl font-extrabold leading-snug text-primary md:text-2xl">{s.h}</h2>
                      <div className="mt-2 h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  {isCallout ? (
                    <div className="relative rounded-2xl border border-gold/40 bg-gradient-to-br from-primary-deep to-primary p-8 shadow-luxe">
                      <Quote
                        aria-hidden
                        className="absolute end-6 top-6 h-8 w-8 rotate-180 text-gold/40"
                      />
                      <div className="space-y-4">
                        {s.p.map((par, pi) => (
                          <p
                            key={pi}
                            className="text-base leading-loose text-primary-foreground/90 md:text-lg"
                          >
                            {par}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {s.p.map((par, pi) => {
                        const isBulletish = /^-\s|^•\s|^\d+\.\s/.test(par);
                        if (isBulletish) {
                          return (
                            <div
                              key={pi}
                              className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 text-base leading-relaxed text-muted-foreground"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                              <span>{par.replace(/^-\s|^•\s|^\d+\.\s/, "")}</span>
                            </div>
                          );
                        }
                        return (
                          <p
                            key={pi}
                            className="text-base leading-loose text-muted-foreground md:text-[17px]"
                          >
                            {par}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* Divider between sections */}
                {idx < p.sections.length - 2 ? (
                  <div className="mt-16 flex items-center justify-center gap-3">
                    <span className="h-px w-16 bg-gold/30" />
                    <span className="h-2 w-2 rotate-45 bg-gold/60" />
                    <span className="h-px w-16 bg-gold/30" />
                  </div>
                ) : null}
              </Reveal>
            );
          })}
        </div>

        {/* CTA banner mid-article — cream/gold split layout, distinct from numbered sections */}
        <Reveal>
          <div className="relative mt-20 overflow-hidden rounded-[2rem] border-2 border-gold/40 bg-gradient-to-br from-[#FFF8E7] via-[#FDECC8] to-[#F5D98A] p-8 shadow-luxe md:p-12">
            <WhatsAppIcon
              aria-hidden
              className="pointer-events-none absolute -end-6 -top-6 h-40 w-40 text-primary-deep/[0.06] md:h-56 md:w-56"
            />
            <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div className="text-start">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-deep px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                  Available now
                </span>
                <h3 className="mt-4 text-2xl font-extrabold leading-tight text-primary-deep md:text-3xl">
                  {p.cta ?? "Book your yacht today"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-deep/75 md:text-base">
                  Message us on WhatsApp for pricing, availability, or booking — quick reply within minutes.
                </p>
              </div>
              <a
                href={`https://wa.me/971544420441?text=${encodeURIComponent(`Hi, I just read the article: ${p.title} and would like to enquire.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-base font-bold text-white shadow-lg ring-2 ring-white/40 transition-all hover:scale-105 hover:bg-[#1FBA57] hover:shadow-xl"
              >
                <WhatsAppIcon className="h-6 w-6" />
                Contact us now
              </a>
            </div>
          </div>
        </Reveal>

        {/* Keywords + share footer */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {p.keywords.split(",").slice(0, 5).map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-gold/30 bg-card px-3 py-1 font-semibold text-muted-foreground"
                >
                  #{k.trim().replace(/\s/g, "-")}
                </span>
              ))}
            </div>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-deep px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary"
            >
              <Share2 className="h-4 w-4" />
              Share article
            </a>
          </div>
        </Reveal>

        {/* Back link */}
        <div className="mt-8">
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 text-sm font-bold text-gold-deep hover:text-gold"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to all articles
          </Link>
        </div>
      </article>

      {/* Author / brand byline */}
      <section className="bg-muted py-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center md:flex-row md:text-start">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary-deep text-2xl font-black text-gold">
            T
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-deep">Written by</p>
            <p className="text-lg font-bold text-foreground">The Toot Fun Yachts Team</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Dubai yacht rental and sea cruise experts — sharing our first-hand experience and practical tips.
            </p>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 ? (
        <section className="bg-background py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading title="Related articles" subtitle="Discover more from the Toot Fun blog." />
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Reveal key={r.slug}>
                  <Link
                    to="/blog/$slug/"
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
                      <span className="rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-primary-deep">
                        {r.tag}
                      </span>
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

      <ContactCta title={p.cta ?? "Book your Dubai yacht today"} />

      {/* Back-to-top FAB */}
      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-24 start-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-gold text-primary-deep shadow-luxe transition-transform hover:scale-110"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      ) : null}
    </>
  );
}
