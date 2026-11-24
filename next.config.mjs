// Plain JavaScript (not TypeScript) on purpose: the production host can't run Next's native
// compiler, and its fallback compiler can't load a TypeScript config.

/** @type {import("next").NextConfig} */
const nextConfig = {
  cacheComponents: true,
  // Old site pages that no longer exist: send visitors (and search engines) somewhere useful.
  async redirects() {
    return [
      { source: "/giveaway", destination: "/pricing", permanent: true },
      { source: "/blogs", destination: "/", permanent: true },
      { source: "/blogs/:slug*", destination: "/", permanent: true },
    ];
  },
  partialPrefetching: true,
  // Don't announce the framework in every response header.
  poweredByHeader: false,
  // Some hosts (e.g. Hostinger's builder) only pass settings while building, not to the
  // running app. Copy the Expo leads key in at build time too, under a separate name, so
  // the leads page works either way. Only server code reads it; it never reaches browsers.
  env: { BUILD_EXPO_LEADS_KEY: process.env.EXPO_LEADS_KEY || "" },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
