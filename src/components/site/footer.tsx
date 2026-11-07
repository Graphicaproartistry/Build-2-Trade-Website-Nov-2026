import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

const OLD = "https://build2trade.com.au";
const links = [
  { label: "About", href: `${OLD}/about` },
  { label: "Features", href: `${OLD}/features` },
  { label: "Giveaway", href: `${OLD}/giveaway` },
  { label: "Blog", href: `${OLD}/blogs` },
  { label: "Contact", href: `${OLD}/contact` },
];

/** Umano-style footer: brand card + links card, then the email set huge and faint. */
export function Footer() {
  const c = site.contact;
  return (
    <footer className="px-1.5 pt-1.5 md:px-2 md:pt-2">
      <div className="grid gap-1.5 md:grid-cols-[1fr_2.2fr] md:gap-2">
        <div className="bg-b2t-yellow flex min-h-64 flex-col justify-between rounded-[28px] p-7 md:rounded-[36px] md:p-9">
          <Image
            src="/brand/b2t-mark.svg"
            alt="Build 2 Trade"
            width={415}
            height={500}
            unoptimized
            className="h-14 w-auto self-start"
          />
          <p className="font-display text-b2t-navy text-2xl leading-tight">
            Connecting builders
            <br />
            to quality trades.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-10 rounded-[28px] bg-white p-7 ring-1 ring-black/5 md:rounded-[36px] md:p-9">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <nav aria-label="Company">
              <p className="text-b2t-navy/45 mb-3 text-xs font-semibold">Company</p>
              <ul className="text-b2t-navy space-y-2 text-[15px] font-medium">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Legal">
              <p className="text-b2t-navy/45 mb-3 text-xs font-semibold">Legal</p>
              <ul className="text-b2t-navy space-y-2 text-[15px] font-medium">
                {site.legal.map((l) => (
                  <li key={l.label}>
                    <a href={`${OLD}${l.href}`} className="hover:underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
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
              © 2026 Build 2 Trade · ABN {c.abn} · {site.credit.label}
            </p>
            <Button href={site.links.signUp}>Start free</Button>
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
