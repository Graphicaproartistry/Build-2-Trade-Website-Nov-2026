import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TradeGrid } from "@/components/sections/trade-grid";

// Trade names as they appear in the app (trade list export, Nov 2026).
// The most-used trades show first; the rest open with "See all trades".
const featured = [
  "Building surveyor",
  "Demolition",
  "Timber & hardware",
  "Site hire",
  "Concrete slabs",
  "Basement",
  "In-ground pools",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Brickwork",
  "Roof plumbing",
  "Roof tiling",
  "Plaster",
  "Tiling",
  "Painting",
  "Waterproofing",
  "Landscaping",
  "Fencing & gates",
  "Crane truck services",
];

const more = [
  "Site set out",
  "Pest control",
  "Prefab wall & roof systems",
  "Structural steel",
  "Windows",
  "External cladding",
  "Brick wash",
  "Render",
  "Scaffolding",
  "External features",
  "Garage door",
  "External blinds",
  "Stumpers",
  "Insulation",
  "Under floor heating",
  "Concrete grinding",
  "Heating & cooling",
  "Stairs",
  "Cabinetry",
  "Bench tops",
  "Screeding",
  "Self level",
  "Timber flooring",
  "Sand & polish",
  "Internal & external finishers",
  "Carpet",
  "Caulking",
  "Flyscreens",
  "Blinds",
  "Paving",
  "Concrete cutting",
  "General builders clean",
  "General maintenance",
  "Labour hire",
  "Bin hire",
  "Fire rated wall systems",
  "Truck & machine hire",
  "Tree removal services",
  "Site signage",
  "Concrete resurfacing",
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

        <Reveal>
          <TradeGrid featured={featured} more={more} href={site.links.signUpTradie} />
        </Reveal>
      </div>
    </section>
  );
}
