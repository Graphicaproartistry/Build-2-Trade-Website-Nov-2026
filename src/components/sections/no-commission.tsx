import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Tradies page: what sets Build2Trade apart from pay-per-lead job sites.
 * Confirmed by Build2Trade: no lead fees, no commission on work won, one flat subscription.
 */
const them = [
  "Pay for every lead, even the ones you don't win",
  "The same lead sold to several tradies at once",
  "Homeowners who are only shopping around for a price",
  "A fee or commission on the work you win",
];

const us = [
  "Fully B2B: real projects posted by builders",
  "No lead fees. Quote on as many jobs as you like",
  "No commission on the work you win, ever",
  `One flat price: $${site.pricing.monthly} a month or $${site.pricing.yearly} a year`,
];

function Mark({ ok }: { ok: boolean }) {
  return (
    <span
      aria-hidden
      className={
        ok
          ? "bg-b2t-yellow text-b2t-navy grid size-6 shrink-0 place-items-center rounded-full"
          : "grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-white/55"
      }
    >
      <svg
        viewBox="0 0 12 12"
        className="size-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        {ok ? <path d="M2.5 6.2l2.2 2.2L9.5 3.6" /> : <path d="M3 3l6 6M9 3l-6 6" />}
      </svg>
    </span>
  );
}

export function NoCommission() {
  return (
    <section id="no-commission" className="px-1.5 md:px-2">
      <div className="bg-b2t-navy rounded-[28px] px-5 py-16 text-white md:rounded-[44px] md:px-12 md:py-24 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal className="min-w-0">
            <p className="bg-b2t-yellow text-b2t-navy inline-flex rounded-full px-3 py-1 text-sm font-semibold">
              Why tradies choose Build2Trade
            </p>
            <h2 className="font-display mt-6 text-5xl leading-[0.95] md:text-7xl">
              No lead fees. No commission. Ever.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
              Lead sites make money every time you get a lead or win a job. We don&apos;t. You pay
              one flat subscription and keep everything you earn.
            </p>
            <div className="mt-10 flex items-end gap-4 sm:gap-6">
              <p>
                <span className="font-display text-[2.25rem] sm:text-6xl md:text-7xl">
                  ${site.pricing.monthly}
                </span>
                <span className="mt-1 block text-sm font-semibold text-white/60">a month</span>
              </p>
              <p className="pb-6 text-white/40">or</p>
              <p>
                <span className="font-display text-[2.25rem] sm:text-6xl md:text-7xl">
                  ${site.pricing.yearly}
                </span>
                <span className="mt-1 block text-sm font-semibold text-white/60">a year</span>
              </p>
            </div>
            <p className="mt-4 text-sm font-medium text-white/55">
              That&apos;s it. Every tradie feature, unlimited quotes, web and app.
            </p>
            <div className="mt-8">
              <Button href={site.links.signUpTradie} variant="accent" size="lg" arrow>
                Sign up as a tradie
              </Button>
            </div>
          </Reveal>

          <Reveal className="grid min-w-0 content-start gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-[24px] bg-white/[0.04] p-6 ring-1 ring-white/10 md:p-7">
              <p className="text-sm font-semibold tracking-wide text-white/55 uppercase">
                Pay-per-lead sites
              </p>
              <ul className="mt-5 space-y-4">
                {them.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-snug text-white/60">
                    <Mark ok={false} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] bg-white/[0.09] p-6 ring-1 ring-white/25 md:p-7">
              <p className="text-b2t-yellow text-sm font-semibold tracking-wide uppercase">
                Build2Trade
              </p>
              <ul className="mt-5 space-y-4">
                {us.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-snug font-medium">
                    <Mark ok />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
