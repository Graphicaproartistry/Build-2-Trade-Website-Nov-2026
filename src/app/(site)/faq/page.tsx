import { site } from "@/content/site";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/page/section";
import { FaqList } from "@/components/page/faq-list";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { pageMeta } from "@/lib/seo";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata = pageMeta(
  "/faq",
  "Build2Trade FAQ: Builders, Tradies, Suppliers & Billing",
  "Answers about Build2Trade for builders, tradies and suppliers: how projects reach tradies, quotes, payments, the marketplace and the app.",
);

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "General",
    items: [
      {
        q: "What is Build2Trade?",
        a: "An Australian platform that connects builders, tradies and building suppliers: projects, quotes, hiring, schedules, materials, invoices and reviews in one place.",
      },
      {
        q: "Who is it for?",
        a: "Builders and project managers, tradies, and building material suppliers.",
      },
      { q: "Where does it work?", a: "Australia." },
      {
        q: "Is there an app?",
        a: "Yes, for iPhone and Android. Sign up on the website, then log in on the app.",
      },
    ],
  },
  {
    title: "Builders",
    items: [
      {
        q: "How do tradies find my project?",
        a: "It's sent to tradies with the right trade whose working area covers your site, or only to the tradies you invite if you publish to your network.",
      },
      {
        q: "What if I change the project after getting quotes?",
        a: "Tradies who quoted are told exactly what changed and can update their quote. Every change is recorded.",
      },
      { q: "Can I see a tradie's reviews before hiring?", a: "Yes, on their profile." },
    ],
  },
  {
    title: "Tradies",
    items: [
      {
        q: "Can I change my quote?",
        a: "Yes, any time before the builder accepts or rejects it.",
      },
      {
        q: "How do I get paid?",
        a: "Send your invoice through Build2Trade. The builder pays you directly.",
      },
    ],
  },
  {
    title: "Suppliers",
    items: [
      {
        q: "How do customers find me?",
        a: "Through the supplier directory, project opportunities in your trades and area, and the marketplace.",
      },
      {
        q: "Can I import my products?",
        a: "Yes, from your existing online store, for example WooCommerce.",
      },
    ],
  },
  {
    title: "Account and billing",
    items: [
      {
        q: "How much does it cost?",
        a: `Builders and tradies pay $${site.pricing.monthly} AUD a month or $${site.pricing.yearly} AUD a year. Suppliers have their own plan. See the Pricing page for details.`,
      },
      {
        q: "Who do I contact for help?",
        a: `Email ${site.contact.email}, or use Help & Support in the app.`,
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(groups.flatMap((g) => g.items))} />
      <PageHero title="Questions, answered" />
      {groups.map((g, i) => (
        <Section key={g.title} title={g.title} className={i > 0 ? "pt-0 md:pt-0" : undefined}>
          <div className="max-w-3xl">
            <FaqList items={g.items} defaultOpen={-1} />
          </div>
        </Section>
      ))}
      <HeadlineReveals />
    </>
  );
}
