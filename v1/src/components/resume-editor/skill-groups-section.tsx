import type { ReactElement, ReactNode } from "react";
import type { SkillGroup } from "@/schema";
import type { UpdateResumeDoc } from "@/types";
import { createEmptySkillGroup } from "@/utils";
import { BulletEditor } from "./bullet-editor";
import { LabeledInput } from "./labeled-input";
import { ListSection } from "./list-section";

interface SkillGroupsSectionProps {
  items: SkillGroup[];
  onChange: UpdateResumeDoc;
}

export function SkillGroupsSection(
  props: SkillGroupsSectionProps,
): ReactElement {
  const { items, onChange } = props;

  const renderSkillGroup = (
    item: SkillGroup,
    onChangeItem: (next: SkillGroup) => void,
  ): ReactNode => (
    <div className="space-y-3">
      <LabeledInput
        label="Category"
        value={item.category}
        onChange={(value): void => onChangeItem({ ...item, category: value })}
      />
      <BulletEditor
        label="Items"
        value={item.items}
        onChange={(value): void => onChangeItem({ ...item, items: value })}
      />
    </div>
  );

  return (
    <ListSection<SkillGroup>
      title="Skill groups"
      description="Group keywords by category so the resume stays easy to scan."
      items={items}
      onAdd={(): void =>
        onChange((draft): void => {
          draft.resume.skillGroups.push(createEmptySkillGroup());
        })
      }
      onRemove={(id): void =>
        onChange((draft): void => {
          draft.resume.skillGroups = draft.resume.skillGroups.filter(
            (item): boolean => item.id !== id,
          );
        })
      }
      onUpdate={(id, updater): void =>
        onChange((draft): void => {
          const item = draft.resume.skillGroups.find(
            (item): boolean => item.id === id,
          );
          if (item !== undefined) {
            Object.assign(item, updater(item));
          }
        })
      }
      renderItem={renderSkillGroup}
    />
  );
}
