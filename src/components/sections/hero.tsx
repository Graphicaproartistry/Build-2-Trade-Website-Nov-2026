"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
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
    head: "Where builders, tradies and suppliers get the job done.",
    line: "Built for Australian construction. Quotes, hiring, schedules, materials and invoices in one place.",
    tap: null,
  },
  {
    src: "create-project",
    head: "Post the job.",
    line: "Add the trades you need, the scope and your plans. Local tradies who do that trade see it.",
    tap: { x: 0.5, y: 0.93 },
  },
  {
    src: "alerts",
    head: "Get the quotes.",
    line: "Quotes, messages and changes arrive as notifications on your phone.",
    tap: { x: 0.68, y: 0.93 },
  },
  {
    src: "my-projects",
    head: "Hire the right tradie.",
    line: "Compare quotes side by side, hire in one tap and every trade lands on the calendar.",
    tap: { x: 0.32, y: 0.93 },
  },
  {
    src: "invite-tradies",
    head: "Bring your team with you.",
    line: "Invite the tradies and suppliers you already work with by phone or email.",
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
  // the button; the phone itself spans ~10.7%-74% of the photo height.
  useEffect(() => {
    const panel = panelRef.current;
    const head = headRef.current;
    const hand = handRef.current;
    if (!panel || !head || !hand) return;
    const fit = () => {
      const headBottom = head.offsetTop + head.offsetHeight;
      const gap = window.innerWidth < 768 ? 16 : 24;
      // Leave clear space under the phone so its bottom bezel is never cut off;
      // the phone body runs from ~10.7% to ~74% of the photo's height.
      const bottomSpace = window.innerWidth < 768 ? 28 : 40;
      const avail = panel.clientHeight - headBottom - gap - bottomSpace;
      const h = Math.max(200, avail / 0.633);
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

      const dims = q("[data-dim]");
      const heads = q("[data-head]");
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const last = steps.length - 1;

      gsap.set(shots.slice(1), { xPercent: 100 });
      gsap.set(lines.slice(1), { autoAlpha: 0, y: 16 });
      gsap.set(heads.slice(1), { autoAlpha: 0, yPercent: 30 });

      // Entrance on load (blur is skipped on phones; it's expensive there).
      gsap.from(q("[data-intro]"), {
        opacity: 0,
        y: 24,
        ...(isMobile ? {} : { filter: "blur(8px)" }),
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        clearProps: "filter",
      });
      if (hand) gsap.from(hand, { yPercent: 18, duration: 1.4, ease: "expo.out", delay: 0.15 });

      // Gentle sway tied to scroll (a single transform on one layer: cheap).
      if (hand) {
        gsap.fromTo(
          hand,
          { rotate: -2 },
          {
            rotate: 2,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true },
          },
        );
      }

      // Screen changes are triggered by scroll position but play as short timed
      // animations, so they stay smooth however fast the page is flung on a phone.
      let current = 0;
      let running: gsap.core.Timeline | null = null;

      const show = (to: number) => {
        if (to === current) return;
        const from = current;
        current = to;
        running?.progress(1);
        const forward = to > from;
        const step = steps[to];
        const tl = gsap.timeline({ defaults: { ease: "power3.out", overwrite: "auto" } });
        running = tl;

        let at = 0;
        if (forward && step.tap && tap) {
          tl.set(tap, {
            left: `${step.tap.x * 100}%`,
            top: `${step.tap.y * 100}%`,
            opacity: 0,
            scale: 1.6,
          })
            .to(tap, { opacity: 1, scale: 1, duration: 0.16 })
            .to(tap, { scale: 0.82, duration: 0.08, ease: "power1.inOut" })
            .to(tap, { opacity: 0, scale: 1.4, duration: 0.2 });
          at = 0.24;
        }

        // Park every screen that isn't moving.
        shots.forEach((el, i) => {
          if (i === to || i === from) return;
          gsap.set(el, i < to ? { xPercent: -30, yPercent: 0 } : { xPercent: 100, yPercent: 0 });
          gsap.set(dims[i], { opacity: i < to ? 0.3 : 0 });
        });

        const dur = 0.55;
        if (to === last && forward) {
          // The last screen opens like a sheet from the bottom.
          tl.fromTo(shots[to], { xPercent: 0, yPercent: 100 }, { yPercent: 0, duration: dur }, at);
          tl.to(dims[from], { opacity: 0.3, duration: dur }, at);
        } else if (from === last && !forward) {
          tl.to(shots[from], { yPercent: 100, duration: dur }, at);
          gsap.set(shots[to], { xPercent: 0, yPercent: 0 });
          tl.to(dims[to], { opacity: 0, duration: dur }, at);
        } else {
          tl.fromTo(
            shots[to],
            { xPercent: forward ? 100 : -30, yPercent: 0 },
            { xPercent: 0, duration: dur, ease: "power3.inOut" },
            at,
          )
            .to(
              shots[from],
              { xPercent: forward ? -30 : 100, duration: dur, ease: "power3.inOut" },
              at,
            )
            .fromTo(dims[to], { opacity: forward ? 0 : 0.3 }, { opacity: 0, duration: dur }, at)
            .to(dims[from], { opacity: forward ? 0.3 : 0, duration: dur }, at);
        }

        lines.forEach((el, i) => {
          if (i !== to && i !== from) gsap.set(el, { autoAlpha: 0 });
        });
        heads.forEach((el, i) => {
          if (i !== to && i !== from) gsap.set(el, { autoAlpha: 0 });
        });
        tl.to(
          heads[from],
          { autoAlpha: 0, yPercent: forward ? -30 : 30, duration: 0.3, ease: "power2.in" },
          at,
        ).fromTo(
          heads[to],
          { autoAlpha: 0, yPercent: forward ? 30 : -30 },
          { autoAlpha: 1, yPercent: 0, duration: 0.55, ease: "power3.out" },
          at + 0.18,
        );
        tl.to(lines[from], { autoAlpha: 0, y: forward ? -16 : 16, duration: 0.25 }, at).fromTo(
          lines[to],
          { autoAlpha: 0, y: forward ? 16 : -16 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          at + 0.12,
        );
        dots.forEach((d, i) =>
          tl.to(
            d,
            {
              width: i === to ? 24 : 8,
              backgroundColor: i === to ? "#101827" : "rgb(16 24 39 / 0.2)",
              duration: 0.3,
            },
            at,
          ),
        );
      };

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => show(Math.min(last, Math.floor(self.progress * steps.length))),
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="app"
      aria-label="Build 2 Trade: connecting builders to quality trades"
      className="relative h-[310vh] md:h-[440vh]"
    >
      <div className="sticky top-0 h-svh p-1.5 md:p-2">
        <div
          ref={panelRef}
          className="bg-b2t-yellow relative flex h-full flex-col items-center overflow-hidden rounded-[28px] md:rounded-[44px]"
        >
          <div
            ref={headRef}
            className="relative z-10 flex flex-col items-center px-5 pt-28 text-center md:pt-28"
          >
            {/* The headline changes with each app screen. All versions share one grid
                cell, so the box is always as tall as the longest: nothing can overlap.
                Screen readers get the brand tagline only. */}
            <h1
              data-intro
              className="font-display text-b2t-navy grid w-full max-w-[14ch] text-[10vw] leading-[0.95] md:max-w-[22ch] md:text-[4.3vw]"
            >
              {steps.map((s, i) => (
                <span
                  key={s.src}
                  data-head
                  aria-hidden={i > 0 || undefined}
                  className="col-start-1 row-start-1 self-center"
                >
                  {s.head}
                </span>
              ))}
            </h1>
            <div data-intro className="mt-4 grid w-full max-w-xl md:mt-5">
              {steps.map((s) => (
                <p
                  key={s.src}
                  data-line
                  className="text-b2t-navy/75 col-start-1 row-start-1 text-base font-semibold md:text-xl"
                >
                  {s.line}
                </p>
              ))}
            </div>
            <div data-intro className="mt-5 flex flex-col items-center gap-3 md:mt-7">
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  href="/builders"
                  size="lg"
                  arrow
                  className="max-md:h-10 max-md:px-4 max-md:text-sm"
                >
                  I&apos;m a Builder
                </Button>
                <Button
                  href="/tradies"
                  size="lg"
                  arrow
                  variant="outline"
                  className="max-md:h-10 max-md:px-4 max-md:text-sm"
                >
                  I&apos;m a Tradie
                </Button>
                <Button
                  href="/suppliers"
                  size="lg"
                  arrow
                  variant="outline"
                  className="max-md:h-10 max-md:px-4 max-md:text-sm"
                >
                  I&apos;m a Supplier
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-b2t-navy/65 text-xs font-medium md:text-sm">
                  Free to look around. Sign up on the web, then use the app on site.{" "}
                  <a
                    href="#demo"
                    className="text-b2t-navy font-semibold whitespace-nowrap underline underline-offset-4"
                  >
                    Book a demo →
                  </a>
                </p>
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
          </div>

          <div className="relative flex w-full shrink-0 justify-center">
            <div
              ref={handRef}
              data-hand
              className="relative aspect-[1122/1402] h-[64svh] shrink-0 origin-bottom will-change-transform"
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
                      loading={i === 0 ? undefined : "eager"}
                      sizes="(max-width: 768px) 40vw, 18vw"
                      className="object-cover object-top"
                    />
                    <div
                      data-dim
                      className="pointer-events-none absolute inset-0 bg-black opacity-0"
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
