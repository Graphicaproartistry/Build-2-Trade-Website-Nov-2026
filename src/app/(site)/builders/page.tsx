import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { Cards, Section, TickList } from "@/components/page/section";
import { CtaBand } from "@/components/page/cta-band";
import { FaqList } from "@/components/page/faq-list";
import { BookDemo } from "@/components/sections/book-demo";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { pageMeta } from "@/lib/seo";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata = pageMeta(
  "/builders",
  "For Builders: Quotes, Hiring & Job Costs | Build2Trade",
  "Get quotes from the right local tradies, compare and hire, schedule every trade and track project costs.",
);

const problems = [
  "Chasing tradies by phone and text for quotes.",
  "Quotes on paper, in emails and in messages, impossible to compare.",
  "“That wasn't in my quote” arguments after the scope changes.",
  "Not knowing what the job has cost until the end.",
];

const features = [
  {
    title: "Post once, get the right quotes",
    body: "Add your project with trades, sub-trades, scope, budget and plans. Build2Trade sends it to tradies who do that trade within range, or to your own network first.",
  },
  {
    title: "Save as a draft",
    body: "Not ready to publish? Save the project as a draft and finish it later, on the web or the app.",
  },
  {
    title: "Add, change or remove trades any time",
    body: "Add a trade to a live project and the right tradies are told straight away. Remove a trade nobody has quoted on yet.",
  },
  {
    title: "Your network first",
    body: "Have tradies you trust? Invite them by phone or email and give them first look for a set number of days. If nobody picks it up, publish it to everyone with one tap. You can also “publish again” later to remind tradies about trades that are still open.",
  },
  {
    title: "Bring your team with you",
    body: "Invite the tradies and suppliers you already work with to join Build2Trade by phone or email, and see who has joined.",
  },
  {
    title: "Compare quotes side by side",
    body: "See every quote for a trade together: price, GST, inclusions and documents. Hire in one tap.",
  },
  {
    title: "Every change recorded",
    body: "If you change the project, tradies who quoted are told exactly what changed. If a tradie edits their quote, you see the old and new price and their note. Every version is kept with the date and time.",
  },
  {
    title: "Calendar and reminders",
    body: "Every hired trade sits on the project calendar with its dates. Reminders go out before the project and each trade starts.",
  },
  {
    title: "Expenses and receipts",
    body: "Log every cost against the project and trade: materials, hire, labour and more. Attach receipts and invoices. See totals by trade and for the whole project, and export the project's expenses as a report.",
  },
  {
    title: "Permits in one place",
    body: "Keep track of the permits for each project and who issued them.",
  },
  {
    title: "Suppliers and materials",
    body: "Find building suppliers by trade and area, with their reviews. Send a material quote request (items, quantities, delivery address, needed-by date), compare quotes from different suppliers, accept one, and track the order through to delivery with deposit and final invoices.",
  },
  {
    title: "Supplier marketplace",
    body: "Browse products from building suppliers by category, see prices and sales, save products and add them to a quote list. Send the list to the supplier for a quote with delivery to your site.",
  },
  {
    title: "Your dashboard",
    body: "A home screen with your projects, quotes waiting, hired trades and costs at a glance, plus a checklist to finish setting up your profile.",
  },
  {
    title: "Chat, notifications, reviews",
    body: "Message tradies and suppliers about the job. Get push notifications and emails for new quotes, changes and invoices. Review tradies when the job is done.",
  },
];

const ai = [
  {
    title: "Set up a project from your plans",
    body: "AI reads your plans and suggests the trades, sub-trades and scopes, ready to check in the Create Project form.",
  },
  {
    title: "Take-off and material list",
    body: "A material list with quantities from your plans or photos, ready to send to a supplier for a quote.",
  },
  {
    title: "Compare quotes",
    body: "Pick a project and a trade, and AI compares every tradie's quote, explains the differences and suggests the best fit. Results are saved so you can open them again.",
  },
  {
    title: "Expense from a receipt photo",
    body: "Snap a receipt or tax invoice and AI fills in the expense for you to check.",
  },
];

const faqs = [
  {
    q: "Do tradies pay to quote?",
    a: "Tradies have their own Build2Trade subscription. There is no fee per quote.",
  },
  {
    q: "Can I invite my own tradies?",
    a: "Yes, by phone or email, before the project goes public.",
  },
  {
    q: "Do I pay tradies through Build2Trade?",
    a: "No. Invoices come through Build2Trade and you pay the tradie directly.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        title="Run every job from one place"
        sub="Get quotes from the right tradies, keep every trade on schedule, and know what each project is costing you."
      >
        <Button href={site.links.signUp} size="lg">
          Sign up as a builder
        </Button>
        <Button href="/get-the-app" variant="outline" size="lg">
          Get the app
        </Button>
      </PageHero>

      <Section title="The problems we fix">
        <TickList items={problems} className="max-w-3xl" />
      </Section>

      <Section title="What you get" className="pt-0 md:pt-0">
        <Cards items={features} />
      </Section>

      <section className="px-1.5 md:px-2">
        <div className="bg-b2t-navy rounded-[28px] px-5 py-20 text-white md:rounded-[44px] md:px-12 md:py-28 lg:px-20">
          <h2 className="font-display max-w-[14ch] text-5xl leading-[0.95] md:text-8xl">
            AI that saves you hours
          </h2>
          <ul className="mt-14 grid gap-3 md:grid-cols-2">
            {ai.map((it) => (
              <li
                key={it.title}
                className="rounded-[24px] bg-white/[0.06] p-7 ring-1 ring-white/10 md:p-8"
              >
                <h3 className="text-xl font-semibold">{it.title}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{it.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-white/60">
            You check and approve everything. AI never publishes or saves on its own.
          </p>
        </div>
      </section>

      <div className="pt-1.5 md:pt-2">
        <BookDemo title="See it on your next job." />
      </div>

      <Section title="Builder questions">
        <div className="max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <CtaBand title="Run your next job on Build2Trade">
        <Button href={site.links.signUp} variant="accent" size="lg">
          Sign up as a builder
        </Button>
      </CtaBand>
      <HeadlineReveals />
    </>
  );
}
