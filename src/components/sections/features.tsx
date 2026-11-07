"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Crop } from "@/components/ui/crop";

const M: [number, number] = [921, 2000]; // mobile screenshots
const D: [number, number] = [2000, 985]; // dashboard screenshot

const cards = [
  {
    title: "Post projects in minutes",
    body: "Unlimited projects with trades and sub-trades ready to tick. Set dates, budget or PO, notes and scopes for each trade.",
    icon: "M12 5v14M5 12h14",
    crop: {
      src: "/media/images/app/mobile/create-project.webp",
      img: M,
      rect: [34, 380, 853, 760] as const,
    },
  },
  {
    title: "Quotes without the back-and-forth",
    body: "Request quotes from a posted project and compare them in one place. Accept, or reject with a reason, and tradies can requote.",
    icon: "M7 3h10l3 3v15H4V3zM8 11h8M8 15h5",
    crop: {
      src: "/media/images/app/dashboard-dark.webp",
      img: D,
      rect: [907, 410, 500, 560] as const,
    },
  },
  {
    title: "Leads that match your trade",
    body: "Tradies see new jobs for their trade and location range, and members get priority access to fresh projects.",
    icon: "M12 21s-6-5.6-6-11a6 6 0 1112 0c0 5.4-6 11-6 11z",
    crop: {
      src: "/media/images/app/mobile/alerts.webp",
      img: M,
      rect: [34, 700, 853, 680] as const,
    },
  },
  {
    title: "Schedules that keep up",
    body: "Calendar and Gantt views with reminders, so every trade knows when they're on.",
    icon: "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4",
    crop: {
      src: "/media/images/app/dashboard-dark.webp",
      img: D,
      rect: [374, 410, 500, 560] as const,
    },
  },
  {
    title: "Verified profiles and reviews",
    body: "ABN-verified badges, plus ratings and reviews from completed work, so you know who you're hiring.",
    icon: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z",
    crop: { src: "/media/images/app/mobile/home.webp", img: M, rect: [0, 740, 921, 330] as const },
  },
  {
    title: "Budgets, invoices and reports",
    body: "Assign quotes to each trade, collect trade invoices and download lifecycle reports in Excel or PDF to see profit or loss.",
    icon: "M5 20V10M12 20V4M19 20v-7",
    crop: {
      src: "/media/images/app/mobile/my-projects.webp",
      img: M,
      rect: [34, 570, 853, 740] as const,
    },
  },
];

/** Umano-style "how it works": sand tiles with real app crops, scrolling sideways. */
export function Features() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const el = track.current;
        if (!el) return;
        const dist = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="overflow-hidden py-20 md:flex md:h-dvh md:flex-col md:justify-center md:py-0"
    >
      <div className="px-5 md:px-12 lg:px-20">
        <h2 className="font-display text-b2t-navy max-w-[16ch] text-5xl leading-[0.95] md:text-7xl">
          Everything a build needs.
        </h2>
      </div>
      <div
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mt-14 md:w-max md:snap-none md:overflow-visible md:px-12 lg:px-20 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c) => (
          <article key={c.title} className="w-[78vw] shrink-0 snap-start sm:w-[22rem] md:w-[26rem]">
            <div className="bg-b2t-sand flex aspect-[4/4.2] items-center justify-center overflow-hidden rounded-[28px] p-7">
              <Crop
                src={c.crop.src}
                img={c.crop.img}
                rect={[...c.crop.rect]}
                alt={c.title}
                className="w-full max-w-[19rem] rounded-2xl shadow-[0_20px_40px_-12px_rgb(16_24_39/0.25)] ring-1 ring-black/5"
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
    </section>
  );
}
