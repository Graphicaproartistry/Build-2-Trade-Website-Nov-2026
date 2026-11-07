/**
 * Site-wide content and links, pulled from the current build2trade.com.au (Nov 2026).
 * Raw page text is archived in content/source/ for reference.
 */

const APP_URL = "https://build2trade-customer-frontend-production.up.railway.app";

export const site = {
  name: "Build 2 Trade",
  shortName: "B2T",
  tagline: "Connecting Builders to Quality Trades",
  headline: "Australia's First Digital Networking Platform For Builders & Tradies",
  description:
    "Simplify your workflow and hire reliable, verified tradiepeople in minutes. Build with confidence, scale your projects, and meet your deadlines.",
  mission: "To make construction teamwork easy, clear, and fair for everyone.",
  basedIn: "Melbourne, Australia",

  links: {
    // TODO: swap for a branded app domain (e.g. app.build2trade.com.au) when one exists.
    signUp: `${APP_URL}/role-selection`,
    signIn: `${APP_URL}/sign-in`,
    // Not published on the current site; add when available.
    appStore: null as string | null,
    googlePlay: null as string | null,
  },

  contact: {
    email: "admin@build2trade.com.au",
    phone: "+61 485 000 915",
    phoneHref: "tel:+61485000915",
    hours: "Mon–Fri, 9am–5pm AEST",
    emailResponse: "We reply within 24 hours",
    abn: "82 688 987 948",
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61583031629872",
    youtube: "https://www.youtube.com/@Build2Trade",
    instagram: null as string | null,
    linkedin: null as string | null,
  },

  pricing: {
    trialMonths: 3,
    trialPrice: 0,
    monthly: 49.99,
    currency: "AUD",
    points: [
      "No payment required to get started",
      "No charges for your first 3 months",
      "Cancel anytime before billing begins",
    ],
    fineprint: "After your free period: $49.99/month · Cancel anytime",
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Giveaway", href: "/giveaway" },
    { label: "Blog", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ],

  legal: [
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],

  audiences: [
    {
      key: "builders",
      label: "Builders",
      title: "Find reliable tradies faster",
      body: "Post jobs and instantly connect with available, verified professionals. Keep projects moving.",
    },
    {
      key: "tradies",
      label: "Tradies",
      title: "Access consistent work",
      body: "Get leads for your trade and area, send quotes and invoices from your phone, and build a verified reputation.",
    },
    {
      key: "suppliers",
      label: "Suppliers",
      title: "Streamline your workflow",
      body: "List your products on the marketplace and get quote requests from builders and tradies on live projects.",
    },
  ],

  steps: {
    builders: [
      {
        title: "Create your account",
        body: "Set up in minutes and start building your network of trusted tradies.",
      },
      {
        title: "Post your project",
        body: "Choose the trades you need and manage everything in one place.",
      },
      {
        title: "Connect and manage",
        body: "Communicate, organise and run your projects efficiently.",
      },
    ],
    tradies: [
      {
        title: "Create your account",
        body: "Sign up in seconds and start finding quality projects.",
      },
      {
        title: "Complete your profile",
        body: "Choose your trade and add your experience to connect with more builders.",
      },
      {
        title: "Explore project leads",
        body: "Find leads, connect with builders and grow your network.",
      },
    ],
  },

  features: [
    {
      key: "chat",
      title: "Collaborate on every project",
      body: "Share documents, images and decisions in project chat, with real-time notifications.",
    },
    {
      key: "hiring",
      title: "Make smarter hiring decisions",
      body: "See budgets, timelines, reviews and verified credentials before you hire.",
    },
    {
      key: "tracking",
      title: "Track projects easily",
      body: "Statuses, approvals, Gantt timelines, reminders and budgets on one dashboard.",
    },
    {
      key: "verified",
      title: "Verified professionals",
      body: "ABN, trade licences, insurance and certifications checked, plus transparent reviews.",
    },
    {
      key: "quotes",
      title: "Simpler quoting",
      body: "Itemised quotes with drawings attached, real-time status and digital approval.",
    },
    {
      key: "reports",
      title: "Project lifecycle reports",
      body: "Budgets, profit and loss and timelines, with Excel and PDF downloads.",
    },
    {
      key: "alerts",
      title: "Real-time alerts",
      body: "Instant notifications for new quotes, messages and milestones.",
    },
    {
      key: "mobile",
      title: "Run it from your phone",
      body: "Everything on the web dashboard, in the mobile app.",
    },
  ],

  founders: [
    {
      name: "MAC",
      role: "Founder",
      quote:
        "The idea for Build 2 Trade came directly from real job sites and real conversations with builders and tradies.",
    },
  ],
  credit: { label: "Designed and developed by Graphica Pro Artistry" },
} as const;

export type Site = typeof site;
