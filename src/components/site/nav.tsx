"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "App", href: "#app" },
  { label: "Trades", href: "#trades" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

/** Floating pill navigation. It hides on scroll down and returns on scroll up. */
export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
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
          "fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:top-5",
          hidden && !open && "-translate-y-[140%]",
        )}
      >
        <nav
          aria-label="Main"
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-6 rounded-full border py-2 pr-2 pl-4 transition-colors duration-300",
            scrolled || open
              ? "bg-b2t-navy/75 border-white/10 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" aria-label="Build 2 Trade home" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-7 text-sm text-white/70 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.links.signIn}
              className="hidden px-3 text-sm text-white/70 transition-colors hover:text-white sm:block"
            >
              Sign in
            </a>
            <Button href={site.links.signUp} className="hidden sm:inline-flex">
              Start free
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-10 place-items-center rounded-full border border-white/15 lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-4 bg-white transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-4 bg-white transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "bg-b2t-navy fixed inset-0 z-40 transition-[opacity,visibility] duration-500 lg:hidden",
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
                  className="font-display block py-2 text-4xl font-semibold text-white"
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
            <Button href={site.links.signIn} variant="ghost" size="lg" className="w-full">
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
