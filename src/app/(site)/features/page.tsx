import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { Cards, Section } from "@/components/page/section";
import { CtaBand } from "@/components/page/cta-band";
import { pageMeta } from "@/lib/seo";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata = pageMeta(
  "/features",
  "Build2Trade Features for Builders, Tradies & Suppliers",
  "Every Build2Trade feature in one place: projects, quotes, hiring, calendar, invoices with GST, expenses, materials, marketplace and AI tools.",
);

type Cell = boolean | string;
const rows: [string, Cell, Cell, Cell][] = [
  ["Post projects with trades, sub-trades, scope, budget, dates and plans", true, false, false],
  ["Save projects as drafts", true, false, false],
  ["Publish to your own network first, then to everyone (and publish again)", true, false, false],
  ["Invite your tradies and suppliers to join", true, false, false],
  ["Projects matched by trade and distance", false, true, true],
  ["Send quotes with GST options and documents", false, true, true],
  ["Edit a quote before it's accepted (every version kept)", false, true, true],
  ["Told exactly what changed when the project changes", false, true, false],
  ["Compare quotes and hire in one tap", true, false, false],
  ["Project calendar and start reminders", true, true, false],
  ["Chat and push notifications", true, true, true],
  ["Invoices with GST", "Receive", "Send", "Send"],
  ["Project expenses with receipts, totals by trade and export", true, false, false],
  ["Permits per project", true, false, false],
  ["Material quote requests to suppliers", true, "Once hired", "Receive"],
  ["Order tracking, deposit and final invoices", true, true, true],
  ["Marketplace: browse, save, quote list", true, true, false],
  ["Marketplace shop, store import, bulk publish, sales", false, false, true],
  ["Pre-filled supplier quotes and product suggestions", false, false, true],
  ["Reviews", "Give", "Receive", "Receive"],
  ["Dashboard with stats and a profile checklist", true, true, true],
  ["ABN check (business name fills in) and GST registration", true, true, true],
  ["AI assistant: project from plans, take-off, quote compare, receipt scan", true, false, false],
  ["Login with password, email link, fingerprint or Face ID (app)", true, true, true],
  ["Help & Support tickets and built-in user guides", true, true, true],
  ["Web + iPhone + Android", true, true, true],
];

const everyone = [
  {
    title: "Fast, secure login",
    body: "Log in with your password, or with a one-time login link sent to your email. On the app, log in with your fingerprint or Face ID.",
  },
  {
    title: "Notifications that matter",
    body: "Push notifications on your phone and emails for new projects, quotes, changes, hires, invoices and messages. Turn them off any time.",
  },
  { title: "Chat", body: "One conversation per job, per request or per supplier order." },
  { title: "Help & Support", body: "Raise a ticket from the app or website and track the reply." },
  { title: "User guides", body: "Step-by-step guides for every part of the app, built in." },
  {
    title: "ABN and GST built in",
    body: "Your ABN is checked against the Australian Business Register, and GST is handled on every quote and invoice whether you're registered or not.",
  },
  { title: "Works everywhere", body: "Website, iPhone and Android, with light and dark mode." },
];

function Mark({ v }: { v: Cell }) {
  if (v === true)
    return (
      <svg viewBox="0 0 20 20" className="text-b2t-navy mx-auto size-5" aria-label="Yes">
        <path
          d="M5 10.5l3 3 7-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (v === false)
    return (
      <span className="text-b2t-navy/20" aria-label="No">
        –
      </span>
    );
  return <span className="text-b2t-navy text-sm font-semibold">{v}</span>;
}

export default function Page() {
  return (
    <>
      <PageHero
        title="Everything a job needs, in one app"
        sub="Grouped by what you're trying to do. Each feature shows who it's for."
      >
        <Button href={site.links.signUp} size="lg">
          Sign up free
        </Button>
      </PageHero>

      <Section>
        <div className="overflow-x-auto rounded-[24px] bg-white ring-1 ring-black/5">
          <table className="w-full min-w-[40rem] text-left">
            <caption className="sr-only">Build2Trade features by user type</caption>
            <thead>
              <tr className="text-b2t-navy border-b border-black/5 text-sm">
                <th scope="col" className="p-5 font-semibold md:px-7">
                  Feature
                </th>
                {["Builder", "Tradie", "Supplier"].map((h) => (
                  <th key={h} scope="col" className="w-28 p-5 text-center font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {rows.map(([f, b, t, s]) => (
                <tr key={f}>
                  <th scope="row" className="text-b2t-navy/80 p-5 text-[15px] font-medium md:px-7">
                    {f}
                  </th>
                  <td className="p-5 text-center">
                    <Mark v={b} />
                  </td>
                  <td className="p-5 text-center">
                    <Mark v={t} />
                  </td>
                  <td className="p-5 text-center">
                    <Mark v={s} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="For everyone on Build2Trade" className="pt-0 md:pt-0">
        <Cards items={everyone} tone="sand" />
      </Section>

      <CtaBand title="Ready to run your next job on Build2Trade?">
        <Button href={site.links.signUp} variant="accent" size="lg">
          Sign up free
        </Button>
        <Button href="/get-the-app" variant="light" size="lg">
          Get the app
        </Button>
      </CtaBand>
      <HeadlineReveals />
    </>
  );
}
