"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/site";

const EVENT_DATE = new Date(event.start);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    done: false,
  };
}

function Unit({ value, label }: { value: number | null; label: string }) {
  const display = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="flex min-w-12 flex-col items-center sm:min-w-14">
      <div className="w-full overflow-hidden rounded-[11px] border border-grass/50 bg-white/5 px-1.5 pb-1.5 pt-[7px] shadow-[0_0_22px_rgba(74,222,128,0.42)]">
        <span
          key={display}
          className="lo-cd-digit block bg-gradient-to-br from-grass to-grass-deep bg-clip-text text-center text-[clamp(1.4rem,3.4vw,2.1rem)] font-black leading-none tracking-tight text-transparent [font-variant-numeric:tabular-nums]"
        >
          {display}
        </span>
      </div>
      <div className="mt-[5px] text-[0.58rem] font-bold uppercase tracking-[0.12em] text-mute">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="lo-cd-sep pt-1 text-[clamp(1.1rem,2.6vw,1.6rem)] font-extrabold leading-none text-grass opacity-70">
      :
    </div>
  );
}

export function CountdownBanner() {
  // null = static placeholder for the server-rendered HTML; the browser
  // computes the live value after mount, so hydration always matches.
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Intentional one-time post-hydration sync: the server HTML must show the
    // static placeholder, and the clock is an external source.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const done = time?.done ?? false;

  return (
    <section
      aria-label="Countdown to the Lawn Care Olympics"
      className="relative overflow-hidden border-b border-grass/50 bg-gradient-to-b from-[#0b1410] to-ground px-4 py-3.5"
    >
      <span className="lo-cd-sheen" aria-hidden />
      <div className="relative z-[1] mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 md:flex-row md:gap-4">
        <div className="flex flex-1 items-center justify-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-body md:justify-start">
          <span className="text-base">🏆</span>
          {done ? "The Games are underway" : "Countdown to the inaugural Games"}
        </div>

        {done ? (
          <div className="bg-gradient-to-br from-grass to-grass-deep bg-clip-text text-[clamp(1.4rem,4vw,2.2rem)] font-black text-transparent">
            The Lawn Care Olympics are here! 🎉
          </div>
        ) : (
          <div className="flex shrink-0 items-start justify-center gap-1 sm:gap-2">
            <Unit value={time ? time.days : null} label="Days" />
            <Separator />
            <Unit value={time ? time.hours : null} label="Hours" />
            <Separator />
            <Unit value={time ? time.minutes : null} label="Minutes" />
            <Separator />
            <Unit value={time ? time.seconds : null} label="Seconds" />
          </div>
        )}

        <div className="flex-1 text-center text-[0.8rem] font-bold text-soft md:text-right">
          {event.dateDisplay} · Fayetteville, AR
        </div>
      </div>
    </section>
  );
}
