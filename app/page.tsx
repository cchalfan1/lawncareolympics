import Image from "next/image";
import type { ReactNode } from "react";

import { CountdownBanner } from "@/components/countdown-banner";
import { EventsSection } from "@/components/events-section";
import { JudgesWall } from "@/components/judges-wall";
import { LawnlyAppsSection } from "@/components/lawnly-apps";
import { SponsorsWall } from "@/components/sponsors-wall";
import { event, lawnlyUrls } from "@/lib/site";

import gall1 from "@/assets/gallery/gall1.webp";
import gall2 from "@/assets/gallery/gall2.webp";
import gall3 from "@/assets/gallery/gall3.webp";
import lawncareBg from "@/assets/lawncare.jpg";
import lawnlyLogo from "@/assets/lawnly-logo.svg";
import nbLogo from "@/assets/new-beginnings-logo.png";
import poster from "@/assets/poster.webp";

// ---------------------------------------------------------------------------
// FAQ — aggregated from the lawnly.com competitor and vendor pages (verbatim
// where possible). Single source for both the accordion and FAQPage JSON-LD.
// ---------------------------------------------------------------------------

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What does it cost to enter as a competitor?",
    a: "$150 — the Founding Competitor Rate. That covers entry across all five events and access to the awards ceremony. Locked in for the inaugural class only.",
  },
  {
    q: "How many competitor spots are there?",
    a: "Entries are capped at 150 competitors. Registration is open now, and spots are first come, first served.",
  },
  {
    q: "Do competitors need to bring their own equipment?",
    a: "No — we supply the equipment for event day. The machines and tools you compete with are provided on-site, so nobody has to haul a trailer to Fayetteville and every operator works with the same gear.",
  },
  {
    q: "How are events scored?",
    a: "Every event is judged on four criteria — speed, precision, cleanliness, and execution — with a published rubric per category. The First Lawn Care Olympics Champion is the operator with the best combined score across all five events.",
  },
  {
    q: "What do the winners get?",
    a: "First place takes the champion trophy, the title of First Lawn Care Olympics Champion, a grand prize including a weed eater and/or blower, and 3 months of Lawnly Growth free ($450 value). Second place earns a silver medal, the bragging rights, and 3 months of Lawnly Growth free.",
  },
  {
    q: "How much is admission for spectators?",
    a: "$10 at the door, all ages welcome. 50% of attendance proceeds are donated to New Beginnings, the Fayetteville nonprofit hosting the Games.",
  },
  {
    q: "What does the $500 vendor booth fee cover?",
    a: "A dedicated vendor booth space at the event, all-day access to the spectator crowd, and a listing as an official event vendor. Booth assignment, load-in times, and setup details are emailed to you after you register.",
  },
  {
    q: "What is the difference between a vendor booth and a sponsorship?",
    a: "A vendor booth is presence on the grounds — your space, your day, your customers. A sponsorship adds brand placement across the event and our marketing: stage callouts, logo placement, and category exclusivity at the upper tiers. Sponsorships start at $750 and several include booth space.",
  },
  {
    q: "Are entry and booth fees refundable?",
    a: "No. All payments are non-refundable, including if you are unable to attend or the lineup changes. The Games run rain or shine on September 20, 2026.",
  },
  {
    q: "I'm coming in from out of town. Where should we stay?",
    a: "Fayetteville has plenty of options. Registered competitors will receive a recommended hotel partner list and a venue map closer to event week.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

// ---------------------------------------------------------------------------
// Audience router — one card per user type, with two equally-weighted CTAs:
// the conversion point (register / checkout / apply) and the full detail page
// on lawnly.com. Accents mirror lawnly.com's per-page palette.
// ---------------------------------------------------------------------------

type Accent = "gold" | "grass" | "sky" | "amber";

const ACCENT_STYLES: Record<
  Accent,
  { eyebrow: string; card: string; primary: string; secondary: string; check: string }
> = {
  gold: {
    eyebrow: "border-gold/30 bg-gold/10 text-gold",
    card: "border-gold/30 bg-gradient-to-br from-gold/[0.12] to-gold-deep/[0.06]",
    primary:
      "bg-gradient-to-br from-gold to-gold-deep text-ground shadow-[0_8px_32px_rgba(251,191,36,0.35)]",
    secondary: "border border-gold/45 bg-white/[0.06] text-gold",
    check: "border-gold/50 bg-gold/[0.15] text-gold",
  },
  grass: {
    eyebrow: "border-grass/30 bg-grass/10 text-grass",
    card: "border-grass/30 bg-gradient-to-br from-grass/[0.10] to-grass-deep/[0.05]",
    primary:
      "bg-gradient-to-br from-grass-deep to-[#15803d] text-white shadow-[0_8px_32px_rgba(22,163,74,0.35)]",
    secondary: "border border-grass/45 bg-white/[0.06] text-grass",
    check: "border-grass/50 bg-grass/[0.15] text-grass",
  },
  sky: {
    eyebrow: "border-sky/30 bg-sky/10 text-sky",
    card: "border-sky/30 bg-gradient-to-br from-sky/[0.10] to-indigo/[0.06]",
    primary:
      "bg-gradient-to-br from-sky to-indigo text-white shadow-[0_8px_32px_rgba(56,189,248,0.35)]",
    secondary: "border border-sky/45 bg-white/[0.06] text-sky",
    check: "border-sky/50 bg-sky/[0.15] text-sky",
  },
  amber: {
    eyebrow: "border-amber/30 bg-amber/10 text-amber",
    card: "border-amber/30 bg-gradient-to-br from-gold/[0.10] to-amber-deep/[0.06]",
    primary:
      "bg-gradient-to-br from-gold to-amber-deep text-ground shadow-[0_8px_32px_rgba(245,158,11,0.35)]",
    secondary: "border border-amber/45 bg-white/[0.06] text-amber",
    check: "border-amber/50 bg-amber/[0.15] text-amber",
  },
};

interface AudienceCardProps {
  accent: Accent;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  points: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  footnote?: ReactNode;
}

function CtaButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(external && !href.startsWith("mailto:")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 py-4 text-center text-[0.98rem] font-extrabold transition-transform hover:-translate-y-0.5 sm:flex-none ${className}`}
    >
      {children}
    </a>
  );
}

function AudienceCard({
  accent,
  eyebrow,
  title,
  lede,
  points,
  primary,
  secondary,
  footnote,
}: AudienceCardProps) {
  const s = ACCENT_STYLES[accent];
  return (
    <div className={`rounded-3xl border p-7 sm:p-10 ${s.card}`}>
      <div
        className={`mb-4 inline-block rounded-lg border px-3.5 py-[5px] text-[0.76rem] font-bold uppercase tracking-[0.1em] ${s.eyebrow}`}
      >
        {eyebrow}
      </div>
      <h3 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-black leading-tight tracking-tight text-ink">
        {title}
      </h3>
      <p className="mb-6 max-w-2xl text-[1.02rem] leading-relaxed text-soft">{lede}</p>
      <ul className="mb-7 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-[0.96rem] leading-normal text-soft">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold ${s.check}`}
            >
              ✓
            </span>
            {point}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 sm:flex-row">
        <CtaButton href={primary.href} className={s.primary}>
          {primary.label}
        </CtaButton>
        <CtaButton href={secondary.href} className={s.secondary}>
          {secondary.label}
        </CtaButton>
      </div>
      {footnote && <div className="mt-4 text-[0.85rem] text-mute">{footnote}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small shared bits
// ---------------------------------------------------------------------------

function SectionEyebrow({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div
      className={`mb-5 inline-block rounded-lg border px-3.5 py-[5px] text-[0.78rem] font-bold uppercase tracking-[0.08em] ${color}`}
    >
      {children}
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="mb-5 flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-grass/25 bg-grass/[0.12] text-xl">
        {icon}
      </div>
      <div>
        <div className="mb-0.5 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-dim">
          {label}
        </div>
        <div className="text-[1.05rem] font-semibold text-body">{value}</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <CountdownBanner />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative flex min-h-[88vh] items-center overflow-hidden py-20 sm:py-24">
          <Image
            src={lawncareBg}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#091510]/95 via-[#091510]/80 to-[#091510]/95" />
          <div
            aria-hidden
            className="absolute -right-52 -top-52 h-[700px] w-[700px] rounded-full border border-grass/[0.07]"
          />
          <div
            aria-hidden
            className="absolute -right-28 -top-28 h-[460px] w-[460px] rounded-full border border-grass/[0.12]"
          />

          <div className="relative z-[1] mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div className="mb-7 inline-flex items-center gap-3.5 opacity-95">
              <span className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-mute">
                Presented by
              </span>
              <Image src={lawnlyLogo} alt="Lawnly" className="h-10 w-auto" />
            </div>

            <div className="mb-8 block">
              <span className="inline-flex items-center gap-2 rounded-full border border-grass/30 bg-grass/10 px-5 py-2 text-[0.85rem] font-bold uppercase tracking-[0.05em] text-grass">
                <span>🏆</span>
                <span>The Inaugural Games · Fayetteville, AR</span>
              </span>
            </div>

            <h1 className="mb-7 text-[clamp(2.8rem,7vw,5.2rem)] font-black leading-[1.08] tracking-tight text-ink">
              The Lawn Care{" "}
              <span className="bg-gradient-to-br from-grass to-grass-deep bg-clip-text text-transparent">
                Olympics
              </span>{" "}
              is Coming
            </h1>

            <p className="mx-auto mb-4 max-w-[640px] text-[clamp(1.1rem,2.5vw,1.35rem)] leading-relaxed text-mute">
              The ultimate celebration of lawn care excellence — where the finest mowers, trimmers,
              and turf artisans compete for glory in Fayetteville, Arkansas.
            </p>

            <p className="mb-7 text-[1.05rem] font-semibold text-grass">
              {event.dateDisplay} · New Beginnings · Fayetteville, AR
            </p>

            <div className="mb-11 inline-flex items-center gap-2.5 rounded-xl border border-gold/30 bg-gold/[0.08] px-4 py-2.5 text-[0.92rem] text-[#fde68a]">
              <span className="text-lg">🎟️</span>
              <span>
                <strong className="font-extrabold text-gold">$10 at the door</strong>
                &nbsp;·&nbsp;50% donated to New Beginnings
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#join"
                className="rounded-xl bg-gradient-to-br from-grass-deep to-[#15803d] px-9 py-4 text-[1.05rem] font-bold text-white shadow-[0_8px_32px_rgba(22,163,74,0.35)] transition-transform hover:-translate-y-0.5"
              >
                Find Your Lane ↓
              </a>
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/[0.12] bg-white/[0.06] px-9 py-4 text-[1.05rem] font-semibold text-body transition-colors hover:bg-white/10"
              >
                📍 View Venue
              </a>
            </div>
          </div>
        </section>

        {/* ── SPONSOR WALL ─────────────────────────────────────── */}
        <SponsorsWall />

        {/* ── STATS BAR ────────────────────────────────────────── */}
        <section className="border-y border-grass/10 bg-grass/5 py-10 sm:py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4">
            {[
              { value: "Sep 20", label: "Event Date · 2026", icon: "📅" },
              { value: "$10", label: "At the Door · 50% donated", icon: "🎟️" },
              { value: "5", label: "Live Competition Events", icon: "🏆" },
              { value: "150", label: "Competitor Cap", icon: "🚜" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-grass/20 bg-white/5 px-6 py-7 text-center backdrop-blur-sm"
              >
                <div className="mb-2 text-4xl">{stat.icon}</div>
                <div className="mb-1.5 text-[2.2rem] font-extrabold leading-none text-grass">
                  {stat.value}
                </div>
                <div className="text-[0.95rem] font-medium text-mute">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-grass/15 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <Image
                src={poster}
                alt="The First Annual Lawn Care Olympics — Can You Prove You're the Best?"
                className="block h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <div>
              <SectionEyebrow color="border-grass/25 bg-grass/10 text-grass">
                About the Event
              </SectionEyebrow>
              <h2 className="mb-5 text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-tight text-ink-strong">
                Where Lawn Care Becomes a Sport
              </h2>
              <div className="mb-8 h-1 w-[72px] rounded-sm bg-gradient-to-r from-grass to-grass-deep" />
              <p className="mb-5 text-[1.05rem] leading-[1.75] text-mute">
                The Lawn Care Olympics is a first-of-its-kind community event celebrating the
                skilled professionals who keep our neighborhoods green and beautiful. Watch real
                providers compete head-to-head across five live events — from the zero turn
                obstacle course to the marquee Scythe Challenge.
              </p>
              <p className="mb-8 text-[1.05rem] leading-[1.75] text-mute">
                Whether you&apos;re a homeowner looking for inspiration, or simply here to cheer on
                your favorite lawn crew, this is one day you won&apos;t want to miss.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Family Friendly", "Benefits New Beginnings", "Live Demonstrations", "Community Fun"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-[0.88rem] font-semibold text-soft"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── THE FIVE EVENTS ──────────────────────────────────── */}
        <EventsSection />

        {/* ── EVENT DETAILS ────────────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <SectionEyebrow color="border-grass/25 bg-grass/10 text-grass">
                Event Details
              </SectionEyebrow>
              <h2 className="text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold text-ink-strong">
                Mark Your Calendar
              </h2>
            </div>

            <div className="rounded-3xl border border-grass/15 bg-white/[0.04] p-7 sm:p-12">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <DetailRow icon="📅" label="Date" value="Sunday, September 20, 2026" />
                  <DetailRow icon="🕐" label="Doors Open" value="8:00 AM CDT" />
                  <DetailRow icon="🏁" label="Competition Start" value="9:00 AM CDT" />
                  <DetailRow icon="🏆" label="Awards Ceremony" value="4:30 PM CDT" />
                </div>
                <div>
                  <DetailRow icon="📍" label="Venue" value="New Beginnings" />
                  <DetailRow icon="🗺️" label="Address" value="251 West 19th Street, Fayetteville, AR 72701" />
                  <DetailRow icon="🎟️" label="Admission" value="$10 at the Door · All Ages Welcome" />
                  <DetailRow icon="🌤️" label="Rain Policy" value="Rain or shine event" />
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3.5 rounded-[14px] border border-grass/[0.18] bg-grass/[0.06] px-6 py-5">
                <span className="text-2xl">🚗</span>
                <p className="text-[0.95rem] leading-relaxed text-mute">
                  Ample free parking available on-site. The venue is also accessible by public
                  transit — Route 18 stops one block away on West 19th Street.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── AUDIENCE ROUTER ──────────────────────────────────── */}
        <section id="join" className="scroll-mt-6 border-y border-white/5 bg-white/[0.02] py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-14 text-center">
              <SectionEyebrow color="border-gold/30 bg-gold/10 text-gold">
                Find Your Lane
              </SectionEyebrow>
              <h2 className="mb-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold text-ink-strong">
                Five ways into the Games
              </h2>
              <p className="mx-auto max-w-[640px] text-[1.05rem] leading-relaxed text-mute">
                Compete, watch, judge, exhibit, or sponsor — every lane leads to the same field on
                September 20.
              </p>
            </div>

            <div className="space-y-8">
              <AudienceCard
                accent="gold"
                eyebrow="For Lawn Pros · Registration Is Open"
                title={
                  <>
                    Compete in the{" "}
                    <span className="bg-gradient-to-br from-gold to-gold-deep bg-clip-text text-transparent">
                      First
                    </span>{" "}
                    Lawn Care Olympics
                  </>
                }
                lede="Up to 150 operators. 5 events. One champion. Founding Competitor Rate: $150 — capped at 150 entries. Secure your spot before the field fills."
                points={[
                  "Official entry across all five events, plus the awards ceremony",
                  "We supply the equipment for event day — no trailer required",
                  "Champion prizes: the trophy and title, a grand prize weed eater and/or blower, and 3 months of Lawnly Growth free ($450 value)",
                ]}
                primary={{ label: "Register Now — $150 🏅", href: lawnlyUrls.competitorRegister }}
                secondary={{ label: "Full Competitor Details", href: lawnlyUrls.competitors }}
                footnote={
                  <a href={lawnlyUrls.competitorsEs} className="font-semibold text-mute underline">
                    🌐 También disponible en Español
                  </a>
                }
              />

              <AudienceCard
                accent="grass"
                eyebrow="For Spectators · All Ages Welcome"
                title="Watch the Games — $10 at the Door"
                lede="A full day of live competition, family-friendly fun, and community spectacle. Doors at 8:00 AM, awards at 4:30 PM — rain or shine."
                points={[
                  "50% of attendance proceeds donated to New Beginnings",
                  "Five live events, from the zero turn obstacle course to the Scythe Challenge",
                  "Live demonstrations, vendors, and Fayetteville's finest crews on one field",
                ]}
                primary={{ label: "Get Event Updates 📬", href: lawnlyUrls.attendees }}
                secondary={{ label: "View the Venue 📍", href: event.mapsUrl }}
              />

              <AudienceCard
                accent="grass"
                eyebrow="By Application · Hand-Picked Panel"
                title="Judge the Inaugural Games"
                lede="Judges don't just score — they define the standard. You'll evaluate the best operators in the region and help crown the very first champion."
                points={[
                  "Complimentary lawn care — 3 premium services from Lawnly, included for judges",
                  "A front-row seat at the inaugural games, meeting the competitors and crowning champions",
                  "A small panel of trusted voices — the mayor, educators, and nonprofit leaders are already confirmed",
                ]}
                primary={{ label: "Apply to Judge 🧑‍⚖️", href: lawnlyUrls.judges }}
                secondary={{ label: "Meet the Panel", href: "#judges" }}
              />

              <AudienceCard
                accent="amber"
                eyebrow="For Local Businesses · First Come, First Served"
                title="Claim a Vendor Booth — $500"
                lede="Up to 2,500 spectators. Five live events. One field. A captive crowd, not a hallway — booths are assigned in the order they are claimed."
                points={[
                  "A dedicated booth along the spectator flow, all day — doors at 8 AM, awards at 4:30 PM",
                  "Sell on-site, demo product, run giveaways — you keep 100% of what you sell",
                  "If your customer owns a yard or owns a truck, they will be here",
                ]}
                primary={{ label: "Claim Your Booth — $500 🎪", href: lawnlyUrls.vendorRegister }}
                secondary={{ label: "Vendor Details & FAQ", href: lawnlyUrls.vendors }}
              />

              <AudienceCard
                accent="sky"
                eyebrow="Founding Sponsor Program"
                title="Sponsor the Inaugural Games"
                lede="A category-defining moment in front of the pros who pick the gear and the homeowners who pay them to use it — with founding-sponsor status that only exists in year one."
                points={[
                  "Bronze $750 · Silver $1,750 · Gold $3,250 · Presenting Sponsor $8,000 — every event tier includes a vendor booth",
                  "Stage callouts, on-site signage, regional press, and cause-aligned exposure with New Beginnings NWA",
                  "A $30,000 multi-event Founding Series partnership for brands building long-term positioning",
                ]}
                primary={{ label: "See Tiers & Get the Packet 🤝", href: lawnlyUrls.sponsors }}
                secondary={{
                  label: "Email Us Directly",
                  href: `mailto:${lawnlyUrls.supportEmail}?subject=Lawn%20Care%20Olympics%20Sponsorship`,
                }}
              />
            </div>
          </div>
        </section>

        {/* ── JUDGES WALL ──────────────────────────────────────── */}
        <JudgesWall />

        {/* ── NEW BEGINNINGS ───────────────────────────────────── */}
        <section className="py-16 sm:py-[88px]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/[0.08] to-gold-deep/[0.05] p-7 sm:p-14">
              <div
                aria-hidden
                className="absolute -right-36 -top-36 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.12)_0%,rgba(251,191,36,0)_70%)]"
              />
              <div className="relative z-[1] grid items-center gap-10 md:grid-cols-[2fr_3fr]">
                <div className="flex flex-col items-center gap-5 text-center">
                  <span className="rounded-full border border-gold/35 bg-gold/[0.12] px-4 py-1.5 text-[0.74rem] font-extrabold uppercase tracking-[0.14em] text-gold">
                    Charitable Partner
                  </span>
                  <div className="flex w-full max-w-[300px] justify-center rounded-[20px] bg-white px-9 py-8 shadow-[0_18px_48px_rgba(0,0,0,0.4)]">
                    <Image src={nbLogo} alt="New Beginnings" className="h-auto w-[220px]" />
                  </div>
                  <span className="text-[0.85rem] font-semibold text-mute">
                    A nonprofit in Fayetteville, Arkansas
                  </span>
                </div>

                <div>
                  <h2 className="mb-4 text-[clamp(1.7rem,3.2vw,2.25rem)] font-extrabold leading-tight text-ink">
                    Every ticket gives back.{" "}
                    <span className="text-gold">50% of attendance proceeds</span> go to New
                    Beginnings.
                  </h2>
                  <p className="mb-5 text-[1.02rem] leading-[1.7] text-soft">
                    New Beginnings develops neighborhoods that end chronic homelessness — a
                    neighborhood of cabins in Fayetteville where residents have a place to stay
                    while they work toward permanent housing, led by the residents themselves with
                    wraparound support, plus A Place to Heal, a medical respite program, and
                    permanent supportive housing. At New Beginnings, residents aren&apos;t just
                    clients — they&apos;re neighbors.
                  </p>
                  <p className="mb-6 text-[0.98rem] italic leading-[1.7] text-mute">
                    Every $10 admission puts $5 directly into their work. Show up. Cheer loud. Leave
                    something better than grass in your wake.
                  </p>
                  <a
                    href={lawnlyUrls.donate}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-gold to-[#f59e0b] px-7 py-3.5 text-[0.98rem] font-extrabold text-ground shadow-[0_8px_28px_rgba(251,191,36,0.28)] transition-transform hover:-translate-y-0.5"
                  >
                    Donate to New Beginnings 💛
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY ──────────────────────────────────────────── */}
        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-10 text-center text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-ink-strong">
              Fayetteville&apos;s Finest Getting Ready
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              {[gall1, gall2, gall3].map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-grass/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  <Image
                    src={src}
                    alt={`Lawn care showcase ${i + 1}`}
                    className="block h-[260px] w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BROUGHT TO YOU BY LAWNLY ─────────────────────────── */}
        <LawnlyAppsSection />

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section id="faq" className="scroll-mt-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <SectionEyebrow color="border-gold/30 bg-gold/10 text-gold">FAQ</SectionEyebrow>
              <h2 className="mb-3 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold text-ink-strong">
                Common Questions
              </h2>
              <p className="text-mute">
                Don&apos;t see yours? Every lane above links to a full detail page with more.
              </p>
            </div>

            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="lo-faq mb-3.5 rounded-[14px] border border-white/10 bg-white/[0.04] px-6 py-5 transition-colors"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.02rem] font-bold text-ink-strong">
                  {item.q}
                </summary>
                <p className="mt-3.5 text-[0.96rem] leading-[1.7] text-mute">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 px-4 py-16 text-center">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-10">
            <Image src={lawnlyLogo} alt="Lawnly" className="h-9 w-auto opacity-75" />
            <div aria-hidden className="hidden h-9 w-px bg-white/10 md:block" />
            <Image src={nbLogo} alt="New Beginnings" className="h-10 w-auto opacity-75" />
          </div>
          <p className="text-[0.9rem] text-ink-strong">
            Lawn Care Olympics · {event.dateDisplay} · {event.addressDisplay}
          </p>
          <p className="mt-2 text-[0.82rem] text-soft">
            Presented by <span className="font-bold text-grass">Lawnly</span> · In partnership with{" "}
            <span className="font-bold text-gold">New Beginnings NWA</span>
          </p>
          <nav aria-label="Event pages" className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: lawnlyUrls.attendees, label: "Attend" },
              { href: lawnlyUrls.competitors, label: "Compete" },
              { href: lawnlyUrls.competitorsEs, label: "Competir (ES)" },
              { href: lawnlyUrls.judges, label: "Judge" },
              { href: lawnlyUrls.vendors, label: "Exhibit" },
              { href: lawnlyUrls.sponsors, label: "Sponsor" },
              { href: lawnlyUrls.donate, label: "Donate" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.85rem] font-semibold text-mute transition-colors hover:text-grass"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
