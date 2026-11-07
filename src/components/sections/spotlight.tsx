"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Feature spotlight: a rotating showcase. It auto-advances with a progress bar,
 * any feature can be clicked, and it pauses while off screen. Each feature has a
 * live UI card (example data) over an optional background photo.
 */

const DURATION = 7000;

/* ---------- small building blocks ---------- */

const appear = (i: number) => ({
  className: "animate-[fadeUp_0.55s_cubic-bezier(0.22,1,0.36,1)_both]",
  style: { animationDelay: `${120 + i * 90}ms` },
});

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "text-b2t-navy w-full max-w-[26rem] rounded-[22px] bg-white p-4 shadow-[0_30px_70px_-30px_rgb(16_24_39/0.45)] ring-1 ring-black/5 md:p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardHead({ title, status }: { title: string; status: string }) {
  return (
    <div className="flex items-center justify-between px-1 pb-3">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-b2t-navy/55 text-xs font-medium">{status}</p>
    </div>
  );
}

function Check() {
  return (
    <span className="bg-b2t-navy grid size-4 shrink-0 place-items-center rounded-full text-white">
      <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
        <path d="M2.5 6.2l2.2 2.2L9.5 3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

/* ---------- visuals ---------- */

function AutofillVisual() {
  const trades = [
    ["Concrete Slabs", "Waffle pod slab, 286 m²"],
    ["Plumbing", "Rough-in and fit-off, 2 bathrooms"],
    ["Electrical", "Rough-in, 42 points, switchboard"],
    ["Building Surveyor", "Building permit and inspections"],
  ];
  return (
    <Card>
      <CardHead title="AI auto-fill" status="Project ready" />
      <div className={appear(0).className} style={appear(0).style}>
        <div className="bg-b2t-mist flex items-center gap-3 rounded-2xl p-2.5">
          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
            <Image
              src="/media/images/plan-elevation.webp"
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Lot 12 – plans & engineering.pdf</p>
            <p className="text-b2t-navy/55 text-xs">Read in 40 seconds</p>
          </div>
        </div>
      </div>
      <p
        className={cn(appear(1).className, "text-b2t-navy/50 mt-4 px-1 text-xs font-semibold")}
        style={appear(1).style}
      >
        Trades and scopes
      </p>
      <ul className="mt-1">
        {trades.map(([t, s], i) => (
          <li
            key={t}
            {...appear(2 + i)}
            className={cn(
              appear(2 + i).className,
              "flex items-start gap-2.5 border-b border-black/5 px-1 py-2.5 last:border-0",
            )}
          >
            <Check />
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{t}</span>
              <span className="text-b2t-navy/55 block text-xs">{s}</span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function CompareVisual() {
  const quotes = [
    { name: "Harbour Plumbing", price: "$18,400", rating: "4.9 (31)", start: "18 Nov", best: true },
    {
      name: "Southside Plumbing & Gas",
      price: "$17,250",
      rating: "4.6 (12)",
      start: "2 Dec",
      best: false,
    },
    { name: "AquaFix Group", price: "$21,900", rating: "4.8 (54)", start: "15 Nov", best: false },
  ];
  return (
    <Card>
      <CardHead title="Compare quotes · Plumbing" status="3 quotes" />
      <ul className="space-y-1.5">
        {quotes.map((q, i) => (
          <li
            key={q.name}
            {...appear(i)}
            className={cn(
              appear(i).className,
              "rounded-2xl px-3.5 py-3",
              q.best ? "bg-b2t-navy text-white" : "bg-b2t-mist",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-semibold">{q.name}</p>
              <p className="text-sm font-semibold tabular-nums">{q.price}</p>
            </div>
            <p className={cn("mt-0.5 text-xs", q.best ? "text-white/65" : "text-b2t-navy/55")}>
              ★ {q.rating} · ABN verified · Starts {q.start}
            </p>
          </li>
        ))}
      </ul>
      <div
        style={appear(4).style}
        className={cn(appear(4).className, "bg-b2t-yellow mt-3 rounded-2xl px-3.5 py-3")}
      >
        <p className="text-sm font-semibold">Best pick: Harbour Plumbing</p>
        <p className="text-b2t-navy/75 mt-0.5 text-xs leading-relaxed">
          Within 7% of the lowest price, starts two weeks sooner and has the most completed jobs
          with reviews.
        </p>
      </div>
    </Card>
  );
}

function TakeoffVisual() {
  const rows = [
    ["Floor area", "286 m²"],
    ["External walls", "312 m²"],
    ["Windows & doors", "24"],
    ["Roof area", "198 m²"],
    ["Plasterboard (incl. 10% waste)", "812 m²"],
    ["Wall frame timber, 90×45 MGP10", "1,480 lm"],
  ];
  return (
    <Card>
      <CardHead title="Takeoff & material list" status="From 6 drawings" />
      <dl className="divide-y divide-black/5 px-1">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            {...appear(i)}
            className={cn(appear(i).className, "flex justify-between gap-4 py-2 text-sm")}
          >
            <dt className="text-b2t-navy/70">{k}</dt>
            <dd className="font-semibold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <div
        {...appear(6)}
        className={cn(
          appear(6).className,
          "bg-b2t-mist mt-3 flex items-center justify-between rounded-2xl px-3.5 py-3",
        )}
      >
        <p className="text-sm font-semibold">Bill of quantities</p>
        <p className="text-xs font-semibold">Export PDF →</p>
      </div>
    </Card>
  );
}

function ReceiptVisual() {
  return (
    <div className="flex w-full max-w-[30rem] items-start justify-center gap-3">
      {/* receipt paper */}
      <div
        className={cn(
          appear(0).className,
          "text-b2t-navy/80 hidden w-40 shrink-0 -rotate-3 bg-white px-4 pt-4 pb-6 font-mono text-[10px] leading-relaxed shadow-[0_20px_40px_-20px_rgb(16_24_39/0.5)] sm:block",
        )}
        style={{
          ...appear(0).style,
          clipPath:
            "polygon(0 0,100% 0,100% 96%,92% 100%,84% 96%,76% 100%,68% 96%,60% 100%,52% 96%,44% 100%,36% 96%,28% 100%,20% 96%,12% 100%,4% 96%,0 100%)",
        }}
      >
        <p className="text-center font-semibold">WESTSIDE PLASTER</p>
        <p className="text-center">& TRADE · VIC</p>
        <p className="mt-2">TAX INVOICE 004812</p>
        <p>07/11/2026 07:42</p>
        <div className="my-2 border-t border-dashed border-black/30" />
        <p className="flex justify-between">
          <span>CORNICE ADH 20KG x4</span>
        </p>
        <p className="flex justify-between">
          <span></span>
          <span>110.00</span>
        </p>
        <p className="flex justify-between">
          <span>STUD ADH 5.2KG x6</span>
        </p>
        <p className="flex justify-between">
          <span></span>
          <span>132.00</span>
        </p>
        <p className="flex justify-between">
          <span>SCREWS 6G x2</span>
          <span>44.00</span>
        </p>
        <div className="my-2 border-t border-dashed border-black/30" />
        <p className="flex justify-between font-semibold">
          <span>TOTAL</span>
          <span>286.00</span>
        </p>
        <p className="flex justify-between">
          <span>GST incl.</span>
          <span>26.00</span>
        </p>
      </div>
      <Card className="max-w-[17rem]">
        <CardHead title="New expense" status="Filled by AI" />
        <dl className="divide-y divide-black/5 px-1 text-sm">
          {[
            ["Supplier", "Westside Plaster & Trade"],
            ["Date", "7 Nov 2026"],
            ["Amount", "$286.00 incl. GST"],
            ["GST", "$26.00"],
            ["Project", "Lot 12 – Bonnie Brook"],
            ["Category", "Materials"],
          ].map(([k, v], i) => (
            <div
              key={k}
              style={appear(1 + i).style}
              className={cn(appear(1 + i).className, "py-2")}
            >
              <dt className="text-b2t-navy/50 text-xs">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div
          {...appear(8)}
          className={cn(
            appear(8).className,
            "bg-b2t-navy mt-2 rounded-full py-2.5 text-center text-sm font-semibold text-white",
          )}
        >
          Check and save
        </div>
      </Card>
    </div>
  );
}

function NetworkVisual() {
  const network = ["MK", "JT", "SR", "AL", "DP"];
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <svg viewBox="-170 -170 340 340" className="w-[78%] max-w-[22rem]" aria-hidden>
        <circle r="150" fill="none" stroke="#101827" strokeOpacity="0.12" strokeDasharray="2 5" />
        <circle r="82" fill="none" stroke="#101827" strokeOpacity="0.15" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 + 0.2;
          const r = 138 + (i % 3) * 10;
          return (
            <circle
              key={i}
              cx={Math.cos(a) * r}
              cy={Math.sin(a) * r}
              r="5"
              fill="#101827"
              className="animate-[fadeUp_0.5s_both] opacity-20"
              style={{ animationDelay: `${1200 + i * 40}ms` }}
            />
          );
        })}
        {network.map((n, i) => {
          const a = (i / network.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <g key={n} transform={`translate(${Math.cos(a) * 82} ${Math.sin(a) * 82})`}>
              <circle r="19" fill="#fff" stroke="#101827" strokeWidth="2" />
              <text textAnchor="middle" dy="4.5" fontSize="12" fontWeight="700" fill="#101827">
                {n}
              </text>
            </g>
          );
        })}
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
      <div
        style={appear(3).style}
        className={cn(appear(3).className, "flex flex-wrap justify-center gap-2")}
      >
        <span className="bg-b2t-navy rounded-full px-4 py-2 text-sm font-semibold text-white">
          Network only · 20 days
        </span>
        <span className="text-b2t-navy rounded-full bg-white px-4 py-2 text-sm font-semibold">
          Then public to tradies in range
        </span>
      </div>
    </div>
  );
}

/* ---------- content ---------- */

type Feature = {
  key: string;
  title: string;
  tag?: string;
  body: string;
  visual: () => ReactNode;
  /** Optional background photo (see image prompts); falls back to sand. */
  photo?: string;
};

const features: Feature[] = [
  {
    key: "autofill",
    title: "Upload plans. AI fills in the project.",
    tag: "AI",
    body: "Drop in your plans, engineering and reports. AI writes the project and fills in the trades, sub-trades and scopes for you to check. Prefer to do it yourself? Fill it in manually.",
    visual: AutofillVisual,
  },
  {
    key: "compare",
    title: "Compare quotes and pick the best tradie.",
    tag: "AI",
    body: "AI lines up every quote for a trade by price, reviews and start date, recommends the best one and tells you why. The result is saved so you can open it again any time.",
    visual: CompareVisual,
  },
  {
    key: "takeoff",
    title: "Takeoffs and material lists from your drawings.",
    tag: "Beta",
    body: "Floor area, walls, openings, roof and trade quantities, plus a bill of quantities with waste. Export it as a PDF.",
    visual: TakeoffVisual,
  },
  {
    key: "receipt",
    title: "Snap a receipt. The expense fills itself in.",
    tag: "AI",
    body: "Take a photo of a receipt and AI reads the supplier, amount and GST and adds it to the right project for you to check and save.",
    visual: ReceiptVisual,
  },
  {
    key: "network",
    title: "Your tradies first, then everyone.",
    body: "Publish to your network so only the tradies you pick see the plans and quote. After the days you choose, the job goes public to tradies in range.",
    visual: NetworkVisual,
  },
];

export function Spotlight() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts the progress bar
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % features.length), DURATION);
    return () => clearTimeout(id);
  }, [active, cycle, visible]);

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  const f = features[active];
  const Visual = f.visual;

  return (
    <section ref={ref} id="ai" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <Reveal className="max-w-3xl">
        <h2 className="font-display text-b2t-navy text-5xl leading-[0.95] md:text-7xl">
          Let B2T do the paperwork.
        </h2>
        <p className="text-b2t-navy/60 mt-6 max-w-xl text-lg font-medium">
          AI built into Build2Trade fills in most of the admin for you, so you spend less time
          typing and more time building.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-3 lg:grid-cols-[1fr_1.15fr] lg:gap-4">
        {/* Feature list */}
        <ol className="order-2 flex flex-col gap-2 lg:order-1">
          {features.map((feat, i) => {
            const on = i === active;
            return (
              <li key={feat.key}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-current={on}
                  className={cn(
                    "relative w-full overflow-hidden rounded-[22px] px-6 py-5 text-left transition-colors duration-300 md:px-7",
                    on ? "bg-b2t-navy text-white" : "bg-b2t-mist text-b2t-navy hover:bg-[#e7e9ec]",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg font-semibold md:text-xl">{feat.title}</span>
                    {feat.tag && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                          on ? "bg-b2t-yellow text-b2t-navy" : "bg-b2t-navy/10 text-b2t-navy",
                        )}
                      >
                        {feat.tag}
                      </span>
                    )}
                  </span>
                  {/* Only the active item shows its text: no height animation, so the
                      page never re-lays out frame by frame while someone scrolls. */}
                  {on && (
                    <span className="block animate-[fadeUp_0.45s_cubic-bezier(0.22,1,0.36,1)_both] pt-2 text-[15px] leading-relaxed text-white/70">
                      {feat.body}
                    </span>
                  )}
                  {on && (
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
                      <span
                        key={`${active}-${cycle}`}
                        className="bg-b2t-yellow block h-full origin-left"
                        style={{
                          animation: `spotlightBar ${DURATION}ms linear both`,
                          animationPlayState: visible ? "running" : "paused",
                        }}
                      />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
          <p className="text-b2t-navy/45 mt-3 px-1 text-xs leading-relaxed">
            Examples shown. AI can make mistakes, so check trades, quantities, specs and prices
            before you publish or send anything. Your files are only used to answer your request.
          </p>
        </ol>

        {/* Visual */}
        <div className="bg-b2t-sand relative order-1 flex min-h-[30rem] items-center justify-center overflow-hidden rounded-[28px] p-6 md:min-h-[36rem] lg:order-2">
          {f.photo && (
            <Image
              key={f.photo}
              src={f.photo}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="animate-[fadeUp_0.6s_both] object-cover"
            />
          )}
          <div key={f.key} className="relative flex w-full justify-center">
            <Visual />
          </div>
        </div>
      </div>
    </section>
  );
}
