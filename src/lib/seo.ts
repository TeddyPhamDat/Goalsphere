export function jsonLdArticle(params: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  images?: string[];
}) {
  const { url, headline, description, datePublished, images = [] } = params;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline,
    description,
    image: images,
    datePublished,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
