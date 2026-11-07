"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Role = "builders" | "tradies";

/** Light section: who it's for, plus the three-step start for builders or tradies. */
export function HowItWorks() {
  const [role, setRole] = useState<Role>("builders");

  return (
    <section
      id="how-it-works"
      className="theme-light relative px-5 py-28 md:px-10 md:py-40 lg:px-16"
    >
      <Reveal className="max-w-3xl">
        <p className="text-ink-muted mb-5 text-xs font-medium tracking-[0.18em] uppercase">
          Who it&apos;s for
        </p>
        <h2 className="font-display text-5xl leading-[0.95] font-semibold md:text-7xl">
          Built for the people who build.
        </h2>
      </Reveal>

      <Reveal className="mt-14 grid gap-3 md:grid-cols-3" stagger={0.08}>
        {site.audiences.map((a, i) => (
          <article
            key={a.key}
            className="border-border bg-surface-raised rounded-2xl border p-7 md:p-9"
          >
            <div className="mb-10 flex items-center justify-between">
              <span className="text-accent-text text-xs font-semibold tracking-[0.18em] uppercase">
                {a.label}
              </span>
              <span className="text-ink-muted text-xs tabular-nums">0{i + 1}</span>
            </div>
            <h3 className="font-display text-3xl leading-tight font-semibold">{a.title}</h3>
            <p className="text-ink-muted mt-3 leading-relaxed">{a.body}</p>
          </article>
        ))}
      </Reveal>

      <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <Reveal>
          <p className="text-ink-muted mb-5 text-xs font-medium tracking-[0.18em] uppercase">
            How it works
          </p>
          <h3 className="font-display text-4xl leading-[0.98] font-semibold md:text-5xl">
            Up and running in minutes.
          </h3>
          <div
            role="tablist"
            aria-label="Choose your role"
            className="border-border bg-surface-raised mt-8 inline-flex rounded-full border p-1"
          >
            {(["builders", "tradies"] as const).map((r) => (
              <button
                key={r}
                role="tab"
                aria-selected={role === r}
                onClick={() => setRole(r)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors",
                  role === r ? "bg-b2t-navy text-white" : "text-ink-muted hover:text-ink",
                )}
              >
                For {r}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <Button href={site.links.signUp} size="lg">
              Create your free account
            </Button>
          </div>
        </Reveal>

        <ol key={role} className="divide-border border-border divide-y border-y">
          {site.steps[role].map((s, i) => (
            <li
              key={s.title}
              className="grid animate-[fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)_both] grid-cols-[3rem_1fr] gap-4 py-7 md:grid-cols-[5rem_1fr] md:py-9"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="font-display text-accent-text text-3xl font-semibold tabular-nums md:text-4xl">
                {i + 1}
              </span>
              <div>
                <h4 className="text-xl font-semibold md:text-2xl">{s.title}</h4>
                <p className="text-ink-muted mt-2 max-w-md leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
