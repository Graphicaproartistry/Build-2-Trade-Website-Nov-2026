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

const devices = [
  {
    label: "iPhone & Android",
    icon: "M8 2h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V3a1 1 0 011-1zM11 18h2",
  },
  {
    label: "Tablet",
    icon: "M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2",
  },
  { label: "Laptop", icon: "M5 5h14v10H5zM2 19h20" },
  { label: "Desktop & web", icon: "M3 4h18v12H3zM9 20h6M12 16v4" },
];

export function Platform() {
  return (
    <div id="platform">
      <Reveal className="mx-auto max-w-4xl px-5 pt-20 pb-14 text-center md:pt-28">
        <p className="text-b2t-navy mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold ring-1 ring-black/5">
          <span className="bg-b2t-yellow size-2 rounded-full" />
          Built for builders
        </p>
        <h2 className="font-display text-b2t-navy text-5xl leading-[0.95] md:text-7xl">
          Phone on site.
          <br />
          Desktop in the office.
        </h2>
        <p className="text-b2t-navy/65 mx-auto mt-6 max-w-2xl text-lg font-medium">
          Build2Trade isn&apos;t just an app. Open it on a laptop, desktop or tablet and you get the
          full builder dashboard: every project, schedule, quote, chat and supplier invoice, with
          reports you can export to Excel or PDF. It&apos;s all in sync with your phone.
        </p>
        <ul className="mt-9 flex flex-wrap items-center justify-center gap-2">
          {devices.map((d) => (
            <li
              key={d.label}
              className="text-b2t-navy flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-black/5"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d={d.icon} />
              </svg>
              {d.label}
            </li>
          ))}
        </ul>
      </Reveal>

      <ScrollSequence
        name="laptop-open"
        frameCount={FRAMES}
        mobileFrameCount={72}
        mobileMode="autoplay"
        autoplayHeight="56svh"
        length={2.4}
        framed
        feather="#101827"
        label="A laptop opens to the Build 2 Trade dashboard"
        mobileFit={{ mode: "width", visible: 0.6, align: 0.5 }}
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
