import type { Ref } from "react";

import { BaseInfoSection } from "@/components/paper/base-info-section";
import { EduSection } from "@/components/paper/edu-section";
import { HonorSection } from "@/components/paper/honor-section";
import { ProjectSection } from "@/components/paper/project-section";
import { SkillSection } from "@/components/paper/skill-section";
import { WorkSection } from "@/components/paper/work-section";
import { isModuleHidden } from "@/lib/modules";
import type { ModuleKind, ResumeDoc } from "@/lib/types";

export interface ResumePaperProps {
  data: ResumeDoc;
  editing: boolean;
  onOpen: (kind: ModuleKind) => void;
  /** Root sheet element — used as the PDF export source. */
  ref?: Ref<HTMLDivElement>;
}

/** The A4-ish resume sheet, styled after QQ Mail's resume preview. */
export function ResumePaper({ data, editing, onOpen, ref }: ResumePaperProps) {
  const hidden = (kind: ModuleKind) => isModuleHidden(data, kind);
  return (
    <div ref={ref} className="px-4 py-3.5 text-sm md:px-5 md:py-4 print:p-0">
      <BaseInfoSection
        base={data.base}
        editing={editing}
        onOpen={onOpen}
        hidden={hidden("base")}
      />
      <EduSection
        items={data.edu}
        editing={editing}
        onOpen={onOpen}
        hidden={hidden("edu")}
      />
      <WorkSection
        items={data.works}
        editing={editing}
        onOpen={onOpen}
        hidden={hidden("work")}
      />
      <ProjectSection
        items={data.projects}
        editing={editing}
        onOpen={onOpen}
        hidden={hidden("project")}
      />
      <HonorSection
        items={data.honors}
        editing={editing}
        onOpen={onOpen}
        hidden={hidden("honor")}
      />
      <SkillSection
        source={data.skills}
        editing={editing}
        onOpen={onOpen}
        hidden={hidden("skill")}
      />
    </div>
  );
}
