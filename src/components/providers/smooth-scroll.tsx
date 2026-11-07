"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger
 * scrub animations (scroll-video, laptop open/close) stay in sync.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    // Late layout changes (web fonts, images) move sections around: recalculate once
    // they settle so pinned sections start and end in the right place.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
      window.removeEventListener("load", refresh);
    };
  }, []);

  // New page: jump to the top and recalculate scroll triggers for the new layout.
  const pathname = usePathname();
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, anchors: true }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
