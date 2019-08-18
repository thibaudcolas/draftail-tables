import { createTablesPlugin } from "./index";

const pkg = require("../../package.json");

/**
 * Makes sure the API shape is validated against.
 */
describe(pkg.name, () => {
  it("createTablesPlugin", () => expect(createTablesPlugin).toBeDefined());
});
