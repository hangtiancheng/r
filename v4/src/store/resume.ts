import { atom } from "jotai";
import { emptyResume, sampleResume } from "@/constants";
import type { Resume, ResumeHydrationSource } from "@/schema";
import { loadResumeFromLocalStorage } from "@/services";

export interface ResumeHydrationState {
  hydrated: boolean;
  source: ResumeHydrationSource;
  message?: string;
}

export const resumeAtom = atom<Resume>(emptyResume);

export const resumeHydrationAtom = atom<ResumeHydrationState>({
  hydrated: false,
  source: "default",
});

export const triggerHydrateAtom = atom(null, (_get, set): void => {
  const result = loadResumeFromLocalStorage();
  set(resumeAtom, result.resume);
  set(resumeHydrationAtom, {
    hydrated: true,
    source: result.source,
    message: result.error,
  });
});

export const setSampleResumeAtom = atom(null, (_get, set): void => {
  set(resumeAtom, sampleResume);
});

export const setEmptyResumeAtom = atom(null, (_get, set): void => {
  set(resumeAtom, emptyResume);
});
