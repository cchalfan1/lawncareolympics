# Porting the Lawn Olympics

Assessment (2026-08-28) of moving the Lawn Care Olympics out of the `lawnly2`
monorepo (`~/gitlab/lawnly2`, inventoried on branch
`feature/rush-pricing-timing-tiers`) into this standalone repo on Vercel.
Shareable version: https://claude.ai/code/artifact/3ababdf9-b6ed-47d9-b479-9e3fa3e7e750

## Verdict

- **This is a full business vertical, not a set of pages**: 10 frontend routes
  (incl. a hand-authored Spanish page and three card-checkout flows), four
  payment products on **Finix — not Stripe** (Stripe is explicitly deactivated),
  a judge application pipeline, magic-link sponsor-packet delivery, SendGrid
  receipts, newsletter segmentation, settlement sweeps, and an admin lead console.
- **Recommendation: port the frontend, keep the `lawnly2` node-api as the
  backend.** Forms and checkouts keep POSTing browser→API as today. The only
  mandatory backend change is CORS for the new origin.
- **Timing is the biggest consideration**: the event is **2026-09-20**. Emailed
  `?tier=`/`?d=`/`?invite=` links, ad pixels, and Google's index all point at
  `lawnly.com/lawn-olympics/*` today.

## Route inventory & disposition

| Route (`lawnly.com/lawn-olympics/…`) | What it is | Disposition |
| --- | --- | --- |
| `/attendees` | Spectator landing — $10 at door, sponsor wall, email capture | PORT |
| `/competitors` | Competitor sales page — $150 Founding Rate, FAQ JSON-LD | PORT |
| `/competitors/es` | Hand-authored Spanish twin (hreflang pair) | PORT |
| `/competitors/register` | Paid 2-step Finix checkout, noindex | PORT (risk) |
| `/judges` | Judge application + judges wall; `?invite=true` copy fork | PORT |
| `/sponsors` | Tiers $750/$1,750/$3,250/$8,000 (+$30k mailto-only); packet form | PORT |
| `/sponsors/checkout` | Unlinked 3-step checkout, reached via emailed `?tier=` URLs | PORT (risk) |
| `/vendors` | Vendor booth sales — $500, FAQ JSON-LD, email capture | PORT |
| `/vendors/register` | Paid checkout; `?d=` discount (`aotc` → $350) | PORT (risk) |
| `/new-beginnings/donate` | Charity donation $5–$999 + 5% fee on top, separate Finix merchant | PORT? (decide) |
| `/administration/lawn-olympics-leads` | Admin lead console + CSV exports | KEEP in lawnly2 |

## Frontend port list

- **SEO head (`_seo.tsx`) is replaced, not ported** — Next.js Metadata API +
  SSG kills the manual Puppeteer prerender + restamp pipeline entirely. Carry
  the content: Event/BreadcrumbList/Organization/Offer/FAQPage/DonateAction
  JSON-LD, hreflang, `og:image:secure_url`.
- Shared partials: countdown banner (client component; 4 variants, EN/ES),
  the **five** competition events section, sponsors wall (5 hardcoded + API
  fetch of approved sponsors), judges wall (12 hardcoded judges + headshots),
  newsletter CTA (segment/tag parameterized), Lawnly apps cross-sell (decide),
  **FinixTokenizationForm + FinixProvider + fraud session** (client components),
  consent manager + PrivacyChoicesLink (required if pixels ship).
- Assets: poster webp, hero `lawncare.jpg`, 3 gallery images, 12 headshots,
  sponsor logos, New Beginnings art, OG image (or regenerate via Next OG route).
  One referenced file is missing in lawnly2 (`new-beginnings-neighborhood.jpg`).
- Constants to consolidate in `lib/site.ts`: event start/end (hardcoded in 3
  files today), venue `251 W 19th St, Fayetteville, AR 72701`, capacity 150,
  prices, API base + obfuscated prefix (repeated in 7 files).
- Styling reality: the six big pages are 1,000–1,900-line components with
  inline styles. Fastest path is transplanting JSX nearly as-is; Tailwind
  rebuild roughly doubles page work.

## Data capture

Six capture points, all writing into `lawn_olympics_signups` (+ payment
tables) and newsletter segmentation (insert-only — never resurrects an
unsubscribe); per-IP rate limits; anti-enumeration 200s:

attendee email, vendor email, judge application (Google Places autocomplete —
Maps key must allow the new domain), sponsor packet request (multipart logo
≤5 MB), newsletter subscribe (segment+tag), donation leads (fired on step
transitions so abandoned checkouts stay contactable).

Considerations:

- **CORS is the one mandatory backend change** — the new domain is a
  cross-origin caller to node-api.
- **Attribution is half-built; the port can finish it.** The signup API accepts
  `attribution` (UTM ×5, gclid, fbclid, referrer, landing_path) and the admin
  console displays it, but the UI never sends it (`adAttribution.ts` is dead
  code); server falls back to Referer. Wire real first-touch capture on the new
  site. Paid checkouts accept no attribution — capture-at-signup is the hook.
- New domain needs its own privacy policy + consent gating if pixels ship.

## Payments (Finix)

- Browser tokenizes in Finix-hosted iframes (`TK…` + fraud session); server
  runs identity → instrument → transfer with **server-authoritative pricing**.
- Products: competitor $150; sponsorships $750/$1,750/$3,250/$8,000 + hidden
  legacy tier $500 (`?tier=…`, expires 2026-09-15) + $30k mailto-only; vendor
  $500 (code `aotc` → $350); donations $5–$999 + 5% fee (50¢ floor) on top,
  charged to New Beginnings' own merchant with a hard no-fallback guard.
- **Don't rewrite the backend now**: the idempotency/duplicate machinery
  (~100 lines/service, ~28 tests/flow) encodes hard-won semantics — key reuse
  on network errors, re-mint only on definitive 400/402, Finix-422 duplicate
  recovery, unconfirmable duplicate ⇒ **409 never 402** (prevents
  double-charging), DB race recovery, PENDING = success.
- Settlement sweep is an in-process self-rescheduling timer (8 ET hours daily)
  with an escrow-protection guard; on Vercel it must become a UTC cron — defer,
  keep with the API. No webhooks; refunds are manual in the Finix dashboard.
- Frontend must preserve: client idempotency-key discipline, the 400/402/409
  handling, and query params on live emailed links.
- **Verify Finix tokenization + fraud session work on the new origin** before
  trusting any test checkout.
- Receipts come from `support@lawnly.com` via SendGrid (hardened wrapper);
  rebranding = SendGrid domain auth + template edits, defer.

## Tracking

- **X pixel does real conversion work**: checkout-begin + purchase fire with
  Finix `referenceId` as dedup id; pixel is site-wide so `twclid` survives the
  landing→register hop. If X ads run through the move, port it or attribution
  breaks silently. (`trackXSignUp` is dead code.)
- Also present, consent-gated: Meta Pixel, GA4, Hotjar, PostHog, Firebase
  Analytics, Sentry. Minimum port: pixels backing live spend + one analytics
  tool + consent manager.

## Stays in lawnly2

All API endpoints/models/migrations, Finix services + sweeps + ops scripts,
SendGrid wrapper + 6 templates, sponsor-packet storage + JWT links (fixed
expiry: event end + 1 day), newsletter infra, admin console/exports/logo
approval, lawnly.com promo banner (retarget its CTA; self-removes after event
day). Zero data migration needed (~25–40 signups, <10 sponsorships, 2
competitor payments per file evidence).

## SEO & domain cutover

- Canonicals point at `www.lawnly.com/lawn-olympics/*`; new domain starts with
  zero authority ~3 weeks pre-event. Mitigation: complete **query-preserving
  301s at Azure Front Door** (not SPA JS), Search Console verification, likely
  drop the `/lawn-olympics` prefix on the new domain.
- Fix inherited gaps: lawnly.com sitemap lists only 3 of 7 indexable LO pages
  (missing sponsors, vendors, competitors/es, donate); keep EN↔ES hreflang;
  FAQ JSON-LD sourced from the same array that renders the accordion.
- Sequencing option: launch new domain as marketing home now, keep lawnly.com
  serving checkouts until event day, 301 after the event.

## Fix-while-porting

- Dead columns on competitor registrations (`quantity`, `unit_price_cents`,
  `discount_percent`, `competitor_names`) vs. a real $540 qty-4 crew order
  charged 2026-08-17 apparently out-of-band — revive or drop, don't port the
  ambiguity.
- Vendor registrations missing from the newsletter backfill union.
- Dead client attribution util; sitemap gaps; missing donation image; dead
  `trackXSignUp`; event date triple-hardcoded.
- **Five events, not six** (a receipt test asserts this) — replace all invented
  placeholder copy on this repo's current landing page with real event facts.

## Phased plan

1. **Foundation (~1 day)** — CORS for new origin; Finix domain verification;
   consolidate constants into `lib/site.ts`; port assets; replace placeholder
   copy so nothing false gets indexed.
2. **Content pages (~2–3 days)** — 5 landing pages + ES + shared partials,
   Next Metadata replacing `_seo.tsx`; forms wired to existing API with
   attribution added.
3. **Checkouts (~2 days incl. sandbox)** — Finix client components; competitor/
   sponsorship/vendor/donation flows with exact idempotency + error semantics;
   sandbox runs incl. hidden-tier and discount URLs.
4. **Tracking, consent, cutover (~1–2 days)** — consent manager + live-spend
   pixels; privacy policy; Front Door 301 map; retarget promo banner; Search
   Console; watch first real transactions.

## Open decisions

1. Cut over before the event with 301s, or run new domain as Season-2 home?
2. Does the donation page move or stay a lawnly.com property?
3. ~~Keep the Lawnly apps cross-sell on the new brand's site?~~ **Decided
   2026-08-29: yes** — a prominent "Brought to you by Lawnly" section
   highlighting both the homeowner and provider apps with attributed download
   links, modeled on `_lawnlyAppsSection` from the competitor/attendee pages.
   Reuse any lawnly2 assets as needed.
4. Revive or drop crew-quantity competitor orders?
5. Receipt/email branding: stay `support@lawnly.com` for now?

## Addendum (2026-08-29): branch state

`lawnly2` **master is stale** (last merge 2026-07-01). The vendor landing/
registration pages, donation page, judges wall, events section, newsletter CTA,
apps section, and promo banner exist **only on `feature/rush-pricing-timing-tiers`**
— which matches what production (lawnly.com) actually serves. Copy work should
source from the feature branch / live site, not master, unless master gets
updated first. (www.lawnly.com 302s to apex lawnly.com; live pages verified 200.)
