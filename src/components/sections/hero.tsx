"use client";

import { ScrollSequence } from "@/components/scroll-sequence";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

/**
 * Hero: the blueprint becomes a finished home as you scroll.
 * The headline is visible on load, steps aside while the house builds,
 * and a closing line lands on the finished house.
 */
export function Hero() {
  return (
    <ScrollSequence
      name="hero-blueprint"
      frameCount={95}
      length={3}
      eager
      feather="#101827"
      label="A blueprint becomes a finished home"
      fit={{ mode: "cover" }}
      mobileFit={{ mode: "width", visible: 0.62, align: 0.62 }}
      className="bg-b2t-navy"
      build={(tl, root) => {
        const q = (s: string) => root.querySelectorAll(s);
        tl.to(
          q("[data-hero-intro]"),
          { opacity: 0, y: -40, filter: "blur(8px)", duration: 0.22, ease: "power1.in" },
          0.08,
        )
          .to(q("[data-hero-hint]"), { opacity: 0, duration: 0.06 }, 0.02)
          .fromTo(
            q("[data-hero-outro] > *"),
            { opacity: 0, y: 30, filter: "blur(10px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.12,
              stagger: 0.04,
              ease: "power2.out",
            },
            0.78,
          );
      }}
    >
      {/* Readability: soft navy falloff top and bottom (no coloured glow) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(16_24_39/0.85),transparent_30%,transparent_55%,rgb(16_24_39/0.95))]" />

      <div
        data-hero-intro
        className="absolute inset-x-0 top-0 flex flex-col items-start px-5 pt-32 md:px-10 md:pt-40 lg:px-16"
      >
        <p className="text-b2t-yellow mb-5 max-w-xs text-xs font-medium tracking-[0.18em] uppercase md:max-w-none">
          Australia&apos;s first digital network for builders &amp; tradies
        </p>
        <h1 className="font-display max-w-[14ch] text-[13vw] leading-[0.92] font-semibold text-white md:text-[5.6vw]">
          Connecting builders to quality trades.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
          Hire verified tradies in minutes, run every project in one place, and keep your builds on
          schedule.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={site.links.signUp} size="lg">
            Start free for 3 months
          </Button>
          <Button href="#platform" variant="ghost" size="lg">
            See the platform
          </Button>
        </div>
      </div>

      <div
        data-hero-hint
        className="absolute inset-x-0 bottom-8 flex justify-center text-[11px] tracking-[0.25em] text-white/50 uppercase"
      >
        Scroll to build
      </div>

      <div
        data-hero-outro
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-14 text-center md:pb-20"
      >
        <p className="font-display text-4xl leading-none font-semibold text-white md:text-6xl">
          Every build. Every trade.
        </p>
        <p className="font-display text-b2t-yellow mt-1 text-4xl leading-none font-semibold md:text-6xl">
          One network.
        </p>
      </div>
    </ScrollSequence>
  );
}
