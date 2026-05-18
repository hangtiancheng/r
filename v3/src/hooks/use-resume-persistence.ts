import { message } from "antd";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import {
  clearResumeStorage,
  loadResumeFromStorage,
  saveResumeToStorage,
} from "@/services";
import { resumeDraftAtom } from "@/store";
import { toPersistedResume } from "@/utils";

export function useResumePersistence(): void {
  const draft = useAtomValue(resumeDraftAtom);
  const warnedRef = useRef(false);
  const firstSaveSkippedRef = useRef(false);

  useEffect(() => {
    if (warnedRef.current) {
      return;
    }

    warnedRef.current = true;
    const loaded = loadResumeFromStorage();
    if (
      !loaded.ok &&
      loaded.reason !== "empty" &&
      loaded.reason !== "not_in_browser"
    ) {
      clearResumeStorage();
      message.warning("Invalid local resume data was ignored and cleared.");
    }
  }, []);

  useEffect(() => {
    if (!firstSaveSkippedRef.current) {
      firstSaveSkippedRef.current = true;
      return;
    }

    const timerId = window.setTimeout(() => {
      try {
        saveResumeToStorage(toPersistedResume(draft));
      } catch {
        // Draft data can be temporarily incomplete while editing form lists.
      }
    }, 350);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [draft]);
}
