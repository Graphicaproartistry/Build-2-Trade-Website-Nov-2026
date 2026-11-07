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

export function Platform() {
  return (
    <div id="platform">
      <Reveal className="mx-auto max-w-3xl px-5 pt-20 pb-14 text-center md:pt-28">
        <h2 className="font-display text-b2t-navy text-5xl leading-[0.95] md:text-7xl">
          One dashboard for every job.
        </h2>
        <p className="text-b2t-navy/65 mx-auto mt-6 max-w-xl text-lg font-medium">
          Projects, schedules, quotes, chat and supplier invoices side by side, with reports you can
          export to Excel or PDF.
        </p>
      </Reveal>

      <ScrollSequence
        name="laptop-open"
        frameCount={FRAMES}
        length={2.4}
        framed
        feather="#101827"
        label="A laptop opens to the Build 2 Trade dashboard"
        mobileFit={{ mode: "width", visible: 0.66, align: 0.5 }}
        stageClassName="bg-[#121212]"
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
          tl.to(screen, { opacity: 1, duration: at(88) - at(76) }, at(76));
          for (let i = 1; i < SCREEN.length; i++) {
            const [f0] = SCREEN[i - 1];
            const [f1, box] = SCREEN[i];
            tl.to(screen, { ...toBox(box), duration: at(f1) - at(f0) }, at(f0));
          }
        }}
      />
    </div>
  );
}
