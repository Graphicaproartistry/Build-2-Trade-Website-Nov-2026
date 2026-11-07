import { site } from "@/content/site";

/** Structured data (schema.org) so search engines understand the business and the app. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON from our own constants only (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function homeJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: "Build 2 Trade",
    url: site.url,
    logo: `${site.url}/brand/b2t-logo-stacked.png`,
    description: site.description,
    areaServed: { "@type": "Country", name: "Australia" },
    email: site.contact.email,
    telephone: site.contact.phone,
    taxID: site.contact.abn,
    sameAs: [site.social.facebook, site.social.youtube],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "en-AU",
    publisher: { "@id": `${site.url}/#organization` },
  };
  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: site.description,
    offers: [
      { "@type": "Offer", name: "Monthly", price: site.pricing.monthly, priceCurrency: "AUD" },
      { "@type": "Offer", name: "Yearly", price: site.pricing.yearly, priceCurrency: "AUD" },
    ],
    publisher: { "@id": `${site.url}/#organization` },
  };
  return [org, website, app];
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
