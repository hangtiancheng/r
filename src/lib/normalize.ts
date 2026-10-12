import { uid } from "@/lib/format";
import type { BaseInfo, ModuleKind, ResumeDoc } from "@/lib/types";

const MODULE_KINDS: readonly ModuleKind[] = [
  "base",
  "edu",
  "work",
  "project",
  "honor",
  "skill",
];

const DEFAULT_BASE: BaseInfo = {
  name: "",
  gender: "男",
  birth: "",
  showAge: false,
  freshGraduate: false,
  workStart: "",
  tel: "",
  email: "",
  hometown: "",
  political: "",
  location: "",
  degree: "",
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asBool(value: unknown): boolean {
  return value === true;
}

function sanitizeEntries(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.filter(isRecord).map((item) => {
    let id = typeof item.id === "string" && item.id ? item.id : uid();
    while (seen.has(id)) id = uid();
    seen.add(id);
    return { ...item, id };
  });
}

function coerceStrings<T extends object>(
  item: Record<string, unknown>,
  keys: (keyof T & string)[],
): T {
  for (const key of keys) item[key] = asString(item[key]);
  return item as T;
}

export function normalizeResume(doc: ResumeDoc): ResumeDoc {
  doc.title = asString(doc.title);
  doc.skills = asString(doc.skills);
  doc.hiddenModules = Array.isArray(doc.hiddenModules)
    ? doc.hiddenModules.filter((kind): kind is ModuleKind =>
        MODULE_KINDS.includes(kind as ModuleKind),
      )
    : [];

  const base = { ...DEFAULT_BASE, ...(isRecord(doc.base) ? doc.base : {}) };
  for (const key of Object.keys(DEFAULT_BASE) as (keyof BaseInfo)[]) {
    if (key === "gender") base.gender = base.gender === "女" ? "女" : "男";
    else if (key === "showAge") base.showAge = asBool(base.showAge);
    else if (key === "freshGraduate")
      base.freshGraduate = asBool(base.freshGraduate);
    else base[key] = asString(base[key]);
  }
  doc.base = base;

  doc.edu = sanitizeEntries(doc.edu).map((entry) =>
    coerceStrings<ResumeDoc["edu"][number]>(entry, [
      "start",
      "end",
      "school",
      "major",
      "degree",
      "gpa",
      "rank",
    ]),
  );
  doc.works = sanitizeEntries(doc.works).map((entry) => {
    const work = coerceStrings<ResumeDoc["works"][number]>(entry, [
      "start",
      "end",
      "company",
      "department",
      "position",
    ]);
    work.details = Array.isArray(entry.details)
      ? entry.details
          .filter(isRecord)
          .map((detail) =>
            coerceStrings<ResumeDoc["works"][number]["details"][number]>(
              detail,
              ["title", "content"],
            ),
          )
      : [];
    return work;
  });
  doc.projects = sanitizeEntries(doc.projects).map((entry) =>
    coerceStrings<ResumeDoc["projects"][number]>(entry, [
      "start",
      "end",
      "name",
      "duty",
      "repo",
      "content",
    ]),
  );
  doc.honors = sanitizeEntries(doc.honors).map((entry) =>
    coerceStrings<ResumeDoc["honors"][number]>(entry, [
      "name",
      "issuer",
      "date",
    ]),
  );
  return doc;
}
