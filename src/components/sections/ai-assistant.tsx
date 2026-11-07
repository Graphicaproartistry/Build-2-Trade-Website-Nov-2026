"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/ui/reveal";

/** AI Assistant features, as described in the B2T builder dashboard. */
const features = [
  {
    title: "Set up a project from plans",
    body: "Create a project yourself, or drop in your plans and reports and let AI write it up and tick every trade, sub-trade and scope you need.",
    tag: "Most time saved",
    icon: "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8zM14 3v5h5M9 13h6M9 17h4",
  },
  {
    title: "Takeoff and material list",
    body: "Floor area, walls, openings, roof and trade quantities, plus a bill of quantities with waste. Export it as a PDF.",
    tag: null,
    icon: "M8 4h8v3H8zM6 7h12v13H6zM9 11h6M9 14h6M9 17h3",
  },
  {
    title: "Compare quotes",
    body: "Pick a project and AI compares every tradie quote for a trade, picks the best one and saves the result.",
    tag: "New",
    icon: "M12 4v16M5 8h14M5 8l-2 6a3 3 0 006 0zM19 8l-2 6a3 3 0 006 0z",
  },
  {
    title: "Expense from a receipt photo",
    body: "Snap a receipt and AI fills in the expense against the project for you to check and save.",
    tag: "New",
    icon: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  },
];

// Example output shown in the demo card (illustrative, not a real job).
const trades = [
  "Building Surveyor",
  "Demolition",
  "Site Hire",
  "Concrete Slabs",
  "Plumbing",
  "Electrical",
  "Crane Truck Services",
];
const takeoff = [
  ["Floor area", "286 m²"],
  ["External walls", "312 m²"],
  ["Windows & doors", "24"],
  ["Roof area", "198 m²"],
  ["Plasterboard (incl. 10% waste)", "812 m²"],
];

export function AiAssistant() {
  const demo = useRef<HTMLDivElement>(null);

  // A looping walkthrough: plans upload, trades get ticked, the takeoff fills in.
  useGSAP(
    () => {
      const root = demo.current;
      if (!root) return;
      const q = (s: string) => root.querySelectorAll(s);
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.6,
        paused: true,
        defaults: { ease: "power2.out" },
      });
      tl.set(q("[data-trade], [data-row], [data-done]"), { opacity: 0, y: 8 })
        .set(q("[data-bar]"), { scaleX: 0 })
        .set(q("[data-status]"), { textContent: "Reading plans…" })
        .to(q("[data-bar]"), { scaleX: 1, duration: 1.6, ease: "power1.inOut" })
        .set(q("[data-status]"), { textContent: "Trades found" })
        .to(q("[data-trade]"), { opacity: 1, y: 0, duration: 0.35, stagger: 0.12 })
        .set(q("[data-status]"), { textContent: "Takeoff ready" }, "+=0.2")
        .to(q("[data-row]"), { opacity: 1, y: 0, duration: 0.35, stagger: 0.14 })
        .to(q("[data-done]"), { opacity: 1, y: 0, duration: 0.4 }, "+=0.1")
        .to({}, { duration: 2.4 });

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        },
      });
      return () => {
        st.kill();
        tl.kill();
      };
    },
    { scope: demo },
  );

  return (
    <section id="ai" className="px-1.5 md:px-2">
      <div className="bg-b2t-navy rounded-[28px] px-5 py-20 text-white md:rounded-[44px] md:px-12 md:py-28 lg:px-20">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="font-display max-w-[12ch] text-5xl leading-[0.95] md:text-7xl">
                An estimator that reads your plans.
              </h2>
              <p className="mt-6 max-w-lg text-lg text-white/65">
                Less typing, faster quotes. The AI assistant reads plans, engineering, energy
                reports, material lists and photos the way an estimator would, and you stay in
                control of every line.
              </p>
            </Reveal>

            <Reveal
              as="ul"
              className="mt-10 divide-y divide-white/10 border-y border-white/10"
              stagger={0.07}
            >
              {features.map((f) => (
                <li key={f.title} className="flex gap-4 py-5">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-0.5 size-6 shrink-0 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={f.icon} />
                  </svg>
                  <div>
                    <h3 className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                      {f.title}
                      {f.tag && (
                        <span className="text-b2t-navy bg-b2t-yellow rounded-full px-2 py-0.5 text-[11px] font-semibold">
                          {f.tag}
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 max-w-md text-[15px] leading-relaxed text-white/60">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>

          {/* Demo card */}
          <Reveal>
            <div
              ref={demo}
              className="text-b2t-navy rounded-[24px] bg-white p-4 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] md:p-5"
              aria-label="Example: AI sets up a project from plans"
              role="img"
            >
              <div className="flex items-center justify-between px-1 pb-3">
                <p className="text-sm font-semibold">AI assistant</p>
                <p data-status className="text-b2t-navy/55 text-xs font-medium">
                  Reading plans…
                </p>
              </div>

              <div className="bg-b2t-mist flex items-center gap-3 rounded-2xl p-2.5">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src="/media/images/plan-elevation.webp"
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    Lot 12 – elevations & floor plan.pdf
                  </p>
                  <div className="bg-b2t-navy/10 mt-2 h-1 overflow-hidden rounded-full">
                    <div data-bar className="bg-b2t-navy h-full origin-left rounded-full" />
                  </div>
                </div>
              </div>

              <p className="text-b2t-navy/50 mt-5 px-1 text-xs font-semibold">
                Trades and sub-trades
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5 px-1">
                {trades.map((t) => (
                  <li
                    key={t}
                    data-trade
                    className="bg-b2t-mist flex items-center gap-1.5 rounded-full py-1 pr-3 pl-1.5 text-[13px] font-medium"
                  >
                    <span className="bg-b2t-navy grid size-4 place-items-center rounded-full text-white">
                      <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
                        <path
                          d="M2.5 6.2l2.2 2.2L9.5 3.6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <p className="text-b2t-navy/50 mt-5 px-1 text-xs font-semibold">Takeoff</p>
              <dl className="divide-b2t-navy/5 mt-1 divide-y px-1">
                {takeoff.map(([k, v]) => (
                  <div key={k} data-row className="flex justify-between py-2 text-sm">
                    <dt className="text-b2t-navy/70">{k}</dt>
                    <dd className="font-semibold tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>

              <div
                data-done
                className="bg-b2t-yellow mt-3 flex items-center justify-between rounded-2xl px-4 py-3"
              >
                <p className="text-sm font-semibold">Project ready to publish</p>
                <p className="text-xs font-semibold">Export PDF →</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/45">
              Example output. AI can make mistakes, so check trades, quantities, specs and prices
              before you publish or send anything. Your files are only used to answer your request.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
