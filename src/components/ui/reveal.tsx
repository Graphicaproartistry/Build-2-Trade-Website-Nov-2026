"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Blur-in reveal when the element enters the viewport (once).
 * Direct children stagger in. Reduced motion: a plain fade.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  stagger = 0.08,
  delay = 0,
  y = 28,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.children.length ? Array.from(el.children) : [el];
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Blur is costly on phones, so they get a plain fade-up.
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const from = reduce
        ? { opacity: 0 }
        : mobile
          ? { opacity: 0, y }
          : { opacity: 0, y, filter: "blur(10px)" };
      gsap.fromTo(items, from, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: reduce ? 0.4 : 1.1,
        ease: "expo.out",
        stagger,
        delay,
        clearProps: "filter,transform",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
