import { site, yearlySaving } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/page/section";
import { FaqList } from "@/components/page/faq-list";
import { pageMeta } from "@/lib/seo";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata = pageMeta(
  "/pricing",
  "Build2Trade Pricing: Monthly & Yearly Plans",
  "Simple plans for builders, tradies and suppliers. Monthly or yearly, every feature included.",
);

const faqs = [
  { q: "How do I pay?", a: "By card, securely through Stripe, on the website." },
  {
    q: "Can I subscribe in the app?",
    a: "No. Subscribe on the website, then log in on the iPhone or Android app.",
  },
];

export default function Page() {
  const p = site.pricing;
  const plans = [
    { name: "Monthly", price: p.monthly, per: "month", best: "Try it out, flexible" },
    {
      name: "Yearly",
      price: p.yearly,
      per: "year",
      best: `Lock in your price for the year. Save about $${yearlySaving} on monthly.`,
    },
  ];
  return (
    <>
      <PageHero title="Simple pricing for every business on the job">
        <Button href={site.links.signUp} size="lg">
          Sign up
        </Button>
        <Button href="/book-a-demo" variant="outline" size="lg">
          Book a demo
        </Button>
      </PageHero>

      <Section title="Builders and tradies">
        <div className="grid max-w-4xl gap-3 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="rounded-[28px] bg-white p-8 ring-1 ring-black/5 md:p-10"
            >
              <h3 className="text-b2t-navy/55 text-sm font-semibold">{plan.name}</h3>
              <p className="font-display text-b2t-navy mt-4 text-6xl md:text-7xl">
                ${plan.price}
                <span className="text-b2t-navy/55 font-sans text-base font-medium">
                  {" "}
                  AUD / {plan.per}
                </span>
              </p>
              <p className="text-b2t-navy/65 mt-4">{plan.best}</p>
              <Button href={site.links.signUp} size="lg" className="mt-8 w-full">
                Choose {plan.name.toLowerCase()}
              </Button>
            </article>
          ))}
        </div>
        <p className="text-b2t-navy/65 mt-8 max-w-3xl text-lg">
          Both plans include every builder or tradie feature, unlimited projects and quotes, the web
          app and the mobile apps. Subscribe on the website and accept the plan&apos;s terms before
          you pay.
        </p>
      </Section>

      <Section title="Suppliers" className="pt-0 md:pt-0">
        <div className="bg-b2t-sand max-w-4xl rounded-[28px] p-8 md:p-10">
          <h3 className="text-b2t-navy text-2xl font-semibold">Supplier plan</h3>
          {site.pricing.supplier ? (
            <p className="font-display text-b2t-navy mt-4 text-5xl">
              ${site.pricing.supplier}
              <span className="text-b2t-navy/55 font-sans text-base font-medium"> AUD</span>
            </p>
          ) : (
            <p className="text-b2t-navy/70 mt-3 text-lg">
              Suppliers have their own plan. Talk to us about getting your business on the
              Build2Trade marketplace.
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Talk to us
            </Button>
            <Button href="/suppliers" variant="outline" size="lg">
              What suppliers get
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Pricing questions" className="pt-0 md:pt-0">
        <div className="max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>
      <HeadlineReveals />
    </>
  );
}
