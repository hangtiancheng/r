import { message } from "antd";
import { useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import type { ResumeDocument } from "@/schema";
import type { ResumeDocMutator } from "@/types";
import {
  clearStoredResume,
  createEmptyResumeDoc,
  createNowIso,
  getDefaultResume,
  persistResume,
  readStoredResume,
} from "@/utils";

function readInitialResume(): ResumeDocument {
  const storedResumeDoc = readStoredResume();
  return storedResumeDoc ?? getDefaultResume();
}

export interface UseResumeResult {
  doc: ResumeDocument;
  updateDoc: (mutator: ResumeDocMutator) => void;
  resetToEmpty: () => void;
  restoreDefault: () => void;
}

export function useResume(): UseResumeResult {
  const [doc, setDoc] = useImmer<ResumeDocument>(() => readInitialResume());

  useEffect((): (() => void) => {
    const handle = window.setTimeout((): void => {
      persistResume(doc);
    }, 250);

    return (): void => window.clearTimeout(handle);
  }, [doc]);

  const updateDoc = useCallback((mutator: ResumeDocMutator): void => {
    setDoc((draft: ResumeDocument): void => {
      mutator(draft);
      draft.updatedAt = createNowIso();
    });
  }, []);

  const resetToEmpty = useCallback((): void => {
    clearStoredResume();
    setDoc(createEmptyResumeDoc());
    message.success("Started a new resume.");
  }, []);

  const restoreDefault = useCallback((): void => {
    clearStoredResume();
    setDoc(getDefaultResume());
    message.success("Restored the default resume.");
  }, []);

  return { doc, resetToEmpty, restoreDefault, updateDoc };
}
