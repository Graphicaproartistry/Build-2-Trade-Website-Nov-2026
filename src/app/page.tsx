import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { Laptop } from "@/components/sections/laptop";
import { Toolkit } from "@/components/sections/toolkit";
import { AppPhone } from "@/components/sections/app-phone";
import { Trades } from "@/components/sections/trades";
import { HowItWorks } from "@/components/sections/how-it-works";
import { NetworkMap } from "@/components/sections/network-map";
import { Pricing } from "@/components/sections/pricing";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Laptop />
        <Toolkit />
        <AppPhone />
        <Trades />
        <HowItWorks />
        <NetworkMap />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
