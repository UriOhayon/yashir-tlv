export type CuisineType =
  | 'pizza'
  | 'asian'
  | 'burger'
  | 'mediterranean'
  | 'middle-eastern'
  | 'vegan'
  | 'italian'
  | 'other';

export type DietaryTag =
  | 'vegetarian-friendly'
  | 'vegan'
  | 'gluten-free'
  | 'halal'
  | 'kosher';

export type OrderingPlatform = 'tabit' | 'nibble' | 'proprietary' | 'phone-only';

export interface DaySchedule {
  open: string;  // "HH:MM" 24-hour
  close: string; // "HH:MM" — if close < open, restaurant is open past midnight
}

export interface WeeklySchedule {
  sun: DaySchedule | null;
  mon: DaySchedule | null;
  tue: DaySchedule | null;
  wed: DaySchedule | null;
  thu: DaySchedule | null;
  fri: DaySchedule | null;
  sat: DaySchedule | null;
}

export interface Restaurant {
  id: string;
  name: string;
  nameHe: string;
  cuisineType: CuisineType;
  address: string;
  neighborhood: string;
  website?: string;  // omit for phone-only restaurants with no ordering site
  orderingPlatform: OrderingPlatform;
  deliveryRadiusKm: number;
  minOrderILS: number;
  deliveryFeeILS: number;
  estimatedDeliveryMin: number;
  operatingHours: string;
  schedule: WeeklySchedule;
  dietaryTags: DietaryTag[];
  phone?: string;
  lastVerified: string;
  deliveryUnconfirmed?: boolean;
  notes?: string;
}
