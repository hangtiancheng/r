import { RESUME_ID } from "@/lib/db";
import { isRecord, normalizeResume } from "@/lib/normalize";
import type { ResumeDoc } from "@/lib/types";

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

  return normalizeResume({
    ...parsed,
    id: RESUME_ID,
    updatedAt: Date.now(),
  } as ResumeDoc);
}
