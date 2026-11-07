"use client";

import { ScrollSequence } from "@/components/scroll-sequence";

/** City dots in the final frame of the map footage (x/y 0..1). */
const cities = [
  { name: "Perth", x: 0.071, y: 0.548, side: "right" },
  { name: "Adelaide", x: 0.478, y: 0.652, side: "left" },
  { name: "Melbourne", x: 0.604, y: 0.828, side: "right" },
  { name: "Sydney", x: 0.776, y: 0.713, side: "left" },
  { name: "Brisbane", x: 0.826, y: 0.519, side: "left" },
] as const;

export function NetworkMap() {
  return (
    <ScrollSequence
      name="au-network"
      frameCount={95}
      length={2.6}
      feather="#101827"
      label="Connections spread across Australia"
      mobileFit={{ mode: "width", visible: 0.9, align: 0.62 }}
      className="bg-b2t-navy"
      overlay={
        <div className="absolute inset-0">
          {cities.map((c) => (
            <span
              key={c.name}
              data-city
              className="absolute opacity-0"
              style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}
            >
              <span
                className={`absolute top-0 -translate-y-1/2 text-[10px] font-medium tracking-[0.14em] whitespace-nowrap text-white uppercase md:text-xs ${c.side === "right" ? "left-3" : "right-3"}`}
              >
                {c.name}
              </span>
            </span>
          ))}
        </div>
      }
      build={(tl, root) => {
        tl.fromTo(
          root.querySelectorAll("[data-city]"),
          { opacity: 0 },
          { opacity: 1, stagger: 0.025, duration: 0.06 },
          0.8,
        );
      }}
    >
      <div className="from-b2t-navy via-b2t-navy/70 pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b to-transparent" />
      <div className="absolute inset-x-0 top-0 px-5 pt-28 md:px-10 md:pt-32 lg:px-16">
        <p className="mb-5 text-xs font-medium tracking-[0.18em] text-white/45 uppercase">
          The network
        </p>
        <h2 className="font-display max-w-[16ch] text-5xl leading-[0.95] font-semibold text-white md:text-7xl">
          From Perth to Brisbane, <span className="text-b2t-yellow">connected.</span>
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
          Builders, tradies and suppliers joining one network, city by city.
        </p>
      </div>
    </ScrollSequence>
  );
}
