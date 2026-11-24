import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/page-hero";
import { LeadForm } from "@/components/page/lead-form";

// Hidden page for the Expo QR code: not linked anywhere on the site, not in the sitemap,
// and kept out of search results.
export const metadata: Metadata = {
  title: "Get started with Build2Trade",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Great to meet you."
        sub={`Leave your details and the Build2Trade team will be in touch. ${site.pricing.trialLine}`}
      />
      <div className="mx-auto max-w-xl px-5 py-12 md:py-20">
        <LeadForm />
      </div>
    </>
  );
}
