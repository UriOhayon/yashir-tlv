import type { WeeklySchedule } from "@/types/restaurant";

const DAY_KEYS: Record<string, keyof WeeklySchedule> = {
  Sun: "sun",
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
};

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function isOpenNow(schedule: WeeklySchedule): boolean {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jerusalem",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = parts.find((p) => p.type === "hour")?.value ?? "0";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "0";

  const dayKey = DAY_KEYS[weekday];
  if (!dayKey) return false;

  const daySchedule = schedule[dayKey];
  if (!daySchedule) return false;

  // Intl hour12:false can return "24" for midnight in some environments
  const currentMinutes = (parseInt(hour) % 24) * 60 + parseInt(minute);
  const openMinutes = toMinutes(daySchedule.open);
  const closeMinutes = toMinutes(daySchedule.close);

  if (closeMinutes > openMinutes) {
    // Normal same-day range, e.g. 12:00–23:00
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  } else {
    // Crosses midnight, e.g. 20:00–00:30 - open now OR early morning before close
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  }
}
