import type { Ref } from "react";

import { BaseInfoSection } from "@/components/paper/base-info-section";
import { CustomModuleSection } from "@/components/paper/custom-module-section";
import { EduSection } from "@/components/paper/edu-section";
import { HonorSection } from "@/components/paper/honor-section";
import { ProjectSection } from "@/components/paper/project-section";
import { WorkSection } from "@/components/paper/work-section";
import { isModuleHidden, orderedModuleTargets, targetKey } from "@/lib/modules";
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
      {orderedModuleTargets(data).map((target) => {
        const key = targetKey(target);
        if ("customId" in target) {
          const module = data.customModules.find(
            (module) => module.id === target.customId,
          )!;
          return (
            <CustomModuleSection
              key={key}
              module={module}
              editing={editing}
              onOpen={onOpen}
            />
          );
        }
        const props = { editing, onOpen, hidden: hidden(target.kind) };
        switch (target.kind) {
          case "base":
            return <BaseInfoSection {...props} key={key} base={data.base} />;
          case "edu":
            return <EduSection {...props} key={key} items={data.edu} />;
          case "work":
            return <WorkSection {...props} key={key} items={data.works} />;
          case "project":
            return (
              <ProjectSection {...props} key={key} items={data.projects} />
            );
          case "honor":
            return <HonorSection {...props} key={key} items={data.honors} />;
        }
      })}
    </div>
  );
}
