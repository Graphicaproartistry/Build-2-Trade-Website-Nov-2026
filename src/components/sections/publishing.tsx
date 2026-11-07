"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Mode = "network" | "public";
const DAY_OPTIONS = [7, 14, 20, 30, 60];

// Your network (inner ring) and tradies in range (outer ring), for the diagram.
const network = ["MK", "JT", "SR", "AL", "DP"];
const PUBLIC_DOTS = 26;

function addDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * Publish to Network vs Publish to Public.
 * Network: only the tradies you pick see the project and plans and can quote; after
 * the days you set, it goes public automatically to tradies nearby whose trade isn't
 * hired yet. Public: every tradie in range for the trades you need is notified.
 */
export function Publishing() {
  const [mode, setMode] = useState<Mode>("network");
  const [days, setDays] = useState(20);
  const [touched, setTouched] = useState(false);
  // The date depends on "today", so only compute it in the browser (not at build time).
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const date = isClient ? addDays(days) : null;

  // Gently alternate the two modes until the visitor interacts.
  useEffect(() => {
    if (touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setMode((m) => (m === "network" ? "public" : "network")), 3600);
    return () => clearInterval(id);
  }, [touched]);

  const pick = (m: Mode) => {
    setTouched(true);
    setMode(m);
  };
  const isPublic = mode === "public";

  return (
    <section id="publishing" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <Reveal className="max-w-3xl">
        <h2 className="font-display text-b2t-navy text-5xl leading-[0.95] md:text-7xl">
          Offer the job to your own tradies first.
        </h2>
        <p className="text-b2t-navy/60 mt-6 max-w-xl text-lg font-medium">
          Publish to your network and only the tradies you pick can see the project, open the plans
          and quote. If it&apos;s still open after the days you set, it goes public automatically.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-3 lg:grid-cols-[1fr_1.1fr]">
        {/* Controls */}
        <Reveal className="flex flex-col gap-3">
          {(
            [
              {
                key: "network",
                title: "Publish to network",
                body: "Private to the tradies you invite or select. Only they get the plans, the emails and the notifications, and only they can quote.",
              },
              {
                key: "public",
                title: "Publish to public",
                body: "Every tradie in range whose trade you need is notified, and you get quotes from verified tradies you haven't worked with yet.",
              },
            ] as const
          ).map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => pick(o.key)}
              aria-pressed={mode === o.key}
              className={cn(
                "rounded-[28px] p-7 text-left transition-colors duration-300 md:p-8",
                mode === o.key
                  ? "bg-b2t-navy text-white"
                  : "bg-b2t-mist text-b2t-navy hover:bg-[#e7e9ec]",
              )}
            >
              <span className="flex items-center justify-between gap-4">
                <span className="font-display text-3xl">{o.title}</span>
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full ring-2",
                    mode === o.key ? "bg-b2t-yellow ring-b2t-yellow" : "ring-b2t-navy/25",
                  )}
                >
                  {mode === o.key && <span className="bg-b2t-navy size-2 rounded-full" />}
                </span>
              </span>
              <span
                className={cn(
                  "mt-3 block max-w-md text-[15px] leading-relaxed",
                  mode === o.key ? "text-white/70" : "text-b2t-navy/60",
                )}
              >
                {o.body}
              </span>
            </button>
          ))}

          <div className="rounded-[28px] bg-white p-7 ring-1 ring-black/5 md:p-8">
            <p className="text-b2t-navy font-semibold">Network first for how many days?</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {DAY_OPTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    setTouched(true);
                    setDays(d);
                    setMode("network");
                  }}
                  aria-pressed={days === d}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    days === d
                      ? "bg-b2t-navy text-white"
                      : "bg-b2t-mist text-b2t-navy hover:bg-[#e7e9ec]",
                  )}
                >
                  {d}d
                </button>
              ))}
            </div>
            <p className="text-b2t-navy/70 mt-5 text-[15px] leading-relaxed">
              After <span className="text-b2t-navy font-semibold">{days} days</span>
              {date && <> (on {date})</>} the project{" "}
              <span className="text-b2t-navy font-semibold">becomes public automatically</span>, and
              tradies near it whose trade isn&apos;t hired yet are notified.
            </p>
          </div>
        </Reveal>

        {/* Diagram */}
        <Reveal>
          <div className="bg-b2t-sand relative flex aspect-square items-center justify-center overflow-hidden rounded-[28px] lg:aspect-auto lg:h-full">
            <svg viewBox="-180 -180 360 360" className="w-[86%] max-w-[34rem]" aria-hidden>
              {/* rings */}
              <circle
                r="150"
                fill="none"
                stroke="#101827"
                strokeOpacity={isPublic ? 0.18 : 0.08}
                strokeDasharray="2 5"
                className="transition-[stroke-opacity] duration-700"
              />
              <circle r="82" fill="none" stroke="#101827" strokeOpacity="0.15" />
              {/* public tradies in range */}
              {Array.from({ length: PUBLIC_DOTS }).map((_, i) => {
                const a = (i / PUBLIC_DOTS) * Math.PI * 2 + 0.2;
                const r = 138 + (i % 3) * 12;
                return (
                  <circle
                    key={i}
                    cx={Math.cos(a) * r}
                    cy={Math.sin(a) * r}
                    r="5"
                    fill="#101827"
                    style={{ transitionDelay: `${isPublic ? i * 18 : 0}ms` }}
                    className={cn(
                      "transition-opacity duration-500",
                      isPublic ? "opacity-90" : "opacity-15",
                    )}
                  />
                );
              })}
              {/* your network */}
              {network.map((n, i) => {
                const a = (i / network.length) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(a) * 82;
                const y = Math.sin(a) * 82;
                return (
                  <g key={n} transform={`translate(${x} ${y})`}>
                    <circle r="19" fill="#ffffff" stroke="#101827" strokeWidth="2" />
                    <text
                      textAnchor="middle"
                      dy="4.5"
                      fontSize="12"
                      fontWeight="700"
                      fill="#101827"
                      fontFamily="var(--font-inter)"
                    >
                      {n}
                    </text>
                  </g>
                );
              })}
              {/* project */}
              <circle r="34" fill="#fec124" />
              <path
                d="M-12 2 L0 -10 L12 2 M-8 -1 V11 H8 V-1"
                fill="none"
                stroke="#101827"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-3 md:inset-x-7 md:bottom-7">
              <span className="text-b2t-navy rounded-full bg-white px-4 py-2 text-sm font-semibold">
                {isPublic
                  ? "Public: tradies in range notified"
                  : `Network only: ${network.length} tradies can quote`}
              </span>
              <span className="text-b2t-navy/60 text-xs font-medium">Example</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
