// @flow
import React, { useState, useMemo } from "react";
import type { RawDraftContentState } from "draft-js/lib/RawDraftContentState";
// flowlint untyped-import:off
import {
  DraftailEditor,
  createEditorStateFromRaw,
  serialiseEditorStateToRaw,
  INLINE_STYLE,
  BLOCK_TYPE,
} from "draftail";
// flowlint untyped-import:error

import SentryBoundary from "./SentryBoundary";
import Highlight from "./Highlight";

import "./DemoEditor.scss";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";

import { createTablesPlugin } from "../../lib/index";

type Props = {
  rawContentState: null | RawDraftContentState,
};

/**
 * Demo editor.
 */
const DemoEditor = ({ rawContentState }: Props) => {
  const initialState = useMemo(
    () => createEditorStateFromRaw(rawContentState),
    [rawContentState],
  );
  const tablesPlugin = useMemo(() => createTablesPlugin(), []);
  const [editorState, setEditorState] = useState(initialState);
  return (
    <div className="DemoEditor">
      <SentryBoundary>
        <DraftailEditor
          editorState={editorState}
          onChange={setEditorState}
          inlineStyles={[{ type: INLINE_STYLE.BOLD }]}
          blockTypes={[{ type: BLOCK_TYPE.UNORDERED_LIST_ITEM }]}
          plugins={[tablesPlugin]}
        />
      </SentryBoundary>
      <details>
        <summary>
          <span className="link">Debug</span>
        </summary>
        <Highlight
          value={JSON.stringify(
            serialiseEditorStateToRaw(editorState),
            null,
            2,
          )}
        />
      </details>
    </div>
  );
};

export default DemoEditor;
