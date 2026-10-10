import { BaseInfoDialog } from "@/components/dialogs/base-info-dialog";
import { EduDialog } from "@/components/dialogs/edu-dialog";
import { HonorDialog } from "@/components/dialogs/honor-dialog";
import { ProjectDialog } from "@/components/dialogs/project-dialog";
import { SkillDialog } from "@/components/dialogs/skill-dialog";
import { WorkDialog } from "@/components/dialogs/work-dialog";
import type { ModuleKind, ResumeDoc } from "@/lib/types";

export interface EditDialogsProps {
  dialog: ModuleKind | null;
  setDialog: (kind: ModuleKind | null) => void;
  draft: ResumeDoc;
  patchDraft: (patch: (doc: ResumeDoc) => void) => void;
}

/** Renders every module dialog; `dialog` decides which one is open. */
export function EditDialogs({
  dialog,
  setDialog,
  draft,
  patchDraft,
}: EditDialogsProps) {
  const bind = (kind: ModuleKind) => ({
    open: dialog === kind,
    onOpenChange: (open: boolean) => setDialog(open ? kind : null),
  });
  return (
    <>
      <BaseInfoDialog
        {...bind("base")}
        base={draft.base}
        onChange={(patch) => patchDraft((d) => Object.assign(d.base, patch))}
      />
      <EduDialog
        {...bind("edu")}
        items={draft.edu}
        onChange={(items) => patchDraft((d) => (d.edu = items))}
      />
      <WorkDialog
        {...bind("work")}
        items={draft.works}
        onChange={(items) => patchDraft((d) => (d.works = items))}
      />
      <ProjectDialog
        {...bind("project")}
        items={draft.projects}
        onChange={(items) => patchDraft((d) => (d.projects = items))}
      />
      <HonorDialog
        {...bind("honor")}
        items={draft.honors}
        onChange={(items) => patchDraft((d) => (d.honors = items))}
      />
      <SkillDialog
        {...bind("skill")}
        skills={draft.skills}
        onChange={(skills) => patchDraft((d) => (d.skills = skills))}
      />
    </>
  );
}
