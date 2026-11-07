"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/reveal";

const trades = [
  { key: "carpentry", label: "Carpenters" },
  { key: "electrical", label: "Electricians" },
  { key: "welding", label: "Welders" },
  { key: "plumbing", label: "Plumbers" },
  { key: "concreting", label: "Concreters" },
  { key: "metal-fab", label: "Metal fabricators" },
];

/** A muted loop that plays only while visible (and on hover on desktop). */
function TradeCard({ k, label, i }: { k: string; label: string; i: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-black md:aspect-[3/4]">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={`/media/videos/trades/${k}.poster.webp`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      >
        <source
          src={`/media/videos/trades/${k}.av1.mp4`}
          type='video/mp4; codecs="av01.0.05M.08"'
        />
        <source src={`/media/videos/trades/${k}.mp4`} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
        <span className="font-display text-2xl font-semibold text-white md:text-3xl">{label}</span>
        <span className="text-xs text-white/50 tabular-nums">0{i + 1}</span>
      </figcaption>
    </figure>
  );
}

export function Trades() {
  return (
    <section id="trades" className="bg-b2t-navy relative px-5 py-28 md:px-10 md:py-40 lg:px-16">
      <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div>
          <p className="mb-5 text-xs font-medium tracking-[0.18em] text-white/45 uppercase">
            The trades
          </p>
          <h2 className="font-display max-w-[13ch] text-5xl leading-[0.95] font-semibold text-white md:text-7xl">
            The trades that build Australia.
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-white/65 md:text-lg">
          Find verified tradies across every trade, or get found by the builders who need you.
        </p>
      </Reveal>
      <Reveal className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4" stagger={0.06}>
        {trades.map((t, i) => (
          <TradeCard key={t.key} k={t.key} label={t.label} i={i} />
        ))}
      </Reveal>
    </section>
  );
}
