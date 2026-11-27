// Visit days in India time: Monday–Saturday only, from tomorrow up to `booking.daysAhead` days.
import { booking } from "./config.js";

const IST_OFFSET_MIN = 330;

/** Today's date in IST as YYYY-MM-DD */
export function istToday(now = new Date()): string {
  return new Date(now.getTime() + IST_OFFSET_MIN * 60_000).toISOString().slice(0, 10);
}

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

const isSunday = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay() === 0;

/** Bookable days (excludes Sundays), starting tomorrow */
export function bookableDays(now = new Date()): string[] {
  const today = istToday(now);
  const days: string[] = [];
  for (let i = 1; i <= booking.daysAhead; i++) {
    const d = addDays(today, i);
    if (!isSunday(d)) days.push(d);
  }
  return days;
}

/** "Fri, 28 Nov" */
export function prettyDay(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}
