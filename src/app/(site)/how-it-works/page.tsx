import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { Section, Steps } from "@/components/page/section";
import { CtaBand } from "@/components/page/cta-band";
import { pageMeta } from "@/lib/seo";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata = pageMeta(
  "/how-it-works",
  "How Build2Trade Works: From Quote to Invoice",
  "See how builders, tradies and suppliers use Build2Trade to quote, hire, schedule, supply and invoice every job.",
);

const steps = [
  {
    title: "The builder posts a project",
    body: (
      <>
        <p>
          The builder adds the project: title, address, start date, description and plans or photos.
          Then they choose the trades they need (for example Plumbing, Electrical, Carpentry) and
          the sub-trades inside each one, with a scope, a budget and dates for each trade.
        </p>
        <p className="text-b2t-navy mt-5 font-semibold">Two ways to publish:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <span className="text-b2t-navy font-semibold">To your network first:</span> send the
            project to tradies you already know and trust, for a set number of days.
          </li>
          <li>
            <span className="text-b2t-navy font-semibold">To everyone nearby:</span> every tradie
            with that trade within their working range is notified.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Tradies send quotes",
    body: (
      <>
        <p>
          Tradies see projects that match their trade and area. They read the scope, check the plans
          and send a quote with their price, GST choice, what&apos;s included and any documents.
        </p>
        <p className="mt-3">
          Changed your mind on the price? While the quote is still waiting, the tradie can edit it.
          The builder sees exactly what changed.
        </p>
      </>
    ),
  },
  {
    title: "The builder compares and hires",
    body: (
      <>
        <p>
          All quotes for a trade sit side by side. The builder picks one and hires the tradie in one
          tap. Everyone else is told the job has been filled.
        </p>
        <p className="mt-3">
          If the builder changes the project after quotes come in (more work, a new sub-trade, a
          bigger budget), every tradie who quoted gets a notification and an email showing exactly
          what changed. They can update their quote or keep it as it is. Every change is recorded.
        </p>
      </>
    ),
  },
  {
    title: "Schedule and work",
    body: "Hired trades appear on the project calendar with their start and end dates. Everyone gets a reminder before work starts. Chat keeps the conversation in one place.",
  },
  {
    title: "Materials",
    body: "Builders and hired tradies can ask suppliers for a quote on materials: the items, quantities, delivery address and the date they need them. Suppliers quote, the requester accepts, and the supplier tracks the order through to delivery, with deposit and final invoices.",
  },
  {
    title: "Invoice, pay and review",
    body: "When a trade is finished, the tradie sends the invoice through Build2Trade, with GST worked out. The builder pays the tradie directly. Both leave a review, which builds trust for the next job.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="From first quote to final invoice"
        sub="Build2Trade follows the way a real job runs. Here's what happens at each step, for each person on the job."
      >
        <Button href={site.links.signUp} size="lg">
          Sign up free
        </Button>
      </PageHero>
      <Section>
        <Steps items={steps} />
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
