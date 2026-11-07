"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/** Closing handshake: it plays once when in view, then holds on its final frame. */
export function FinalCta() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    <section className="bg-b2t-navy relative flex min-h-dvh items-end overflow-hidden">
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
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#101827_8%,rgb(16_24_39/0.75)_40%,rgb(16_24_39/0.1)_75%)]" />

      <Reveal className="relative w-full px-5 pb-16 md:px-10 md:pb-24 lg:px-16">
        <h2 className="font-display max-w-[13ch] text-6xl leading-[0.92] font-semibold text-white md:text-8xl">
          Start networking smarter today.
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
          Join builders, tradies and suppliers already connecting, posting jobs and managing
          projects in one place.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button href={site.links.signUp} size="lg">
            Start free for 3 months
          </Button>
          <span className="text-sm text-white/50">No charges during trial · Cancel anytime</span>
        </div>
      </Reveal>
    </section>
  );
}
