import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { site } from "@/content/site";

const sans = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Heavy, chunky display serif for headlines.
const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Builders, Tradies & Suppliers in One App`, template: `%s` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "construction app Australia",
    "find tradies",
    "tradie quotes",
    "builder software",
    "subcontractor quotes",
    "building supplies quotes",
    "construction project management",
    "tradie jobs near me",
  ],
  openGraph: {
    siteName: site.name,
    locale: "en_AU",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  // Search Console / Bing Webmaster verification (set the codes in src/content/site.ts).
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(site.verification.bing ? { other: { "msvalidate.01": site.verification.bing } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#fec124",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${sans.variable} ${display.variable} antialiased`}>
      <body className="min-h-dvh">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
