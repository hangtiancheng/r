import { useCallback, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { toast } from "@/components/ui/toast";
import { RESUME_ID, db, initResume, saveResume } from "@/lib/db";
import { normalizeResume } from "@/lib/normalize";
import type { ModuleKind, ResumeDoc } from "@/lib/types";

/** Item lists keyed by module, for item-level visibility toggles. */
function itemLists(
  doc: ResumeDoc,
): Partial<Record<ModuleKind, { id: string; hidden?: boolean }[]>> {
  return {
    edu: doc.edu,
    work: doc.works,
    project: doc.projects,
    honor: doc.honors,
  };
}

/**
 * Resume document state machine: live IndexedDB read, the edit draft,
 * module/item visibility toggles and persistence.
 */
export function useResumeDoc() {
  // Older stored documents predate newer fields; normalize on read.
  const doc = useLiveQuery(async () => {
    const stored = await db.resumes.get(RESUME_ID);
    return stored ? normalizeResume(stored) : stored;
  }, []);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ResumeDoc | null>(null);
  const [dialog, setDialog] = useState<ModuleKind | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void initResume();
  }, []);

  const patchDraft = useCallback((patch: (doc: ResumeDoc) => void) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      patch(next);
      return next;
    });
  }, []);

  /** Module-level visibility toggle — hidden modules keep their data. */
  const toggleModule = useCallback(
    (kind: ModuleKind) => {
      patchDraft((d) => {
        const hidden = d.hiddenModules ?? [];
        d.hiddenModules = hidden.includes(kind)
          ? hidden.filter((k) => k !== kind)
          : [...hidden, kind];
      });
    },
    [patchDraft],
  );

  /** Item-level visibility toggle (edu/work/project/honor entries). */
  const toggleItem = useCallback(
    (kind: ModuleKind, id: string) => {
      patchDraft((d) => {
        const item = itemLists(d)[kind]?.find((it) => it.id === id);
        if (item) item.hidden = !item.hidden;
      });
    },
    [patchDraft],
  );

  const startEdit = useCallback(() => {
    if (!doc) return;
    setDraft(structuredClone(doc));
    setEditing(true);
  }, [doc]);

  const cancelEdit = useCallback(() => {
    setEditing(false);
    setDraft(null);
    setDialog(null);
  }, []);

  const saveEdit = useCallback(async () => {
    if (!draft) return;
    setSaving(true);
    try {
      await saveResume(draft);
      toast.add({ title: "已保存", description: "简历已持久化到 IndexedDB" });
      setEditing(false);
      setDraft(null);
    } finally {
      setSaving(false);
    }
  }, [draft]);

  return {
    /** The document to render — draft while editing, stored copy otherwise. */
    data: editing && draft ? draft : doc,
    draft,
    editing,
    saving,
    dialog,
    setDialog,
    patchDraft,
    toggleModule,
    toggleItem,
    startEdit,
    cancelEdit,
    saveEdit,
  };
}
