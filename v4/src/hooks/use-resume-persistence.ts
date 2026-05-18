import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { saveResumeToLocalStorage } from "@/services";
import { resumeAtom, resumeHydrationAtom, triggerHydrateAtom } from "@/store";

export function useResumePersistence(): void {
  const hydrate = useSetAtom(triggerHydrateAtom);
  const resume = useAtomValue(resumeAtom);
  const hydration = useAtomValue(resumeHydrationAtom);

  useEffect((): void => {
    hydrate();
  }, [hydrate]);

  useEffect((): (() => void) | void => {
    if (!hydration.hydrated) {
      return;
    }

    const timerId = window.setTimeout((): void => {
      saveResumeToLocalStorage(resume);
    }, 300);

    return (): void => {
      window.clearTimeout(timerId);
    };
  }, [hydration.hydrated, resume]);
}
