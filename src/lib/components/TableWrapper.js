// @flow
import React from "react";
import type { Node } from "react";

type Props = {|
  children: Node,
|};

const TableWrapper = ({ children }: Props) => {
  const tables = [];
  let tablesCount = -1;

  React.Children.forEach(children, (child) => {
    const { block } = child.props.children.props;
    if (block.getDepth() === 0) {
      tablesCount += 1;
    }

    const column = block.getDepth() % 100;
    const row = Math.floor(block.getDepth() / 100);

    if (!tables[tablesCount]) {
      tables[tablesCount] = [];
    }
    if (!tables[tablesCount][row]) {
      tables[tablesCount][row] = [];
    }

    tables[tablesCount][row][column] = child;
  });

  return (
    <div className="DraftailTables-TableWrapper">
      {tables.map((rows, i) => (
        <div key={i} className="DraftailTables-TableWrapper__table">
          {rows.map((row, j) => (
            <div key={row[0].key} className="DraftailTables-TableWrapper__tr">
              {row.map((cell, s) => (
                <div key={cell.key} className="DraftailTables-TableWrapper__td">
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableWrapper;
