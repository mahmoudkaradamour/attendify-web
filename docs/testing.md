# Testing Notes

## Verification matrix

| Area | Command | Notes |
| --- | --- | --- |
| Build verification | `npm run build` | Ensures the app compiles successfully. |
| Local runtime | `npm run dev` | Starts the app locally. |
| Browser E2E | `npm run test:e2e` | Runs Playwright against the local dev server. |

## Playwright prerequisites

Before running E2E tests on a fresh machine, install browser dependencies:

```bash
npx playwright install --with-deps
```

## CI alignment

- `frontend-ci.yml` validates build health.
- `playwright.yml` runs the browser E2E suite.
