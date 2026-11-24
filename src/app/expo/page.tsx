import type { Metadata } from "next";
import { site } from "@/content/site";
import { LeadForm } from "@/components/page/lead-form";

/**
 * Expo lead capture page, opened from the QR code at the stand when the team is busy.
 *
 * Deliberately standalone and light for slow expo Wi-Fi: it sits outside the (site) group,
 * so it loads none of the marketing site's nav, footer, smooth scroll or animations. Not
 * linked anywhere, not in the sitemap, and kept out of search results.
 */
export const metadata: Metadata = {
  title: "Skip the queue | Build2Trade",
  description: "Leave your details and the Build2Trade team will get back to you.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const startNow = [
  {
    label: "Sign up free",
    note: site.pricing.trial,
    href: site.links.signUp,
    qr: "/expo/qr-signup.svg",
  },
  { label: "App Store", note: "iPhone", href: site.links.appStore, qr: "/expo/qr-app-store.svg" },
  {
    label: "Google Play",
    note: "Android",
    href: site.links.googlePlay,
    qr: "/expo/qr-google-play.svg",
  },
].filter((s): s is typeof s & { href: string } => Boolean(s.href));

const Arrow = () => (
  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <main className="min-h-svh pb-10">
      <header className="p-1.5 md:p-2">
        <div className="bg-b2t-yellow rounded-[28px] px-5 pt-5 pb-9 md:rounded-[44px] md:px-12 md:pt-8 md:pb-14">
          <div className="mx-auto max-w-xl">
            <span className="inline-block rounded-2xl bg-white px-3 py-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- 7 KB, no loader needed */}
              <img
                src="/expo/b2t-logo.webp"
                alt="Build2Trade"
                width={130}
                height={100}
                className="h-11 w-auto"
              />
            </span>
            <h1 className="font-display text-b2t-navy mt-7 text-[3.4rem] leading-[0.9] md:text-7xl">
              Skip the queue.
            </h1>
            <p className="text-b2t-navy/75 mt-4 text-lg leading-snug font-semibold">
              Team busy? Leave your details and we&apos;ll get back to you. It takes 30 seconds.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-3 pt-4 md:px-5 md:pt-8">
        <LeadForm />
      </div>

      <section id="get-started" className="mx-auto mt-10 max-w-xl px-3 md:max-w-4xl md:px-5">
        <h2 className="text-b2t-navy px-2 text-2xl font-semibold md:text-center">
          Want to start now?
        </h2>
        <p className="text-b2t-navy/60 mt-1 px-2 md:text-center">{site.pricing.trialLine}</p>

        {/* Phones: plain buttons (nobody can scan their own screen). */}
        <ul className="mt-4 space-y-2 md:hidden">
          {startNow.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-b2t-navy active:bg-b2t-mist flex items-center justify-between rounded-2xl bg-white px-5 py-4 ring-1 ring-black/5"
              >
                <span>
                  <span className="block font-semibold">{s.label}</span>
                  <span className="text-b2t-navy/55 block text-sm">{s.note}</span>
                </span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>

        {/* Tablet or screen at the stand: QR codes to scan. */}
        <ul className="mt-6 hidden grid-cols-3 gap-3 md:grid">
          {startNow.map((s) => (
            <li
              key={s.label}
              className="flex flex-col items-center rounded-[24px] bg-white p-6 text-center ring-1 ring-black/5"
            >
              <p className="text-b2t-navy text-lg font-semibold">{s.label}</p>
              <p className="text-b2t-navy/55 text-sm">{s.note}</p>
              {/* eslint-disable-next-line @next/next/no-img-element -- 2 KB SVG */}
              <img
                src={s.qr}
                alt={`QR code: ${s.label}`}
                width={176}
                height={176}
                loading="lazy"
                className="mt-4 size-44"
              />
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-b2t-navy mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
              >
                Open <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="text-b2t-navy/55 mx-auto mt-10 max-w-xl px-5 text-center text-sm">
        Build2Trade ·{" "}
        <a href={site.contact.phoneHref} className="text-b2t-navy font-semibold">
          {site.contact.phone}
        </a>{" "}
        ·{" "}
        <a href={site.url} className="text-b2t-navy font-semibold">
          build2trade.com.au
        </a>
      </footer>
    </main>
  );
}
