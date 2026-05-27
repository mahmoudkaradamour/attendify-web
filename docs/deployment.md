# Deployment Notes

Attendify Web is deployed independently from the backend control plane.

## Supported deployment targets

- Vercel.
- Any Next.js-compatible host that supports `next build` and `next start`.

## Build and release

```bash
npm ci
npm run build
```

## Runtime expectations

- Keep backend secrets out of the frontend repository.
- Treat the public shell as customer-facing and non-sensitive.
- Maintain consistent behavior across English and Arabic locales.

## Operational notes

- Use `.github/workflows/deploy-vercel.yml` for Vercel deployments.
- Keep frontend release cadence independent from backend release cadence.
