# Lawn Care Olympics

Marketing/landing site for the Lawn Care Olympics — where the world's best
lawns go for gold. Built with [Next.js](https://nextjs.org) (App Router),
TypeScript, and Tailwind CSS v4, deployed on [Vercel](https://vercel.com).

## Stack & design goals

- **Fully static** — every route is prerendered at build time and served from
  Vercel's CDN. No client-side JavaScript components; the FAQ accordion uses
  native `<details>`.
- **SEO-complete** — canonical URLs, Open Graph + Twitter cards, a build-time
  generated OG image (`app/opengraph-image.tsx`), `sitemap.xml`, `robots.txt`,
  a web manifest, and JSON-LD structured data (Organization, WebSite, FAQPage).
- **Fast fonts** — Inter + Bricolage Grotesque self-hosted via `next/font`
  (no external font requests, no layout shift).

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npx next typegen && npx tsc --noEmit   # typecheck
npm run build      # production build
```

Site-wide constants (name, tagline, description, contact email) live in
[`lib/site.ts`](lib/site.ts).

## CI/CD

Two GitHub Actions workflows:

1. **CI** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) — lint,
   typecheck, and production build on every push to `main` and every PR.
2. **Deploy** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
   — uploads the source with the Vercel CLI and lets Vercel build and deploy
   it: production on every push to `main`, a preview deployment for every
   same-repo PR. Uses repo secrets `VERCEL_TOKEN` (project-scoped tokens
   work — the workflow avoids `vercel pull`, which they don't support),
   `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. If the token secret is missing,
   deploy jobs skip with a warning instead of failing.

**Alternative deploy setup:** grant the Vercel GitHub App access to this repo at
<https://github.com/settings/installations>, then connect it with
`vercel git connect` (or Vercel dashboard → Project → Settings → Git). That
enables Vercel's native auto-deploys with PR comments and needs no token — if
you go that route, delete `deploy.yml` so you don't deploy twice.

## Hooking up the custom domain

When the domain is ready:

1. Add it to the Vercel project: `vercel domains add <domain>` (or
   Project → Settings → Domains in the dashboard), then follow the DNS
   instructions Vercel prints (A record `76.76.21.21` for the apex, or a
   CNAME to `cname.vercel-dns.com` for subdomains).
2. Set the canonical URL so metadata, sitemap, and structured data use the
   real domain:

   ```bash
   vercel env add NEXT_PUBLIC_SITE_URL production
   # value: https://<domain>
   ```

   (Until then it falls back to the `*.vercel.app` production URL
   automatically.)
3. Update `contactEmail` in `lib/site.ts` once a mailbox exists on the domain.
4. After launch, submit the sitemap in
   [Google Search Console](https://search.google.com/search-console).
