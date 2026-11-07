import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Supplier Marketplace: suppliers list products; builders and tradies browse by
 * supplier and state, add items to a quote list and get prices from the supplier.
 * Product visuals are simple line drawings (no third-party brands).
 */
const products = [
  {
    name: "Perforated acoustic ceiling panel",
    price: 100,
    was: 173.29,
    supplier: "Harbour City Building Supplies",
    state: "NSW",
    art: (
      <g>
        <path d="M20 70 L80 40 L140 70 L80 100 Z" />
        {Array.from({ length: 18 }).map((_, i) => {
          const x = 40 + (i % 6) * 14 + Math.floor(i / 6) * 6;
          const y = 62 + Math.floor(i / 6) * 9 - (i % 6) * 4;
          return <circle key={i} cx={x} cy={y} r="1.6" />;
        })}
      </g>
    ),
  },
  {
    name: "Stud adhesive, 5.2 kg tub",
    price: 20,
    was: 29,
    supplier: "Westside Plaster & Trade",
    state: "VIC",
    art: (
      <g>
        <ellipse cx="80" cy="38" rx="34" ry="8" />
        <path d="M46 38 L52 102 Q80 112 108 102 L114 38" />
        <path d="M48 50 Q80 60 112 50" />
        <path d="M52 30 Q80 6 108 30" />
      </g>
    ),
  },
  {
    name: "Cornice adhesive, 20 kg bag",
    price: 25,
    was: 48,
    supplier: "Westside Plaster & Trade",
    state: "VIC",
    art: (
      <g>
        <path d="M56 26 L104 26 L110 106 L50 106 Z" />
        <path d="M56 26 L60 18 L100 18 L104 26" />
        <path d="M62 50 L98 50 M62 58 L90 58" />
        <rect x="64" y="70" width="32" height="22" rx="3" />
      </g>
    ),
  },
];

const fmt = (n: number) => `$${n.toFixed(2)}`;

export function Marketplace() {
  return (
    <section id="marketplace" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-b2t-navy text-5xl leading-[0.95] md:text-7xl">
          A marketplace for building supplies.
        </h2>
        <p className="text-b2t-navy/60 mx-auto mt-6 max-w-xl text-lg font-medium">
          Suppliers list their products. Builders and tradies browse, add items to a quote list and
          get prices straight from the supplier.
        </p>
      </Reveal>

      <Reveal className="mt-14 grid gap-3 md:grid-cols-3" stagger={0.08}>
        {products.map((p) => (
          <article
            key={p.name}
            className="overflow-hidden rounded-[28px] bg-white ring-1 ring-black/5"
          >
            <div className="bg-b2t-sand relative flex aspect-[4/3] items-center justify-center">
              <svg
                viewBox="0 0 160 120"
                className="text-b2t-navy h-3/4 w-3/4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                aria-hidden
              >
                {p.art}
              </svg>
              <span className="text-b2t-navy absolute top-4 left-4 rounded-full bg-white px-2.5 py-1 text-xs font-semibold">
                Sale
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-b2t-navy text-lg leading-snug font-semibold">{p.name}</h3>
              <p className="text-b2t-navy mt-3 text-xl font-semibold">
                {fmt(p.price)} + GST{" "}
                <span className="text-b2t-navy/40 text-sm font-medium line-through">
                  {fmt(p.was)}
                </span>
              </p>
              <p className="text-b2t-navy/55 text-sm">{fmt(p.price * 1.1)} incl. GST</p>
              <p className="text-b2t-navy/55 mt-4 text-sm">
                by <span className="text-b2t-navy font-medium">{p.supplier}</span> · {p.state}
              </p>
              <div className="bg-b2t-yellow text-b2t-navy mt-5 rounded-full py-2.5 text-center text-sm font-semibold">
                Add to quote list
              </div>
            </div>
          </article>
        ))}
      </Reveal>

      <div className="mt-16 grid gap-3 md:mt-20 md:grid-cols-2">
        {[
          {
            who: "For suppliers",
            title: "Sell to builders who are already buying.",
            steps: [
              "List your products with prices and specials",
              "Get quote requests from live projects",
              "Send quotes and invoices from one place",
            ],
            cta: "List your products",
          },
          {
            who: "For builders and tradies",
            title: "Get materials priced without the phone calls.",
            steps: [
              "Browse products by supplier and state",
              "Add items to a quote list for your project",
              "Compare supplier quotes and keep invoices on the job",
            ],
            cta: "Browse the marketplace",
          },
        ].map((c) => (
          <Reveal key={c.who}>
            <div className="bg-b2t-mist h-full rounded-[28px] p-7 md:p-10">
              <p className="text-b2t-navy/55 text-sm font-semibold">{c.who}</p>
              <h3 className="font-display text-b2t-navy mt-4 max-w-[18ch] text-3xl leading-tight md:text-4xl">
                {c.title}
              </h3>
              <ol className="mt-8 space-y-3">
                {c.steps.map((s, i) => (
                  <li key={s} className="text-b2t-navy flex items-center gap-3 font-medium">
                    <span className="bg-b2t-navy grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <Button href={site.links.signUp} className="mt-9">
                {c.cta}
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
