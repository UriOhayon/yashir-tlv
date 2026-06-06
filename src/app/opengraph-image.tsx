import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yashir — Tel Aviv Direct Delivery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
        <div
          style={{
            width: "80px",
            height: "5px",
            backgroundColor: "#c4421a",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            fontSize: "130px",
            fontWeight: 800,
            color: "#f5ede0",
            letterSpacing: "-4px",
            lineHeight: 1,
            marginBottom: "24px",
          }}
        >
          YASHIR
        </div>
        <div
          style={{
            fontSize: "34px",
            fontWeight: 400,
            color: "#d6c9b0",
            letterSpacing: "8px",
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          Tel Aviv Direct Delivery
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#c4421a",
            letterSpacing: "1px",
          }}
        >
          Order direct · No middlemen · No commission
        </div>
      </div>
    ),
    { ...size }
  );
}
