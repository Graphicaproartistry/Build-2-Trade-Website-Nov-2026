"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/** One plan, stated plainly. A faint light follows the pointer across the card (no glow). */
export function Pricing() {
  const card = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const p = site.pricing;

  return (
    <section
      id="pricing"
      className="grain bg-b2t-navy relative overflow-hidden px-5 py-28 md:px-10 md:py-40 lg:px-16"
    >
      <video
        aria-hidden
        muted
        loop
        autoPlay
        playsInline
        preload="none"
        poster="/media/videos/ambient/dust-beam.poster.webp"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen"
      >
        <source
          src="/media/videos/ambient/dust-beam.av1.mp4"
          type='video/mp4; codecs="av01.0.05M.08"'
        />
        <source src="/media/videos/ambient/dust-beam.mp4" type="video/mp4" />
      </video>

      <div className="relative grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="mb-5 text-xs font-medium tracking-[0.18em] text-white/45 uppercase">
            Pricing
          </p>
          <h2 className="font-display text-5xl leading-[0.95] font-semibold text-white md:text-7xl">
            Try it free for three months.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/65">
            Full access, no payment to start. If it isn&apos;t saving you time, cancel before
            billing begins.
          </p>
        </Reveal>

        <Reveal>
          <div
            ref={card}
            onPointerMove={onMove}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] [background-image:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,0%),rgb(255_255_255/0.06),transparent_60%)] p-8 backdrop-blur-sm md:p-10"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-7xl font-semibold text-white md:text-8xl">$0</span>
              <span className="text-white/60">for {p.trialMonths} months</span>
            </div>
            <p className="mt-2 text-white/60">
              Then <span className="text-white">${p.monthly}</span>/month. Cancel anytime.
            </p>
            <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-white/80">
                  <svg
                    viewBox="0 0 20 20"
                    className="text-b2t-yellow mt-0.5 size-5 shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M5 10.5l3 3 7-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {pt}
                </li>
              ))}
            </ul>
            <Button href={site.links.signUp} size="lg" className="mt-10 w-full">
              Start your free trial
            </Button>
            <p className="mt-4 text-center text-xs text-white/45">Prices in AUD.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
