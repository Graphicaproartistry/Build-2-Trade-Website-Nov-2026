"use client";

import { ScrollSequence } from "@/components/scroll-sequence";

/** Labels anchored to tools in the final (exploded) frame. x/y are 0..1 of the footage. */
const callouts = [
  { x: 0.36, y: 0.27, label: "Fabrication", side: "right" },
  { x: 0.7, y: 0.2, label: "Carpentry", side: "right" },
  { x: 0.16, y: 0.44, label: "Safety & compliance", side: "right" },
  { x: 0.74, y: 0.54, label: "Building", side: "left" },
  { x: 0.24, y: 0.66, label: "Electrical", side: "right" },
  { x: 0.47, y: 0.79, label: "Quoting", side: "right" },
] as const;

export function Toolkit() {
  return (
    <ScrollSequence
      name="toolkit-exploded"
      frameCount={143}
      length={2.6}
      framed
      feather="#000000"
      label="A stack of tools separates into every trade"
      mobileFit={{ mode: "width", visible: 0.82, align: 0.5 }}
      stageClassName="bg-black"
      overlay={
        <div className="absolute inset-0 hidden md:block">
          {callouts.map((c) => (
            <div
              key={c.label}
              data-callout
              className="absolute opacity-0"
              style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}
            >
              <span className="absolute size-1.5 -translate-1/2 rounded-full bg-white" />
              <span
                className={`absolute top-0 flex -translate-y-1/2 items-center gap-2 ${c.side === "right" ? "left-1" : "right-1 flex-row-reverse"}`}
              >
                <span className="h-px w-8 bg-white/60" />
                <span className="text-sm font-semibold whitespace-nowrap text-white">
                  {c.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      }
      build={(tl, root) => {
        tl.to(root.querySelectorAll("[data-tk-title]"), { opacity: 0, y: -30, duration: 0.2 }, 0.3)
          .fromTo(
            root.querySelectorAll("[data-callout]"),
            { opacity: 0 },
            { opacity: 1, stagger: 0.03, duration: 0.06 },
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
      <div data-tk-title className="absolute inset-x-0 top-0 p-6 md:p-12">
        <h2 className="font-display max-w-[13ch] text-5xl leading-[0.95] text-white md:text-7xl">
          Chippies, sparkies, plumbers and more.
        </h2>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div data-tk-end className="absolute inset-x-0 bottom-0 p-6 md:p-12">
        <p className="font-display max-w-[20ch] text-3xl leading-[1.02] text-white md:text-5xl">
          Checked before anyone can quote.
        </p>
        <p className="mt-3 max-w-md text-sm text-white/65 md:text-base">
          ABN, trade licences and insurance are verified, and reviews come from real jobs.
        </p>
      </div>
    </ScrollSequence>
  );
}
