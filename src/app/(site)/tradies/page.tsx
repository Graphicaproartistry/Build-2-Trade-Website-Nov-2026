import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { Cards, Section } from "@/components/page/section";
import { CtaBand } from "@/components/page/cta-band";
import { FaqList } from "@/components/page/faq-list";
import { Trades } from "@/components/sections/trades";
import { NoCommission } from "@/components/sections/no-commission";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { pageMeta } from "@/lib/seo";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata = pageMeta(
  "/tradies",
  "For Tradies: Find Local Jobs & Send Quotes | Build2Trade",
  "Real projects from builders near you. No lead fees and no commission on work you win: one flat subscription. Quote in minutes, get hired and get paid.",
);

const features = [
  {
    title: "Jobs that match your trade and area",
    body: "Set your trade and how far you travel. You're notified when a builder posts a project that needs your trade within your range.",
  },
  {
    title: "Quote in minutes",
    body: "Read the scope, open the plans and send a quote with your price, inclusions and documents. Choose how GST applies: no GST, GST included, or GST added on top. If you're not GST-registered, Build2Trade keeps your quotes GST-free automatically.",
  },
  {
    title: "Edit before it's accepted",
    body: "Got the price wrong or found something new? Edit your quote any time before the builder decides. They see what changed and your note.",
  },
  {
    title: "Protected when the scope changes",
    body: "If the builder changes the project after you've quoted, you're told exactly what changed. Update your quote or keep it, with a record of what you priced. Every project change is saved with the date and time.",
  },
  {
    title: "Get hired, get scheduled",
    body: "When you're hired, the job lands on your calendar with its dates, plus a reminder before you start.",
  },
  {
    title: "Invoice in a few taps",
    body: "When the work is done, send your invoice from the job. GST is worked out from your quote.",
  },
  {
    title: "Order materials for the job",
    body: "Once you're hired, ask suppliers to quote on the materials for that job. The delivery address comes from the project.",
  },
  {
    title: "Build your reputation",
    body: "Builders review you after each job. Good reviews help you win the next one. Your profile shows your trade, experience, certifications and reviews.",
  },
  {
    title: "Saved projects and chat",
    body: "Save projects to quote later. Chat with the builder about the job.",
  },
  {
    title: "Your dashboard",
    body: "A home screen with new jobs for your trade, quotes waiting, jobs you're hired on and what's coming up, plus a checklist to finish your profile so builders trust you.",
  },
  {
    title: "My quotations",
    body: "Every quote you've sent in one list: waiting, accepted and rejected, with the builder's reason when one is rejected.",
  },
];

const faqs = [
  {
    q: "Is there a fee per lead, quote or job?",
    a: `No. There are no lead fees and no commission on the work you win. You pay one subscription ($${site.pricing.monthly} a month or $${site.pricing.yearly} a year), then quote as much as you like.`,
  },
  {
    q: "I'm not GST-registered. Is that OK?",
    a: "Yes. Set it in your profile and your quotes and invoices won't add GST.",
  },
  {
    q: "Can I use it on site?",
    a: "Yes. Use the iPhone or Android app to see jobs, quote, chat and invoice.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        title="More work. Less chasing."
        sub="See real projects near you that match your trade, send quotes in minutes, and build a reputation that wins the next job."
      >
        <Button href={site.links.signUpTradie} size="lg">
          Sign up as a tradie
        </Button>
        <Button href="/get-the-app" variant="outline" size="lg">
          Get the app
        </Button>
      </PageHero>

      <NoCommission />

      <Section title="What you get">
        <Cards items={features} />
      </Section>

      <Trades />

      <Section title="Tradie questions" className="pt-0 md:pt-0">
        <div className="max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <CtaBand title="Win your next job on Build2Trade">
        <Button href={site.links.signUpTradie} variant="accent" size="lg">
          Sign up as a tradie
        </Button>
      </CtaBand>
      <HeadlineReveals />
    </>
  );
}
