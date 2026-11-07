"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// From the current B2T site, tightened.
const text =
  "Builders struggle to find reliable tradies when they need them. Tradies struggle to find steady, quality work. The calls, delays and mix-ups slow every project down. Build2Trade puts builders, tradies and suppliers in one place, so the work gets done.";

/** Words fill in as you scroll (Umano-style). */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll("[data-word]");
      if (!words?.length) return;
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="px-5 py-28 md:px-12 md:py-44 lg:px-20">
      <p className="font-display text-b2t-navy max-w-[24ch] text-[8vw] leading-[1.06] md:text-[3.4vw]">
        {text.split(" ").map((w, i) => (
          <span key={i} data-word>
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
