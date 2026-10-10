import { PaperMarkdown } from "@/components/paper/paper-markdown";
import { PaperSection } from "@/components/paper/paper-section";
import type { ModuleKind } from "@/lib/types";

export interface SkillSectionProps {
  source: string;
  editing: boolean;
  onOpen: (kind: ModuleKind) => void;
  hidden?: boolean;
}

/** 个人技能: a single markdown body rendered at full ink. */
export function SkillSection({
  source,
  editing,
  onOpen,
  hidden,
}: SkillSectionProps) {
  if (!source?.trim()) return null;
  return (
    <PaperSection
      title="个人技能"
      kind="skill"
      editing={editing}
      onOpen={onOpen}
      hidden={hidden}
    >
      <PaperMarkdown source={source} strong />
    </PaperSection>
  );
}
