import Link from "next/link";
import { site, yearlySaving } from "@/content/site";
import { Button } from "@/components/ui/button";

/** Home pricing teaser (from the brief). Full details live on /pricing. */
export function Pricing() {
  const p = site.pricing;
  const plans = [
    { name: "Monthly", price: p.monthly, per: "month", note: "Flexible. Try it out." },
    {
      name: "Yearly",
      price: p.yearly,
      per: "year",
      note: `Save about $${yearlySaving} on monthly.`,
    },
  ];
  return (
    <section id="pricing" className="px-5 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-b2t-navy text-5xl leading-[0.95] md:text-8xl">
          Simple pricing.
        </h2>
        <p className="text-b2t-navy/60 mt-6 text-lg font-medium">
          One subscription for builders and tradies: monthly or yearly. Suppliers have their own
          plan.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-3xl gap-3 md:grid-cols-2">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-[28px] bg-white p-8 ring-1 ring-black/5">
            <p className="text-b2t-navy/55 text-sm font-semibold">{plan.name}</p>
            <p className="font-display text-b2t-navy mt-4 text-6xl">
              ${plan.price}
              <span className="text-b2t-navy/55 font-sans text-base font-medium">
                {" "}
                AUD / {plan.per}
              </span>
            </p>
            <p className="text-b2t-navy/60 mt-3">{plan.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button href="/pricing" size="lg">
          See pricing
        </Button>
        <Link
          href="/suppliers"
          className="text-b2t-navy px-3 font-semibold underline-offset-4 hover:underline"
        >
          Supplier plan
        </Link>
      </div>
    </section>
  );
}
