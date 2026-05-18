import { resumeStorageKey } from "@/constants";
import { resumeDocumentSchema, type ResumeDocument } from "@/schema";
import { base64UrlDecode, base64UrlEncode } from "./base64-url";

export function encodeResume(doc: ResumeDocument): string {
  return base64UrlEncode(JSON.stringify(doc));
}

export function decodeResume(encoded: string): ResumeDocument | null {
  try {
    const json = base64UrlDecode(encoded);
    const parsed: unknown = JSON.parse(json);
    const result = resumeDocumentSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function readStoredResume(): ResumeDocument | null {
  try {
    const rawDoc = localStorage.getItem(resumeStorageKey);
    return rawDoc === null ? null : decodeResume(rawDoc);
  } catch {
    return null;
  }
}

export function persistResume(doc: ResumeDocument): void {
  localStorage.setItem(resumeStorageKey, encodeResume(doc));
}

export function clearStoredResume(): void {
  localStorage.removeItem(resumeStorageKey);
}
