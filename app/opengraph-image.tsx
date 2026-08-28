import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const stripe = (color: string) => ({
  height: "100%",
  flex: 1,
  backgroundColor: color,
});

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Mowing-stripe backdrop */}
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
          {["#2b4923", "#335a27", "#2b4923", "#335a27", "#2b4923", "#335a27"].map(
            (color, i) => (
              <div key={i} style={stripe(color)} />
            ),
          )}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            background:
              "linear-gradient(180deg, rgba(17,33,14,0.35) 0%, rgba(17,33,14,0.75) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#fbbf24",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            🏆 Season 1
          </div>
          <div
            style={{
              marginTop: 24,
              color: "#ffffff",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 950,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 28,
              color: "#e1efd8",
              fontSize: 38,
              maxWidth: 900,
            }}
          >
            {`${site.tagline}.`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
