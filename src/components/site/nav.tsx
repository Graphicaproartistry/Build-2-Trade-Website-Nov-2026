"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "The app", href: "#app" },
  { label: "Platform", href: "#platform" },
  { label: "AI", href: "#ai" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/** Floating white pill navigation, centred (Umano-style). */
export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:top-4",
          hidden && !open && "-translate-y-[150%]",
        )}
      >
        <nav
          aria-label="Main"
          className="flex items-center gap-2 rounded-full bg-white/95 p-1.5 pl-4 shadow-[0_2px_4px_rgb(16_24_39/0.04),0_10px_30px_rgb(16_24_39/0.10)] ring-1 ring-black/5 backdrop-blur md:gap-6"
        >
          <Link href="/" aria-label="Build 2 Trade home" className="shrink-0">
            <Logo />
          </Link>

          <ul className="text-b2t-navy/70 hidden items-center gap-6 text-sm font-medium lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-b2t-navy transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href={site.links.signIn}
              className="text-b2t-navy/70 hover:text-b2t-navy hidden px-3 text-sm font-medium transition-colors sm:block"
            >
              Sign in
            </a>
            <Button href={site.links.signUp}>Start free</Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="bg-b2t-mist relative grid size-10 place-items-center rounded-full lg:hidden"
            >
              <span
                className={cn(
                  "bg-b2t-navy absolute h-[1.5px] w-4 transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={cn(
                  "bg-b2t-navy absolute h-[1.5px] w-4 transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "bg-b2t-paper fixed inset-0 z-40 transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li
                key={l.href}
                className={cn(
                  "transition-[opacity,transform] duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-b2t-navy block py-1.5 text-5xl"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <Button href={site.links.signUp} size="lg" className="w-full">
              Start free for 3 months
            </Button>
            <Button href={site.links.signIn} variant="outline" size="lg" className="w-full">
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
