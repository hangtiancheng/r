import { z } from "zod";
import { emptyResume } from "@/constants";
import {
  resumeSchema,
  type Resume,
  type ResumeHydrationSource,
} from "@/schema";
import { base64UrlDecode, base64UrlEncode } from "@/utils";

export const resumeStorageKey = "resume_editor:resume:encoded:v4";

const storedResumeSchema = z
  .object({
    version: z.literal(1),
    updatedAt: z.string().catch(""),
    resume: resumeSchema,
  })
  .strict();

type StoredResume = z.infer<typeof storedResumeSchema>;

export interface ResumeLoadResult {
  resume: Resume;
  source: ResumeHydrationSource;
  error?: string;
}

function createTimestamp(): string {
  return new Date().toISOString();
}

function parseJson(json: string): unknown {
  const value: unknown = JSON.parse(json);
  return value;
}

export function encodeStoredResume(payload: StoredResume): string {
  return base64UrlEncode(JSON.stringify(payload));
}

export function decodeStoredResume(encoded: string): unknown {
  return parseJson(base64UrlDecode(encoded));
}

export function loadResumeFromLocalStorage(): ResumeLoadResult {
  if (typeof window === "undefined") {
    return { resume: emptyResume, source: "default" };
  }

  try {
    const raw = window.localStorage.getItem(resumeStorageKey);

    if (raw === null) {
      return { resume: emptyResume, source: "default" };
    }

    const parsed = storedResumeSchema.safeParse(decodeStoredResume(raw));

    if (!parsed.success) {
      return {
        resume: emptyResume,
        source: "default",
        error: "Local data failed validation and was ignored.",
      };
    }

    return { resume: parsed.data.resume, source: "storage" };
  } catch {
    return {
      resume: emptyResume,
      source: "default",
      error: "Local data could not be decoded and was ignored.",
    };
  }
}

export function saveResumeToLocalStorage(resume: Resume): void {
  if (typeof window === "undefined") {
    return;
  }

  const payload: StoredResume = {
    version: 1,
    updatedAt: createTimestamp(),
    resume: resumeSchema.parse(resume),
  };

  try {
    window.localStorage.setItem(resumeStorageKey, encodeStoredResume(payload));
  } catch {
    return;
  }
}

export function clearResumeLocalStorage(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(resumeStorageKey);
  } catch {
    return;
  }
}
