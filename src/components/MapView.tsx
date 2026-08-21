"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Restaurant } from "@/types/restaurant";
import type { Strings } from "@/i18n/strings";

// Fix default marker icons broken by webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBounds({ restaurants }: { restaurants: Restaurant[] }) {
  const map = useMap();
  useEffect(() => {
    const pts = restaurants.filter((r) => r.lat && r.lng).map((r) => [r.lat!, r.lng!] as [number, number]);
    if (pts.length > 0) {
      map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 14 });
    }
  }, [map, restaurants]);
  return null;
}

interface Props {
  restaurants: Restaurant[];
  t: Strings;
  lang: "en" | "he";
}

export default function MapView({ restaurants, t, lang }: Props) {
  const mapped = restaurants.filter((r) => r.lat && r.lng);

  return (
    <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)", height: 480 }}>
      <MapContainer
        center={[32.0785, 34.7800]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds restaurants={mapped} />
        {mapped.map((r) => (
          <div key={r.id}>
            <Circle
              center={[r.lat!, r.lng!]}
              radius={(r.deliveryRadiusKm ?? 0) * 1000}
              pathOptions={{
                color: "#15803d",
                fillColor: "#15803d",
                fillOpacity: 0.07,
                weight: 1.5,
              }}
            />
            <Marker position={[r.lat!, r.lng!]}>
              <Popup>
                <div style={{ minWidth: 160 }}>
                  <strong style={{ fontSize: 13 }}>{lang === "he" ? r.nameHe : r.name}</strong>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{r.address}</div>
                  {r.deliveryRadiusKm && (
                    <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                      Radius: {r.deliveryRadiusKm} km · Min: ₪{r.minOrderILS}
                    </div>
                  )}
                  {r.couponCode && (
                    <div style={{ fontSize: 11, color: "#92400e", marginTop: 4, background: "#fefce8", padding: "2px 6px", borderRadius: 4 }}>
                      {r.couponCode}
                    </div>
                  )}
                  {r.website && (
                    <a
                      href={r.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#15803d",
                        textDecoration: "none",
                      }}
                    >
                      {t.orderNow}
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
