"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Trade tiles: every trade links to tradie sign-up. On hover a navy fill rises from the
 * bottom, the text turns white and an arrow slides in (transform/opacity only, so it stays
 * smooth). Keyboard focus gets the same treatment. The main trades show first; "See all
 * trades" reveals the rest.
 */
export function TradeGrid({
  featured,
  more,
  href,
}: {
  featured: string[];
  more: string[];
  href: string;
}) {
  const [open, setOpen] = useState(false);
  const first = useRef(true);

  // Opening or closing the list changes the page height, so scroll animations further
  // down the page need their positions recalculated.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [open]);

  const list = open ? [...featured, ...more] : featured;
  const total = featured.length + more.length;

  return (
    <>
      <ul id="trade-list" className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
        {list.map((t, i) => (
          <li
            key={t}
            className={i >= featured.length ? "animate-[fadeUp_0.35s_both]" : undefined}
            style={
              i >= featured.length
                ? { animationDelay: `${Math.min(i - featured.length, 20) * 15}ms` }
                : undefined
            }
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Sign up as a tradie: ${t}`}
              className="group text-b2t-navy focus-visible:outline-b2t-navy relative flex h-full min-h-[3.75rem] items-center justify-between gap-2 overflow-hidden rounded-2xl bg-white px-4 py-3.5 ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgb(16_24_39/0.45)] focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {/* navy fill that rises on hover */}
              <span
                aria-hidden
                className="bg-b2t-navy absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />
              <span className="relative text-[15px] font-semibold transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                {t}
              </span>
              <span
                aria-hidden
                className="bg-b2t-yellow text-b2t-navy relative grid size-7 shrink-0 -translate-x-2 place-items-center rounded-full opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          // Closing from far down the long list: bring the grid back into view first.
          const list = document.getElementById("trade-list");
          if (open && list && list.getBoundingClientRect().top < 0) {
            list.scrollIntoView({ block: "start" });
          }
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        aria-controls="trade-list"
        className="group text-b2t-navy ring-b2t-navy/20 focus-visible:outline-b2t-navy relative isolate mt-4 inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-[15px] font-semibold tracking-tight ring-1 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ring-inset hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgb(16_24_39/0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0 active:scale-[0.97]"
      >
        <span
          aria-hidden
          className="bg-b2t-navy absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-[inherit] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
        />
        <span className="relative transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
          {open ? "Show fewer trades" : `See all ${total} trades`}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={`relative size-4 transition-[transform,color] duration-300 group-hover:text-white ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
    </>
  );
}
