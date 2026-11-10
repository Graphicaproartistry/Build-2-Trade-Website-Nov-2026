import type { MetadataRoute } from "next";
import { pages, site } from "@/content/site";

// Fixed date (no "now" at build time); bump it when page content changes.
const UPDATED = "2026-11-10";

const priority: Record<string, number> = {
  "/": 1,
  "/builders": 0.9,
  "/tradies": 0.9,
  "/suppliers": 0.9,
  "/how-it-works": 0.8,
  "/features": 0.8,
  "/pricing": 0.8,
  "/book-a-demo": 0.7,
  "/get-the-app": 0.6,
  "/faq": 0.6,
  "/about": 0.5,
  "/contact": 0.5,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages).map((p) => ({
    url: `${site.url}${p.href === "/" ? "" : p.href}`,
    lastModified: UPDATED,
    changeFrequency: p.href === "/" ? "weekly" : "monthly",
    priority: priority[p.href] ?? 0.3,
  }));
}
