/** Under the hero: what every member is checked for (Umano's logo row, but honest). */
const items = [
  { label: "ABN verified", d: "M4 12.5l5 5L20 6.5" },
  { label: "Trade licences checked", d: "M7 4h10v16H7zM10 9h4M10 13h4" },
  { label: "Insurance checked", d: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" },
  {
    label: "Made in Melbourne",
    d: "M12 21s-6-5.6-6-11a6 6 0 1112 0c0 5.4-6 11-6 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  },
];

export function Trust() {
  return (
    <section className="px-5 pt-16 pb-6 text-center md:pt-24">
      <p className="text-b2t-navy/55 text-sm">
        Every builder and tradie is checked before they can quote.
      </p>
      <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {items.map((it) => (
          <li
            key={it.label}
            className="text-b2t-navy flex items-center gap-2.5 text-base font-semibold md:text-lg"
          >
            <svg
              viewBox="0 0 24 24"
              className="text-b2t-navy/70 size-5"
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
