import { uid } from "@/lib/format";
import type {
  BaseInfo,
  BirthDisplay,
  CustomModule,
  ModuleKind,
  ResumeDoc,
} from "@/lib/types";

const MODULE_KINDS: readonly ModuleKind[] = [
  "base",
  "edu",
  "work",
  "project",
  "honor",
];

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asBool(value: unknown): boolean {
  return value === true;
}

function asBirthDisplay(value: unknown): BirthDisplay {
  return value === "age" ? "age" : "month";
}

function asModuleName(value: unknown): string {
  return typeof value === "string" && value.trim() ? value : "自定义模块";
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

function sanitizeCustomModules(doc: ResumeDoc): void {
  doc.customModules = sanitizeEntries(doc.customModules).map((entry) => {
    const module = coerceStrings<CustomModule>(entry, [
      "name",
      "icon",
      "content",
    ]);
    module.name = asModuleName(module.name);
    return module;
  });
}

export function normalizeResume(doc: ResumeDoc): ResumeDoc {
  doc.title = asString(doc.title);
  doc.hiddenModules = Array.isArray(doc.hiddenModules)
    ? doc.hiddenModules.filter((kind): kind is ModuleKind =>
        MODULE_KINDS.includes(kind as ModuleKind),
      )
    : [];

  const rawBase: Record<string, unknown> = isRecord(doc.base) ? doc.base : {};
  const base: BaseInfo = {
    name: asString(rawBase.name),
    gender: rawBase.gender === "女" ? "女" : "男",
    birth: asString(rawBase.birth),
    birthDisplay: asBirthDisplay(rawBase.birthDisplay),
    freshGraduate: asBool(rawBase.freshGraduate),
    workStart: asString(rawBase.workStart),
    tel: asString(rawBase.tel),
    email: asString(rawBase.email),
    hometown: asString(rawBase.hometown),
    location: asString(rawBase.location),
    degree: asString(rawBase.degree),
  };
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

  sanitizeCustomModules(doc);
  delete (doc as unknown as { skills?: unknown }).skills;
  return doc;
}
