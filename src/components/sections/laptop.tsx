"use client";

import Image from "next/image";
import { ScrollSequence } from "@/components/scroll-sequence";
import { Reveal } from "@/components/ui/reveal";

const FRAMES = 143;

/**
 * Laptop screen rectangle measured from the footage (1-based frame -> [left, top, right, bottom], 0..1).
 * The lid is fully open from about frame 80; after that the camera pushes in.
 */
const SCREEN: [number, [number, number, number, number]][] = [
  [80, [0.2854, 0.1917, 0.7146, 0.6269]],
  [95, [0.2854, 0.1917, 0.7146, 0.6269]],
  [110, [0.2698, 0.1731, 0.7302, 0.6454]],
  [125, [0.2464, 0.1546, 0.7536, 0.6639]],
  [143, [0.2073, 0.1176, 0.7927, 0.7148]],
];

const toBox = ([l, t, r, b]: [number, number, number, number]) => ({
  left: `${l * 100}%`,
  top: `${t * 100}%`,
  width: `${(r - l) * 100}%`,
  height: `${(b - t) * 100}%`,
});

const chips = ["Projects", "Schedule", "Quotes", "Chat", "Suppliers", "Reports"];

export function Laptop() {
  return (
    <div id="platform" className="bg-b2t-navy relative">
      <div className="px-5 pt-24 md:px-10 lg:px-16">
        <Reveal className="max-w-3xl">
          <p className="mb-5 text-xs font-medium tracking-[0.18em] text-white/45 uppercase">
            The platform
          </p>
          <h2 className="font-display text-5xl leading-[0.95] font-semibold text-white md:text-7xl">
            Manage every project in one place.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
            Timelines, budgets, trades, quotes and documents on one dashboard, without switching
            tools.
          </p>
        </Reveal>
      </div>

      <ScrollSequence
        name="laptop-open"
        frameCount={FRAMES}
        length={3.2}
        feather="#101827"
        label="A laptop opens to the Build 2 Trade dashboard"
        mobileFit={{ mode: "width", visible: 0.66, align: 0.5 }}
        overlay={
          <div
            data-screen
            className="absolute overflow-hidden rounded-[0.4%] bg-[#0b1220] opacity-0"
            style={toBox(SCREEN[0][1])}
          >
            <Image
              src="/media/images/app/dashboard-dark.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 70vw"
              className="object-cover object-left-top"
            />
          </div>
        }
        build={(tl, root) => {
          const screen = root.querySelector("[data-screen]");
          if (!screen) return;
          const at = (frame: number) => (frame - 1) / (FRAMES - 1);
          // Fade the real dashboard in over the AI screen once the lid is open.
          tl.to(screen, { opacity: 1, duration: at(88) - at(76) }, at(76));
          for (let i = 1; i < SCREEN.length; i++) {
            const [f0] = SCREEN[i - 1];
            const [f1, box] = SCREEN[i];
            tl.to(screen, { ...toBox(box), duration: at(f1) - at(f0) }, at(f0));
          }
          tl.fromTo(
            root.querySelectorAll("[data-chip]"),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, stagger: 0.015, duration: 0.06, ease: "power2.out" },
            0.86,
          );
        }}
      >
        <div className="from-b2t-navy pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
        <ul className="absolute inset-x-0 bottom-8 flex flex-wrap justify-center gap-2 px-5 md:bottom-12">
          {chips.map((c) => (
            <li
              key={c}
              data-chip
              className="bg-b2t-navy/70 rounded-full border border-white/12 px-4 py-1.5 text-sm text-white/80 backdrop-blur"
            >
              {c}
            </li>
          ))}
        </ul>
      </ScrollSequence>
    </div>
  );
}
