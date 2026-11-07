import { LegalPage } from "@/components/page/legal-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "/terms-of-use",
  "Terms of Use | Build2Trade",
  "The terms of use for the Build2Trade website and apps.",
);

export default function Page() {
  return <LegalPage file="terms-of-use.txt" />;
}
