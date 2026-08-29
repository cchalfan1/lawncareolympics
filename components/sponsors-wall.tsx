import Image, { type StaticImageData } from "next/image";

import communitiesUnlimited from "@/assets/sponsors/communities-unlimited.webp";
import dayvision from "@/assets/sponsors/dayvision.png";
import experienceFayetteville from "@/assets/sponsors/experience-fayetteville.png";
import hoopcliq from "@/assets/sponsors/hoopcliq.png";
import infiniteHerizon from "@/assets/sponsors/infinite-herizon.png";
import newBeginningsHoriz from "@/assets/sponsors/new-beginnings-horiz.png";
import williamsTractor from "@/assets/sponsors/williams-tractor.webp";

// Confirmed 2026 sponsors — mirrored from lawnly2's _ourSponsorsWall.tsx.
// `website` only where the brand's own URL was verified there. The wall of
// backend-approved sponsor logos is fetched dynamically on lawnly.com; here
// the confirmed set renders statically (no API dependency for v1).
interface ConfirmedSponsor {
  name: string;
  logo: StaticImageData;
  website?: string;
}

const CONFIRMED_SPONSORS: ConfirmedSponsor[] = [
  { name: "Williams Tractor", logo: williamsTractor, website: "https://www.williamstractors.com" },
  { name: "Communities Unlimited", logo: communitiesUnlimited },
  { name: "DayVision", logo: dayvision },
  { name: "New Beginnings NWA", logo: newBeginningsHoriz },
  { name: "HoopCliq", logo: hoopcliq },
  {
    name: "Experience Fayetteville",
    logo: experienceFayetteville,
    website: "https://www.experiencefayetteville.com",
  },
  {
    name: "Infinite HERizon",
    logo: infiniteHerizon,
    website: "https://www.infiniteherizon.com",
  },
];

function LogoCard({ sponsor }: { sponsor: ConfirmedSponsor }) {
  return (
    <div
      className="flex h-24 min-w-40 max-w-[220px] items-center justify-center rounded-[14px] border border-white/10 bg-white px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
      title={sponsor.name}
    >
      <Image
        src={sponsor.logo}
        alt={`${sponsor.name} logo`}
        className="h-auto max-h-14 w-auto max-w-full object-contain"
      />
    </div>
  );
}

export function SponsorsWall() {
  // Two identical copies; translateX(-50%) lands the second copy exactly
  // where the first began for a seamless loop.
  const loop = [...CONFIRMED_SPONSORS, ...CONFIRMED_SPONSORS];

  return (
    <section className="py-16 sm:py-[72px]">
      <div className="mx-auto mb-9 max-w-6xl px-4 text-center">
        <div className="mb-2.5 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-grass">
          The brands making the inaugural Games possible
        </div>
        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-ink-strong">
          Brought to you by
        </h2>
      </div>

      <div className="lo-sponsor-marquee" aria-label="Sponsor logos">
        <div className="lo-sponsor-track">
          {loop.map((sponsor, idx) => {
            const decorative = idx >= CONFIRMED_SPONSORS.length;
            const card = <LogoCard sponsor={sponsor} />;
            return sponsor.website ? (
              <a
                key={`${sponsor.name}-${idx}`}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mr-4 block shrink-0 sm:mr-7"
                aria-hidden={decorative || undefined}
                tabIndex={decorative ? -1 : undefined}
              >
                {card}
              </a>
            ) : (
              <div
                key={`${sponsor.name}-${idx}`}
                className="mr-4 shrink-0 sm:mr-7"
                aria-hidden={decorative || undefined}
              >
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
