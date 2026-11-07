import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { StoreButtons } from "@/components/page/store-buttons";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "/get-the-app",
  "Get the Build2Trade App for iPhone and Android",
  "See new projects, send and edit quotes, chat, check the calendar and send invoices from your phone. Log in with fingerprint or Face ID.",
);

export default function Page() {
  const hasStores = Boolean(site.links.appStore || site.links.googlePlay);
  return (
    <>
      <PageHero
        title="Take Build2Trade to site"
        sub="See new projects, send and edit quotes, chat, check the calendar and send invoices from your phone. Log in with your fingerprint or Face ID."
      >
        {hasStores ? (
          <StoreButtons />
        ) : (
          <Button href={site.links.signIn} size="lg">
            Log in on the web
          </Button>
        )}
      </PageHero>
      <p className="text-b2t-navy/60 px-5 py-14 text-center font-medium">
        New to Build2Trade? Sign up on the website first, then log in on the app.{" "}
        <a
          href={site.links.signUp}
          className="text-b2t-navy font-semibold underline underline-offset-4"
        >
          Sign up
        </a>
      </p>
    </>
  );
}
