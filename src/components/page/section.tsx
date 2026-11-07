import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Standard page section with an optional big headline and intro. */
export function Section({
  title,
  intro,
  children,
  className,
  center = false,
  id,
}: {
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  center?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-20 md:px-12 md:py-28 lg:px-20", className)}>
      {(title || intro) && (
        <div className={cn("mb-12 max-w-3xl md:mb-16", center && "mx-auto text-center")}>
          {title && (
            <h2 className="font-display text-b2t-navy text-5xl leading-[0.95] md:text-7xl">
              {title}
            </h2>
          )}
          {intro && <p className="text-b2t-navy/60 mt-5 text-lg font-medium">{intro}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

/** Grid of simple feature cards (title + copy). */
export function Cards({
  items,
  cols = 3,
  tone = "white",
}: {
  items: { title: string; body: ReactNode }[];
  cols?: 2 | 3;
  tone?: "white" | "sand";
}) {
  return (
    <ul
      className={cn("grid gap-3", cols === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2")}
    >
      {items.map((it) => (
        <li
          key={it.title}
          className={cn(
            "rounded-[24px] p-7 md:p-8",
            tone === "white" ? "bg-white ring-1 ring-black/5" : "bg-b2t-sand",
          )}
        >
          <h3 className="text-b2t-navy text-xl font-semibold">{it.title}</h3>
          <div className="text-b2t-navy/65 mt-3 text-[15px] leading-relaxed">{it.body}</div>
        </li>
      ))}
    </ul>
  );
}

/** Numbered steps with a hairline between them. */
export function Steps({ items }: { items: { title: string; body: ReactNode }[] }) {
  return (
    <ol className="divide-b2t-navy/10 border-b2t-navy/10 divide-y border-y">
      {items.map((s, i) => (
        <li
          key={s.title}
          className="grid grid-cols-[3rem_1fr] gap-4 py-8 md:grid-cols-[6rem_1fr] md:py-10"
        >
          <span className="font-display text-b2t-navy/30 text-4xl md:text-6xl">{i + 1}</span>
          <div>
            <h3 className="text-b2t-navy text-2xl font-semibold md:text-3xl">{s.title}</h3>
            <div className="text-b2t-navy/65 mt-3 max-w-2xl text-base leading-relaxed md:text-lg">
              {s.body}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Simple bullet list with a navy tick. */
export function TickList({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((it, i) => (
        <li key={i} className="text-b2t-navy flex gap-3 text-base font-medium md:text-lg">
          <svg viewBox="0 0 20 20" className="mt-1 size-5 shrink-0" aria-hidden>
            <path
              d="M5 10.5l3 3 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
