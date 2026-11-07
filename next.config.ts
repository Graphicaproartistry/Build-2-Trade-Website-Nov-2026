import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
