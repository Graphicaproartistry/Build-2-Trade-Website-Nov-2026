import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const included = [
  { label: "Unlimited projects", d: "M12 5v14M5 12h14" },
  {
    label: "AI assistant for plans, takeoffs and quotes",
    d: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6",
  },
  { label: "Supplier marketplace", d: "M4 9l2-5h12l2 5M4 9h16v11H4zM9 20v-6h6v6" },
  { label: "Quotes, chat and file sharing", d: "M4 5h16v11H8l-4 4z" },
  { label: "Calendar, Gantt and reminders", d: "M4 6h16v14H4zM4 10h16" },
  { label: "Lifecycle reports (Excel and PDF)", d: "M5 20V10M12 20V4M19 20v-7" },
  { label: "Verified profiles and reviews", d: "M4 12.5l5 5L20 6.5" },
  { label: "Cancel anytime", d: "M6 6l12 12M18 6L6 18" },
];

export function Pricing() {
  const p = site.pricing;
  return (
    <section id="pricing" className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-b2t-navy text-5xl leading-[0.95] md:text-8xl">
          Free for three months.
        </h2>
        <p className="text-b2t-navy/60 mt-6 text-lg font-medium">
          Full access with no payment to start. Then ${p.monthly} a month, or cancel before billing
          begins.
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-14 max-w-[30rem]">
        <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_1px_2px_rgb(16_24_39/0.04),0_24px_60px_-24px_rgb(16_24_39/0.25)] ring-1 ring-black/5">
          <div className="relative h-60 overflow-hidden bg-[#8d8d8d] grayscale">
            {/* Gloved hand + app screen, black and white */}
            <div className="absolute top-6 left-1/2 aspect-[1122/1402] w-[78%] -translate-x-1/2">
              <div
                className="absolute overflow-hidden"
                style={{
                  left: "32.09%",
                  top: "10.7%",
                  width: "35.83%",
                  height: "61.06%",
                  borderRadius: "12.5% / 5.9%",
                }}
              >
                <Image
                  src="/media/images/app/mobile/home.webp"
                  alt=""
                  fill
                  sizes="10rem"
                  className="object-cover object-top"
                />
              </div>
              <Image
                src="/media/images/hand-phone.webp"
                alt=""
                fill
                sizes="24rem"
                className="object-contain"
              />
            </div>
          </div>
          <div className="p-7 md:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-b2t-navy text-3xl">Membership</h3>
              <p className="font-display text-b2t-navy text-3xl">
                $0
                <span className="text-b2t-navy/55 font-sans text-base font-medium">
                  {" "}
                  / 3 months
                </span>
              </p>
            </div>
            <p className="text-b2t-navy/60 mt-2 text-[15px]">
              Then ${p.monthly}/month (AUD). No lock-in.
            </p>
            <ul className="mt-6 space-y-3 border-t border-black/5 pt-6">
              {included.map((it) => (
                <li key={it.label} className="text-b2t-navy flex items-center gap-3 text-[15px]">
                  <svg
                    viewBox="0 0 24 24"
                    className="text-b2t-navy/60 size-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={it.d} />
                  </svg>
                  {it.label}
                </li>
              ))}
            </ul>
            <Button href={site.links.signUp} size="lg" className="mt-8 w-full">
              Start your free trial
            </Button>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
