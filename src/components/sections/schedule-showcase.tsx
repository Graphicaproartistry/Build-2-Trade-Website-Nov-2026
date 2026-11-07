import { Reveal } from "@/components/ui/reveal";

/**
 * Schedule: calendar and Gantt chart for every trade (from the builder dashboard).
 * The board is drawn in code with made-up example data.
 */

const stats = [
  ["Scheduled today", "3"],
  ["This week", "9"],
  ["Overdue / delayed", "2"],
  ["Hired tradies", "14"],
];

// [trade, tradie, start week (0-4), length in weeks, state]
const rows: [string, string, number, number, "on" | "late" | "none"][] = [
  ["Building Surveyor", "Coastal Certifiers", 0, 0.8, "on"],
  ["Demolition", "Bayside Demo", 0.4, 1, "on"],
  ["Concrete Slabs", "Surf Coast Concrete", 1.2, 1.4, "late"],
  ["Framing", "Tradie not assigned", 2.4, 1.2, "none"],
  ["Roof Plumbing", "Geelong Roofing", 3.2, 0.8, "on"],
];

const barColour = { on: "bg-b2t-navy", late: "bg-[#e0a50f]", none: "bg-b2t-navy/20" };

const points = [
  "Calendar and Gantt chart views of every trade",
  "See what's scheduled today, this week and what's overdue or delayed",
  "Filter by postcode, trade, tradie or status, or search",
  "Spot trades with no tradie assigned before they hold up the job",
  "Reminders go out before the project and each trade starts",
];

export function ScheduleShowcase() {
  return (
    <section id="schedule" className="px-5 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <h2 className="font-display text-b2t-navy max-w-[12ch] text-5xl leading-[0.95] md:text-8xl">
            Every trade, on time.
          </h2>
          <p className="text-b2t-navy/60 mt-6 max-w-lg text-lg font-medium">
            Your whole schedule in one place, across every project. Switch between the calendar and
            the Gantt chart and see straight away what&apos;s on and what&apos;s running late.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="text-b2t-navy flex gap-3 font-medium">
                <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0" aria-hidden>
                  <path
                    d="M5 10.5l3 3 7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <div
            className="text-b2t-navy rounded-[24px] bg-white p-5 shadow-[0_30px_60px_-30px_rgb(16_24_39/0.35)] ring-1 ring-black/5 md:p-7"
            aria-label="Example schedule board"
            role="img"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">Schedule</p>
              <div className="bg-b2t-mist flex rounded-full p-1 text-xs font-semibold">
                <span className="text-b2t-navy/55 px-3 py-1.5">Calendar</span>
                <span className="bg-b2t-navy rounded-full px-3 py-1.5 text-white">Gantt chart</span>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {stats.map(([k, v]) => (
                <div key={k} className="bg-b2t-mist rounded-xl px-3 py-2.5">
                  <dt className="text-b2t-navy/55 text-[10px] font-semibold">{k}</dt>
                  <dd className="mt-0.5 text-lg font-semibold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-wrap gap-1.5 text-[11px] font-semibold">
              {["Postcode", "Trade", "Tradie", "Status"].map((f) => (
                <span key={f} className="rounded-full px-3 py-1.5 ring-1 ring-black/10">
                  {f} ▾
                </span>
              ))}
            </div>

            {/* Gantt */}
            <div className="mt-5">
              <div className="text-b2t-navy/45 grid grid-cols-[7.5rem_1fr] gap-3 text-[10px] font-semibold sm:grid-cols-[9.5rem_1fr]">
                <span />
                <span className="grid grid-cols-4">
                  {["Week 1", "Week 2", "Week 3", "Week 4"].map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </span>
              </div>
              <ul className="mt-2 space-y-2">
                {rows.map(([trade, tradie, start, len, state]) => (
                  <li
                    key={trade}
                    className="grid grid-cols-[7.5rem_1fr] items-center gap-3 sm:grid-cols-[9.5rem_1fr]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold">{trade}</span>
                      <span
                        className={
                          state === "none"
                            ? "block truncate text-[10px] font-semibold text-[#b42318]"
                            : "text-b2t-navy/50 block truncate text-[10px]"
                        }
                      >
                        {tradie}
                      </span>
                    </span>
                    <span className="bg-b2t-mist relative h-6 rounded-full">
                      <span
                        className={`absolute inset-y-1 rounded-full ${barColour[state]}`}
                        style={{ left: `${(start / 4) * 100}%`, width: `${(len / 4) * 100}%` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-b2t-navy/55 mt-4 flex flex-wrap gap-4 text-[10px] font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="bg-b2t-navy size-2 rounded-full" /> On track
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#e0a50f]" /> Delayed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="bg-b2t-navy/20 size-2 rounded-full" /> No tradie yet
                </span>
                <span className="ml-auto">Example</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
