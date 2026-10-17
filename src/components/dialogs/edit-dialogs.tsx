import { useMemo } from "react";

import { BaseInfoDialog } from "@/components/dialogs/base-info-dialog";
import { CustomModuleDialog } from "@/components/dialogs/custom-module-dialog";
import { EduDialog } from "@/components/dialogs/edu-dialog";
import { HonorDialog } from "@/components/dialogs/honor-dialog";
import { ProjectDialog } from "@/components/dialogs/project-dialog";
import { WorkDialog } from "@/components/dialogs/work-dialog";
import { isSameTarget } from "@/lib/modules";
import type { CustomModule, ModuleTarget, ResumeDoc } from "@/lib/types";
import { EMPTY_REPORT, validateResume } from "@/lib/validation";

export interface EditDialogsProps {
  dialog: ModuleTarget | null;
  setDialog: (target: ModuleTarget | null) => void;
  draft: ResumeDoc;
  showErrors: boolean;
  patchDraft: (patch: (doc: ResumeDoc) => void) => void;
  pendingModule: CustomModule | null;
  onPatchPendingModule: (patch: Partial<CustomModule>) => void;
  onCommitPendingModule: () => void;
  onDiscardPendingModule: () => void;
  onRemoveCustomModule: (id: string) => void;
}

export function EditDialogs({
  dialog,
  setDialog,
  draft,
  showErrors,
  patchDraft,
  pendingModule,
  onPatchPendingModule,
  onCommitPendingModule,
  onDiscardPendingModule,
  onRemoveCustomModule,
}: EditDialogsProps) {
  const report = useMemo(
    () => (showErrors ? validateResume(draft) : EMPTY_REPORT),
    [draft, showErrors],
  );
  const bind = (target: ModuleTarget) => ({
    open: isSameTarget(dialog, target),
    onOpenChange: (open: boolean) => setDialog(open ? target : null),
  });
  const customId = dialog && "customId" in dialog ? dialog.customId : null;
  const customModule = draft.customModules.find((it) => it.id === customId);
  return (
    <>
      <BaseInfoDialog
        {...bind({ kind: "base" })}
        base={draft.base}
        onChange={(patch) => patchDraft((d) => Object.assign(d.base, patch))}
        report={report}
      />
      <EduDialog
        {...bind({ kind: "edu" })}
        items={draft.edu}
        onChange={(items) => patchDraft((d) => (d.edu = items))}
        report={report}
      />
      <WorkDialog
        {...bind({ kind: "work" })}
        items={draft.works}
        onChange={(items) => patchDraft((d) => (d.works = items))}
        report={report}
      />
      <ProjectDialog
        {...bind({ kind: "project" })}
        items={draft.projects}
        onChange={(items) => patchDraft((d) => (d.projects = items))}
        report={report}
      />
      <HonorDialog
        {...bind({ kind: "honor" })}
        items={draft.honors}
        onChange={(items) => patchDraft((d) => (d.honors = items))}
        report={report}
      />
      {customModule && (
        <CustomModuleDialog
          {...bind({ customId: customModule.id })}
          title={customModule.name.trim() || "自定义模块"}
          module={customModule}
          onChange={(patch) =>
            patchDraft((d) => {
              const target = d.customModules.find(
                (it) => it.id === customModule.id,
              );
              if (target) Object.assign(target, patch);
            })
          }
          onRemove={() => {
            onRemoveCustomModule(customModule.id);
            setDialog(null);
          }}
          report={report}
        />
      )}
      <CustomModuleDialog
        open={!!pendingModule}
        onOpenChange={(open) => {
          if (!open) onDiscardPendingModule();
        }}
        title="新增自定义模块"
        module={pendingModule ?? undefined}
        onChange={onPatchPendingModule}
        onConfirm={onCommitPendingModule}
        report={EMPTY_REPORT}
      />
    </>
  );
}
