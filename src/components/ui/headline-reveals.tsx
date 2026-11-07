"use client";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Section headlines are the page's hooks: each one rises into view line by line,
 * behind a mask, the first time it scrolls in. It re-splits automatically when fonts
 * load or the width changes. Reduced-motion users see the text as it is.
 */
export function HeadlineReveals() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const heads = document.querySelectorAll<HTMLElement>("main h2.font-display");
    const splits = Array.from(heads).map((el) =>
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      }),
    );
    return () => splits.forEach((s) => s.revert());
  });
  return null;
}
