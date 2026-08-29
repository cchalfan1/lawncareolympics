// "The Five Events" — copy mirrored verbatim from lawnly2's
// _competitionEventsSection.tsx (the single source of truth on lawnly.com).

const EVENTS = [
  {
    eyebrow: "Event — 01",
    icon: "🚜",
    title: "Zero Turn Obstacle Course",
    body: "Precision speed course testing mower handling and control under timed pressure.",
  },
  {
    eyebrow: "Event — 02",
    icon: "🧵",
    title: "Weed Eater String Challenge",
    body: "Timed challenge to properly string and prepare a weed eater under judged conditions.",
  },
  {
    eyebrow: "Event — 03",
    icon: "🌬️",
    title: "Blower Accuracy Challenge",
    body: "Operators compete in precision blower control, speed, and target accuracy.",
  },
  {
    eyebrow: "Event — 04",
    icon: "🎯",
    title: "Push Mow Obstacle Course",
    body: "Technical control challenge using designated boundaries and complex obstacle layouts.",
  },
];

const MARQUEE = {
  eyebrow: "Event — 05 · Marquee",
  icon: "🌾",
  title: "The Scythe Challenge",
  body: "A traditional manual cutting challenge testing endurance, technique, and form. The pure-craft event of the day.",
  quote: "“The oldest tool. The truest test.”",
};

export function EventsSection() {
  return (
    <section id="events" className="scroll-mt-6 border-y border-white/5 bg-white/[0.02] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <div className="mb-5 inline-block rounded-lg border border-gold/30 bg-gold/10 px-3.5 py-[5px] text-[0.78rem] font-bold uppercase tracking-[0.08em] text-gold">
            The Five Events
          </div>
          <h2 className="mb-3.5 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold text-ink-strong">
            Where Champions Are Made
          </h2>
          <p className="mx-auto max-w-[600px] text-[1.05rem] leading-relaxed text-mute">
            Every competitor runs all five. Every event scored on speed, precision, cleanliness, and
            execution.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {EVENTS.map((event) => (
            <div
              key={event.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-gold/35"
            >
              <div className="mb-3.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-gold">
                {event.eyebrow}
              </div>
              <div className="mb-[18px] flex h-13 w-13 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-2xl">
                {event.icon}
              </div>
              <div className="mb-2 text-[1.1rem] font-extrabold text-ink-strong">{event.title}</div>
              <div className="text-[0.95rem] leading-relaxed text-mute">{event.body}</div>
            </div>
          ))}

          <div className="rounded-[20px] border border-gold/35 bg-gradient-to-br from-gold/[0.12] via-gold-deep/[0.06] to-white/[0.03] p-8 md:col-span-2">
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-gold">
                  {MARQUEE.eyebrow}
                </div>
                <div className="mb-3 flex items-center gap-4">
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-gold/35 bg-gold/[0.15] text-2xl">
                    {MARQUEE.icon}
                  </div>
                  <div className="text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold tracking-tight text-ink-strong">
                    {MARQUEE.title}
                  </div>
                </div>
                <div className="max-w-xl text-[0.98rem] leading-relaxed text-mute">{MARQUEE.body}</div>
              </div>
              <div className="shrink-0 text-[1.05rem] italic leading-normal text-gold md:max-w-52 md:text-right">
                {MARQUEE.quote}
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-9 max-w-[640px] text-center text-[0.92rem] leading-relaxed text-mute">
          Events, formats, and scoring are subject to change. Registered competitors are notified
          directly of any change.
        </p>
      </div>
    </section>
  );
}
