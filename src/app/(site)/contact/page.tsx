import { site } from "@/content/site";
import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/page/section";
import { ContactForm } from "@/components/page/contact-form";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "/contact",
  "Contact Build2Trade",
  "Questions about your account, pricing or getting your business on Build2Trade? Talk to the Build2Trade team.",
);

export default function Page() {
  const c = site.contact;
  return (
    <>
      <PageHero
        title="Talk to the Build2Trade team"
        sub="Questions about your account, pricing or getting your business on Build2Trade? We're here to help."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="space-y-6">
            <div>
              <p className="text-b2t-navy/55 text-sm font-semibold">Email</p>
              <a
                href={`mailto:${c.email}`}
                className="text-b2t-navy text-xl font-semibold hover:underline"
              >
                {c.email}
              </a>
            </div>
            <div>
              <p className="text-b2t-navy/55 text-sm font-semibold">Phone</p>
              <a href={c.phoneHref} className="text-b2t-navy text-xl font-semibold hover:underline">
                {c.phone}
              </a>
            </div>
            <div>
              <p className="text-b2t-navy/55 text-sm font-semibold">Hours</p>
              <p className="text-b2t-navy text-xl font-semibold">{c.hours}</p>
            </div>
            <p className="bg-b2t-sand text-b2t-navy rounded-2xl p-5 font-medium">
              Already a member? Use <strong>Help &amp; Support</strong> in the app for the fastest
              answer.
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
