// @flow
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";

import "./demo/utils/elements.scss";
import "./demo/utils/typography.scss";
import "./demo/utils/layout.scss";
import "./demo/utils/objects.scss";

import "./demo/components/header.scss";
import "./demo/components/page-nav.scss";

import "./demo/utils/utilities.scss";

import "./lib/index.scss";

import App from "./demo/components/App";

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;

if (SENTRY_DSN !== "") {
  Sentry.init({ dsn: SENTRY_DSN });
}

const mount = document.getElementById("root");

if (mount) {
  ReactDOM.render(<App />, mount);
}
