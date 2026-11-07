import { LegalPage } from "@/components/page/legal-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "/privacy-policy",
  "Privacy Policy | Build2Trade",
  "How Build2Trade collects, uses and protects your personal information.",
);

export default function Page() {
  return <LegalPage file="privacy-policy.txt" />;
}
