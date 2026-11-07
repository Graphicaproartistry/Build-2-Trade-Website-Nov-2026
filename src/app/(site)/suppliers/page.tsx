import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { Cards, Section } from "@/components/page/section";
import { CtaBand } from "@/components/page/cta-band";
import { FaqList } from "@/components/page/faq-list";
import { Marketplace } from "@/components/sections/marketplace";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { pageMeta } from "@/lib/seo";
import { HeadlineReveals } from "@/components/ui/headline-reveals";

export const metadata = pageMeta(
  "/suppliers",
  "For Suppliers: Quote Requests & Online Shop | Build2Trade",
  "Receive material quote requests from builders and tradies, quote, invoice, deliver and sell online.",
);

const features = [
  {
    title: "Quick sign-up",
    body: "Business name, contact person, ABN and GST: that's it to get started. Type your ABN and your business name and GST status fill in from the Australian Business Register.",
  },
  {
    title: "Your business profile",
    body: "A public page with your logo, cover image, description, trades and sub-trades you supply, service area, contact options you choose to show, and reviews. A checklist on your dashboard shows what's left to set up your shop.",
  },
  {
    title: "Opportunities that match",
    body: "When a builder posts a project in your trades and area, you see it as an opportunity, before they start shopping around.",
  },
  {
    title: "Quote requests straight to you",
    body: "Builders and tradies send you material quote requests with the items, quantities, delivery address and needed-by date.",
  },
  {
    title: "Quotes with versions, done fast",
    body: "Quotes start pre-filled from the request and your own product prices, so you only check and send. Add GST, delivery date and notes. Revise it if needed: every version is kept, and you can see when the customer opened it.",
  },
  {
    title: "From order to delivery",
    body: "Track each order: confirmed, preparing, out for delivery, delivered. Agree changes to an order with the customer. Send a deposit invoice and a final invoice (as PDF). Mark invoices paid.",
  },
  {
    title: "Your shop on the Build2Trade marketplace",
    body: "List your products with photos, prices, units, minimum order and specs. Get suggestions for category, unit and brand as you type a product name. Connect your online store (for example WooCommerce) and import your products instead of typing them in, then publish them in bulk. Put products on sale with a SALE badge, or run a shop-wide sale. Builders and tradies add your products to a quote list and send it to you.",
  },
  {
    title: "Chat and reviews",
    body: "Talk to customers about each request. Earn reviews after each order.",
  },
];

const faqs = [
  {
    q: "Who can see my products?",
    a: "Builders and tradies on Build2Trade. You choose whether other suppliers can see them too.",
  },
  {
    q: "What does it cost?",
    a: "See the supplier plan on the Pricing page, or talk to us about getting your business on Build2Trade.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        title="Be there when they need the materials"
        sub="Builders and tradies on Build2Trade need materials every day. Get their quote requests, send quotes, invoice, deliver and sell from your own online shop."
      >
        <Button href={site.links.signUp} size="lg">
          Sign up as a supplier
        </Button>
        <Button href="/contact" variant="outline" size="lg">
          Talk to us
        </Button>
      </PageHero>

      <Section title="What you get">
        <Cards items={features} />
      </Section>

      <Marketplace showCta={false} />

      <Section title="Supplier questions">
        <div className="max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <CtaBand title="Get your business on Build2Trade">
        <Button href={site.links.signUp} variant="accent" size="lg">
          Sign up as a supplier
        </Button>
        <Button href="/contact" variant="light" size="lg">
          Talk to us
        </Button>
      </CtaBand>
      <HeadlineReveals />
    </>
  );
}
