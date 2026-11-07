"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * B2T Marketplace, pitched to suppliers: set up a shop (by hand or imported from an online store,
 * by hand), get listed with your pricing, receive quote requests from builders and
 * tradies, then approve and send your quote. An animated four-step flow (time-based,
 * so it stays smooth on phones) with example data.
 */

const STEP_MS = 3200;

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "text-b2t-navy rounded-2xl bg-white p-3.5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ImportVisual() {
  return (
    <Panel>
      <div className="flex gap-2">
        {["WooCommerce", "Your online store"].map((s) => (
          <span
            key={s}
            className="bg-b2t-mist flex-1 rounded-xl px-3 py-2 text-center text-xs font-semibold"
          >
            {s}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold">Importing your catalogue</p>
      <div className="bg-b2t-navy/10 mt-2 h-1.5 overflow-hidden rounded-full">
        <div className="bg-b2t-navy h-full w-full origin-left animate-[spotlightBar_2.4s_cubic-bezier(0.22,1,0.36,1)_both] rounded-full" />
      </div>
      <p className="text-b2t-navy/55 mt-2 text-[11px]">Products · photos · prices · specs</p>
    </Panel>
  );
}

function ListedVisual() {
  const items = [
    ["Plasterboard 10mm 2400×1200", "$18.90"],
    ["Stud adhesive 5.2 kg", "$20.00"],
    ["MGP10 90×45 per lm", "$6.85"],
  ];
  return (
    <Panel>
      <p className="text-xs font-semibold">Your store on B2T</p>
      <ul className="mt-2 space-y-1.5">
        {items.map(([n, p], i) => (
          <li
            key={n}
            className="bg-b2t-mist flex animate-[fadeUp_0.5s_both] items-center justify-between gap-2 rounded-xl px-3 py-2 text-[11px]"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <span className="truncate font-medium">{n}</span>
            <span className="shrink-0 font-semibold tabular-nums">{p} + GST</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function RequestVisual() {
  return (
    <Panel>
      <div className="flex items-center gap-2.5">
        <span className="bg-b2t-navy grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white">
          CH
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">Coastline Homes</p>
          <p className="text-b2t-navy/55 truncate text-[11px]">Lot 12, Bonnie Brook · VIC</p>
        </div>
      </div>
      <div className="bg-b2t-mist mt-3 rounded-xl px-3 py-2.5">
        <p className="text-xs font-semibold">Quote request · 14 items</p>
        <p className="text-b2t-navy/55 mt-0.5 text-[11px]">
          Plasterboard, adhesives, cornice, screws
        </p>
      </div>
      <p className="text-b2t-navy/55 mt-2 text-[11px]">Needed on site: 24 Nov</p>
    </Panel>
  );
}

function ApproveVisual() {
  return (
    <Panel>
      <div className="bg-b2t-yellow flex animate-[fadeUp_0.45s_both] items-start gap-2.5 rounded-xl px-3 py-2.5">
        <svg
          viewBox="0 0 24 24"
          className="mt-0.5 size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path
            d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-[11px] leading-snug font-semibold">
          New quote request from Coastline Homes
        </p>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="bg-b2t-navy flex-1 rounded-full py-2 text-center text-[11px] font-semibold text-white">
          Send quote
        </span>
        <span className="bg-b2t-mist rounded-full px-3 py-2 text-[11px] font-semibold">Adjust</span>
      </div>
      <p className="text-b2t-navy/55 mt-2 text-[11px]">Then track delivery and send invoices.</p>
    </Panel>
  );
}

const steps = [
  {
    title: "Set up your shop",
    body: "List products with photos, prices, units, minimum order and specs, or connect your online store (for example WooCommerce) and import them, then publish in bulk.",
    visual: ImportVisual,
  },
  {
    title: "Get found",
    body: "Builders and tradies browse your products by category, see prices and sales, and save the ones they like. Put products on sale with a SALE badge.",
    visual: ListedVisual,
  },
  {
    title: "Receive quote requests",
    body: "They add your products to a quote list and send it to you, with the delivery address and the date they need them.",
    visual: RequestVisual,
  },
  {
    title: "Quote, deliver, invoice",
    body: "Your quote starts pre-filled from the request and your prices. Track the order to delivery, with deposit and final invoices.",
    visual: ApproveVisual,
  },
];

export function Marketplace({ showCta = true }: { showCta?: boolean }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active, visible]);

  return (
    <section id="marketplace" className="px-1.5 py-1.5 md:px-2 md:py-2">
      <div
        ref={ref}
        className="bg-b2t-navy rounded-[28px] px-5 py-20 text-white md:rounded-[44px] md:px-12 md:py-28 lg:px-20"
      >
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <p className="bg-b2t-yellow text-b2t-navy inline-flex rounded-full px-3 py-1 text-sm font-semibold">
              B2T Marketplace
            </p>
            <h2 className="font-display mt-6 text-5xl leading-[0.95] md:text-8xl">
              Your products, in front of every builder.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/65">
              Builders and tradies on Build2Trade need materials every day. Get their quote
              requests, send quotes, invoice, deliver and sell from your own shop on the Build2Trade
              marketplace.
            </p>
          </Reveal>
          {showCta && (
            <Reveal className="shrink-0">
              <Button href="/suppliers" variant="accent" size="lg">
                See how it works for suppliers
              </Button>
            </Reveal>
          )}
        </div>

        {/* Animated flow */}
        <ol className="relative mt-16 grid gap-3 md:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((s, i) => {
            const on = i === active;
            const done = i < active;
            const Visual = s.visual;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={on}
                  className={cn(
                    "flex h-full w-full flex-col rounded-[24px] p-5 text-left ring-1 transition-colors duration-500 md:p-6",
                    on
                      ? "bg-white/[0.09] ring-white/25"
                      : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.06]",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors duration-500",
                        on || done ? "bg-b2t-yellow text-b2t-navy" : "bg-white/10 text-white/70",
                      )}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span className="text-lg font-semibold">{s.title}</span>
                  </span>
                  <span className="mt-3 block text-[15px] leading-relaxed text-white/60">
                    {s.body}
                  </span>
                  <span className="relative mt-6 block min-h-[11rem]">
                    <span
                      key={on ? `on-${i}` : `off-${i}`}
                      className={cn(
                        "block transition-opacity duration-500",
                        on ? "opacity-100" : "opacity-35",
                      )}
                    >
                      <Visual />
                    </span>
                  </span>
                  <span className="mt-5 block h-[3px] overflow-hidden rounded-full bg-white/10">
                    {on && visible && (
                      <span
                        key={`bar-${active}`}
                        className="bg-b2t-yellow block h-full origin-left"
                        style={{ animation: `spotlightBar ${STEP_MS}ms linear both` }}
                      />
                    )}
                    {done && <span className="bg-b2t-yellow/60 block h-full" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* For builders and tradies */}
        <div className="mt-16 grid gap-8 border-t border-white/10 pt-12 md:mt-20 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <h3 className="font-display text-4xl leading-tight md:text-5xl">
            Building supplies, a tap away.
          </h3>
          <p className="text-lg leading-relaxed text-white/65">
            Browse products from Australian building suppliers by category, see prices and sales,
            save the ones you like and add them to a quote list. Send the list to the supplier and
            get a proper quote back, with delivery to your site.
          </p>
        </div>
      </div>
    </section>
  );
}
