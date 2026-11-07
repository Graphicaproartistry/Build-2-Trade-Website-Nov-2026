"use client";

import { ScrollSequence } from "@/components/scroll-sequence";

/** Australian residential build stages, timed to the footage. */
const stages = [
  { name: "Base", at: 0.0 },
  { name: "Frame", at: 0.22 },
  { name: "Lock-up", at: 0.45 },
  { name: "Fixing", at: 0.62 },
  { name: "Handover", at: 0.8 },
];

/** The blueprint becomes a finished home, inside a rounded dark panel. */
export function BuildStory() {
  return (
    <ScrollSequence
      name="hero-blueprint"
      frameCount={95}
      length={3}
      framed
      feather="#101827"
      label="A blueprint becomes a finished home"
      mobileFit={{ mode: "width", visible: 0.62, align: 0.6 }}
      stageClassName="bg-b2t-navy"
      build={(tl, root) => {
        const names = root.querySelectorAll<HTMLElement>("[data-stage]");
        const bar = root.querySelector<HTMLElement>("[data-stage-bar]");
        if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
        stages.forEach((s, i) => {
          if (i > 0) tl.to(names[i - 1], { opacity: 0.4, duration: 0.02 }, s.at);
          tl.to(names[i], { opacity: 1, duration: 0.02 }, s.at);
        });
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(16_24_39/0.85),transparent_32%,transparent_70%,rgb(16_24_39/0.9))]" />
      <div className="absolute inset-x-0 top-0 p-6 md:p-12">
        <h2 className="font-display max-w-[12ch] text-5xl leading-[0.95] text-white md:text-7xl">
          From slab to handover.
        </h2>
        <p className="mt-4 max-w-sm text-base text-white/70 md:text-lg">
          Every stage of the build needs the right trade at the right time.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
        <div className="h-px w-full bg-white/15">
          <div data-stage-bar className="h-px origin-left bg-white" />
        </div>
        <ol className="mt-4 flex justify-between text-xs font-semibold text-white md:text-sm">
          {stages.map((s, i) => (
            <li key={s.name} data-stage style={{ opacity: i === 0 ? 1 : 0.4 }}>
              {s.name}
            </li>
          ))}
        </ol>
      </div>
    </ScrollSequence>
  );
}
