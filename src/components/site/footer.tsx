import Image from "next/image";
import Link from "next/link";
import { pages, site } from "@/content/site";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "Build2Trade",
    links: [
      pages.howItWorks,
      pages.builders,
      pages.tradies,
      pages.suppliers,
      pages.features,
      pages.pricing,
    ],
  },
  { title: "Company", links: [pages.about, pages.faq, pages.contact, pages.demo, pages.app] },
  { title: "Legal", links: [pages.terms, pages.termsOfUse, pages.privacy] },
];

/** Umano-style footer: brand card + links card, then the email set huge and faint. */
export function Footer() {
  const c = site.contact;
  return (
    <footer className="px-1.5 pt-1.5 md:px-2 md:pt-2">
      <div className="grid gap-1.5 md:grid-cols-[1fr_2.4fr] md:gap-2">
        <div className="bg-b2t-yellow flex min-h-64 flex-col justify-between rounded-[28px] p-7 md:rounded-[36px] md:p-9">
          <Image
            src="/brand/b2t-mark.svg"
            alt="Build2Trade"
            width={415}
            height={500}
            unoptimized
            className="h-14 w-auto self-start"
          />
          <p className="font-display text-b2t-navy text-2xl leading-tight">
            Builders, tradies and suppliers, getting the job done.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-10 rounded-[28px] bg-white p-7 ring-1 ring-black/5 md:rounded-[36px] md:p-9">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-b2t-navy/45 mb-3 text-xs font-semibold">{col.title}</p>
                <ul className="text-b2t-navy space-y-2 text-[15px] font-medium">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="text-b2t-navy/45 mb-3 text-xs font-semibold">Support</p>
              <ul className="text-b2t-navy space-y-2 text-[15px] font-medium">
                <li>
                  <a href={c.phoneHref} className="hover:underline">
                    {c.phone}
                  </a>
                </li>
                <li className="text-b2t-navy/55">{c.hours}</li>
                <li>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-b2t-navy/50 flex flex-col justify-between gap-4 text-xs sm:flex-row sm:items-center">
            <p>
              © 2026 Build2Trade · ABN {c.abn} · {site.credit}
            </p>
            <div className="flex gap-2">
              <Button href={site.links.signIn} variant="outline">
                Sign in
              </Button>
              <Button href={site.links.signUp}>Sign up</Button>
            </div>
          </div>
        </div>
      </div>
      <a
        href={`mailto:${c.email}`}
        className="font-display text-b2t-navy/[0.07] hover:text-b2t-navy/20 block overflow-hidden py-6 text-center text-[8.4vw] leading-none whitespace-nowrap transition-colors"
      >
        {c.email}
      </a>
    </footer>
  );
}
