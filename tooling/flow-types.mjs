import { copyFile, cp } from "node:fs/promises";

// Flow consumes the original source, independently of the runtime bundles.
await cp("src/lib", "dist/flow", {
  recursive: true,
  filter: (path) => !path.endsWith(".test.js") && !path.endsWith(".scss"),
});
await copyFile("tooling/index.js.flow", "dist/draftail-tables.cjs.js.flow");
