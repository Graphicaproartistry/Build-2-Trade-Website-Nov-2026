import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Yellow page header panel (same language as the home hero), centred headline. */
export function PageHero({
  title,
  sub,
  children,
  className,
}: {
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className="p-1.5 pb-0 md:p-2 md:pb-0">
      <div
        className={cn(
          "bg-b2t-yellow flex flex-col items-center rounded-[28px] px-5 pt-32 pb-16 text-center md:rounded-[44px] md:pt-40 md:pb-24",
          className,
        )}
      >
        <h1 className="font-display text-b2t-navy max-w-[15ch] text-[12vw] leading-[0.95] md:text-7xl lg:text-8xl">
          {title}
        </h1>
        {sub && (
          <p className="text-b2t-navy/75 mt-6 max-w-2xl text-lg font-semibold md:text-xl">{sub}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </header>
  );
}
