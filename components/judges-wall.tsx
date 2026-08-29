import Image, { type StaticImageData } from "next/image";

import judgeAshley from "@/assets/judges/ashley-calderon.jpg";
import judgeBill from "@/assets/judges/bill-fox.jpg";
import judgeBob from "@/assets/judges/bob-crisp.jpg";
import judgeDandre from "@/assets/judges/dandre-jones.jpg";
import judgeDmitri from "@/assets/judges/dmitri-love.jpg";
import judgeGarrett from "@/assets/judges/garrett-richardson.jpg";
import judgeJohn from "@/assets/judges/john-colbert.jpg";
import judgeKeaton from "@/assets/judges/keaton-smith.jpg";
import judgeMegan from "@/assets/judges/megan-robertson.jpg";
import judgeMireya from "@/assets/judges/mireya-reith.jpg";
import judgeMolly from "@/assets/judges/molly-rawn.jpg";
import judgeSolomon from "@/assets/judges/solomon-birchfield.jpg";

// Confirmed judges roster — mirrored from lawnly2's _judgesWall.tsx.
interface ConfirmedJudge {
  name: string;
  category: string;
  title: string;
  subtitle?: string;
  photo: StaticImageData;
}

const CONFIRMED_JUDGES: ConfirmedJudge[] = [
  {
    name: "Mayor Molly Rawn",
    category: "Civic",
    title: "Mayor of Fayetteville, Arkansas",
    subtitle: "City of Fayetteville",
    photo: judgeMolly,
  },
  {
    name: "Dr. John L. Colbert",
    category: "Education",
    title: "EdD, Educational Leadership",
    subtitle: "Community Education",
    photo: judgeJohn,
  },
  {
    name: "D'Andre Jones",
    category: "Civic",
    title: "Civic Leader · City of Fayetteville",
    photo: judgeDandre,
  },
  {
    name: "Garrett Richardson",
    category: "Competitive",
    title: "Founder, Hoopcliq",
    subtitle: "High Performance Coach",
    photo: judgeGarrett,
  },
  {
    name: "Megan Robertson",
    category: "Community",
    title: "Community Leader & Advocate",
    photo: judgeMegan,
  },
  {
    name: "Solomon Birchfield",
    category: "Nonprofit",
    title: "Executive Director, New Beginnings NWA",
    photo: judgeSolomon,
  },
  {
    name: "Bob Crisp",
    category: "Academic",
    title: "Emeritus Professor",
    subtitle: "University of Arkansas",
    photo: judgeBob,
  },
  {
    name: "Ashley Calderon",
    category: "Corporate",
    title: "Director of Global Operations, Walmart",
    subtitle: "Founder · Infinite HERizon",
    photo: judgeAshley,
  },
  {
    name: "Dmitri Love",
    category: "Enterprise",
    title: "Entrepreneur & Business Leader",
    photo: judgeDmitri,
  },
  {
    name: "Keaton Smith",
    category: "Finance",
    title: "Vice President, Commercial Relationship Manager",
    subtitle: "First Horizon Bank",
    photo: judgeKeaton,
  },
  {
    name: "Bill Fox",
    category: "Advisory",
    title: "Business Consultant, FORGE",
    subtitle: "Former SBTDC Center Director, University of Arkansas",
    photo: judgeBill,
  },
  {
    name: "Mireya Reith",
    category: "Nonprofit",
    title: "Founding Executive Director",
    subtitle: "Arkansas United",
    photo: judgeMireya,
  },
];

export function JudgesWall() {
  return (
    <section id="judges" className="scroll-mt-6 border-y border-grass/10 bg-white/[0.02] py-16 sm:py-[88px]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-[clamp(1.8rem,4vw,2.4rem)] font-extrabold text-ink">
            Confirmed Judges Include
          </h2>
          <p className="mx-auto max-w-[620px] leading-relaxed text-mute">
            The mayor, education leaders, nonprofit directors, and Walmart leadership have all
            accepted a seat on the judging panel.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONFIRMED_JUDGES.map((judge) => (
            <div
              key={judge.name}
              className="rounded-[20px] border border-grass/[0.18] bg-white/[0.04] p-6 text-center"
            >
              <div className="mx-auto mb-[18px] h-24 w-24 overflow-hidden rounded-full border-2 border-grass/40 shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
                <Image
                  src={judge.photo}
                  alt={judge.name}
                  className="h-full w-full object-cover"
                  sizes="96px"
                />
              </div>
              <div className="mb-2.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-grass">
                {judge.category}
              </div>
              <h3 className="mb-2 text-[1.05rem] font-extrabold text-ink-strong">{judge.name}</h3>
              <p className={`text-[0.9rem] italic leading-normal text-soft ${judge.subtitle ? "mb-1" : ""}`}>
                {judge.title}
              </p>
              {judge.subtitle && (
                <p className="text-[0.85rem] leading-normal text-mute">{judge.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
