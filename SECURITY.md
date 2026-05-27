# Security

## Reporting vulnerabilities

Report any suspected vulnerability privately to the maintainers instead of opening a public issue.

## Disclosure rules

- Do not include exploit details in public channels.
- Do not commit secrets, credentials, or private tokens to this repository.
- Treat customer or tenant data as sensitive and avoid storing it in the frontend.

## Frontend-specific guidance

- The public shell must not expose backend credentials or privileged API keys.
- Localization assets and UI text should not contain secret or tenant-specific information.
- Any external integrations introduced in the frontend should be documented and reviewed before release.
