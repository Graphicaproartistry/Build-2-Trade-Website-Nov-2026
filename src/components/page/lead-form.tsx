"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { allTrades } from "@/content/trades";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Expo lead capture form: full name, number, builder / tradie / supplier / other (with a
 * text box for "other"), email, trade type for tradies and suppliers, optional business
 * and postcode, and consent to be contacted. Sent through our server to the support inbox.
 * After sending, "Add another person" clears it for the next person at the stand.
 */
type Status = "idle" | "sending" | "sent" | "error";
const roles = ["Builder", "Tradie", "Supplier", "Other"] as const;

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // The form is long on a phone: after sending (or "Add another person"), bring the top
  // of the card back into view so the thank-you message or the first field is visible.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (status !== "sent" && status !== "idle") return;
    const el = document.getElementById("lead-form");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 16;
    if (Math.abs(window.scrollY - top) > 40) window.scrollTo({ top, behavior: "instant" });
  }, [status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    if (!role) return setError("Please choose builder, tradie, supplier or other.");
    if (role === "Other" && !get("other")) return setError("Please tell us what you do.");
    if (role === "Tradie" && !get("trade")) return setError("Please choose your trade type.");
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          phone: get("phone"),
          role,
          other: get("other"),
          trade: get("trade"),
          email: get("email"),
          business: get("business"),
          postcode: get("postcode"),
          consent: get("consent") === "yes",
          _honey: get("_honey"),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (data.ok) return setStatus("sent");
      setError(data.message ?? "Sorry, that didn't send. Please try again.");
      setStatus("error");
    } catch {
      setError("Sorry, that didn't send. Check your connection and try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    formRef.current?.reset();
    setRole("");
    setError("");
    setStatus("idle");
  };

  const field =
    "text-b2t-navy w-full rounded-2xl bg-white px-4 py-4 text-lg ring-1 ring-black/10 outline-none placeholder:text-b2t-navy/35 focus:ring-2 focus:ring-b2t-navy";

  if (status === "sent")
    return (
      <div
        id="lead-form"
        className="rounded-[24px] bg-white p-8 text-center ring-1 ring-black/5 md:p-10"
        role="status"
      >
        <span className="bg-b2t-yellow text-b2t-navy mx-auto grid size-14 place-items-center rounded-full">
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="font-display text-b2t-navy mt-5 text-4xl">Thanks, you&apos;re in.</p>
        <p className="text-b2t-navy/65 mt-3 text-lg">
          Our team will be in touch soon. Want to get started now? Start your{" "}
          {site.pricing.trialLine.charAt(0).toLowerCase() + site.pricing.trialLine.slice(1)}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href={site.links.signUp} size="lg" arrow>
            Start free trial
          </Button>
          <Button href="#get-started" variant="outline" size="lg">
            Get the app
          </Button>
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-b2t-navy/60 hover:text-b2t-navy mt-8 text-sm font-semibold underline underline-offset-4"
        >
          Add another person
        </button>
      </div>
    );

  return (
    <form
      id="lead-form"
      ref={formRef}
      onSubmit={onSubmit}
      className="space-y-5 rounded-[24px] bg-white p-6 ring-1 ring-black/5 md:p-8"
    >
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <label className="block">
        <span className="text-b2t-navy mb-2 block font-semibold">Full name</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="text-b2t-navy mb-2 block font-semibold">Number</span>
        <input
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          pattern="[0-9 +()\-]{8,}"
          title="Please enter a phone number"
          placeholder="04xx xxx xxx"
          className={field}
        />
      </label>
      <label className="block">
        <span className="text-b2t-navy mb-2 block font-semibold">Email</span>
        <input
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          className={field}
        />
      </label>
      <fieldset>
        <legend className="text-b2t-navy mb-2 block font-semibold">Are you a</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={role === r}
              onClick={() => {
                setRole(r);
                setError("");
              }}
              className={cn(
                "h-14 rounded-2xl text-base font-semibold ring-1 transition-colors",
                role === r
                  ? "bg-b2t-navy ring-b2t-navy text-white"
                  : "text-b2t-navy hover:ring-b2t-navy/40 bg-white ring-black/10",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>
      {role === "Other" && (
        <label className="block">
          <span className="text-b2t-navy mb-2 block font-semibold">Tell us what you do</span>
          <input name="other" required autoFocus className={field} placeholder="e.g. Architect" />
        </label>
      )}
      {(role === "Tradie" || role === "Supplier") && (
        <label className="block">
          <span className="text-b2t-navy mb-2 block font-semibold">
            Trade type
            {role === "Supplier" && (
              <span className="text-b2t-navy/45 font-medium"> (optional)</span>
            )}
          </span>
          <select
            name="trade"
            required={role === "Tradie"}
            defaultValue=""
            className={cn(
              field,
              "appearance-none bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-12",
            )}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23101827' stroke-width='2'%3E%3Cpath d='M5 8l5 5 5-5'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Choose your trade
            </option>
            {allTrades.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="border-b2t-navy/10 grid gap-5 border-t pt-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-b2t-navy mb-2 block font-semibold">
            Business name <span className="text-b2t-navy/45 font-medium">(optional)</span>
          </span>
          <input name="business" autoComplete="organization" className={field} />
        </label>
        <label className="block">
          <span className="text-b2t-navy mb-2 block font-semibold">
            Postcode <span className="text-b2t-navy/45 font-medium">(optional)</span>
          </span>
          <input
            name="postcode"
            inputMode="numeric"
            autoComplete="postal-code"
            pattern="[0-9]{4}"
            maxLength={4}
            title="4-digit postcode"
            className={field}
          />
        </label>
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="accent-b2t-navy mt-1 size-5 shrink-0"
        />
        <span className="text-b2t-navy/75 text-sm leading-relaxed">
          I agree to Build2Trade contacting me by phone, SMS or email about Build2Trade. See our{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            className="text-b2t-navy font-semibold underline"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && (
        <p className="rounded-2xl bg-[#fdecea] px-4 py-3 text-sm text-[#8a1c12]" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-b2t-navy h-14 w-full rounded-full text-lg font-semibold text-white transition-colors hover:bg-[#1c2740] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
