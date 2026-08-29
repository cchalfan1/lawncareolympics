import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { event, lawnlyUrls, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pageTitle = `Lawn Care Olympics 2026 — Compete, Attend, Sponsor | ${event.dateDisplay} · Fayetteville, AR`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: pageTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "lawn care olympics",
    "lawn care competition",
    "lawn mowing contest",
    "Fayetteville AR events",
    "lawn care event 2026",
    "landscaping competition",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: pageTitle,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

// Event + Organization structured data — facts mirrored from the lawnly.com
// Lawn Olympics pages (which mirror the server-side pricing configs).
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      name: event.fullName,
      description: site.description,
      startDate: event.start,
      endDate: event.end,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      inLanguage: "en-US",
      isAccessibleForFree: false,
      maximumAttendeeCapacity: event.competitorCap,
      location: {
        "@type": "Place",
        name: `Lawn Care Olympics — ${event.location.city}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: event.location.street,
          addressLocality: event.location.city,
          addressRegion: event.location.region,
          postalCode: event.location.postal,
          addressCountry: event.location.country,
        },
      },
      offers: [
        {
          "@type": "Offer",
          name: "Founding Competitor Entry",
          price: "150.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: lawnlyUrls.competitorRegister,
          category: "Competition entry",
          inventoryLevel: { "@type": "QuantitativeValue", value: event.competitorCap },
        },
        {
          "@type": "Offer",
          name: "General Admission",
          price: "10.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: lawnlyUrls.attendees,
          category: "Spectator admission",
        },
      ],
      organizer: {
        "@type": "Organization",
        name: "Lawnly",
        url: lawnlyUrls.home,
      },
      url: site.url,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
