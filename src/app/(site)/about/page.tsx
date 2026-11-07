import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { Section, TickList } from "@/components/page/section";
import { CtaBand } from "@/components/page/cta-band";
import { pageMeta } from "@/lib/seo";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata = pageMeta(
  "/about",
  "About Build2Trade: Built for Australian Construction",
  "Build2Trade is one place where Australian builders, tradies and suppliers work together, with clear records for everyone on the job.",
);

export default function Page() {
  return (
    <>
      <PageHero title="Built by people who know how a job site works" />

      <Section>
        <div className="text-b2t-navy/80 max-w-3xl space-y-6 text-lg leading-relaxed md:text-xl">
          <p>
            Build2Trade started with a simple problem: running a construction job in Australia means
            juggling dozens of tradies, suppliers, quotes, dates and invoices across phone calls,
            texts and spreadsheets. Things get missed, scopes get argued about, and good tradies
            spend more time chasing work than doing it.
          </p>
          <p>
            We built one place where builders, tradies and suppliers work together: projects go to
            the right people, quotes are clear and recorded, everyone knows when they&apos;re on
            site, and materials and invoices follow the job.
          </p>
        </div>
      </Section>

      <Section title="Our promise" className="pt-0 md:pt-0">
        <TickList
          className="max-w-3xl"
          items={[
            "Clear records for everyone on the job.",
            "Built for Australian businesses: ABN, GST and AUD from day one.",
          ]}
        />
      </Section>

      <CtaBand title="Ready to run your next job on Build2Trade?" sub={site.mission}>
        <Button href={site.links.signUp} variant="accent" size="lg">
          Sign up free
        </Button>
        <Button href="/contact" variant="light" size="lg">
          Contact us
        </Button>
      </CtaBand>
      <HeadlineReveals />
    </>
  );
}
