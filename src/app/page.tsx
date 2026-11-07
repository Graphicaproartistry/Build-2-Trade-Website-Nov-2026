import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { Statement } from "@/components/sections/statement";
import { Platform } from "@/components/sections/platform";
import { Features } from "@/components/sections/features";
import { AiAssistant } from "@/components/sections/ai-assistant";
import { Marketplace } from "@/components/sections/marketplace";
import { Trades } from "@/components/sections/trades";
import { Audiences } from "@/components/sections/audiences";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Statement />
        <Platform />
        <AiAssistant />
        <Features />
        <Marketplace />
        <Trades />
        <Audiences />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
