import type { YearMonth } from "@/schema";

export function normalizeYearMonth(value: string): YearMonth {
  return value.trim().replace(/\//g, "-").replace(/\./g, "-");
}

export function formatRange(start: YearMonth, end: YearMonth): string {
  const parts = [start, end].filter(Boolean);
  return parts.length === 0 ? "" : parts.join(" - ");
}

export function sanitizeLink(link: string): string {
  const trimmedLink = link.trim();
  return trimmedLink.length === 0
    ? ""
    : trimmedLink.replace(/^https?:\/\//, "");
}
