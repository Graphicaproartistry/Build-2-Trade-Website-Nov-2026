import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  // Yellow CTA: text is always navy (10.9:1).
  primary:
    "bg-b2t-yellow text-b2t-navy hover:bg-b2t-yellow-deep shadow-[0_1px_0_rgb(255_255_255/0.35)_inset]",
  ghost: "border border-white/15 text-white hover:border-white/35 hover:bg-white/5",
  light: "border border-b2t-navy/15 text-b2t-navy hover:border-b2t-navy/40",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
};

export function Button({ variant = "primary", size = "md", className, children, ...rest }: Props) {
  const external = typeof rest.href === "string" && /^(https?:|mailto:|tel:)/.test(rest.href);
  return (
    <Link
      {...rest}
      {...(external && String(rest.href).startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "focus-visible:outline-b2t-yellow inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2",
        size === "md" ? "h-10 px-5 text-sm" : "h-12 px-7 text-[15px]",
        styles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
