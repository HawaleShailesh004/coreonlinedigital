import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  // claude-seo/ is vendored tooling dropped in by a Claude plugin, not site
  // source. Linting it just reports other people's style choices.
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "claude-seo/**",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default config;
