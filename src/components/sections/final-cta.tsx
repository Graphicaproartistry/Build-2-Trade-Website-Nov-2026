"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/** Closing panel: the handshake plays once when in view, then holds on its last frame. */
export function FinalCta() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.play().catch(() => {});
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-1.5 md:px-2">
      <div className="bg-b2t-navy relative flex min-h-[88svh] items-end overflow-hidden rounded-[28px] md:rounded-[44px]">
        <video
          ref={ref}
          muted
          playsInline
          preload="metadata"
          poster="/media/videos/closing/handshake.poster.webp"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="/media/videos/closing/handshake.av1.mp4"
            type='video/mp4; codecs="av01.0.08M.08"'
          />
          <source src="/media/videos/closing/handshake.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_24_39/0.92)_5%,rgb(16_24_39/0.55)_40%,transparent_75%)]" />
        <Reveal className="relative w-full p-6 md:p-12">
          <h2 className="font-display max-w-[14ch] text-5xl leading-[0.95] text-white md:text-8xl">
            Ready to run your next job on Build2Trade?
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={site.links.signUp} variant="accent" size="lg">
              Sign up free
            </Button>
            <Button href="/get-the-app" variant="light" size="lg">
              Get the app
            </Button>
            <Button
              href="/book-a-demo"
              variant="outline"
              size="lg"
              className="border-white/25 text-white hover:border-white/50"
            >
              Book a demo
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
