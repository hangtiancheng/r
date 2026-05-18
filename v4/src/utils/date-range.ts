export function formatDateRange(start: string, end: string): string {
  const normalizedStart = start.trim();
  const normalizedEnd = end.trim();

  if (normalizedStart.length === 0 && normalizedEnd.length === 0) {
    return "";
  }

  if (normalizedStart.length === 0) {
    return normalizedEnd;
  }

  if (normalizedEnd.length === 0) {
    return normalizedStart;
  }

  return `${normalizedStart} - ${normalizedEnd}`;
}
