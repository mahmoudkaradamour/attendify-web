# Attendify Web

This repository contains the standalone Attendify Next.js frontend. It is tracked as a Git submodule from the backend repo and should be deployed independently.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build and verify

```bash
npm run build
npm run start
npm run test:e2e
```

Run Playwright browser installation once before E2E testing:

```bash
npx playwright install --with-deps
```

`npm run test:e2e` starts the frontend automatically through Playwright's web server configuration.

## CI

- Build verification runs in `.github/workflows/frontend-submodule-ci.yml` from the backend repo.
- End-to-end testing runs in `.github/workflows/playwright.yml` inside this repository.
