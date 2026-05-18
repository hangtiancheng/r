import { atom } from "jotai";
import { createEmptyResumeDraft, type ResumeDraft } from "@/schema";
import { loadResumeFromStorage } from "@/services";
import { toResumeDraft } from "@/utils";

function getInitialDraft(): ResumeDraft {
  const loaded = loadResumeFromStorage();
  return loaded.ok ? toResumeDraft(loaded.resume) : createEmptyResumeDraft();
}

export const resumeDraftAtom = atom<ResumeDraft>(getInitialDraft());
