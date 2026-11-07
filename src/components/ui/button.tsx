import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "light";

/**
 * Hover: a fill rises from the bottom (transform only, so it stays smooth), the label
 * changes colour where needed, the button lifts a little, and an optional arrow slides
 * in. Press: a small squeeze. Keyboard focus gets the same treatment as hover.
 */
const styles: Record<Variant, { base: string; fill: string; text: string }> = {
  /** Navy button (default CTA). */
  primary: { base: "bg-b2t-navy text-white", fill: "bg-[#25324f]", text: "" },
  /** Yellow button, for navy backgrounds. Text is always navy. */
  accent: { base: "bg-b2t-yellow text-b2t-navy", fill: "bg-white", text: "" },
  /** Outline: fills navy and the label turns white. */
  outline: {
    base: "text-b2t-navy ring-1 ring-inset ring-b2t-navy/20",
    fill: "bg-b2t-navy",
    text: "group-hover:text-white group-focus-visible:text-white",
  },
  /** White button: fills yellow. */
  light: { base: "bg-white text-b2t-navy", fill: "bg-b2t-yellow", text: "" },
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: "md" | "lg";
  /** Show an arrow that slides in on hover. */
  arrow?: boolean;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: Props) {
  const external = typeof rest.href === "string" && /^https?:/.test(rest.href);
  const v = styles[variant];
  return (
    <Link
      {...rest}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight whitespace-nowrap",
        "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgb(16_24_39/0.55)] focus-visible:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        "focus-visible:outline-b2t-navy focus-visible:outline-2 focus-visible:outline-offset-2",
        size === "md" ? "h-10 px-5 text-sm" : "h-12 px-7 text-[15px]",
        v.base,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-[inherit] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100",
          v.fill,
        )}
      />
      <span className={cn("relative transition-colors duration-300", v.text)}>{children}</span>
      {arrow && (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn(
            "relative -ml-1 size-4 -translate-x-1.5 opacity-0 transition-[transform,opacity,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
            v.text,
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      )}
    </Link>
  );
}
