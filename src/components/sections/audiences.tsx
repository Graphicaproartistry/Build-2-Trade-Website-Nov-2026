import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

const audiences = [
  {
    who: "For Builders",
    href: "/builders",
    body: "Post your project once and get quotes from local tradies who actually do that trade. Compare, hire, schedule and track costs on every job.",
    cta: "See how it works for builders",
  },
  {
    who: "For Tradies",
    href: "/tradies",
    body: "See real projects near you that match your trade. Send a quote in minutes, win the work, get paid, and build your reputation with reviews.",
    cta: "See how it works for tradies",
  },
  {
    who: "For Suppliers",
    href: "/suppliers",
    body: "Get in front of builders and tradies the moment they need materials. Receive quote requests, send quotes, invoice and deliver, and sell from your own online shop.",
    cta: "See how it works for suppliers",
  },
];

const steps = [
  ["Post the project.", "Add the trades you need, the scope and your plans."],
  ["Get quotes.", "Local tradies with the right trade see it and send quotes."],
  ["Hire and schedule.", "Pick a quote, hire in one tap, and every trade lands on the calendar."],
  [
    "Supply and finish.",
    "Order materials from suppliers, track costs, get invoiced and leave a review.",
  ],
];

/** Dark panel: the three audiences, then the short version of how it works. */
export function Audiences() {
  return (
    <section className="px-1.5 md:px-2">
      <div className="bg-b2t-navy rounded-[28px] px-5 py-20 text-white md:rounded-[44px] md:px-12 md:py-28 lg:px-20">
        <h2 className="font-display max-w-[14ch] text-5xl leading-[0.95] md:text-8xl">
          One place for everyone on the job.
        </h2>

        <Reveal className="mt-14 grid gap-3 md:mt-20 md:grid-cols-3" stagger={0.08}>
          {audiences.map((a) => (
            <Link
              key={a.who}
              href={a.href}
              className="group flex flex-col rounded-[24px] bg-white/[0.06] p-7 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1] md:p-9"
            >
              <h3 className="font-display text-3xl md:text-4xl">{a.who}</h3>
              <p className="mt-4 leading-relaxed text-white/65">{a.body}</p>
              <span className="text-b2t-yellow mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                {a.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </Reveal>

        <div className="mt-24 grid gap-10 md:mt-32 md:grid-cols-[1fr_1.6fr] md:gap-20">
          <div>
            <h2 className="font-display text-4xl leading-[0.98] md:text-6xl">How it works</h2>
            <Link
              href="/how-it-works"
              className="text-b2t-yellow mt-6 inline-flex items-center gap-2 font-semibold"
            >
              See the full walkthrough →
            </Link>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {steps.map(([t, b], i) => (
              <li
                key={t}
                className="group relative grid grid-cols-[2.5rem_1fr] gap-4 py-6 md:grid-cols-[4rem_1fr] md:py-8"
              >
                {/* yellow shade that sweeps in from the left, plus an edge bar */}
                <span
                  aria-hidden
                  className="from-b2t-yellow/20 via-b2t-yellow/[0.06] pointer-events-none absolute inset-y-1 -right-2 -left-4 origin-left scale-x-0 rounded-2xl bg-gradient-to-r to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 md:-left-6"
                />
                <span
                  aria-hidden
                  className="bg-b2t-yellow pointer-events-none absolute inset-y-5 -left-4 w-[3px] origin-center scale-y-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 md:-left-6"
                />
                <span className="font-display group-hover:text-b2t-yellow relative text-3xl text-white/40 transition-colors duration-300 md:text-4xl">
                  {i + 1}
                </span>
                <div className="relative transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                  <h3 className="text-xl font-semibold md:text-2xl">{t}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-white/60">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
