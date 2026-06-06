import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yashir — Tel Aviv Direct Delivery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadHebrewFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Heebo:wght@700",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    ).then((r) => r.text());

    const match = css.match(/src: url\(([^)]+\.woff2)\)/);
    if (!match) return null;
    return fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OGImage() {
  const hebrewFont = await loadHebrewFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1008",
          padding: "60px",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: "80px",
            height: "5px",
            backgroundColor: "#c4421a",
            marginBottom: "36px",
            borderRadius: "2px",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: "120px",
            fontWeight: 700,
            fontFamily: hebrewFont ? "Heebo" : "serif",
            color: "#f5ede0",
            lineHeight: 1,
            marginBottom: "20px",
            direction: "rtl",
          }}
        >
          {hebrewFont ? "ישיר" : "YASHIR"}
        </div>

        {/* English subtitle */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 400,
            color: "#d6c9b0",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          Tel Aviv Direct Delivery
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "26px",
            color: "#c4421a",
            letterSpacing: "1px",
          }}
        >
          Order direct · No middlemen · No commission
        </div>
      </div>
    ),
    {
      ...size,
      fonts: hebrewFont
        ? [{ name: "Heebo", data: hebrewFont, weight: 700 }]
        : [],
    }
  );
}
