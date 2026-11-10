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
