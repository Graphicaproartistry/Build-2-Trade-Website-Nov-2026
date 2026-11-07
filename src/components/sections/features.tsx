"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Image from "next/image";

const cards = [
  {
    title: "Quotes from the right tradies",
    body: "Projects go to tradies by trade and by distance, so you hear from people who can actually do the job.",
    icon: "M12 21s-6-5.6-6-11a6 6 0 1112 0c0 5.4-6 11-6 11z",
    image: { src: "/media/images/crops/feature-1.webp", w: 853, h: 760 },
  },
  {
    title: "Fair, recorded quotes",
    body: "Every quote version and every project change is saved with the date and time. No more “that wasn't in the scope”.",
    icon: "M7 3h10l3 3v15H4V3zM8 11h8M8 15h5",
    image: { src: "/media/images/crops/feature-2.webp", w: 500, h: 560 },
  },
  {
    title: "Your trades on one calendar",
    body: "Start and end dates for every trade, with reminders before work starts.",
    icon: "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4",
    image: { src: "/media/images/crops/feature-3.webp", w: 500, h: 560 },
  },
  {
    title: "Materials sorted",
    body: "Ask suppliers for a quote, compare them, accept, and track delivery and invoices.",
    icon: "M4 9l2-5h12l2 5M4 9h16v11H4zM9 20v-6h6v6",
    image: { src: "/media/images/crops/feature-4.webp", w: 330, h: 365 },
  },
  {
    title: "Know where the money goes",
    body: "Log every project expense with receipts and see totals by trade.",
    icon: "M5 20V10M12 20V4M19 20v-7",
    image: { src: "/media/images/crops/feature-5.webp", w: 853, h: 740 },
  },
  {
    title: "Chat built in",
    body: "Message tradies and suppliers about the job, with notifications on your phone.",
    icon: "M4 5h16v11H8l-4 4z",
    image: { src: "/media/images/crops/feature-6.webp", w: 853, h: 700 },
  },
];

/** Umano-style "how it works": sand tiles with real app crops, scrolling sideways. */
export function Features() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // The cards slide sideways while the section is held in place (CSS sticky).
  // Where the browser supports scroll-driven animations, the slide runs on the
  // compositor in step with the finger (smooth on phones). Otherwise GSAP drives it.
  // JS only measures the slide distance (--dist), which also sets the section height.
  useGSAP(
    () => {
      const section = ref.current;
      const el = track.current;
      if (!section || !el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let last = -1;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const measure = () => {
        const dist = Math.max(0, el.scrollWidth - window.innerWidth);
        if (dist === last) return false;
        last = dist;
        section.style.setProperty("--dist", `${dist}px`);
        return true;
      };
      measure();
      // Only when the slide distance really changes, and debounced: recalculating every
      // scroll trigger is expensive, and doing it mid-scroll causes a hitch.
      const ro = new ResizeObserver(() => {
        if (!measure()) return;
        clearTimeout(timer);
        timer = setTimeout(() => ScrollTrigger.refresh(), 200);
      });
      ro.observe(el);

      let tween: gsap.core.Tween | undefined;
      if (!CSS.supports("animation-timeline: view()")) {
        tween = gsap.to(el, {
          x: () => -(el.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
      ScrollTrigger.refresh();
      return () => {
        clearTimeout(timer);
        ro.disconnect();
        tween?.scrollTrigger?.kill();
        tween?.kill();
      };
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="how-it-works" className="features-scroll relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
        <div className="px-5 md:px-12 lg:px-20">
          <h2 className="font-display text-b2t-navy max-w-[16ch] text-5xl leading-[0.95] md:text-8xl">
            Everything a job needs.
          </h2>
        </div>
        <div className="motion-reduce:overflow-x-auto">
          <div
            ref={track}
            className="features-track mt-8 flex w-max gap-4 px-5 will-change-transform md:mt-14 md:px-12 lg:px-20"
          >
            {cards.map((c) => (
              <article key={c.title} className="w-[74vw] shrink-0 sm:w-[22rem] md:w-[26rem]">
                <div className="bg-b2t-sand flex aspect-[4/4.2] items-center justify-center overflow-hidden rounded-[28px] p-7">
                  <Image
                    src={c.image.src}
                    alt={c.title}
                    width={c.image.w}
                    height={c.image.h}
                    sizes="(max-width: 768px) 70vw, 19rem"
                    className="h-auto w-full max-w-[19rem] rounded-2xl shadow-[0_20px_40px_-12px_rgb(16_24_39/0.25)] ring-1 ring-black/5"
                  />
                </div>
                <h3 className="text-b2t-navy mt-5 flex items-center gap-2 text-lg font-semibold">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={c.icon} />
                  </svg>
                  {c.title}
                </h3>
                <p className="text-b2t-navy/60 mt-2 max-w-[24rem] text-[15px] leading-relaxed">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
