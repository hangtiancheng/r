import { useCallback, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { toast } from "@/components/ui/toast";
import { RESUME_ID, db, initResume, saveResume } from "@/lib/db";
import { newCustomModule } from "@/lib/factories";
import { isSameTarget } from "@/lib/modules";
import { normalizeResume } from "@/lib/normalize";
import type { ModuleKind, ModuleTarget, ResumeDoc } from "@/lib/types";
import { validateResume } from "@/lib/validation";

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

export function useResumeDoc() {
  const doc = useLiveQuery(async () => {
    const stored = await db.resumes.get(RESUME_ID);
    return stored ? normalizeResume(stored) : stored;
  }, []);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ResumeDoc | null>(null);
  const [dialog, setDialogState] = useState<ModuleTarget | null>(null);
  const [saving, setSaving] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    void initResume();
  }, []);

  const setDialog = useCallback((target: ModuleTarget | null) => {
    setDialogState((prev) => (isSameTarget(prev, target) ? prev : target));
  }, []);

  const patchDraft = useCallback((patch: (doc: ResumeDoc) => void) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      patch(next);
      return next;
    });
  }, []);

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

  const toggleItem = useCallback(
    (kind: ModuleKind, id: string) => {
      patchDraft((d) => {
        const item = itemLists(d)[kind]?.find((it) => it.id === id);
        if (item) item.hidden = !item.hidden;
      });
    },
    [patchDraft],
  );

  const toggleCustomModule = useCallback(
    (id: string) => {
      patchDraft((d) => {
        const module = d.customModules.find((it) => it.id === id);
        if (module) module.hidden = !module.hidden;
      });
    },
    [patchDraft],
  );

  const addCustomModule = useCallback(() => {
    const module = newCustomModule();
    patchDraft((d) => {
      d.customModules = [...d.customModules, module];
    });
    setDialog({ customId: module.id });
  }, [patchDraft, setDialog]);

  const removeCustomModule = useCallback(
    (id: string) => {
      patchDraft((d) => {
        d.customModules = d.customModules.filter((it) => it.id !== id);
      });
    },
    [patchDraft],
  );

  const startEdit = useCallback(() => {
    if (!doc) return;
    setDraft(structuredClone(doc));
    setShowErrors(false);
    setEditing(true);
  }, [doc]);

  const cancelEdit = useCallback(() => {
    setEditing(false);
    setDraft(null);
    setShowErrors(false);
    setDialogState(null);
  }, []);

  const saveEdit = useCallback(async (): Promise<boolean> => {
    if (!draft) return false;
    const report = validateResume(draft);
    if (report.issues.length > 0) {
      const first = report.issues[0];
      setShowErrors(true);
      toast.add({
        title: "保存失败",
        description: `共 ${report.issues.length} 处校验失败: ${first.message}`,
        type: "error",
      });
      return false;
    }
    setSaving(true);
    try {
      await saveResume(draft);
      toast.add({ title: "已保存", description: "简历已保存" });
      setEditing(false);
      setDraft(null);
      return true;
    } finally {
      setSaving(false);
    }
  }, [draft]);

  return {
    data: editing && draft ? draft : doc,
    draft,
    editing,
    saving,
    showErrors,
    dialog,
    setDialog,
    patchDraft,
    toggleModule,
    toggleItem,
    toggleCustomModule,
    addCustomModule,
    removeCustomModule,
    startEdit,
    cancelEdit,
    saveEdit,
  };
}
