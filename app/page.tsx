import type { ReactNode } from "react";
import { site } from "@/lib/site";

const events = [
  {
    name: "Precision Mowing",
    description:
      "One pass, one height, zero scalping. Judges measure cut consistency down to the millimeter across your full course.",
    icon: <MowerIcon />,
  },
  {
    name: "Edging & Trim",
    description:
      "Crisp lines where turf meets pavement. Points for straightness, depth control, and a finish you could read a level against.",
    icon: <EdgeIcon />,
  },
  {
    name: "Stripe Artistry",
    description:
      "The showpiece event. Classic stripes, checkerboards, and freestyle patterns scored on contrast, symmetry, and ambition.",
    icon: <StripesIcon />,
  },
  {
    name: "Speed Cleanup",
    description:
      "Clippings, leaves, and debris against the clock. The fastest spotless lawn takes the heat — sloppy corners take penalties.",
    icon: <TimerIcon />,
  },
  {
    name: "Turf Revival",
    description:
      "A season-long comeback story. Take a struggling patch and bring it back to life, documented from bare dirt to dense green.",
    icon: <SproutIcon />,
  },
  {
    name: "Equipment Rodeo",
    description:
      "Handling skills on an obstacle course: tight turns, tree rings, and slope work without a single wheel mark out of bounds.",
    icon: <TrophyIcon />,
  },
];

const steps = [
  {
    title: "Register your lawn",
    description:
      "Sign up with your name, your division, and a photo of your home turf. Every lawn starts with a clean scorecard.",
  },
  {
    title: "Compete in judged events",
    description:
      "Pick your events and submit your entries. Community judges and event refs score each one against the official rubric.",
  },
  {
    title: "Climb the leaderboard",
    description:
      "Earn points all season, track your ranking, and mow your way to the podium. Gold goes to the greenest.",
  },
];

const faqs = [
  {
    question: "What is the Lawn Care Olympics?",
    answer:
      "The Lawn Care Olympics is a friendly competition for lawn care enthusiasts. Competitors enter judged events — like precision mowing, edging, and stripe artistry — from their own lawns, earn points, and climb a season-long leaderboard.",
  },
  {
    question: "Who can compete?",
    answer:
      "Anyone with a patch of grass and some pride in it. Divisions are planned for beginners, weekend warriors, and seasoned turf obsessives, so you compete against people at your level.",
  },
  {
    question: "Do I need professional equipment?",
    answer:
      "No. Events are scored on results and technique, not horsepower. A well-driven push mower can beat a poorly-driven zero-turn any day of the week.",
  },
  {
    question: "When does registration open?",
    answer:
      "Season 1 registration opens soon. Check back here for the official date, event rubrics, and division details.",
  },
  {
    question: "How are events judged?",
    answer:
      "Each event has a published rubric covering the fundamentals — cut quality, line work, cleanup, and overall presentation. Entries are submitted as photos or short clips and scored by event judges.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-turf-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="flex-1">
        <Hero />
        <EventsSection />
        <HowItWorksSection />
        <FaqSection />
        <CtaSection />
      </main>

      <SiteFooter />
    </>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-turf-900/10 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#main" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span className="font-display text-lg font-bold tracking-tight text-turf-950">
            Lawn Care Olympics
          </span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 sm:flex">
          <a
            href="#events"
            className="text-sm font-medium text-turf-800 transition-colors hover:text-turf-600"
          >
            Events
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-turf-800 transition-colors hover:text-turf-600"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-turf-800 transition-colors hover:text-turf-600"
          >
            FAQ
          </a>
        </nav>
        <a
          href="#register"
          className="rounded-full bg-turf-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-turf-600"
        >
          Enter the Games
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="lawn-stripes relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-turf-950/40 via-transparent to-turf-950/60" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
          <TrophySmallIcon className="h-3.5 w-3.5" />
          Season 1 · Registration opening soon
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Where the world&apos;s best lawns go for gold.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-turf-100 sm:text-xl">
          The Lawn Care Olympics is the competition for people who take their
          grass seriously — judged events, real rankings, and eternal backyard
          glory. Compete from your own lawn, in your own division.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#register"
            className="rounded-full bg-gold-400 px-6 py-3 text-base font-bold text-turf-950 shadow-lg transition-colors hover:bg-gold-300"
          >
            Get on the podium
          </a>
          <a
            href="#events"
            className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            See the events
          </a>
        </div>
        <dl className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/20 pt-8">
          <div>
            <dt className="text-xs uppercase tracking-wider text-turf-200">
              Judged events
            </dt>
            <dd className="mt-1 font-display text-3xl font-bold">6</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-turf-200">
              Skill divisions
            </dt>
            <dd className="mt-1 font-display text-3xl font-bold">3</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-turf-200">
              Golden mower
            </dt>
            <dd className="mt-1 font-display text-3xl font-bold">1</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section id="events" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The events"
          title="Six disciplines. One champion."
          description="Every event is scored against a published rubric, so a tidy quarter-acre can beat a sprawling estate on pure technique."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li
              key={event.name}
              className="group rounded-2xl border border-turf-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-turf-100 text-turf-700">
                {event.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-turf-950">
                {event.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-turf-800/80">
                {event.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-turf-900 py-20 text-white sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From first cut to final podium"
          description="A whole season of competition, built to fit around real life and real weather."
          dark
        />
        <ol className="mt-14 grid gap-10 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="font-display text-5xl font-extrabold text-gold-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-turf-100/80">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions from the sidelines"
          description="Everything you need to know before you tape off your course."
        />
        <div className="mt-12 divide-y divide-turf-900/10 rounded-2xl border border-turf-900/10 bg-white shadow-sm">
          {faqs.map((faq) => (
            <details key={faq.question} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-turf-950 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronIcon className="faq-chevron h-4 w-4 shrink-0 text-turf-600 transition-transform" />
              </summary>
              <p className="mt-3 leading-relaxed text-turf-800/80">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      id="register"
      className="scroll-mt-20 bg-gradient-to-br from-turf-800 to-turf-950 py-20 text-white sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <TrophySmallIcon className="mx-auto h-10 w-10 text-gold-400" />
        <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Be first on the podium.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-turf-100/90">
          Season 1 registration opens soon. Tell us you&apos;re in and
          we&apos;ll send the event rubrics, division details, and your starting
          number the moment the gates open.
        </p>
        <a
          href={`mailto:${site.contactEmail}?subject=Sign%20me%20up%20for%20Season%201`}
          className="mt-8 inline-block rounded-full bg-gold-400 px-8 py-3.5 text-base font-bold text-turf-950 shadow-lg transition-colors hover:bg-gold-300"
        >
          Register interest
        </a>
        <p className="mt-4 text-sm text-turf-200/80">
          No spam. Just a heads-up when the whistle blows.
        </p>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-turf-900/10 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-7 w-7" />
          <div>
            <p className="font-display text-sm font-bold text-turf-950">
              {site.name}
            </p>
            <p className="text-xs text-turf-800/70">{site.tagline}.</p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-6">
          <a
            href="#events"
            className="text-sm text-turf-800 transition-colors hover:text-turf-600"
          >
            Events
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-turf-800 transition-colors hover:text-turf-600"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="text-sm text-turf-800 transition-colors hover:text-turf-600"
          >
            FAQ
          </a>
        </nav>
        <p className="text-xs text-turf-800/70">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p
        className={`text-xs font-semibold uppercase tracking-widest ${
          dark ? "text-gold-400" : "text-turf-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-turf-950"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-lg leading-relaxed ${
          dark ? "text-turf-100/80" : "text-turf-800/80"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

/* --- Inline icons (decorative, hidden from assistive tech) --- */

function iconProps(className?: string) {
  return {
    className,
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
  } as const;
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#335a27" />
      <path
        d="M8 22c1.5-4 1-8-.5-11 3 1.5 5 4.5 5.5 8M16 22c0-5-.5-9 1-13 1.5 4 1 8 1 13M24 22c-1.5-4-1-8 .5-11-3 1.5-5 4.5-5.5 8"
        stroke="#9cc985"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="24.5" r="3.2" fill="#fbbf24" />
      <circle cx="16" cy="24.5" r="1.4" fill="#335a27" />
    </svg>
  );
}

function TrophySmallIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg {...iconProps(className)}>
      <path d="M8 21h8m-4-4v4m-5-17h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4a3 3 0 0 0 3 4m10-4h3a3 3 0 0 1-3 4" />
    </svg>
  );
}

function TrophyIcon(): ReactNode {
  return <TrophySmallIcon className="h-5 w-5" />;
}

function MowerIcon(): ReactNode {
  return (
    <svg {...iconProps("h-5 w-5")}>
      <path d="M4 15V7l5 5h9l2 3" />
      <circle cx="7" cy="18" r="2.2" />
      <circle cx="17" cy="18" r="2.2" />
      <path d="M9.2 18h5.6" />
    </svg>
  );
}

function EdgeIcon(): ReactNode {
  return (
    <svg {...iconProps("h-5 w-5")}>
      <path d="M4 20 20 4M8 20h12" />
      <path d="M13 15l2 2m-5 1 1 1" />
    </svg>
  );
}

function StripesIcon(): ReactNode {
  return (
    <svg {...iconProps("h-5 w-5")}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9.3 4v16M14.6 4v16" />
    </svg>
  );
}

function TimerIcon(): ReactNode {
  return (
    <svg {...iconProps("h-5 w-5")}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5M9 2h6" />
    </svg>
  );
}

function SproutIcon(): ReactNode {
  return (
    <svg {...iconProps("h-5 w-5")}>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7Zm0 0c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg {...iconProps(className)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
