// @flow
import React from "react";
import { DefaultDraftBlockRenderMap } from "draft-js";

import TableWrapper from "../components/TableWrapper";

const blockRenderMap = DefaultDraftBlockRenderMap.clear().set("table-cell", {
  element: "div",
  // $FlowFixMe
  wrapper: <TableWrapper />,
});

const createTablesPlugin = () => {
  return {
    blockRenderMap,
  };
};

export default createTablesPlugin;
