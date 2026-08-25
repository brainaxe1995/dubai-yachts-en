// Helper builders for TanStack Start head() scripts.

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }),
  } as const;
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: it.url,
      })),
    }),
  } as const;
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  price?: string;
  image?: string;
}) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: opts.name,
      description: opts.description,
      areaServed: { "@type": "City", name: "Dubai" },
      provider: { "@type": "Organization", name: "Toot Fun Yachts", url: "https://dubai-yacht.ae/" },
      url: opts.url,
      ...(opts.price ? { offers: { "@type": "Offer", price: opts.price, priceCurrency: "AED" } } : {}),
      ...(opts.image ? { image: opts.image } : {}),
    }),
  } as const;
}
