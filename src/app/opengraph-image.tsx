import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yashir - Tel Aviv Direct Delivery";
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
          backgroundColor: "#ffffff",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "130px",
            height: "130px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#15803d",
            borderRadius: "30px",
            color: "#ffffff",
            fontSize: "78px",
            fontWeight: 800,
          }}
        >
          Y
        </div>
        <div
          style={{
            fontSize: "104px",
            fontWeight: 800,
            color: "#18181b",
            letterSpacing: "-3px",
            lineHeight: 1,
            marginTop: "40px",
          }}
        >
          YASHIR
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: 400,
            color: "#52525b",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginTop: "18px",
          }}
        >
          Tel Aviv · Direct Delivery
        </div>
        <div
          style={{
            width: "70px",
            height: "5px",
            backgroundColor: "#15803d",
            borderRadius: "3px",
            marginTop: "40px",
            marginBottom: "30px",
          }}
        />
        <div style={{ fontSize: "26px", color: "#15803d", letterSpacing: "1px" }}>
          Order direct · No middlemen · No commission
        </div>
      </div>
    ),
    { ...size }
  );
}
