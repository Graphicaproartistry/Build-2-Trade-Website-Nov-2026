import { LegalPage } from "@/components/page/legal-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "/terms-and-conditions",
  "Terms and Conditions | Build2Trade",
  "The terms and conditions for using Build2Trade, the Australian platform for builders, tradies and suppliers.",
);

export default function Page() {
  return <LegalPage file="terms-and-conditions.txt" />;
}
