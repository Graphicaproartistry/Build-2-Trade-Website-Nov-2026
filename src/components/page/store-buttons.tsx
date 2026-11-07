import { site } from "@/content/site";

/** App Store / Google Play buttons. Each shows only once its link is set in site.ts. */
export function StoreButtons({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { appStore, googlePlay } = site.links;
  if (!appStore && !googlePlay) return null;
  const cls =
    tone === "dark"
      ? "bg-b2t-navy text-white hover:bg-[#1c2740]"
      : "bg-white text-b2t-navy hover:bg-white/90";
  const btn = (href: string, small: string, big: string, icon: string) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-14 items-center gap-3 rounded-2xl px-5 transition-colors ${cls}`}
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
        <path d={icon} />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[11px] opacity-75">{small}</span>
        <span className="block text-base font-semibold">{big}</span>
      </span>
    </a>
  );
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {appStore &&
        btn(
          appStore,
          "Download on the",
          "App Store",
          "M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.3-.1 1.7-.8 3.2-.8s1.9.8 3.3.8c1.4 0 2.2-1.2 3-2.5 1-1.4 1.3-2.8 1.4-2.8-.1 0-2.5-1-2.5-4.2zM14 5.2c.7-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 3 1.1.1 2.2-.6 2.9-1.4z",
        )}
      {googlePlay &&
        btn(
          googlePlay,
          "Get it on",
          "Google Play",
          "M4 3l10 9-10 9zM14 12l3-3 3.5 2c.7.4.7 1.6 0 2L17 15zM4 3l13 6-3 3zM4 21l10-9 3 3z",
        )}
    </div>
  );
}
