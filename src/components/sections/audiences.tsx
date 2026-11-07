"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Role = "builders" | "tradies";

/** Dark rounded panel: who it's for and how to start (Umano's dark "stories" panel). */
export function Audiences() {
  const [role, setRole] = useState<Role>("builders");
  return (
    <section className="px-1.5 md:px-2">
      <div className="bg-b2t-navy rounded-[28px] px-5 py-24 text-white md:rounded-[44px] md:px-12 md:py-36 lg:px-20">
        <Reveal>
          <h2 className="font-display max-w-[14ch] text-5xl leading-[0.95] md:text-8xl">
            Builders, tradies and suppliers.
          </h2>
        </Reveal>

        <Reveal className="mt-14 grid gap-3 md:mt-20 md:grid-cols-3" stagger={0.08}>
          {site.audiences.map((a) => (
            <article
              key={a.key}
              className="rounded-[24px] bg-white/[0.06] p-7 ring-1 ring-white/10 md:p-9"
            >
              <p className="text-b2t-yellow text-sm font-semibold">{a.label}</p>
              <h3 className="font-display mt-10 text-3xl leading-tight">{a.title}</h3>
              <p className="mt-3 leading-relaxed text-white/65">{a.body}</p>
            </article>
          ))}
        </Reveal>

        <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <Reveal>
            <h3 className="font-display text-4xl leading-[0.98] md:text-6xl">Set up in minutes.</h3>
            <div
              role="tablist"
              aria-label="Choose your role"
              className="mt-8 inline-flex rounded-full bg-white/[0.08] p-1"
            >
              {(["builders", "tradies"] as const).map((r) => (
                <button
                  key={r}
                  role="tab"
                  aria-selected={role === r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                    role === r ? "text-b2t-navy bg-white" : "text-white/70 hover:text-white",
                  )}
                >
                  For {r}
                </button>
              ))}
            </div>
            <div className="mt-8">
              <Button href={site.links.signUp} variant="accent" size="lg">
                Create your free account
              </Button>
            </div>
          </Reveal>
          <ol key={role} className="divide-y divide-white/10 border-y border-white/10">
            {site.steps[role].map((s, i) => (
              <li
                key={s.title}
                className="grid animate-[fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)_both] grid-cols-[2.5rem_1fr] gap-4 py-7 md:grid-cols-[4rem_1fr] md:py-9"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="font-display text-3xl text-white/40 md:text-4xl">{i + 1}</span>
                <div>
                  <h4 className="text-xl font-semibold md:text-2xl">{s.title}</h4>
                  <p className="mt-2 max-w-md leading-relaxed text-white/60">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
