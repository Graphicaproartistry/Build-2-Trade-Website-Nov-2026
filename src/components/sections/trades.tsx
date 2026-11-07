import { Reveal } from "@/components/ui/reveal";

// Common residential trades. TODO: replace with the exact list from the app's trade picker.
const trades = [
  "Bricklaying",
  "Building surveying",
  "Cabinet making",
  "Carpentry",
  "Concreting",
  "Crane & truck hire",
  "Demolition",
  "Electrical",
  "Excavation",
  "Fencing",
  "Glazing",
  "Landscaping",
  "Painting",
  "Plastering",
  "Plumbing",
  "Roofing",
  "Scaffolding",
  "Steel fabrication",
  "Tiling",
  "Waterproofing",
];

/** Text-only trades list (no video). */
export function Trades() {
  return (
    <section id="trades" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <Reveal className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <div>
          <h2 className="font-display text-b2t-navy max-w-[11ch] text-5xl leading-[0.95] md:text-7xl">
            Find the right trade.
          </h2>
          <p className="text-b2t-navy/60 mt-6 max-w-sm text-lg font-medium">
            Builders post the work. Tradies in every trade and sub-trade quote on it.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-2 self-end sm:grid-cols-3 lg:grid-cols-4">
          {trades.map((t) => (
            <li
              key={t}
              className="text-b2t-navy rounded-2xl bg-white px-4 py-3.5 text-[15px] font-semibold ring-1 ring-black/5"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
