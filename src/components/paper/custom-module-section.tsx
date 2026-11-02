import { PaperMarkdown } from "@/components/paper/paper-markdown";
import { PaperSection } from "@/components/paper/paper-section";
import type { CustomModule, ModuleTarget } from "@/lib/types";

export interface CustomModuleSectionProps {
  module: CustomModule;
  editing: boolean;
  onOpen: (target: ModuleTarget) => void;
}

export function CustomModuleSection({
  module,
  editing,
  onOpen,
}: CustomModuleSectionProps) {
  if (module.hidden) return null;
  if (!module.content.trim()) return null;
  return (
    <PaperSection
      title={module.name}
      target={{ customId: module.id }}
      editing={editing}
      onOpen={onOpen}
    >
      <div className="break-inside-avoid">
        <PaperMarkdown source={module.content} />
      </div>
    </PaperSection>
  );
}
