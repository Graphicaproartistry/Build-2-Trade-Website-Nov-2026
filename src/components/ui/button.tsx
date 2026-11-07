import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "light";

const styles: Record<Variant, string> = {
  /** Navy button: the default CTA (like Umano's black button). */
  primary: "bg-b2t-navy text-white hover:bg-[#1c2740]",
  /** Yellow button for use on navy/dark only. Text is always navy. */
  accent: "bg-b2t-yellow text-b2t-navy hover:bg-b2t-yellow-deep",
  outline: "border border-b2t-navy/15 text-b2t-navy hover:border-b2t-navy/40",
  light: "bg-white text-b2t-navy hover:bg-white/90",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
};

export function Button({ variant = "primary", size = "md", className, children, ...rest }: Props) {
  const external = typeof rest.href === "string" && /^https?:/.test(rest.href);
  return (
    <Link
      {...rest}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "focus-visible:outline-b2t-navy inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2",
        size === "md" ? "h-10 px-5 text-sm" : "h-12 px-7 text-[15px]",
        styles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
