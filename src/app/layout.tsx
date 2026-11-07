import type { Metadata, Viewport } from "next";
import { Archivo, Geist } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { site } from "@/content/site";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Display face: variable width lets headlines run slightly condensed and confident.
const display = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  metadataBase: new URL("https://build2trade.com.au"),
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    locale: "en_AU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#101827",
  colorScheme: "dark",
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
