/** Straight after the hero: the "Australia's first" claim in big type, then the trust strip. */
const items = [
  {
    label: "Made in Australia, for Australian builders and trades",
    d: "M12 21s-6-5.6-6-11a6 6 0 1112 0c0 5.4-6 11-6 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  },
  { label: "ABN-verified businesses", d: "M4 12.5l5 5L20 6.5" },
  { label: "GST handled on every quote and invoice", d: "M7 3h10l3 3v15H4V3zM8 11h8M8 15h5" },
  { label: "Web + iPhone + Android", d: "M3 4h18v12H3zM9 20h6M12 16v4" },
];

export function Trust() {
  return (
    <section className="px-5 pt-20 pb-6 md:pt-32">
      <h2 className="font-display text-b2t-navy mx-auto max-w-[20ch] text-center text-[10.5vw] leading-[0.95] md:text-8xl">
        Australia&apos;s first digital networking platform for builders, tradies &amp; suppliers.
      </h2>
      <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-5 md:mt-16">
        {items.map((it) => (
          <li
            key={it.label}
            className="text-b2t-navy flex items-center gap-2.5 text-base font-semibold md:text-lg"
          >
            <svg
              viewBox="0 0 24 24"
              className="text-b2t-navy/70 size-5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d={it.d} />
            </svg>
            {it.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
