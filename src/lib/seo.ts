import type { Metadata } from "next";
import { site } from "@/content/site";

/** Per-page metadata: title, description, canonical URL and social previews. */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${site.url}${path}`,
      siteName: site.name,
      locale: "en_AU",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
