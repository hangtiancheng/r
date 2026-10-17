import type { Ref } from "react";

import { BaseInfoSection } from "@/components/paper/base-info-section";
import { CustomModuleSection } from "@/components/paper/custom-module-section";
import { EduSection } from "@/components/paper/edu-section";
import { HonorSection } from "@/components/paper/honor-section";
import { ProjectSection } from "@/components/paper/project-section";
import { WorkSection } from "@/components/paper/work-section";
import { isModuleHidden } from "@/lib/modules";
import type { ModuleKind, ModuleTarget, ResumeDoc } from "@/lib/types";

export interface ResumePaperProps {
  data: ResumeDoc;
  editing: boolean;
  onOpen: (target: ModuleTarget) => void;
  ref?: Ref<HTMLDivElement>;
}

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
      {data.customModules.map((module) => (
        <CustomModuleSection
          key={module.id}
          module={module}
          editing={editing}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
