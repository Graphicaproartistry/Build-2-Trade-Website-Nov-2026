"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Contact form. Sends the enquiry by email to the support address through FormSubmit
 * (site.contact.formEndpoint). If sending fails, it falls back to opening the visitor's
 * email app with the message filled in.
 */
type Status = "idle" | "sending" | "sent" | "activation" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [mailto, setMailto] = useState("");
  // FormSubmit's own explanation when it doesn't send (shown under the error).
  const [detail, setDetail] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const subject = `Website enquiry from ${get("name")} (${get("role")})`;
    const lines = [`Name: ${get("name")}`, `Email: ${get("email")}`];
    if (get("phone")) lines.push(`Phone: ${get("phone")}`);
    lines.push(`I am a: ${get("role")}`, "", get("message"));
    setMailto(
      `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`,
    );

    setStatus("sending");
    try {
      // Our own server relays it to the support inbox (see src/app/api/contact/route.ts).
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          role: get("role"),
          message: get("message"),
          _honey: get("_honey"),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        activation?: boolean;
        message?: string;
      };
      if (data.ok) return setStatus("sent");
      setDetail(data.message ?? `Error ${res.status}`);
      // Before the form is activated, FormSubmit holds the message and emails an
      // "Activate Form" link to the inbox instead.
      setStatus(data.activation ? "activation" : "error");
    } catch (err) {
      setDetail(
        err instanceof Error && err.name === "TimeoutError" ? "Timed out" : "Network error",
      );
      setStatus("error");
    }
  };

  const field =
    "text-b2t-navy w-full rounded-2xl bg-white px-4 py-3.5 ring-1 ring-black/10 outline-none placeholder:text-b2t-navy/35 focus:ring-2 focus:ring-b2t-navy";

  if (status === "sent")
    return (
      <div className="rounded-[24px] bg-white p-8 ring-1 ring-black/5" role="status">
        <p className="font-display text-b2t-navy text-3xl">Thanks, we&apos;ve got your message.</p>
        <p className="text-b2t-navy/65 mt-3">
          We&apos;ll get back to you within business hours ({site.contact.hours}).
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
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
      {status === "activation" && (
        <p className="rounded-2xl bg-[#fff6dc] px-4 py-3 text-sm text-[#6b4e00]" role="alert">
          This form is waiting to be switched on. An &ldquo;Activate Form&rdquo; email has been sent
          to the Build2Trade admin inbox. Once it&apos;s activated, messages will come through. For
          now,{" "}
          <a href={mailto} className="font-semibold underline">
            send it from your email app
          </a>
          .
        </p>
      )}
      {status === "error" && (
        <p className="rounded-2xl bg-[#fdecea] px-4 py-3 text-sm text-[#8a1c12]" role="alert">
          Sorry, your message didn&apos;t send.{" "}
          <a href={mailto} className="font-semibold underline">
            Send it from your email app
          </a>{" "}
          instead, or email {site.contact.email}.
          {detail && <span className="mt-1 block opacity-70">({detail})</span>}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-b2t-navy h-12 rounded-full px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#1c2740] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
