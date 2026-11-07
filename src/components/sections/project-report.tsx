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

/* ---------- A4 report page, modelled on the real Build2Trade PDF (example data) ---------- */
// Everything is sized in container-query units (cqw) so the page scales like a document.

const summary: [string, string, string, string][] = [
  ["Total Trades", "18", "All required trades", "#2563eb"],
  ["Hired Trades", "7", "Quote Accepted", "#16a34a"],
  ["Pending Trades", "11", "Awaiting action", "#d97706"],
  ["Budget / PO", "$412,000", "Total estimated", "#7c3aed"],
  ["Total Project Cost", "$421,820", "Budget / PO + expenses", "#7c3aed"],
  ["Accepted Quotes Total", "$286,450", "From accepted tradies, excl. GST", "#2563eb"],
  ["Total Expenses", "$9,820", "6 expenses recorded", "#ea580c"],
];

const expenses: [string, string, string?][] = [
  ["Total expenses", "$9,820.00", "#ea580c"],
  ["Number of expenses", "6"],
  ["Paid", "$9,320.00", "#16a34a"],
  ["Unpaid", "$500.00", "#dc2626"],
  ["General (no trade)", "$1,140.00"],
  ["Trades with expenses", "3"],
  ["Latest expense", "10 Nov 2026"],
];

const tradeBlocks = [
  {
    n: "01",
    name: "Building Surveyor",
    subs: ["Cost Of Works", "Building Permit"],
    start: "27 Apr 2026",
    end: "01 May 2026",
    budget: "$8,750",
    quoted: "$8,500",
    exp: "$0.00",
    tradie: "Coastal Certifiers",
  },
  {
    n: "02",
    name: "Concrete Slabs",
    subs: ["Waffle Pod Slab", "Grinded Finish", "Termite Barrier"],
    start: "04 May 2026",
    end: "30 May 2026",
    budget: "$48,000",
    quoted: "$46,200",
    exp: "$1,260.00",
    tradie: "Surf Coast Concrete",
  },
];

function Donut() {
  // Budget / PO, accepted quotes total, total expenses (example values)
  const parts = [
    [412000, "#2563eb"],
    [286450, "#16a34a"],
    [9820, "#ea580c"],
  ] as const;
  const total = parts.reduce((a, [v]) => a + v, 0);
  const r = 15.9155; // circumference 100
  let offset = 25;
  return (
    <svg viewBox="0 0 42 42" className="w-[46%]">
      {parts.map(([v, c]) => {
        const len = (v / total) * 100;
        const el = (
          <circle
            key={c}
            cx="21"
            cy="21"
            r={r}
            fill="none"
            stroke={c}
            strokeWidth="5"
            strokeDasharray={`${len} ${100 - len}`}
            strokeDashoffset={offset}
          />
        );
        offset -= len;
        return el;
      })}
      <text x="21" y="20.5" textAnchor="middle" fontSize="3.6" fontWeight="700" fill="#ea580c">
        $9,820.00
      </text>
      <text x="21" y="25" textAnchor="middle" fontSize="2.6" fill="#64748b">
        Expenses
      </text>
    </svg>
  );
}

function Panel({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[0.9cqw] border border-[#e2e8f0] p-[2cqw]">
      <p className="flex items-center gap-[1cqw] text-[1.55cqw] font-bold text-[#0f172a]">
        <span
          className="inline-block size-[1.6cqw] rounded-[0.3cqw] border-[0.25cqw]"
          style={{ borderColor: color }}
        />
        {title}
      </p>
      <div className="mt-[1.6cqw]">{children}</div>
    </div>
  );
}

function ReportPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem]" aria-hidden>
      <div className="relative">
        {/* page 2 peeking out behind */}
        <div className="absolute inset-x-[4%] top-3 -bottom-3 rounded-[3px] bg-white shadow-[0_10px_30px_-12px_rgb(16_24_39/0.25)] ring-1 ring-black/5" />
        <div
          className="@container relative aspect-[1/1.18] overflow-hidden rounded-[3px] bg-white font-[Arial,Helvetica,sans-serif] text-[#0f172a] shadow-[0_24px_60px_-24px_rgb(16_24_39/0.35)] ring-1 ring-black/5"
          style={{ containerType: "inline-size" }}
        >
          <div className="p-[3.6cqw]">
            {/* header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-[1.4cqw]">
                <span className="grid size-[5.5cqw] place-items-center rounded-[0.8cqw] bg-[#0f172a] text-[1.6cqw] font-bold text-[#fec124]">
                  B2T
                </span>
                <span className="text-[2.1cqw] font-bold">Build 2 Trade</span>
              </div>
              <div className="text-center">
                <p className="text-[2cqw] font-bold">PROJECT REPORT</p>
                <p className="text-[1.3cqw] text-[#64748b]">Generated: 12 Nov 2026 09:20</p>
              </div>
              <div className="text-right">
                <span className="ml-auto grid size-[5.5cqw] place-items-center rounded-full bg-[#e0f2fe] text-[1.5cqw] font-bold text-[#0369a1]">
                  CH
                </span>
                <p className="mt-[0.6cqw] text-[1.45cqw] font-bold">Coastline Homes</p>
              </div>
            </div>

            {/* project card */}
            <div className="mt-[2.4cqw] flex justify-between gap-[2cqw] rounded-[0.9cqw] border border-[#e2e8f0] p-[2.4cqw]">
              <div>
                <p className="text-[3.1cqw] font-bold">Harbour View Duplex</p>
                <span className="mt-[0.8cqw] inline-block rounded-full bg-[#dbeafe] px-[1.4cqw] py-[0.3cqw] text-[1.25cqw] font-bold text-[#1d4ed8]">
                  INPROGRESS
                </span>
                <p className="mt-[1cqw] text-[1.35cqw] text-[#334155]">
                  Lot 7, Ocean Grove VIC 3226
                </p>
                <p className="mt-[0.4cqw] text-[1.35cqw] text-[#334155]">
                  Construction of 2 double storey dwellings
                </p>
              </div>
              <dl className="w-[38%] space-y-[0.7cqw] border-l border-[#e2e8f0] pl-[2cqw] text-[1.3cqw]">
                {[
                  ["Estimated Start:", "27 Apr 2026"],
                  ["Status:", "inProgress"],
                  ["Created:", "20 Apr 2026"],
                  ["Updated:", "10 Nov 2026"],
                  ["Expenses:", "6"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-[#475569]">{k}</dt>
                    <dd className="font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* summary row */}
            <div className="mt-[2cqw] grid grid-cols-7 divide-x divide-[#e2e8f0] rounded-[0.9cqw] border border-[#e2e8f0] py-[1.8cqw] text-center">
              {summary.map(([k, v, sub, c]) => (
                <div key={k} className="px-[0.5cqw]">
                  <span
                    className="mx-auto block size-[3cqw] rounded-full"
                    style={{ background: `${c}1f`, boxShadow: `inset 0 0 0 0.35cqw ${c}` }}
                  />
                  <p className="mt-[0.8cqw] text-[1.1cqw] text-[#475569]">{k}</p>
                  <p
                    className="text-[1.9cqw] font-bold"
                    style={{ color: k === "Total Expenses" ? c : undefined }}
                  >
                    {v}
                  </p>
                  <p className="text-[0.95cqw] leading-tight text-[#94a3b8]">{sub}</p>
                </div>
              ))}
            </div>

            {/* three panels */}
            <div className="mt-[2cqw] grid grid-cols-3 gap-[1.6cqw]">
              <Panel title="PROJECT DETAILS" color="#2563eb">
                <div className="rounded-[0.6cqw] bg-[#f8fafc] p-[1.2cqw]">
                  <p className="text-[0.95cqw] text-[#64748b]">PROJECT TITLE</p>
                  <p className="text-[1.5cqw] font-bold">Harbour View Duplex</p>
                </div>
                <dl className="mt-[1.4cqw] space-y-[0.9cqw] text-[1.2cqw]">
                  {[
                    ["Status", "inProgress"],
                    ["Estimated Start", "27 Apr 2026"],
                    ["Created Date", "20 Apr 2026"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <dt className="text-[#475569]">{k}</dt>
                      <dd className="font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Panel>
              <Panel title="EXPENSES" color="#ea580c">
                <dl className="space-y-[0.85cqw] text-[1.2cqw]">
                  {expenses.map(([k, v, c]) => (
                    <div key={k} className="flex justify-between gap-[0.6cqw]">
                      <dt className="text-[#475569]">{k}</dt>
                      <dd className="font-bold" style={{ color: c }}>
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Panel>
              <Panel title="FINANCIAL OVERVIEW" color="#7c3aed">
                <div className="flex justify-center">
                  <Donut />
                </div>
                <ul className="mt-[1cqw] space-y-[0.5cqw] text-[1.1cqw]">
                  {[
                    ["Budget / PO", "$412,000", "#2563eb"],
                    ["Accepted Quotes Total", "$286,450", "#16a34a"],
                    ["Total Expenses", "$9,820", "#ea580c"],
                  ].map(([k, v, c]) => (
                    <li key={k} className="flex items-center justify-between gap-[0.6cqw]">
                      <span className="flex items-center gap-[0.6cqw] text-[#475569]">
                        <span className="size-[1cqw] rounded-full" style={{ background: c }} />
                        {k}
                      </span>
                      <span className="font-bold">{v}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>

            {/* trades */}
            <p className="mt-[2.4cqw] text-[1.6cqw] font-bold">TRADES &amp; SERVICES</p>
            <div className="mt-[1.2cqw] space-y-[1.4cqw]">
              {tradeBlocks.map((t) => (
                <div
                  key={t.n}
                  className="grid grid-cols-[1.6fr_1fr] gap-[2cqw] rounded-[0.9cqw] border border-[#e2e8f0] p-[2cqw]"
                >
                  <div>
                    <p className="flex items-center gap-[1cqw] text-[1.6cqw] font-bold">
                      <span className="rounded-[0.4cqw] bg-[#dbeafe] px-[0.7cqw] text-[#1d4ed8]">
                        {t.n}
                      </span>
                      {t.name}
                      <span className="rounded-full bg-[#dcfce7] px-[0.9cqw] text-[1.05cqw] font-bold text-[#15803d]">
                        hired
                      </span>
                    </p>
                    <div className="mt-[1.2cqw] grid grid-cols-2 gap-[1.5cqw] text-[1.15cqw]">
                      <div>
                        <p className="font-bold">Subtrades</p>
                        {t.subs.map((s) => (
                          <p key={s} className="text-[#475569]">
                            • {s}
                          </p>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-[0.8cqw]">
                        {[
                          ["Start Date", t.start],
                          ["End Date", t.end],
                          ["Budget", t.budget],
                          ["Quoted Amount", t.quoted],
                          ["Expenses", t.exp],
                        ].map(([k, v]) => (
                          <div key={k}>
                            <p className="text-[#64748b]">{k}</p>
                            <p
                              className="font-bold"
                              style={{ color: k === "Expenses" ? "#ea580c" : undefined }}
                            >
                              {v}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[0.8cqw] border border-[#e2e8f0] bg-[#f8fafc] p-[1.4cqw] text-[1.15cqw]">
                    <p className="text-[1cqw] font-bold text-[#64748b]">ACCEPTED TRADIE</p>
                    <p className="mt-[0.8cqw] font-bold">{t.tradie}</p>
                    <span className="mt-[0.9cqw] block h-[0.9cqw] w-[70%] rounded-full bg-[#e2e8f0]" />
                    <span className="mt-[0.6cqw] block h-[0.9cqw] w-[45%] rounded-full bg-[#e2e8f0]" />
                    <div className="mt-[1cqw] flex justify-between border-t border-[#e2e8f0] pt-[0.8cqw]">
                      <span className="text-[#64748b]">Quoted (excl. GST)</span>
                      <span className="font-bold">{t.quoted}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* fade the cut-off bottom of the page */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
      <div className="relative mt-8 flex items-center justify-center gap-2 text-sm font-semibold">
        <span className="text-b2t-navy/55">Download as</span>
        <span className="bg-b2t-navy rounded-md px-2.5 py-1 text-white">PDF</span>
        <span className="rounded-md bg-[#1d6f42] px-2.5 py-1 text-white">Excel</span>
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
