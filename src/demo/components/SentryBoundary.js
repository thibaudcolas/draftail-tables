// @flow
import React, { Component } from "react";
import type { Node } from "react";
import * as Sentry from "@sentry/browser";

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;

type Props = {
  children: Node,
};

type State = {
  eventId: ?string,
  error: ?Error,
};

class SentryBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { eventId: null, error: null };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    if (SENTRY_DSN !== "") {
      Sentry.withScope((scope) => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId, error });
      });
    } else {
      this.setState({ error });
    }
  }

  render() {
    const { children } = this.props;
    const { eventId, error } = this.state;

    return error ? (
      <div className="DraftEditor-root">
        <div className="DraftEditor-editorContainer">
          <div className="public-DraftEditor-content">
            <div className="u-text-center">
              <p>Oops. The editor just crashed.</p>
              <p>
                Our team has been notified. You can provide us with more
                information if you want to.
              </p>
              <div>
                {SENTRY_DSN !== "" ? (
                  <button
                    type="button"
                    onClick={() => Sentry.showReportDialog({ eventId })}
                  >
                    Submit a report
                  </button>
                ) : (
                  <a
                    href="https://github.com/thibaudcolas/draftail-tables/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    Open a GitHub issue
                  </a>
                )}
                <span>&nbsp;</span>
                <button
                  type="button"
                  onClick={() => window.location.reload(false)}
                >
                  Reload the page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      children
    );
  }
}

export default SentryBoundary;
