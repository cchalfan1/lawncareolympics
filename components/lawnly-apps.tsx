import Image, { type StaticImageData } from "next/image";
import { appDownloadUrl } from "@/lib/site";

import lawnlyLogo from "@/assets/lawnly-logo.svg";

import customerClearPricing from "@/assets/apps/customer/customer-clear-pricing.png";
import customerHero from "@/assets/apps/customer/customer-hero.png";
import customerInstantQuote from "@/assets/apps/customer/customer-instant-quote.png";
import customerPhotoProof from "@/assets/apps/customer/customer-photo-proof.png";
import customerSetAndForget from "@/assets/apps/customer/customer-set-and-forget.png";
import providerGetPaid from "@/assets/apps/provider/provider-get-paid.png";
import providerHero from "@/assets/apps/provider/provider-hero.png";
import providerJobBoard from "@/assets/apps/provider/provider-job-board.png";
import providerNotify from "@/assets/apps/provider/provider-notify.png";
import providerQuotes from "@/assets/apps/provider/provider-quotes.png";
import providerRoutes from "@/assets/apps/provider/provider-routes.png";
import providerRunBusiness from "@/assets/apps/provider/provider-run-business.png";
import providerTeam from "@/assets/apps/provider/provider-team.png";

// "Brought to you by Lawnly" — the apps behind the event, for both audiences.
// Copy and screenshot captions mirrored from lawnly2's _lawnlyAppsSection.tsx.
// The download links go through the API's OS-detecting redirect, which
// attributes every click (App Store / Google Play / fallback listing).

interface Screenshot {
  src: StaticImageData;
  caption: string;
}

const HOMEOWNER_SHOTS: Screenshot[] = [
  { src: customerHero, caption: "Lawnly for homeowners" },
  { src: customerInstantQuote, caption: "Book a mow in seconds" },
  { src: customerSetAndForget, caption: "Set it & forget it" },
  { src: customerPhotoProof, caption: "Photo proof every visit" },
  { src: customerClearPricing, caption: "Clear pricing, card on file" },
];

const PROVIDER_SHOTS: Screenshot[] = [
  { src: providerHero, caption: "Lawnly for lawn pros" },
  { src: providerJobBoard, caption: "Claim jobs near you" },
  { src: providerRunBusiness, caption: "Run your entire business" },
  { src: providerRoutes, caption: "Plan your routes" },
  { src: providerGetPaid, caption: "Get paid automatically" },
  { src: providerNotify, caption: "Notify customers in a tap" },
  { src: providerQuotes, caption: "Send quotes in minutes" },
  { src: providerTeam, caption: "Manage your crew" },
];

function ScreenshotRow({ shots }: { shots: Screenshot[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:thin] sm:-mx-6 sm:px-6">
      <div className="flex snap-x snap-mandatory gap-3 pb-2">
        {shots.map((shot) => (
          <div key={shot.caption} className="w-36 shrink-0 snap-start text-center sm:w-44">
            <div className="overflow-hidden rounded-[22px] border border-grass/25 bg-white/[0.04] shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
              <Image
                src={shot.src}
                alt={shot.caption}
                className="block h-auto w-full"
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>
            <div className="mt-3 text-[0.85rem] font-semibold text-mute">{shot.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DownloadButton({ app, label }: { app: "customer" | "provider"; label: string }) {
  return (
    <a
      href={appDownloadUrl(app)}
      className="inline-flex items-center gap-3 rounded-[14px] bg-gradient-to-br from-grass-deep to-[#15803d] px-9 py-4 text-[1.05rem] font-extrabold text-white shadow-[0_8px_32px_rgba(22,163,74,0.4)] transition-transform hover:-translate-y-0.5"
    >
      <span className="text-xl">📲</span>
      {label}
    </a>
  );
}

interface AppBlockProps {
  eyebrow: string;
  heading: string;
  body: string;
  bodySecondary: string;
  shots: Screenshot[];
  app: "customer" | "provider";
  cta: string;
}

function AppBlock({ eyebrow, heading, body, bodySecondary, shots, app, cta }: AppBlockProps) {
  return (
    <div className="rounded-3xl border border-grass/15 bg-white/[0.02] p-6 sm:p-10">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-block rounded-lg border border-grass/25 bg-grass/10 px-3.5 py-[5px] text-[0.78rem] font-bold uppercase tracking-[0.08em] text-grass">
          {eyebrow}
        </div>
        <h3 className="mb-4 text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold leading-tight text-ink-strong">
          {heading}
        </h3>
        <p className="mx-auto mb-3 max-w-[680px] text-[1.02rem] leading-relaxed text-mute">{body}</p>
        <p className="mx-auto max-w-[620px] text-[0.95rem] leading-relaxed text-dim">{bodySecondary}</p>
      </div>

      <div className="mb-8">
        <ScreenshotRow shots={shots} />
      </div>

      <div className="text-center">
        <DownloadButton app={app} label={cta} />
        <div className="mt-4 text-[0.9rem] font-semibold text-body">Available on iPhone & Android</div>
      </div>
    </div>
  );
}

export function LawnlyAppsSection() {
  return (
    <section
      id="lawnly"
      className="scroll-mt-6 border-t border-grass/15 bg-gradient-to-br from-grass-deep/10 to-[#15803d]/5 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <Image src={lawnlyLogo} alt="Lawnly" className="mx-auto mb-6 h-12 w-auto" />
          <div className="mb-5 inline-block rounded-lg border border-grass/25 bg-grass/10 px-3.5 py-[5px] text-[0.78rem] font-bold uppercase tracking-[0.08em] text-grass">
            Brought to you by Lawnly
          </div>
          <h2 className="mb-5 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight text-ink-strong">
            The app behind the Games
          </h2>
          <p className="mx-auto max-w-[720px] text-[1.05rem] leading-relaxed text-mute">
            Lawnly connects homeowners with trusted local lawn pros — the same crews you&apos;ll see
            competing on September 20th — and gives those crews the tools to run their whole
            business. Two apps, one marketplace.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <AppBlock
            eyebrow="For Homeowners"
            heading="Your lawn, handled from your phone"
            body="Book a mow in about a minute, see the price up front, pay securely in the app, and get photos when the job is done."
            bodySecondary="Download it before the event and your lawn can be on the schedule before the medals are handed out."
            shots={HOMEOWNER_SHOTS}
            app="customer"
            cta="Download the Lawnly App"
          />
          <AppBlock
            eyebrow="For Lawn Pros"
            heading="Run your lawn care business from your pocket"
            body="Claim marketplace jobs near you, plan efficient routes, invoice customers, and get paid fast. It powers the same businesses you'll see on the podium."
            bodySecondary="Competing — or thinking about it? Download the app your fellow pros will be using on event day."
            shots={PROVIDER_SHOTS}
            app="provider"
            cta="Download the Provider App"
          />
        </div>
      </div>
    </section>
  );
}
