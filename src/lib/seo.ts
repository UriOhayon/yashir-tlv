import type { Restaurant, CuisineType, WeeklySchedule } from "@/types/restaurant";
import { strings } from "@/i18n/strings";

export const BASE_URL = "https://yashirdelivery.com";

// Hebrew labels reused from the i18n table so SEO copy stays consistent.
export const cuisineHe = strings.he.cuisineLabels;
export const dietaryHe = strings.he.dietaryLabels;

const DAY_NAMES: Record<keyof WeeklySchedule, string> = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

// Cuisines that actually have at least one restaurant - used for static params.
export function activeCuisines(restaurants: Restaurant[]): CuisineType[] {
  const set = new Set<CuisineType>();
  restaurants.forEach((r) => set.add(r.cuisineType));
  return Array.from(set);
}

export function restaurantsByCuisine(
  restaurants: Restaurant[],
  cuisine: CuisineType
): Restaurant[] {
  return restaurants.filter((r) => r.cuisineType === cuisine);
}

// Build schema.org openingHoursSpecification from the weekly schedule.
function openingHours(schedule: WeeklySchedule) {
  return (Object.keys(schedule) as (keyof WeeklySchedule)[])
    .filter((d) => schedule[d] !== null)
    .map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_NAMES[d],
      opens: schedule[d]!.open,
      closes: schedule[d]!.close,
    }));
}

// Full Restaurant JSON-LD for a single restaurant page.
export function restaurantJsonLd(r: Restaurant) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.nameHe || r.name,
    alternateName: r.name,
    servesCuisine: cuisineHe[r.cuisineType],
    address: {
      "@type": "PostalAddress",
      streetAddress: r.address,
      addressLocality: "Tel Aviv-Yafo",
      addressCountry: "IL",
    },
    ...(r.lat && r.lng
      ? { geo: { "@type": "GeoCoordinates", latitude: r.lat, longitude: r.lng } }
      : {}),
    ...(r.phone ? { telephone: r.phone } : {}),
    url: `${BASE_URL}/restaurant/${r.id}`,
    ...(r.website ? { hasMenu: r.website, acceptsReservations: false } : {}),
    openingHoursSpecification: openingHours(r.schedule),
    areaServed: { "@type": "City", name: "Tel Aviv-Yafo" },
    potentialAction: r.website
      ? {
          "@type": "OrderAction",
          target: r.website,
          deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
        }
      : undefined,
  };
}

// ItemList JSON-LD for collection pages (home, cuisine, open-now).
export function itemListJsonLd(restaurants: Restaurant[], name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: restaurants.length,
    itemListElement: restaurants.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/restaurant/${r.id}`,
      name: r.nameHe || r.name,
    })),
  };
}

export function feeLabel(fee?: number): string {
  return fee == null ? "לא ידוע" : fee === 0 ? "חינם" : `₪${fee}`;
}
