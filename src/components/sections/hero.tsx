"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

/**
 * Hero: yellow panel, big headline, and the B2T app in a tradie's gloved hand.
 * As you scroll, the phone steps through real app screens (with a tap before
 * each change), and the line under the headline follows along.
 *
 * Screen hole in hand-phone.webp (1122x1402): x 360-761, y 150-1005, corner radius ~50px.
 */
const HOLE = {
  left: (360 / 1122) * 100,
  top: (150 / 1402) * 100,
  width: (402 / 1122) * 100,
  height: (856 / 1402) * 100,
};

const steps = [
  {
    src: "home",
    line: "Hire verified tradies in minutes and run every job from one app.",
    tap: null,
  },
  {
    src: "create-project",
    line: "Post a job from site: address, start date, plans and the trades you need.",
    tap: { x: 0.5, y: 0.93 },
  },
  {
    src: "my-projects",
    line: "Budget, trades and timeline for every build, on one card.",
    tap: { x: 0.32, y: 0.93 },
  },
  {
    src: "alerts",
    line: "Know the moment a quote or message comes in.",
    tap: { x: 0.68, y: 0.93 },
  },
  {
    src: "invite-tradies",
    line: "Already have tradies you trust? Invite them by email or phone.",
    tap: null,
  },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);

  // Size the hand so the phone fills the space left under the headline. The photo has
  // empty background above the phone (top ~10.7% of its height), which is tucked under
  // the button; the phone itself spans ~10.7%-72.5% of the photo height.
  useEffect(() => {
    const panel = panelRef.current;
    const head = headRef.current;
    const hand = handRef.current;
    if (!panel || !head || !hand) return;
    const fit = () => {
      const headBottom = head.offsetTop + head.offsetHeight;
      const gap = window.innerWidth < 768 ? 16 : 24;
      const avail = panel.clientHeight - headBottom - gap - 10;
      const h = Math.max(300, avail / 0.618);
      hand.style.height = `${h}px`;
      hand.style.marginTop = `${gap - 0.107 * h}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(panel);
    ro.observe(head);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
      const shots = q("[data-shot]");
      const lines = q("[data-line]");
      const dots = q("[data-dot]");
      const tap = root.querySelector<HTMLElement>("[data-tap]");
      const hand = root.querySelector<HTMLElement>("[data-hand]");

      gsap.set(shots.slice(1), { xPercent: 100 });
      gsap.set(lines.slice(1), { opacity: 0, y: 16 });

      // Entrance on load.
      gsap.from(q("[data-intro]"), {
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        clearProps: "filter",
      });
      if (hand) gsap.from(hand, { yPercent: 18, duration: 1.4, ease: "expo.out", delay: 0.15 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true },
      });
      if (hand) tl.fromTo(hand, { rotate: -2 }, { rotate: 2, duration: 1 }, 0);

      const seg = 1 / steps.length;
      steps.forEach((s, i) => {
        if (i === 0) return;
        const t = i * seg - seg * 0.4;
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
        if (i === steps.length - 1) {
          tl.fromTo(
            next,
            { xPercent: 0, yPercent: 100 },
            { yPercent: 0, duration: 0.08, ease: "power3.out" },
            t,
          );
        } else {
          tl.to(next, { xPercent: 0, duration: 0.08, ease: "power3.inOut" }, t).to(
            prev,
            { xPercent: -30, filter: "brightness(0.7)", duration: 0.08, ease: "power3.inOut" },
            t,
          );
        }
        tl.to(lines[i - 1], { opacity: 0, y: -16, duration: 0.04 }, t)
          .fromTo(
            lines[i],
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
            t + 0.03,
          )
          .to(dots[i - 1], { backgroundColor: "rgb(16 24 39 / 0.2)", width: 8, duration: 0.03 }, t)
          .to(dots[i], { backgroundColor: "#101827", width: 24, duration: 0.03 }, t);
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="app"
      aria-label="Build 2 Trade: connecting builders to quality trades"
      className="relative"
      style={{ height: `${steps.length * 80 + 40}vh` }}
    >
      <div className="sticky top-0 h-dvh px-1.5 pb-1.5 md:px-2 md:pb-2">
        <div
          ref={panelRef}
          className="bg-b2t-yellow relative flex h-full flex-col items-center overflow-hidden rounded-b-[28px] md:rounded-b-[44px]"
        >
          <div
            ref={headRef}
            className="relative z-10 flex flex-col items-center px-5 pt-28 text-center md:pt-28"
          >
            <h1
              data-intro
              className="font-display text-b2t-navy max-w-[13ch] text-[12.5vw] leading-[0.95] md:max-w-[17ch] md:text-[4.6vw]"
            >
              Connecting builders to quality trades.
            </h1>
            <div data-intro className="relative mt-4 h-14 w-full max-w-2xl md:mt-5 md:h-10">
              {steps.map((s) => (
                <p
                  key={s.src}
                  data-line
                  className="text-b2t-navy/80 absolute inset-x-0 top-0 text-base font-semibold md:text-xl"
                >
                  {s.line}
                </p>
              ))}
            </div>
            <div data-intro className="flex items-center gap-4">
              <Button href={site.links.signUp} size="lg">
                Start free for 3 months
              </Button>
              <div className="hidden gap-1.5 sm:flex" aria-hidden>
                {steps.map((s, i) => (
                  <span
                    key={s.src}
                    data-dot
                    className="h-2 rounded-full"
                    style={{
                      width: i === 0 ? 24 : 8,
                      backgroundColor: i === 0 ? "#101827" : "rgb(16 24 39 / 0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex w-full shrink-0 justify-center">
            <div
              ref={handRef}
              data-hand
              className="relative aspect-[1122/1402] h-[64dvh] shrink-0 origin-bottom"
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
                {steps.map((s, i) => (
                  <div key={s.src} data-shot className="absolute inset-0" style={{ zIndex: i }}>
                    <Image
                      src={`/media/images/app/mobile/${s.src}.webp`}
                      alt={i === 0 ? "Build 2 Trade app home screen" : ""}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 768px) 40vw, 18vw"
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
                priority
                sizes="(max-width: 768px) 80vw, 40vw"
                className="pointer-events-none object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
