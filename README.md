# Attendify Web

Attendify Web is the standalone Next.js front door for the Attendify platform. It is deployed independently from the backend control plane and is designed to present the product, capture traffic, and provide a premium bilingual experience.

## What lives here

- Public landing and product shell.
- Bilingual UI support for English and Arabic.
- Shared shell, navigation, language provider, and footer components.
- Playwright-based end-to-end coverage for the public experience.

## Architecture at a glance

- Next.js 14 App Router.
- React 18 with localized client-side UI state where needed.
- Premium blue-gradient visual language with expressive typography.
- Separate deployment target from the backend server.

## Repository map

- `app/` — page-level routes and layout.
- `components/` — shell, navigation, footer, and language provider.
- `lib/` — locale helpers and shared front-end utilities.
- `public/` — static assets.
- `tests-e2e/` — Playwright end-to-end tests.
- `.github/workflows/` — build, E2E, and deployment pipelines.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

If Playwright browsers are not installed yet:

```bash
npx playwright install --with-deps
```

## Build and verification

```bash
npm run build
npm run start
npm run test:e2e
```

`npm run test:e2e` starts the frontend automatically through Playwright's web server configuration.

## Documentation

- Overview: [docs/README.md](docs/README.md)
- Deployment notes: [docs/deployment.md](docs/deployment.md)
- Testing notes: [docs/testing.md](docs/testing.md)
- Security policy: [SECURITY.md](SECURITY.md)
- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md)

## Deployment

The frontend is deployed independently from the backend. GitHub Actions includes a build workflow, a Playwright workflow, and a Vercel deployment workflow.

## Relationship to Attendify Server

This repository is separate from the backend repository. Use it as the dedicated frontend codebase rather than a backend subfolder.
