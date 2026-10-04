import babelParser from "@babel/eslint-parser";

export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-flow", "@babel/preset-react"],
        },
      },
      globals: Object.fromEntries(
        [
          "window",
          "document",
          "navigator",
          "console",
          "global",
          "require",
          "describe",
          "it",
          "expect",
          "beforeEach",
          "afterEach",
          "vi",
        ].map((name) => [name, "readonly"]),
      ),
    },
    rules: {
      "no-undef": "error",
      "no-unreachable": "error",
      "no-dupe-keys": "error",
      "no-constant-condition": "error",
    },
  },
];
