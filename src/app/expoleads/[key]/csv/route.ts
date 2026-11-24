import { keyMatches, readLeads } from "@/lib/lead-store";

/** Expo leads as a CSV file (opens in Excel). Same secret key as the leads page. */
export async function GET(_req: Request, ctx: RouteContext<"/expoleads/[key]/csv">) {
  const { key } = await ctx.params;
  if (!keyMatches(key)) return new Response("Not found", { status: 404 });

  const leads = await readLeads();
  const cell = (v: string) => {
    // Quote every cell; stop spreadsheet formulas from running ("=", "+", "-", "@").
    const s = /^[=+\-@]/.test(v) ? `'${v}` : v;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const rows = [
    [
      "Date (AEST)",
      "Full name",
      "Number",
      "Are you a",
      "Trade type",
      "Email",
      "Business name",
      "Postcode",
    ],
    ...leads.map((l) => [
      new Date(l.at).toLocaleString("en-AU", { timeZone: "Australia/Melbourne" }),
      l.name,
      l.phone,
      l.role,
      l.trade,
      l.email,
      l.business,
      l.postcode,
    ]),
  ];
  const csv = "﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="build2trade-expo-leads.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
