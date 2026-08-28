/**
 * Central site configuration.
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
  tagline: "Where the world's best lawns go for gold",
  description:
    "The Lawn Care Olympics is the competition for lawn care enthusiasts: judged events in mowing precision, edging, stripe artistry, and turf revival. Register your lawn, compete in your division, and climb the leaderboard.",
  // Update once a real mailbox exists on the production domain.
  contactEmail: "hello@lawncareolympics.com",
  themeColor: "#14532d",
} as const;
