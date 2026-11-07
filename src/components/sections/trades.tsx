import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

// The first nine trades appear in the app; the rest are common residential trades.
// TODO: confirm against the app's full trade picker.
const trades = [
  "Building surveyor",
  "Demolition",
  "Site hire",
  "Concrete slabs",
  "Basements",
  "In-ground pools",
  "Plumbing",
  "Electrical",
  "Crane truck services",
  "Carpentry",
  "Bricklaying",
  "Roofing",
  "Plastering",
  "Tiling",
  "Painting",
  "Glazing",
  "Waterproofing",
  "Landscaping",
  "Fencing",
  "Steel fabrication",
];

/**
 * "Find the right trade": every trade is a link to tradie sign-up. On hover a navy
 * fill rises from the bottom, the text turns white and an arrow slides in (all
 * transform/opacity, so it stays smooth). Keyboard focus gets the same treatment.
 */
export function Trades() {
  return (
    <section id="trades" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-b2t-navy max-w-[11ch] text-5xl leading-[0.95] md:text-8xl">
            Find the right trade.
          </h2>
          <p className="text-b2t-navy/60 mt-6 max-w-sm text-lg font-medium">
            Builders post the work. Tradies in every trade and sub-trade quote on it. Pick your
            trade to join as a tradie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.links.signUpTradie} size="lg">
              Sign up as a tradie
            </Button>
            <Button href={site.links.signIn} variant="outline" size="lg">
              Sign in
            </Button>
          </div>
        </div>

        <Reveal
          as="ul"
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4"
          stagger={0.025}
        >
          {trades.map((t) => (
            <li key={t}>
              <a
                href={site.links.signUpTradie}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Sign up as a tradie: ${t}`}
                className="group text-b2t-navy focus-visible:outline-b2t-navy relative flex h-full min-h-[3.75rem] items-center justify-between gap-2 overflow-hidden rounded-2xl bg-white px-4 py-3.5 ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgb(16_24_39/0.45)] focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {/* navy fill that rises on hover */}
                <span
                  aria-hidden
                  className="bg-b2t-navy absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />
                <span className="relative text-[15px] font-semibold transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                  {t}
                </span>
                <span
                  aria-hidden
                  className="bg-b2t-yellow text-b2t-navy relative grid size-7 shrink-0 -translate-x-2 place-items-center rounded-full opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12L12 4M6 4h6v6" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
