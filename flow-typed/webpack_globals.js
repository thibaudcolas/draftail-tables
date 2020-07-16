// @flow
declare var REACT_APP_SENTRY_DSN: string | typeof undefined;
declare var process:
  | {
      env: {
        NODE_ENV: string,
      },
    }
  | typeof undefined;
