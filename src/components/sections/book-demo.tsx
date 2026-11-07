"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Book a demo: copy on the left, the Calendly scheduler embedded on the right
 * (lazy-loaded, with a skeleton until it's ready and a direct link as a fallback).
 */
const embedUrl = `${site.links.demo}?hide_gdpr_banner=1&background_color=ffffff&text_color=101827&primary_color=101827`;

export function BookDemo({ title = "Book a demo." }: { title?: string }) {
  const [loaded, setLoaded] = useState(false);
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

        <div className="relative overflow-hidden rounded-[24px] bg-white">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse p-8" aria-hidden>
              <div className="bg-b2t-mist h-6 w-1/2 rounded-full" />
              <div className="bg-b2t-mist mt-4 h-4 w-1/3 rounded-full" />
              <div className="mt-10 grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="bg-b2t-mist aspect-square rounded-full" />
                ))}
              </div>
            </div>
          )}
          <iframe
            title="Book a Build2Trade demo"
            src={embedUrl}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={cn(
              "relative block h-[1040px] w-full transition-opacity duration-500 md:h-[720px]",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      </div>
    </section>
  );
}
