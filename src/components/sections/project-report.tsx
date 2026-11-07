import { Reveal } from "@/components/ui/reveal";

/**
 * Project reports (PDF and Excel), based on what the real Build2Trade project report
 * contains. The report preview is drawn in code with made-up example data.
 */

const points = [
  {
    title: "Hired tradies and their quotes",
    body: "Every trade with the tradie you hired and their quoted amount (excl. GST), plus the trades still waiting on a quote.",
    icon: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0",
  },
  {
    title: "What the job is costing",
    body: "Budget or PO, the accepted quotes total, and the total project cost with expenses added in.",
    icon: "M12 3v18M17 7H9.5a3 3 0 000 6h5a3 3 0 010 6H6",
  },
  {
    title: "Every expense, itemised",
    body: "Date, item, category, supplier, quantity and unit price, paid or unpaid, with totals by trade.",
    icon: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  },
  {
    title: "Schedules and scope",
    body: "Start and end dates, budget and sub-trades for every trade, and which ones are hired or still pending.",
    icon: "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4",
  },
];

const stats = [
  ["Total trades", "18"],
  ["Hired", "7"],
  ["Pending", "11"],
  ["Budget / PO", "$412,000"],
  ["Accepted quotes", "$286,450"],
  ["Expenses", "$9,820"],
];

const trades = [
  ["Building Surveyor", "Hired", "27 Apr – 1 May", "$8,500"],
  ["Concrete Slabs", "Hired", "4 – 30 May", "$46,200"],
  ["Roof Plumbing", "Hired", "14 – 19 Sep", "$38,900"],
  ["Plumbing", "Pending", "30 Sep – 15 Oct", "–"],
];

function ReportPreview() {
  return (
    <div className="group relative mx-auto w-full max-w-[34rem]" aria-hidden>
      {/* second sheet behind */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-[18px] bg-white/70 ring-1 ring-black/5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-5 group-hover:rotate-3" />
      <div className="text-b2t-navy relative -rotate-1 rounded-[18px] bg-white p-5 shadow-[0_30px_60px_-30px_rgb(16_24_39/0.45)] ring-1 ring-black/5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-b2t-navy/45 text-[10px] font-semibold tracking-[0.14em]">
              BUILD2TRADE · PROJECT REPORT
            </p>
            <p className="font-display mt-2 text-2xl md:text-3xl">Harbour View Duplex</p>
            <p className="text-b2t-navy/55 mt-1 text-xs">
              Ocean Grove VIC · Construction of 2 dwellings
            </p>
          </div>
          <span className="bg-b2t-yellow shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold">
            In progress
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-1.5">
          {stats.map(([k, v]) => (
            <div key={k} className="bg-b2t-mist rounded-xl px-3 py-2.5">
              <dt className="text-b2t-navy/55 text-[10px] font-semibold">{k}</dt>
              <dd className="mt-0.5 text-sm font-semibold tabular-nums md:text-base">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="text-b2t-navy/45 mt-5 text-[10px] font-semibold tracking-[0.14em]">
          TRADES &amp; SERVICES
        </p>
        <ul className="mt-2 divide-y divide-black/5 text-xs md:text-[13px]">
          {trades.map(([t, status, dates, quote]) => (
            <li key={t} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-2">
              <span className="truncate font-semibold">{t}</span>
              <span className="text-b2t-navy/55 hidden tabular-nums sm:inline">{dates}</span>
              <span className="flex items-center gap-2">
                <span
                  className={
                    status === "Hired"
                      ? "rounded-full bg-[#e6f4ea] px-2 py-0.5 text-[10px] font-semibold text-[#1b6b35]"
                      : "rounded-full bg-[#fff4d6] px-2 py-0.5 text-[10px] font-semibold text-[#8a6100]"
                  }
                >
                  {status}
                </span>
                <span className="w-16 text-right font-semibold tabular-nums">{quote}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4">
          <p className="text-b2t-navy/55 text-[11px]">Expenses: $9,320 paid · $500 unpaid</p>
          <div className="flex gap-1.5">
            <span className="bg-b2t-navy rounded-full px-3 py-1.5 text-[11px] font-semibold text-white">
              PDF
            </span>
            <span className="rounded-full bg-[#1d6f42] px-3 py-1.5 text-[11px] font-semibold text-white">
              Excel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectReport({ title = "Every job, in one report." }: { title?: string }) {
  return (
    <section id="reports" className="px-5 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <p className="bg-b2t-navy mb-6 inline-flex rounded-full px-3 py-1 text-sm font-semibold text-white">
            For builders
          </p>
          <h2 className="font-display text-b2t-navy max-w-[13ch] text-5xl leading-[0.95] md:text-8xl">
            {title}
          </h2>
          <p className="text-b2t-navy/60 mt-6 max-w-lg text-lg font-medium">
            Download a project report as a PDF or an Excel file: hired tradies and their quotes,
            budget against spend, every expense and every trade&apos;s schedule. Ready for your
            client, your accountant or your next site meeting.
          </p>
          <Reveal as="ul" className="mt-10 grid gap-6 sm:grid-cols-2" stagger={0.06}>
            {points.map((p) => (
              <li key={p.title}>
                <svg
                  viewBox="0 0 24 24"
                  className="text-b2t-navy size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d={p.icon} />
                </svg>
                <h3 className="text-b2t-navy mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="text-b2t-navy/60 mt-1.5 text-[15px] leading-relaxed">{p.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
        <Reveal>
          <ReportPreview />
        </Reveal>
      </div>
    </section>
  );
}
