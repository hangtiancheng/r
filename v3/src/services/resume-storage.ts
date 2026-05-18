import { z } from "zod";
import { resumeSchema, type Resume } from "@/schema";
import { decodeBase64ToUtf8, encodeUtf8ToBase64 } from "@/utils";

const storageKey = "resume:v3";
const storageEnvelopeSchema = z
  .object({
    version: z.literal(1),
    payload: z.string(),
    savedAt: z.string().datetime().optional(),
  })
  .strict();

export type ResumeLoadResult =
  | { ok: true; resume: Resume }
  | { ok: false; reason: string };

export function loadResumeFromStorage(): ResumeLoadResult {
  if (typeof window === "undefined") {
    return { ok: false, reason: "not_in_browser" };
  }

  const raw = window.localStorage.getItem(storageKey);
  if (raw === null || raw.length === 0) {
    return { ok: false, reason: "empty" };
  }

  try {
    const envelope: unknown = JSON.parse(raw);
    const envelopeResult = storageEnvelopeSchema.safeParse(envelope);
    if (!envelopeResult.success) {
      return { ok: false, reason: "invalid_envelope" };
    }

    const decoded = decodeBase64ToUtf8(envelopeResult.data.payload);
    const resumeCandidate: unknown = JSON.parse(decoded);
    const resumeResult = resumeSchema.safeParse(resumeCandidate);
    return resumeResult.success
      ? { ok: true, resume: resumeResult.data }
      : { ok: false, reason: "invalid_resume_json" };
  } catch {
    return { ok: false, reason: "exception" };
  }
}

export function saveResumeToStorage(resume: Resume): void {
  if (typeof window === "undefined") {
    return;
  }

  const savedAt = new Date().toISOString();
  const persisted = resumeSchema.parse({ ...resume, updatedAt: savedAt });
  const envelope = {
    version: 1,
    payload: encodeUtf8ToBase64(JSON.stringify(persisted)),
    savedAt,
  };

  window.localStorage.setItem(storageKey, JSON.stringify(envelope));
}

export function clearResumeStorage(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(storageKey);
}
