/**
 * Single source of truth for site + event constants.
 *
 * The canonical URL resolves in this order:
 *  1. NEXT_PUBLIC_SITE_URL — set this in Vercel once the custom domain is live
 *  2. VERCEL_PROJECT_PRODUCTION_URL — provided automatically on Vercel
 *  3. localhost fallback for local dev
 */
const resolvedUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Lawn Care Olympics",
  shortName: "LCO",
  url: resolvedUrl,
  tagline: "Where lawn care becomes a sport",
  description:
    "The first-ever Lawn Care Olympics — September 20, 2026 in Fayetteville, AR. Up to 150 operators compete across five live events for the title of first champion. Compete, attend, judge, exhibit, or sponsor. $10 at the door, 50% donated to New Beginnings.",
  themeColor: "#0a0f0d",
} as const;

// Event facts — mirrored from lawnly2 ui/src/views/lawn-olympics/_seo.tsx,
// which mirrors the server-side pricing configs. Do not invent details here.
export const event = {
  name: "Lawn Care Olympics",
  fullName: "First Lawn Care Olympics",
  start: "2026-09-20T08:00:00-05:00",
  end: "2026-09-20T17:00:00-05:00",
  dateDisplay: "September 20, 2026",
  competitorCap: 150,
  competitorFeeDisplay: "$150",
  attendeeFeeDisplay: "$10",
  vendorBoothDisplay: "$500",
  sponsorFloorDisplay: "$750",
  location: {
    name: "New Beginnings",
    street: "251 W 19th St",
    city: "Fayetteville",
    region: "AR",
    postal: "72701",
    country: "US",
  },
  addressDisplay: "251 W 19th St, Fayetteville, AR 72701",
  mapsUrl: "https://maps.google.com/?q=251+West+19th+Street+Fayetteville+AR+72701",
} as const;

// Conversion + detail pages on lawnly.com. Payments, forms, and data capture
// all continue to run there (and through the lawnly2 node-api behind it) —
// this site is the top-of-funnel aggregator. Apex domain: www 302s to apex.
const LAWNLY = "https://lawnly.com";

export const lawnlyUrls = {
  home: LAWNLY,
  attendees: `${LAWNLY}/lawn-olympics/attendees`,
  competitors: `${LAWNLY}/lawn-olympics/competitors`,
  competitorsEs: `${LAWNLY}/lawn-olympics/competitors/es`,
  competitorRegister: `${LAWNLY}/lawn-olympics/competitors/register`,
  judges: `${LAWNLY}/lawn-olympics/judges`,
  sponsors: `${LAWNLY}/lawn-olympics/sponsors`,
  vendors: `${LAWNLY}/lawn-olympics/vendors`,
  vendorRegister: `${LAWNLY}/lawn-olympics/vendors/register`,
  donate: `${LAWNLY}/lawn-olympics/new-beginnings/donate`,
  supportEmail: "support@lawnly.com",
} as const;

// The Lawnly apps download redirect: server-side OS detection 302s to the
// App Store / Google Play / fallback listing, and attributes the click via
// utm_campaign. Plain navigation (not fetch), so no CORS involvement.
const NODE_API =
  "https://lawnlynodeapiprod-h6ajh9c3bpe5c9c0.canadacentral-01.azurewebsites.net";
const PUBLIC_PREFIX = "/SLKJfSblksdfl139xeix8384";

export function appDownloadUrl(app: "customer" | "provider"): string {
  const params = new URLSearchParams({
    app,
    utm_source: "lawn_olympics",
    utm_medium: "web",
    utm_campaign: "lawn_olympics_home",
  });
  return `${NODE_API}${PUBLIC_PREFIX}/download?${params.toString()}`;
}
