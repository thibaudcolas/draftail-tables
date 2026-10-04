import { defineConfig, lazyPlugins, loadEnv } from "vite-plus";
import postcssNormalize from "postcss-normalize";
import { flowPlugin } from "./tooling/flow-plugin.mjs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "REACT_APP_");
  return {
    base: "/draftail-tables/",
    // Draft.js 0.10's dependencies expect Webpack's browser global shim.
    define: { global: "globalThis" },
    plugins: lazyPlugins(() => [
      flowPlugin(),
      {
        name: "prototype-html",
        transformIndexHtml: {
          order: "pre",
          handler(html) {
            return {
              html: html
                .replace(/%PUBLIC_URL%/g, "/draftail-tables")
                .replace(/%(REACT_APP_\w+)%/g, (_, key) => env[key] || ""),
              tags: [
                {
                  tag: "script",
                  attrs: { type: "module", src: "/src/index.js" },
                  injectTo: "body",
                },
              ],
            };
          },
        },
      },
    ]),
    css: { postcss: { plugins: [postcssNormalize()] } },
    build: { outDir: "build", sourcemap: true },
    pack: {
      entry: { "draftail-tables": "src/lib/index.js" },
      format: ["esm", "cjs"],
      platform: "neutral",
      target: "es2020",
      outExtensions: ({ format }) => ({
        js: format === "cjs" ? ".cjs.js" : ".esm.js",
      }),
      plugins: [flowPlugin()],
      deps: { neverBundle: [/^react(?:\/|$)/, /^draft-js(?:\/|$)/] },
    },
    lint: {
      // Oxlint cannot parse Flow. ESLint covers the unchanged prototype.
      ignorePatterns: ["src/**", "build/**", "dist/**", "coverage/**"],
      env: { node: true },
    },
    fmt: {
      // Preserve prototype files, snapshots, and the original HTML verbatim.
      ignorePatterns: [
        "src/**",
        "public/**",
        "index.html",
        "build/**",
        "dist/**",
        "coverage/**",
      ],
      printWidth: 80,
      sortPackageJson: false,
    },
    staged: {
      "*.{js,mjs,mts,json,json5,md,yml,yaml,scss,css,html,snap}": () =>
        "npm run test:ci",
    },
    test: {
      globals: true,
      snapshotFormat: { printBasicPrototype: true },
      environment: "jsdom",
      setupFiles: ["./src/setupTests.js"],
      coverage: {
        provider: "v8",
        include: ["src/**/*.js"],
        exclude: ["src/**/*.test.js", "src/setupTests.js"],
        reporter: ["text", "html", "lcov"],
      },
    },
  };
});
