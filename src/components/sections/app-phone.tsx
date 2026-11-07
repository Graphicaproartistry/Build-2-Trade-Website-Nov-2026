"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The B2T app in a tradie's gloved hand. Scrolling steps through real app screens,
 * with a tap before each change, like someone using the app.
 *
 * Screen hole in hand-phone.webp (1122x1402): x 360-761, y 150-1005, corner radius ~50px.
 */
const HOLE = {
  left: (360 / 1122) * 100,
  top: (150 / 1402) * 100,
  width: (402 / 1122) * 100,
  height: (856 / 1402) * 100,
};

const screens = [
  {
    src: "home",
    title: "Your projects, in your pocket.",
    body: "Active jobs, hired tradies and progress the moment you open the app.",
    tap: null,
  },
  {
    src: "create-project",
    title: "Post a job in under a minute.",
    body: "Add the address, start date and plans, choose the trades you need, and publish.",
    tap: { x: 0.5, y: 0.93 },
  },
  {
    src: "my-projects",
    title: "Budget, trades and timeline on one card.",
    body: "Plans, permits, quotes, chat, calendar and expenses for every build.",
    tap: { x: 0.32, y: 0.93 },
  },
  {
    src: "alerts",
    title: "Quotes land while you're on the tools.",
    body: "Real-time alerts for new quotes, messages and project updates.",
    tap: { x: 0.68, y: 0.93 },
  },
  {
    src: "invite-tradies",
    title: "Bring the tradies you already trust.",
    body: "Invite your preferred tradies by email or phone. They join your network in minutes.",
    tap: null,
  },
] as const;

export function AppPhone() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
      const shots = q("[data-shot]");
      const copies = q("[data-copy]");
      const dots = q("[data-dot]");
      const tap = root.querySelector<HTMLElement>("[data-tap]");
      const hand = root.querySelector<HTMLElement>("[data-hand]");

      gsap.set(shots.slice(1), { xPercent: 100 });
      gsap.set(copies.slice(1), { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true },
      });

      // Gentle hand sway across the whole section.
      if (hand) {
        tl.fromTo(hand, { rotate: -2.5, yPercent: 6 }, { rotate: 2, yPercent: 0, duration: 1 }, 0);
      }

      const seg = 1 / screens.length;
      screens.forEach((s, i) => {
        if (i === 0) return;
        const t = i * seg - seg * 0.35; // change happens before the step's midpoint
        const prev = shots[i - 1];
        const next = shots[i];
        if (s.tap && tap) {
          tl.set(tap, { left: `${s.tap.x * 100}%`, top: `${s.tap.y * 100}%` }, t - 0.06)
            .fromTo(
              tap,
              { opacity: 0, scale: 1.6 },
              { opacity: 1, scale: 1, duration: 0.03, ease: "power2.out" },
              t - 0.06,
            )
            .to(tap, { scale: 0.8, duration: 0.015 }, t - 0.025)
            .to(tap, { opacity: 0, scale: 1.4, duration: 0.02 }, t - 0.01);
        }
        if (i === screens.length - 1) {
          // Last screen opens like a sheet from the bottom.
          tl.fromTo(
            next,
            { xPercent: 0, yPercent: 100 },
            { yPercent: 0, duration: 0.08, ease: "power3.out" },
            t,
          );
        } else {
          tl.to(next, { xPercent: 0, duration: 0.08, ease: "power3.inOut" }, t).to(
            prev,
            { xPercent: -30, filter: "brightness(0.6)", duration: 0.08, ease: "power3.inOut" },
            t,
          );
        }
        tl.to(copies[i - 1], { opacity: 0, y: -30, filter: "blur(8px)", duration: 0.05 }, t)
          .fromTo(
            copies[i],
            { opacity: 0, y: 30, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.06, ease: "power2.out" },
            t + 0.03,
          )
          .to(
            dots[i - 1],
            { backgroundColor: "rgb(255 255 255 / 0.2)", width: 8, duration: 0.03 },
            t,
          )
          .to(dots[i], { backgroundColor: "#fec124", width: 28, duration: 0.03 }, t);
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="app"
      aria-label="The Build 2 Trade mobile app"
      className="bg-b2t-navy relative"
      style={{ height: `${screens.length * 90 + 60}vh` }}
    >
      <div className="dark-light sticky top-0 grid h-dvh grid-rows-[auto_1fr] overflow-hidden md:grid-cols-2 md:grid-rows-1">
        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-center px-5 pt-24 md:px-10 md:pt-0 lg:px-16">
          <p className="mb-5 text-xs font-medium tracking-[0.18em] text-white/45 uppercase">
            The app
          </p>
          <div className="relative h-[9.5rem] md:h-64">
            {screens.map((s, i) => (
              <div key={s.src} data-copy className="absolute inset-x-0 top-0">
                <h2 className="font-display max-w-[14ch] text-4xl leading-[0.95] font-semibold text-white md:text-6xl">
                  <span className="text-b2t-yellow mr-3 align-top text-sm font-medium tabular-nums md:text-base">
                    0{i + 1}
                  </span>
                  {s.title}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65 md:mt-6 md:text-lg">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2 md:mt-10" aria-hidden>
            {screens.map((s, i) => (
              <span
                key={s.src}
                data-dot
                className="h-2 rounded-full"
                style={{
                  width: i === 0 ? 28 : 8,
                  backgroundColor: i === 0 ? "#fec124" : "rgb(255 255 255 / 0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hand + phone */}
        <div className="relative flex items-end justify-center">
          <div
            data-hand
            className="relative aspect-[1122/1402] h-[min(88dvh,62rem)] origin-bottom max-md:h-[min(62dvh,40rem)]"
          >
            <div
              className="absolute overflow-hidden bg-white"
              style={{
                left: `${HOLE.left}%`,
                top: `${HOLE.top}%`,
                width: `${HOLE.width}%`,
                height: `${HOLE.height}%`,
                borderRadius: "12.5% / 5.9%",
              }}
            >
              {screens.map((s, i) => (
                <div key={s.src} data-shot className="absolute inset-0" style={{ zIndex: i }}>
                  <Image
                    src={`/media/images/app/mobile/${s.src}.webp`}
                    alt={i === 0 ? "Build 2 Trade app home screen" : ""}
                    fill
                    sizes="(max-width: 768px) 40vw, 22vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
              <span
                data-tap
                aria-hidden
                className="absolute z-20 size-9 -translate-1/2 rounded-full border-2 border-white/90 bg-white/35 opacity-0 shadow-[0_2px_10px_rgb(0_0_0/0.25)]"
              />
            </div>
            <Image
              src="/media/images/hand-phone.webp"
              alt=""
              fill
              priority={false}
              sizes="(max-width: 768px) 80vw, 45vw"
              className="pointer-events-none object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
