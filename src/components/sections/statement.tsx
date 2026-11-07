"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const text =
  "Builders are chasing tradies. Tradies are chasing work. Endless calls, delays and miscommunication cost everyone time and money. *Build2Trade* brings builders, tradies and suppliers together, so you can post jobs, connect instantly and run every project without the back-and-forth.";

/** Words fill from dim to white as you scroll through the paragraph. */
export function Statement() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll("[data-word]");
      if (!words?.length) return;
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 55%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="bg-b2t-navy relative px-5 py-32 md:px-10 md:py-48 lg:px-16">
      <p className="mb-8 text-xs font-medium tracking-[0.18em] text-white/45 uppercase">
        The problem
      </p>
      <p className="font-display max-w-[22ch] text-[8.5vw] leading-[1.02] font-semibold text-white md:max-w-[26ch] md:text-[4.2vw]">
        {text.split(" ").map((w, i) => {
          const brand = w.startsWith("*");
          const word = w.replaceAll("*", "");
          return (
            <span key={i} data-word className={brand ? "text-b2t-yellow" : undefined}>
              {word}{" "}
            </span>
          );
        })}
      </p>
    </section>
  );
}
