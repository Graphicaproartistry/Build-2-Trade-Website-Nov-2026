"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Closing panel: the handshake plays from the start each time it comes into view, then
 * holds on its last frame. Phones get the video as a 4:3 block above the text, so both
 * people stay in shot; tablets and up keep the full-bleed panel.
 */
export function FinalCta() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.ended || v.currentTime > 0) v.currentTime = 0;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-1.5 md:px-2">
      <div className="bg-b2t-navy relative flex flex-col overflow-hidden rounded-[28px] md:min-h-[88svh] md:flex-row md:items-end md:rounded-[44px]">
        <div className="relative aspect-[4/3] w-full md:absolute md:inset-0 md:aspect-auto">
          <video
            ref={ref}
            muted
            playsInline
            preload="auto"
            poster="/media/videos/closing/handshake.poster.webp"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="/media/videos/closing/handshake.mobile.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source
              src="/media/videos/closing/handshake.av1.mp4"
              type='video/mp4; codecs="av01.0.08M.08"'
            />
            <source src="/media/videos/closing/handshake.mp4" type="video/mp4" />
          </video>
          {/* phones: fade the bottom of the video into the navy panel */}
          <div className="absolute inset-x-0 -bottom-px h-1/3 bg-[linear-gradient(to_top,#101827_8%,transparent)] md:hidden" />
        </div>
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgb(16_24_39/0.92)_5%,rgb(16_24_39/0.55)_40%,transparent_75%)] md:block" />
        <Reveal className="relative -mt-6 w-full px-6 pb-8 md:mt-0 md:p-12">
          <h2 className="font-display text-[2.6rem] sm:max-w-[14ch] sm:text-5xl leading-[0.95] text-white md:text-8xl">
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
              className="text-white ring-white/30"
            >
              Book a demo
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
