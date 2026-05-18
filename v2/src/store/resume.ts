import { atom } from "jotai";
import { createEmptyResume, type Resume, resumeSchema } from "@/schema";
import { decodeBase64UrlToUtf8, encodeBase64UrlFromUtf8 } from "@/utils";

const storageKey = "resume:v2";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadResumeFromLocalStorage(): Resume | null {
  if (!isBrowser()) {
    return null;
  }

  const encoded = localStorage.getItem(storageKey);
  if (encoded === null || encoded.length === 0) {
    return null;
  }

  try {
    const json = decodeBase64UrlToUtf8(encoded);
    const raw: unknown = JSON.parse(json);
    const parsed = resumeSchema.safeParse(raw);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function saveResumeToLocalStorage(resume: Resume): void {
  if (!isBrowser()) {
    return;
  }

  const normalized = resumeSchema.parse({
    ...resume,
    meta: {
      ...resume.meta,
      updatedAt: new Date().toISOString(),
    },
  });

  const encoded = encodeBase64UrlFromUtf8(JSON.stringify(normalized));
  localStorage.setItem(storageKey, encoded);
}

function getInitialResume(): Resume {
  return loadResumeFromLocalStorage() ?? createEmptyResume();
}

export const resumeAtom = atom<Resume>(getInitialResume());

export const replaceResumeAtom = atom(null, (_get, set, next: Resume) => {
  set(resumeAtom, resumeSchema.parse(next));
});

export const resetResumeAtom = atom(null, (_get, set) => {
  const empty = createEmptyResume();
  set(resumeAtom, empty);
  saveResumeToLocalStorage(empty);
});
