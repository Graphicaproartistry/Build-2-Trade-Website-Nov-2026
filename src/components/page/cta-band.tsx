import type { ReactNode } from "react";

/** Navy rounded closing panel with a big headline and buttons. */
export function CtaBand({
  title,
  sub,
  children,
}: {
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="px-1.5 pb-1.5 md:px-2 md:pb-2">
      <div className="bg-b2t-navy rounded-[28px] px-5 py-20 text-center text-white md:rounded-[44px] md:py-28">
        <h2 className="font-display mx-auto max-w-[16ch] text-5xl leading-[0.95] md:text-8xl">
          {title}
        </h2>
        {sub && <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">{sub}</p>}
        {children && <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
