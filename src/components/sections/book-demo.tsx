"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Book a demo: copy on the left, the Calendly scheduler embedded on the right
 * (lazy-loaded, with a skeleton until it's ready and a direct link as a fallback).
 */
const embedUrl = `${site.links.demo}?hide_gdpr_banner=1&background_color=ffffff&text_color=101827&primary_color=101827`;

export function BookDemo({
  title = "Book a demo.",
  autoLoad = false,
}: {
  title?: string;
  /** Load the Calendly scheduler by itself (once the page is idle). Otherwise it loads on tap. */
  autoLoad?: boolean;
}) {
  // Calendly is a heavy third-party app: loading it while someone scrolls past makes
  // the page stutter, so it only loads on request (or when idle on the booking page).
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!autoLoad) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setOpen(true));
    else setTimeout(() => setOpen(true), 800);
  }, [autoLoad]);
  return (
    <section id="demo" className="px-1.5 md:px-2">
      <div className="bg-b2t-navy grid gap-12 rounded-[28px] px-5 py-16 text-white md:rounded-[44px] md:px-12 md:py-24 lg:grid-cols-[1fr_1.25fr] lg:gap-16 lg:px-16">
        <Reveal className="lg:pt-6">
          <p className="bg-b2t-yellow text-b2t-navy inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold">
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path
                d="M4 6h16v14H4zM4 10h16M9 3v4M15 3v4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Talk to the team
          </p>
          <h2 className="font-display mt-6 text-6xl leading-[0.92] md:text-8xl">{title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/65">
            See how Build2Trade would run your jobs. We&apos;ll walk you through posting a project,
            getting and comparing quotes, hiring, scheduling and ordering materials, and answer your
            questions.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Pick a time that suits you",
              "Builders, tradies and suppliers welcome",
              "Bring your questions about your business",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 font-medium">
                <span className="bg-b2t-yellow text-b2t-navy grid size-6 shrink-0 place-items-center rounded-full">
                  <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
                    <path
                      d="M2.5 6.2l2.2 2.2L9.5 3.6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
          <a
            href={site.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            Prefer a new tab? Open the booking page →
          </a>
        </Reveal>

        <div className="text-b2t-navy relative min-h-[34rem] overflow-hidden rounded-[24px] bg-white">
          {open ? (
            <>
              {!loaded && <CalendarSkeleton />}
              <iframe
                title="Book a Build2Trade demo"
                src={embedUrl}
                onLoad={() => setLoaded(true)}
                className={cn(
                  "relative block h-[1040px] w-full transition-opacity duration-500 md:h-[720px]",
                  loaded ? "opacity-100" : "opacity-0",
                )}
              />
            </>
          ) : (
            <div className="flex h-full min-h-[34rem] flex-col p-7 md:p-9">
              <div className="flex items-center gap-3">
                <span className="bg-b2t-yellow grid size-11 place-items-center rounded-full font-semibold">
                  B2T
                </span>
                <div>
                  <p className="font-semibold">Build2Trade</p>
                  <p className="text-b2t-navy/55 text-sm">Demo with the team</p>
                </div>
              </div>
              <p className="font-display mt-8 text-3xl">Pick a day and time</p>
              <div className="mt-6 grid grid-cols-7 gap-1.5 text-center text-sm" aria-hidden>
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i} className="text-b2t-navy/45 py-1 text-xs font-semibold">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "grid aspect-square place-items-center rounded-full",
                      i % 7 < 5 && i > 3 ? "bg-b2t-mist font-semibold" : "text-b2t-navy/30",
                    )}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="bg-b2t-navy mt-auto h-14 w-full rounded-full text-base font-semibold text-white transition-colors hover:bg-[#1c2740]"
              >
                Pick a time
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CalendarSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse p-8" aria-hidden>
      <div className="bg-b2t-mist h-6 w-1/2 rounded-full" />
      <div className="bg-b2t-mist mt-4 h-4 w-1/3 rounded-full" />
      <div className="mt-10 grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="bg-b2t-mist aspect-square rounded-full" />
        ))}
      </div>
    </div>
  );
}
