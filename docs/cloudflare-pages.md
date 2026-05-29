# Cloudflare Pages Deployment Guide

Attendify Web is configured for static deployment on Cloudflare Pages. This guide captures the exact steps required to publish the site and attach the production domain `attendify-app.me`.

## What is deployed

- Next.js App Router frontend.
- Static export via `output: "export"`.
- Cloudflare Pages deployment from the `out/` directory.

## Build settings

Use these project settings in Cloudflare Pages:

- **Framework preset:** None.
- **Build command:** `npm run build`.
- **Build output directory:** `out`.
- **Node version:** 20.

The repository already contains the required static-export settings in `next.config.js`.

## GitHub Actions deployment

The repository uses `.github/workflows/deploy-cloudflare-pages.yml` to deploy production builds to Cloudflare Pages.

Required secret:

- `CLOUDFLARE_API_TOKEN`

Optional but recommended environment variables for GitHub Actions:

- `CF_PAGES_PROJECT_NAME=attendify-app`

## Domain setup for `attendify-app.me`

`attendify-app.me` is an apex domain. To make it open normally on Cloudflare Pages:

1. Ensure the domain is added to the same Cloudflare account that owns the Pages project.
2. Verify the domain's nameservers point to Cloudflare.
3. Create or select the Pages project for this repository.
4. Go to **Custom domains** and add `attendify-app.me`.
5. Activate the domain when Cloudflare prompts for confirmation.
6. If GitHub Pages or another provider previously served the domain, remove the old DNS record or nameserver mapping so Cloudflare can become the authoritative edge.

If the domain is still routed to GitHub Pages, visitors will keep seeing GitHub's 404 page until the DNS mapping is changed to Cloudflare Pages.

## Recommended DNS state

For a Cloudflare-managed apex domain:

- `attendify-app.me` -> Cloudflare Pages project.
- `www.attendify-app.me` -> redirect to apex, or map to the same Pages project if you want both.

## Verification checklist

After the domain is attached:

- `https://attendify-app.me/` loads the homepage.
- `https://attendify-app.me/access/` loads the access page.
- `https://attendify-app.me/portal/` loads the portal page.
- `https://attendify-app.me/subscriptions/` loads the plans page.
- `https://attendify-app.me/docs/` loads the docs portal.

## Troubleshooting

- If the domain shows a GitHub Pages 404, the DNS record is still pointing at GitHub Pages.
- If Cloudflare Pages shows the project but the domain is inactive, re-check nameservers and custom domain activation.
- If the build succeeds but the site is blank, verify the Pages project output directory is `out` and that `next.config.js` still uses `output: "export"`.
