import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

// Account deletion instructions (linked from the App Store and Google Play listings).
export const metadata = pageMeta(
  "/delete-account",
  "Delete Your Build2Trade Account",
  "How to delete your Build2Trade account and data: in the app under Settings, or by emailing our support team.",
);

const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent("Delete my Build2Trade account")}&body=${encodeURIComponent(
  "Please delete my Build2Trade account.\n\nName:\nLogin email:\nI am a (builder, tradie or supplier):\n",
)}`;

function Card({
  title,
  tone = "plain",
  children,
}: {
  title: string;
  tone?: "plain" | "warning";
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-[24px] p-6 ring-1 md:p-8",
        tone === "warning" ? "bg-[#fdecea] ring-[#f3c4bf]" : "bg-white ring-black/5",
      )}
    >
      <h2
        className={cn(
          "text-xl font-semibold md:text-2xl",
          tone === "warning" ? "text-[#a3221a]" : "text-b2t-navy",
        )}
      >
        {title}
      </h2>
      <div className="text-b2t-navy/75 mt-4 text-[15px] leading-relaxed md:text-base">
        {children}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        title="Delete your account"
        sub="How to delete your Build2Trade account and the data that goes with it."
      />

      <div className="mx-auto max-w-2xl space-y-3 px-5 py-16 md:py-24">
        <Card title="Before you ask" tone="warning">
          <ul className="list-disc space-y-2 pl-5 marker:text-[#a3221a]">
            <li>Deleting your account is permanent and can&apos;t be undone.</li>
            <li>Your profile, projects, quotes, messages and other activity will be deleted.</li>
            <li>
              We process requests within 30 days, and email you once your data has been deleted.
            </li>
            <li>
              If you subscribed through the App Store, cancel it there as well: deleting your
              account doesn&apos;t cancel it. Other subscriptions are closed by our team as part of
              your request.
            </li>
          </ul>
        </Card>

        <Card title="Option 1: In the app">
          <ol className="list-decimal space-y-2 pl-5 marker:font-semibold">
            <li>Open the Build2Trade app and log in.</li>
            <li>Tap your profile picture to open your profile.</li>
            <li>
              Go to <strong className="text-b2t-navy">Settings</strong>, then tap{" "}
              <strong className="text-b2t-navy">Delete Account</strong>.
            </li>
            <li>
              Confirm. Your request goes straight to our support team, and you can follow it under{" "}
              <strong className="text-b2t-navy">Help &amp; Support</strong>.
            </li>
          </ol>
        </Card>

        <Card title="Option 2: By email">
          <p>
            Email us from the address you use to log in to Build2Trade, so we can confirm the
            account is yours. Include your name, that email, and whether you are a builder, tradie
            or supplier.
          </p>
          <div className="mt-6">
            <Button href={mailto} size="lg">
              Email {site.contact.email}
            </Button>
          </div>
          <p className="text-b2t-navy/60 mt-5 text-sm">
            Can&apos;t send an email? Call us on{" "}
            <a
              href={site.contact.phoneHref}
              className="text-b2t-navy font-semibold underline underline-offset-4"
            >
              {site.contact.phone}
            </a>{" "}
            ({site.contact.hours}).
          </p>
        </Card>

        <Card title="What we may keep">
          <p>
            We may keep some records for longer where the law requires it, for example invoices and
            tax records. More details are in our{" "}
            <Link
              href="/privacy-policy"
              className="text-b2t-navy font-semibold underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </Card>
      </div>
    </>
  );
}
