"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How much does it cost?",
    a: `The first three months are free with full access, and you don't need to pay anything to start. After that it's $${site.pricing.monthly} a month. You can cancel anytime before billing begins.`,
  },
  {
    q: "Who is Build2Trade for?",
    a: "Builders who need reliable tradies, tradies who want steady work, and suppliers who want to reach both.",
  },
  {
    q: "How are builders and tradies verified?",
    a: "Everyone gives their ABN when they sign up, and verified accounts show a badge. Trade licences, insurance and certifications are checked too, and reviews come from real jobs.",
  },
  {
    q: "Can I bring my own tradies?",
    a: "Yes. Use Invite Preferred Tradies to send your regular tradies a link by email or phone. They join your network in minutes.",
  },
  {
    q: "Is there a mobile app?",
    a: "Yes. Everything on the web dashboard is also in the app, so you can post jobs, approve quotes and chat from site.",
  },
  {
    q: "Where is Build2Trade based?",
    a: "In Melbourne. It was started by people with more than 20 years on Australian building sites.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="px-5 pb-24 md:px-12 md:pb-36 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-b2t-navy text-center text-4xl md:text-6xl">Questions</h2>
        <p className="text-b2t-navy/55 mt-4 text-center font-medium">
          Anything else? Email{" "}
          <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4">
            {site.contact.email}
          </a>
        </p>
        <ul className="mt-12 space-y-2">
          {faqs.map((f, i) => {
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
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <p className="text-b2t-navy/65 overflow-hidden px-5 pl-15 text-[15px] leading-relaxed">
                    <span className="block pb-5">{f.a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
