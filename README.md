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
npx tsc --noEmit   # typecheck
npm run build      # production build
```

Site-wide constants (name, tagline, description, contact email) live in
[`lib/site.ts`](lib/site.ts).

## CI/CD

Two independent pieces:

1. **GitHub Actions** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml))
   runs lint, typecheck, and a production build on every push to `main` and
   every pull request.
2. **Vercel Git integration** — the repo is connected to the Vercel project,
   so every push to `main` triggers a production deploy and every PR gets a
   preview deployment automatically. No tokens or workflow config needed.

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
