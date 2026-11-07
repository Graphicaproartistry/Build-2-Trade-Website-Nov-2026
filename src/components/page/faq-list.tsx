"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: ReactNode };

/** Accordion list of questions (one open at a time). */
export function FaqList({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <ul className="space-y-2">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li
            key={f.q}
            className={cn(
              "rounded-2xl transition-colors",
              isOpen ? "bg-white ring-1 ring-black/5" : "hover:bg-white/60",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="text-b2t-navy flex w-full items-center gap-4 px-5 py-4 text-left text-base font-semibold md:text-lg"
            >
              <span
                className={cn(
                  "ring-b2t-navy/25 grid size-6 shrink-0 place-items-center rounded-full ring-1 transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
              >
                <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              {f.q}
            </button>
            {isOpen && (
              <div className="text-b2t-navy/65 animate-[fadeUp_0.4s_cubic-bezier(0.22,1,0.36,1)_both] px-5 pb-5 pl-15 text-[15px] leading-relaxed">
                {f.a}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
