export type CuisineType =
  | 'pizza'
  | 'asian'
  | 'burger'
  | 'mediterranean'
  | 'middle-eastern'
  | 'vegan'
  | 'italian'
  | 'mexican'
  | 'greek'
  | 'other';

export type DietaryTag =
  | 'vegetarian-friendly'
  | 'vegan'
  | 'gluten-free'
  | 'halal'
  | 'kosher';

export type OrderingPlatform = 'tabit' | 'nibble' | 'proprietary' | 'phone-only';

export interface DaySchedule {
  open: string;
  close: string;
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
  website?: string;
  orderingPlatform: OrderingPlatform;
  deliveryRadiusKm?: number;
  minOrderILS?: number;
  deliveryFeeILS?: number;
  estimatedDeliveryMin: number;
  operatingHours: string;
  schedule: WeeklySchedule;
  dietaryTags: DietaryTag[];
  phone?: string;
  acceptsHever?: boolean;
  deliveryUnconfirmed?: boolean;
  couponCode?: string;
  lastVerified: string;
  notes?: string;
  lat?: number;
  lng?: number;
}
