"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Contact form. There is no mail service connected yet, so sending opens the
 * visitor's email app with the message filled in, addressed to the support email.
 * TODO: post to a form/email service (e.g. Resend or Formspree) when one is chosen.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const lines = [`Name: ${get("name")}`, `Email: ${get("email")}`];
    if (get("phone")) lines.push(`Phone: ${get("phone")}`);
    lines.push(`I am a: ${get("role")}`, "", get("message"));
    const body = lines.join("\n");
    const subject = `Website enquiry from ${get("name")} (${get("role")})`;
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "text-b2t-navy w-full rounded-2xl bg-white px-4 py-3.5 ring-1 ring-black/10 outline-none placeholder:text-b2t-navy/35 focus:ring-2 focus:ring-b2t-navy";

  if (sent)
    return (
      <div className="rounded-[24px] bg-white p-8 ring-1 ring-black/5">
        <p className="font-display text-b2t-navy text-3xl">Thanks, we&apos;ve got your message.</p>
        <p className="text-b2t-navy/65 mt-3">
          Your email app should have opened with your message ready to send. If it didn&apos;t,
          email us at{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-b2t-navy font-semibold underline"
          >
            {site.contact.email}
          </a>
          .
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-b2t-navy mb-1.5 block text-sm font-semibold">Name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="text-b2t-navy mb-1.5 block text-sm font-semibold">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-b2t-navy mb-1.5 block text-sm font-semibold">
            Phone <span className="text-b2t-navy/45 font-medium">(optional)</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <fieldset>
          <legend className="text-b2t-navy mb-1.5 block text-sm font-semibold">I am a</legend>
          <div className="flex flex-wrap gap-1.5">
            {["Builder", "Tradie", "Supplier", "Other"].map((r, i) => (
              <label key={r} className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={r}
                  defaultChecked={i === 0}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "text-b2t-navy block rounded-full bg-white px-4 py-2.5 text-sm font-semibold ring-1 ring-black/10 transition-colors",
                    "peer-checked:bg-b2t-navy peer-focus-visible:ring-b2t-navy peer-checked:text-white peer-focus-visible:ring-2",
                  )}
                >
                  {r}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <label className="block">
        <span className="text-b2t-navy mb-1.5 block text-sm font-semibold">Message</span>
        <textarea name="message" required rows={6} className={cn(field, "resize-y")} />
      </label>
      <button
        type="submit"
        className="bg-b2t-navy h-12 rounded-full px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#1c2740]"
      >
        Send
      </button>
    </form>
  );
}
