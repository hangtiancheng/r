import { RESUME_ID } from "@/lib/db";
import { uid } from "@/lib/format";
import { normalizeResume } from "@/lib/normalize";
import type { ModuleKind, ResumeDoc } from "@/lib/types";

const MODULE_KINDS: readonly ModuleKind[] = [
  "base",
  "edu",
  "work",
  "project",
  "honor",
  "skill",
];

const RESUME_KEYS = [
  "title",
  "base",
  "edu",
  "works",
  "projects",
  "honors",
  "skills",
  "hiddenModules",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

export function parseResumeJson(text: string): ResumeDoc {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("文件不是合法的 JSON");
  }
  if (!isRecord(parsed)) {
    throw new Error("简历 JSON 的顶层必须是对象");
  }
  if (!RESUME_KEYS.some((key) => key in parsed)) {
    throw new Error("文件中找不到简历字段，请确认是本应用导出的 JSON");
  }

  const doc = {
    id: RESUME_ID,
    title: typeof parsed.title === "string" ? parsed.title : "",
    base: isRecord(parsed.base) ? parsed.base : {},
    edu: sanitizeEntries(parsed.edu),
    works: sanitizeEntries(parsed.works).map((work) => ({
      ...work,
      details: Array.isArray(work.details) ? work.details.filter(isRecord) : [],
    })),
    projects: sanitizeEntries(parsed.projects),
    honors: sanitizeEntries(parsed.honors),
    skills: typeof parsed.skills === "string" ? parsed.skills : "",
    hiddenModules: Array.isArray(parsed.hiddenModules)
      ? parsed.hiddenModules.filter((kind): kind is ModuleKind =>
          MODULE_KINDS.includes(kind as ModuleKind),
        )
      : [],
    updatedAt: Date.now(),
  } as unknown as ResumeDoc;

  return normalizeResume(doc);
}
