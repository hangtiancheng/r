import type { BaseInfo } from "@/lib/types";

export const GENDERS = ["男", "女"] as const;

export const DEGREES = ["大专", "本科", "硕士", "博士", "其他"] as const;

export function uid(): string {
  return crypto.randomUUID();
}

export function formatMonth(month: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(month);
  if (!m) return month;
  return `${m[1]}.${Number(m[2])}`;
}

export function formatRange(item: {
  start: string;
  end: string;
  ongoing: boolean;
}): string {
  const end = item.ongoing ? "至今" : formatMonth(item.end);
  return `${formatMonth(item.start)} - ${end}`;
}

export function ageFrom(birth: string): number | null {
  if (!/^\d{4}-\d{2}$/.test(birth)) return null;
  const [y, m] = birth.split("-").map(Number);
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < m) age -= 1;
  return age >= 0 ? age : null;
}

export function formatBirth(birth: string): string | null {
  const m = /^(\d{4})-(\d{2})$/.exec(birth);
  if (!m) return null;
  return `${m[1]}年${Number(m[2])}月`;
}

export function buildTags(base: BaseInfo): string[] {
  const tags: string[] = [];
  if (base.freshGraduate) tags.push("应届毕业生");
  if (base.degree) tags.push(base.degree);
  if (base.birthDisplay === "age") {
    const age = ageFrom(base.birth);
    if (age !== null) tags.push(`${age}岁`);
  } else {
    const birth = formatBirth(base.birth);
    if (birth) tags.push(birth);
  }
  if (base.gender) tags.push(base.gender);
  return tags;
}
