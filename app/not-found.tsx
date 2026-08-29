import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <p className="text-7xl font-black text-grass/40">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-ink">Out of bounds</h1>
      <p className="mt-3 max-w-md text-mute">
        This page has been disqualified — or it never made the roster. Head back to the main field.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-gradient-to-br from-grass-deep to-[#15803d] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_32px_rgba(22,163,74,0.35)] transition-transform hover:-translate-y-0.5"
      >
        Back to the Games
      </Link>
    </main>
  );
}
