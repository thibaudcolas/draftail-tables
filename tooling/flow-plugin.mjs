import { transformAsync } from "@babel/core";

// Keep the prototype's Flow types and JSX in .js files unchanged.
export function flowPlugin() {
  return {
    name: "prototype-flow-jsx",
    enforce: "pre",
    async transform(code, id) {
      if (
        !id.includes("/src/") ||
        !id.endsWith(".js") ||
        id.includes("/node_modules/")
      )
        return;
      const result = await transformAsync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        presets: [
          "@babel/preset-flow",
          ["@babel/preset-react", { runtime: "classic" }],
        ],
        sourceMaps: true,
      });
      return { code: result.code, map: result.map };
    },
  };
}
