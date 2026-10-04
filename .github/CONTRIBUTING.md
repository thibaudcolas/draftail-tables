# Contribution Guidelines

We welcome bug reports, feature requests, code, design, reviews, tests, and documentation.

## Development

Use Node 26 (recorded in `.node-version` and `.nvmrc`), then install dependencies:

```sh
nvm install
npm ci
npm start
```

The demo runs at <http://localhost:5173/draftail-tables/>.

```sh
npm run lint           # Vite Plus checks, plus Flow-aware ESLint
npm run format         # Format tooling and documentation with Vite Plus
npm test               # Run the existing tests with Vitest
npm run test:watch
npm run test:coverage
npm run build          # Demo in build/, library and Flow definitions in dist/
npm run preview        # Serve the production demo
npm run report:package # Inspect the publishable files without publishing
npm run test:ci        # All local CI checks
```

## Tooling compatibility

The prototype remains on Draftail 2.0.0, Draft.js 0.10.5, and React 16.14.0.
Vite Plus provides the development server, build, library packaging, tests,
coverage, tooling linting, formatting, and staged checks. Its configuration is
in `vite.config.mts` ([Vite Plus configuration](https://viteplus.dev/config/)).

The prototype source and styles are intentionally preserved. Babel strips Flow
and compiles JSX at build time; ESLint parses the original Flow source because
Oxlint does not support it. Stylelint checks the existing Sass. Formatting excludes `src/`, `public/`, and the
original HTML to avoid rewriting the prototype. Flow definitions are included
in the published package; the legacy Flow type checker is no longer a CI gate.

Enzyme and its React 16 adapter remain in use. Cheerio is pinned to its compatible
CommonJS release, and jsdom 20 supports the error-boundary tests' location mock.
The existing Sass uses deprecated imports and division, so Sass may report
warnings until the prototype itself is revisited.

`npm ci` installs Vite Plus Git hooks. CI builds, tests, and uploads the demo and
coverage on GitHub Actions. Pushes to `main` also run semantic-release and
publish the demo to `gh-pages`; npm publishing needs trusted publishing or an
`NPM_TOKEN` repository secret.
