"use client";

import { ScrollSequence } from "@/components/scroll-sequence";

/** Callouts anchored to tools in the final (exploded) frame. x/y are 0..1 of the footage. */
const callouts = [
  { x: 0.36, y: 0.27, label: "Metal fabricators", side: "right" },
  { x: 0.7, y: 0.2, label: "Carpenters", side: "right" },
  { x: 0.16, y: 0.44, label: "Verified & insured", side: "right" },
  { x: 0.74, y: 0.54, label: "Builders", side: "left" },
  { x: 0.24, y: 0.66, label: "Electricians", side: "right" },
  { x: 0.47, y: 0.79, label: "Quotes to the cent", side: "right" },
] as const;

export function Toolkit() {
  return (
    <ScrollSequence
      name="toolkit-exploded"
      frameCount={143}
      length={2.6}
      feather="#000000"
      label="A stack of tools separates into every trade"
      mobileFit={{ mode: "width", visible: 0.82, align: 0.5 }}
      className="bg-black"
      overlay={
        <div className="absolute inset-0 hidden md:block">
          {callouts.map((c) => (
            <div
              key={c.label}
              data-callout
              className="absolute opacity-0"
              style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}
            >
              <span className="bg-b2t-yellow ring-b2t-yellow/20 absolute size-2 -translate-1/2 rounded-full ring-4" />
              <span
                className={`absolute top-0 flex -translate-y-1/2 items-center gap-2 ${c.side === "right" ? "left-2" : "right-2 flex-row-reverse"}`}
              >
                <span className="h-px w-10 bg-white/50" />
                <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-sm whitespace-nowrap text-white backdrop-blur">
                  {c.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      }
      build={(tl, root) => {
        tl.to(
          root.querySelectorAll("[data-tk-title]"),
          { opacity: 0.0, y: -30, duration: 0.2 },
          0.32,
        )
          .fromTo(
            root.querySelectorAll("[data-callout]"),
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, stagger: 0.03, duration: 0.08, ease: "power2.out" },
            0.66,
          )
          .fromTo(
            root.querySelectorAll("[data-tk-end] > *"),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, stagger: 0.03, duration: 0.1 },
            0.8,
          );
      }}
    >
      <div data-tk-title className="absolute inset-x-0 top-0 px-5 pt-28 md:px-10 md:pt-32 lg:px-16">
        <p className="mb-5 text-xs font-medium tracking-[0.18em] text-white/45 uppercase">
          Every trade
        </p>
        <h2 className="font-display max-w-[12ch] text-5xl leading-[0.95] font-semibold text-white md:text-7xl">
          The right trade for every stage.
        </h2>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div
        data-tk-end
        className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 px-5 pb-10 md:flex-row md:items-end md:justify-between md:px-10 md:pb-14 lg:px-16"
      >
        <p className="font-display text-3xl leading-none font-semibold text-white md:text-5xl">
          Every trade. <span className="text-b2t-yellow">One platform.</span>
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-white/60 md:text-base">
          From slab to handover: carpenters, electricians, plumbers, fabricators and suppliers, all
          verified and ready to quote.
        </p>
      </div>
    </ScrollSequence>
  );
}
