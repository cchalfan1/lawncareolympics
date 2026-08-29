import { ImageResponse } from "next/og";
import { event, site } from "@/lib/site";

export const alt = `${site.name} — ${event.dateDisplay} in Fayetteville, AR`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(180deg, #0a0f0d 0%, #0d1a12 60%, #091510 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -220,
            width: 700,
            height: 700,
            borderRadius: "50%",
            border: "2px solid rgba(74,222,128,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 440,
            height: 440,
            borderRadius: "50%",
            border: "2px solid rgba(74,222,128,0.25)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#4ade80",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          🏆 The Inaugural Games
        </div>
        <div
          style={{
            marginTop: 24,
            color: "#f8fafc",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 950,
          }}
        >
          Lawn Care Olympics
        </div>
        <div
          style={{
            marginTop: 28,
            color: "#fbbf24",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          {`${event.dateDisplay} · Fayetteville, AR`}
        </div>
        <div
          style={{
            marginTop: 20,
            color: "#94a3b8",
            fontSize: 30,
          }}
        >
          5 live events · 150 competitors · $10 at the door · 50% to New Beginnings
        </div>
      </div>
    ),
    size,
  );
}
