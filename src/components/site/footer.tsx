import Image from "next/image";
import { site } from "@/content/site";

const company = [
  { label: "About", href: "https://build2trade.com.au/about" },
  { label: "Features", href: "https://build2trade.com.au/features" },
  { label: "Giveaway", href: "https://build2trade.com.au/giveaway" },
  { label: "Blog", href: "https://build2trade.com.au/blogs" },
  { label: "Contact", href: "https://build2trade.com.au/contact" },
];

export function Footer() {
  const c = site.contact;
  return (
    <footer className="bg-b2t-navy relative overflow-hidden px-5 pt-24 pb-10 md:px-10 lg:px-16">
      <div className="grid gap-14 border-t border-white/10 pt-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Image
            src="/brand/b2t-mark.svg"
            alt="Build 2 Trade"
            width={415}
            height={500}
            unoptimized
            className="h-14 w-auto"
          />
          <p className="mt-6 max-w-xs leading-relaxed text-white/60">{site.mission}</p>
        </div>
        <nav aria-label="Company">
          <h3 className="mb-4 text-xs font-medium tracking-[0.18em] text-white/40 uppercase">
            Company
          </h3>
          <ul className="space-y-2.5">
            {company.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-white/75 transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h3 className="mb-4 text-xs font-medium tracking-[0.18em] text-white/40 uppercase">
            Legal
          </h3>
          <ul className="space-y-2.5">
            {site.legal.map((l) => (
              <li key={l.label}>
                <a
                  href={`https://build2trade.com.au${l.href}`}
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="mb-4 text-xs font-medium tracking-[0.18em] text-white/40 uppercase">
            Help &amp; support
          </h3>
          <ul className="space-y-2.5 text-white/75">
            <li>
              <a href={`mailto:${c.email}`} className="transition-colors hover:text-white">
                {c.email}
              </a>
            </li>
            <li>
              <a href={c.phoneHref} className="transition-colors hover:text-white">
                {c.phone}
              </a>
            </li>
            <li className="text-white/45">{c.hours}</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/75 transition-colors hover:border-white/35 hover:text-white"
            >
              Facebook
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/75 transition-colors hover:border-white/35 hover:text-white"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      <Image
        src="/brand/b2t-wordmark.svg"
        alt=""
        width={975}
        height={125}
        unoptimized
        aria-hidden
        className="mt-20 w-full opacity-[0.08] grayscale"
      />

      <div className="mt-10 flex flex-col justify-between gap-3 text-xs text-white/40 md:flex-row">
        <p>© 2026 Build 2 Trade · ABN {c.abn}</p>
        <p>{site.credit.label}</p>
      </div>
    </footer>
  );
}
