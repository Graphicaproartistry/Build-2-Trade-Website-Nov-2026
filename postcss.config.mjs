// Used by the webpack build (production). Turbopack in dev uses the loader in next.config.mjs.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
