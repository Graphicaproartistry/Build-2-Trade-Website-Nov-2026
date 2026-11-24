import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { keyMatches, readLeads, type Lead } from "@/lib/lead-store";

/**
 * Private list of Expo leads: /expoleads/<secret key>. No login; the secret key (set as
 * EXPO_LEADS_KEY on the host) is the only way in. Any other address shows "not found".
 */
export const metadata: Metadata = {
  title: "Expo leads | Build2Trade",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
};

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));

function Row({ l }: { l: Lead }) {
  const tel = l.phone.replace(/[^\d+]/g, "");
  return (
    <li className="rounded-2xl bg-white p-4 ring-1 ring-black/5 md:grid md:grid-cols-[1.2fr_1fr_1fr_1.3fr_0.8fr] md:items-center md:gap-4 md:rounded-none md:px-5 md:py-3 md:ring-0">
      <div className="flex items-start justify-between gap-3 md:block">
        <p className="text-b2t-navy font-semibold">{l.name}</p>
        <p className="text-b2t-navy/50 shrink-0 text-xs md:hidden">{when(l.at)}</p>
      </div>
      <a
        href={`tel:${tel}`}
        className="text-b2t-navy mt-1 block font-semibold underline-offset-4 md:mt-0 md:hover:underline"
      >
        {l.phone}
      </a>
      <p className="text-b2t-navy/75 mt-1 text-sm md:mt-0">
        {l.role}
        {l.trade && <span className="text-b2t-navy/55"> · {l.trade}</span>}
      </p>
      <div className="text-b2t-navy/75 mt-1 text-sm md:mt-0">
        {l.email && (
          <a
            href={`mailto:${l.email}`}
            className="block truncate underline-offset-4 hover:underline"
          >
            {l.email}
          </a>
        )}
        {(l.business || l.postcode) && (
          <p className="text-b2t-navy/55">{[l.business, l.postcode].filter(Boolean).join(" · ")}</p>
        )}
      </div>
      <p className="text-b2t-navy/50 hidden text-sm md:block">{when(l.at)}</p>
    </li>
  );
}

async function Leads({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  await connection(); // always read fresh at request time
  if (!keyMatches(key)) notFound();
  const leads = await readLeads();
  const counts = ["Builder", "Tradie", "Supplier"].map(
    (r) => [r, leads.filter((l) => l.role === r).length] as const,
  );

  return (
    <main className="mx-auto max-w-6xl px-3 py-6 md:px-6 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 px-1">
        <div>
          <h1 className="font-display text-b2t-navy text-4xl md:text-5xl">Expo leads</h1>
          <p className="text-b2t-navy/60 mt-1">
            {leads.length} {leads.length === 1 ? "lead" : "leads"}
            {leads.length > 0 &&
              ` · ${counts.map(([r, n]) => `${n} ${r.toLowerCase()}${n === 1 ? "" : "s"}`).join(", ")}`}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/expoleads/${key}`}
            className="text-b2t-navy inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold ring-1 ring-black/15"
          >
            Refresh
          </a>
          <a
            href={`/expoleads/${key}/csv`}
            className="bg-b2t-navy inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-white"
          >
            Download for Excel
          </a>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="text-b2t-navy/60 mt-8 rounded-2xl bg-white p-8 text-center ring-1 ring-black/5">
          No leads yet. They appear here as soon as someone sends the form at /expo.
        </p>
      ) : (
        <div className="mt-6 md:overflow-hidden md:rounded-2xl md:bg-white md:ring-1 md:ring-black/5">
          <div className="text-b2t-navy/50 hidden grid-cols-[1.2fr_1fr_1fr_1.3fr_0.8fr] gap-4 border-b border-black/5 px-5 py-3 text-xs font-semibold tracking-wide uppercase md:grid">
            <span>Name</span>
            <span>Number</span>
            <span>Role / trade</span>
            <span>Email / business</span>
            <span>When</span>
          </div>
          <ul className="space-y-2 md:space-y-0 md:divide-y md:divide-black/5">
            {leads.map((l, i) => (
              <Row key={`${l.at}-${i}`} l={l} />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export default function Page({ params }: PageProps<"/expoleads/[key]">) {
  return (
    <Suspense fallback={<p className="text-b2t-navy/60 p-8 text-center">Loading leads…</p>}>
      <Leads params={params} />
    </Suspense>
  );
}
