# Attaching a Custom Domain to Cloudflare Pages (attendify-app.me)

This document describes the manual steps and optional automation to attach the custom domain `attendify-app.me` to the Cloudflare Pages project `attendify-app` and to ensure TLS is provisioned.

Important: Domain and TLS activation require Cloudflare account access and DNS control — these steps cannot be completed purely from this local environment.

1) Verify Pages project and deployment

- Confirm a Pages deployment exists (example output when deployed): `https://a189dba7.attendify-app.pages.dev`

2) Attach the custom domain via Cloudflare dashboard

- In Cloudflare dashboard → Pages → your project (`attendify-app`) → Custom domains → Add domain
- Enter `attendify-app.me` and follow the UI prompts. Cloudflare will give DNS records to create (typically an `A`/`CNAME` or `TXT` validation).

3) DNS requirements

- Ensure `attendify-app.me` and `www.attendify-app.me` (if used) point to Cloudflare as the authoritative DNS provider.
- Add any required records provided by Pages (CNAME or TXT validation). Wait for propagation and the Pages UI to show the domain as active.

4) Troubleshooting notes

- If you see `ERR_CERT_COMMON_NAME_INVALID` in a browser: the Pages project has not completed TLS provisioning for this hostname.
- If Cloudflare dashboard is inaccessible in this environment, do the steps from a browser where you can log in to the Cloudflare account for the domain.

5) Optional: Attach domain via Cloudflare API (script)

You can automate domain attachment using the Cloudflare API. This requires an API token with Pages and Zone permissions and your Cloudflare `account_id`.

Example (POSIX shell, replace placeholders):

```bash
# Set these before running:
CF_API_TOKEN="${CF_API_TOKEN}" # export this securely
CF_ACCOUNT_ID="your_cloudflare_account_id"
PROJECT_NAME="attendify-app"
DOMAIN="attendify-app.me"

# Create a domain for the Pages project
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"name":"'${DOMAIN}'"}'
```

After creating the domain via API, Cloudflare will return validation records to add to DNS. Add them and poll the Pages API or dashboard until the domain becomes active.

6) Cloudflare Tunnel suggestion (local backend exposure)

If you want the Cloudflare Worker or Pages Functions to call your local development backend, use Cloudflare Tunnel:

```bash
# Install cloudflared and run:
cloudflared tunnel --url http://localhost:3000
```

This will provide a secure public ingress URL that you can set as your `BACKEND_URL` in the Worker configuration (or use for demoing webhooks).

7) Final notes

- After DNS and Pages domain activation, allow up to several minutes for TLS to provision. Use `https://<your-domain>` to confirm.
