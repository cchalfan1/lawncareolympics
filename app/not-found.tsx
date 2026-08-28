import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-display text-7xl font-extrabold text-turf-300">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-turf-950">
        Out of bounds
      </h1>
      <p className="mt-3 max-w-md text-turf-800/80">
        This page has been disqualified — or it never made the roster. Head
        back to the main field.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-turf-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-turf-600"
      >
        Back to the Games
      </Link>
    </main>
  );
}
