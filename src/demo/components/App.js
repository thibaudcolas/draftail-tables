// @flow
import React, { Component } from "react";

import DemoEditor from "../components/DemoEditor";

import "./App.scss";

const demoContent = {
  blocks: [
    {
      key: "99qpo",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "54qpo",
      text: "Hello, World!",
      type: "table-cell",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 7,
          length: 5,
          style: "BOLD",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "ci9rr",
      text: "",
      type: "table-cell",
      depth: 1,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "a0781",
      text: "",
      type: "table-cell",
      depth: 100,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "bv3e3",
      text: "This is an example of a table",
      type: "table-cell",
      depth: 101,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "dc2in",
      text: "",
      type: "table-cell",
      depth: 200,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "a6pf1",
      text: "It kind of works",
      type: "table-cell",
      depth: 201,
      inlineStyleRanges: [
        {
          offset: 3,
          length: 7,
          style: "BOLD",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "99aaa",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

class App extends Component<{}> {
  render() {
    return (
      <div className="App">
        <DemoEditor rawContentState={demoContent} />
      </div>
    );
  }
}

export default App;
