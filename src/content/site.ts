/**
 * Site-wide facts and links. Copy follows content/Build2Trade_Website_Content.md
 * (the GM's brief). Anything marked TODO is a placeholder to confirm before launch.
 */

const APP_URL = "https://app.build2trade.com.au";

export const site = {
  name: "Build2Trade",
  url: "https://build2trade.com.au",
  tagline: "Australia's first digital networking platform for builders, tradies and suppliers.",
  shortLine:
    "Post the job. Get the quotes. Hire the right tradie. Order the materials. All in one place.",
  description:
    "Build2Trade connects Australian builders with local tradies and building suppliers, so projects get quoted, hired, scheduled, supplied and paid for in one app.",
  mission: "To make construction teamwork easy, clear, and fair for everyone.",

  links: {
    signUp: `${APP_URL}/role-selection`,
    signIn: `${APP_URL}/sign-in`,
    signUpBuilder: `${APP_URL}/sign-up?role=Builder`,
    signUpTradie: `${APP_URL}/sign-up?role=Tradie`,
    signUpSupplier: `${APP_URL}/sign-up?role=Supplier`,
    demo: "https://calendly.com/build2tradeaus/30min",
    appStore: "https://apps.apple.com/au/app/build-2-trade/id6752311076" as string | null,
    googlePlay: "https://play.google.com/store/apps/details?id=com.build2trade" as string | null,
  },

  contact: {
    // From the current website; TODO: confirm support email, phone and hours.
    email: "admin@build2trade.com.au",
    phone: "0485 000 915",
    phoneHref: "tel:0485000915",
    /** International format, used only in search-engine structured data. */
    phoneIntl: "+61 485 000 915",
    hours: "Mon–Fri, 9am–5pm AEST",
    abn: "82 688 987 948",
    /**
     * Where the contact form posts (FormSubmit). The first message sends an activation
     * email to admin@build2trade.com.au; nothing is delivered until "Activate" is clicked.
     * After activating, FormSubmit's email also gives a random alias string: swap it in
     * here instead of the address to keep the address out of the page source.
     */
    formEndpoint: "https://formsubmit.co/ajax/admin@build2trade.com.au",
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61583031629872",
    youtube: "https://www.youtube.com/@Build2Trade",
  },

  pricing: {
    currency: "AUD",
    monthly: 49.99,
    yearly: 449.99,
    // TODO: supplier plan price (confirm with GM).
    supplier: null as number | null,
  },

  /** Search engine site verification codes. TODO: paste the codes from Google Search Console and Bing Webmaster Tools. */
  verification: {
    google: null as string | null,
    bing: null as string | null,
  },

  credit: {
    text: "Designed and developed by",
    name: "Graphica Pro Artistry",
    url: "https://graphicaproartistry.com.au",
  },
} as const;

export const yearlySaving = Math.round(site.pricing.monthly * 12 - site.pricing.yearly);

/** Every public page, used by the nav, footer and sitemap. */
export const pages = {
  home: { href: "/", label: "Home" },
  howItWorks: { href: "/how-it-works", label: "How it works" },
  builders: { href: "/builders", label: "Builders" },
  tradies: { href: "/tradies", label: "Tradies" },
  suppliers: { href: "/suppliers", label: "Suppliers" },
  features: { href: "/features", label: "Features" },
  pricing: { href: "/pricing", label: "Pricing" },
  about: { href: "/about", label: "About us" },
  faq: { href: "/faq", label: "FAQ" },
  contact: { href: "/contact", label: "Contact" },
  app: { href: "/get-the-app", label: "Get the app" },
  demo: { href: "/book-a-demo", label: "Book a demo" },
  terms: { href: "/terms-and-conditions", label: "Terms and Conditions" },
  termsOfUse: { href: "/terms-of-use", label: "Terms of Use" },
  privacy: { href: "/privacy-policy", label: "Privacy Policy" },
} as const;
