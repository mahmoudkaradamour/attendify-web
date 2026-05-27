# Contributing

Thank you for contributing to Attendify Web. This document explains the expected workflow for changes, verification, and pull requests.

## Working locally

1. Create a branch for your change: `git checkout -b feat/my-change`.
2. Install dependencies: `npm install`.
3. Start the app locally: `npm run dev`.
4. Install Playwright browsers once if you plan to run E2E tests: `npx playwright install --with-deps`.

## Verification

- Build check: `npm run build`.
- Browser coverage: `npm run test:e2e`.
- There are currently no unit tests configured for this repo.

## Review expectations

- Keep changes scoped to the frontend repository.
- Include screenshots or screen recordings for visible UI changes.
- Update README or docs when behavior, routes, or deployment expectations change.
- Avoid introducing backend secrets or private tenant data into this repository.

## Pull requests

- Open a PR against `main`.
- Include a concise description of the user-facing change and verification performed.
- Link any related issues or backend changes if the UI depends on them.
