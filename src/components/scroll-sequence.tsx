"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Apple-style scroll-scrubbed image sequence.
 *
 * - Frames are WebP stills in /media/frames/<name>/<desktop|mobile>/NNN.webp.
 * - The section is a tall wrapper with a sticky, full-viewport stage.
 * - One GSAP timeline (duration 1) is scrubbed by scroll. Frame 0 to N-1 map
 *   linearly onto it, and `build` adds overlay animations on the same timeline,
 *   so positions 0..1 mean "scroll progress through the section".
 * - `overlay` children sit in media space: an absolutely positioned box that
 *   matches the drawn image rect, so % coordinates line up with the footage
 *   on every screen size.
 */

export type SequenceFit =
  | { mode: "cover" }
  /** Scale so `visible` (0..1) of the image width fits the viewport; align 0 = top, 1 = bottom. */
  | { mode: "width"; visible: number; align?: number };

type Props = {
  name: string;
  frameCount: number;
  /** Frame count of the mobile set if it differs (phones get a lighter sequence). */
  mobileFrameCount?: number;
  /**
   * Phones: "autoplay" shows the sequence in a normal-height panel and plays it once
   * when it comes into view (smooth and short); "scrub" pins and scrubs as on desktop.
   */
  mobileMode?: "scrub" | "autoplay";
  /** Panel height in autoplay mode (CSS length). */
  autoplayHeight?: string;
  /** Image aspect ratio, width / height. */
  aspect?: number;
  /** Total section height in viewport heights (scroll distance = length - 1). */
  length?: number;
  fit?: SequenceFit;
  mobileFit?: SequenceFit;
  /** Start loading immediately (hero) instead of when the section approaches. */
  eager?: boolean;
  id?: string;
  className?: string;
  stageClassName?: string;
  /** Inset, rounded panel on the light page (Umano-style container). */
  framed?: boolean;
  label: string;
  /** Background colour to fade the footage edges into when it doesn't fill the stage (mobile). */
  feather?: string;
  overlay?: ReactNode;
  children?: ReactNode;
  build?: (tl: gsap.core.Timeline, root: HTMLElement) => void;
};

const MOBILE_QUERY = "(max-width: 767px)";

function frameUrl(name: string, variant: string, i: number) {
  return `/media/frames/${name}/${variant}/${String(i + 1).padStart(3, "0")}.webp`;
}

/** Load order: first frame, then progressively finer strides, so scrubbing works early. */
function loadOrder(n: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  const push = (i: number) => {
    if (i >= 0 && i < n && !seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  push(0);
  push(n - 1);
  for (const stride of [16, 8, 4, 2, 1]) for (let i = 0; i < n; i += stride) push(i);
  return order;
}

function mediaRect(w: number, h: number, aspect: number, fit: SequenceFit) {
  if (fit.mode === "cover") {
    let iw = w;
    let ih = w / aspect;
    if (ih < h) {
      ih = h;
      iw = h * aspect;
    }
    return { x: (w - iw) / 2, y: (h - ih) / 2, w: iw, h: ih };
  }
  const iw = w / fit.visible;
  const ih = iw / aspect;
  return { x: (w - iw) / 2, y: (h - ih) * (fit.align ?? 0.5), w: iw, h: ih };
}

export function ScrollSequence({
  name,
  frameCount: desktopFrameCount,
  mobileFrameCount,
  mobileMode = "scrub",
  autoplayHeight = "60svh",
  aspect = 16 / 9,
  length = 3,
  fit = { mode: "cover" },
  mobileFit,
  eager = false,
  id,
  className,
  stageClassName,
  framed = false,
  label,
  feather,
  overlay,
  children,
  build,
}: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [variant, setVariant] = useState<"desktop" | "mobile" | null>(null);
  const frameCount =
    variant === "mobile" && mobileFrameCount ? mobileFrameCount : desktopFrameCount;
  const autoplay = variant === "mobile" && mobileMode === "autoplay";

  const images = useRef<(HTMLImageElement | null)[]>([]);
  const loaded = useRef<Uint8Array>(new Uint8Array(frameCount));
  const target = useRef(0);
  const drawn = useRef(-1);
  const rect = useRef({ x: 0, y: 0, w: 0, h: 0 });

  // Pick the frame set once on mount (and if the breakpoint changes).
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setVariant(mq.matches ? "mobile" : "desktop");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Switching to the mobile layout (e.g. autoplay instead of a tall pinned section)
  // changes the page height, so every scroll trigger below must be recalculated.
  useEffect(() => {
    if (!variant) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [variant, autoplay]);

  const fitKey = JSON.stringify(variant === "mobile" && mobileFit ? mobileFit : fit);
  const activeFit = useMemo(() => JSON.parse(fitKey) as SequenceFit, [fitKey]);

  // Draw helper: nearest loaded frame to the target.
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const t = target.current;
    let idx = -1;
    for (let d = 0; d < frameCount; d++) {
      if (t - d >= 0 && loaded.current[t - d]) {
        idx = t - d;
        break;
      }
      if (t + d < frameCount && loaded.current[t + d]) {
        idx = t + d;
        break;
      }
    }
    if (idx < 0 || idx === drawn.current) return;
    const img = images.current[idx];
    if (!img) return;
    const r = rect.current;
    const dpr = canvas.width / Math.max(1, canvas.clientWidth);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, r.x * dpr, r.y * dpr, r.w * dpr, r.h * dpr);
    drawn.current = idx;
  }, [frameCount]);

  // Size the canvas + overlay box to the stage.
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas || !variant) return;
    const resize = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      // Phones: cap the canvas resolution; the frames are only 720px wide there anyway.
      const frameWidth = variant === "mobile" ? 1080 : 1920;
      const r0 = mediaRect(w, h, aspect, activeFit);
      const dpr = Math.max(
        1,
        Math.min(window.devicePixelRatio || 1, 2, (frameWidth / r0.w) * 1.15),
      );
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      rect.current = mediaRect(w, h, aspect, activeFit);
      const o = overlayRef.current;
      if (o) {
        const r = rect.current;
        o.style.left = `${r.x}px`;
        o.style.top = `${r.y}px`;
        o.style.width = `${r.w}px`;
        o.style.height = `${r.h}px`;
      }
      drawn.current = -1;
      draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [variant, aspect, activeFit, draw]);

  // Load frames (eagerly, or when the section gets close).
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !variant) return;
    let cancelled = false;
    images.current = new Array(frameCount).fill(null);
    loaded.current = new Uint8Array(frameCount);
    drawn.current = -1;

    const start = async () => {
      const order = loadOrder(frameCount);
      const BATCH = 8;
      for (let b = 0; b < order.length && !cancelled; b += BATCH) {
        await Promise.all(
          order.slice(b, b + BATCH).map(
            (i) =>
              new Promise<void>((resolve) => {
                const img = new Image();
                img.decoding = "async";
                img.src = frameUrl(name, variant, i);
                img.onload = () => {
                  // Decode before first use so scrubbing never stalls on a decode.
                  img
                    .decode()
                    .catch(() => {})
                    .finally(() => {
                      if (cancelled) return resolve();
                      images.current[i] = img;
                      loaded.current[i] = 1;
                      draw();
                      resolve();
                    });
                };
                img.onerror = () => resolve();
              }),
          ),
        );
      }
    };

    if (eager) {
      start();
      return () => {
        cancelled = true;
      };
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(wrap);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [name, frameCount, variant, eager, draw]);

  // Scroll timeline.
  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap || !variant) return;
      const state = { f: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        ...(autoplay
          ? { paused: true }
          : {
              scrollTrigger: { trigger: wrap, start: "top top", end: "bottom bottom", scrub: true },
            }),
      });
      if (autoplay) {
        // Play once when the panel is well in view, after the frames have loaded.
        ScrollTrigger.create({
          trigger: wrap,
          start: "top 65%",
          once: true,
          onEnter: () => {
            const begin = Date.now();
            const go = () => {
              const n = loaded.current.reduce((a, b) => a + b, 0);
              if (n >= frameCount * 0.9 || Date.now() - begin > 3000) {
                gsap.to(tl, { progress: 1, duration: 2.8, ease: "power1.inOut" });
              } else {
                setTimeout(go, 100);
              }
            };
            go();
          },
        });
      }
      tl.to(
        state,
        {
          f: frameCount - 1,
          duration: 1,
          onUpdate: () => {
            target.current = Math.round(state.f);
            draw();
          },
        },
        0,
      );
      build?.(tl, wrap);
    },
    { scope: wrapRef, dependencies: [variant, autoplay, frameCount], revertOnUpdate: true },
  );

  return (
    <section
      ref={wrapRef}
      id={id}
      aria-label={label}
      className={cn("relative", className)}
      style={{ height: autoplay ? undefined : `${length * 100}vh` }}
    >
      <div
        ref={stageRef}
        className={cn(
          "w-full overflow-hidden",
          autoplay
            ? cn("relative", framed && "mx-auto w-[calc(100%-12px)] rounded-[28px]")
            : framed
              ? "sticky top-1.5 mx-auto h-[calc(100svh-12px)] w-[calc(100%-12px)] rounded-[28px] md:top-2 md:h-[calc(100svh-16px)] md:w-[calc(100%-16px)] md:rounded-[44px]"
              : "sticky top-0 h-svh",
          stageClassName,
        )}
        style={autoplay ? { height: autoplayHeight } : undefined}
      >
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
        <div ref={overlayRef} className="pointer-events-none absolute" aria-hidden>
          {overlay}
          {feather && activeFit.mode === "width" && (
            <>
              <div
                className="absolute inset-x-0 top-0 h-[22%]"
                style={{ background: `linear-gradient(to bottom, ${feather}, transparent)` }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[22%]"
                style={{ background: `linear-gradient(to top, ${feather}, transparent)` }}
              />
            </>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
