import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { Statement } from "@/components/sections/statement";
import { Audiences } from "@/components/sections/audiences";
import { Platform } from "@/components/sections/platform";
import { Features } from "@/components/sections/features";
import { Trades } from "@/components/sections/trades";
import { Spotlight } from "@/components/sections/spotlight";
import { Marketplace } from "@/components/sections/marketplace";
import { Pricing } from "@/components/sections/pricing";
import { FinalCta } from "@/components/sections/final-cta";
import { BookDemo } from "@/components/sections/book-demo";
import { JsonLd, homeJsonLd } from "@/components/seo/json-ld";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata: Metadata = {
  title: { absolute: "Build2Trade: Builders, Tradies & Suppliers in One App" },
  description:
    "Post projects, get quotes from local tradies, hire, schedule, order materials and get invoiced. Australia's construction networking platform.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <Trust />
      <Statement />
      <Audiences />
      <Platform />
      <Features />
      <Trades />
      <Spotlight />
      <Marketplace />
      <BookDemo />
      <Pricing />
      <FinalCta />
      <HeadlineReveals />
    </>
  );
}
