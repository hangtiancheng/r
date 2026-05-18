import type { ReactElement, ReactNode } from "react";
import type { ProjectItem } from "@/schema";
import type { UpdateResumeDoc } from "@/types";
import { createEmptyProjectItem } from "@/utils";
import { BulletEditor } from "./bullet-editor";
import { LabeledInput } from "./labeled-input";
import { ListSection } from "./list-section";
import { YearMonthInput } from "./year-month-input";

interface ProjectsSectionProps {
  items: ProjectItem[];
  onChange: UpdateResumeDoc;
}

export function ProjectsSection(props: ProjectsSectionProps): ReactElement {
  const { items, onChange } = props;

  const renderProjectItem = (
    item: ProjectItem,
    onChangeItem: (next: ProjectItem) => void,
  ): ReactNode => (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput
          label="Project name"
          value={item.name}
          onChange={(value): void => onChangeItem({ ...item, name: value })}
        />
        <LabeledInput
          label="Role"
          value={item.role}
          onChange={(value): void => onChangeItem({ ...item, role: value })}
        />
        <LabeledInput
          label="Link"
          value={item.link}
          placeholder="https://..."
          onChange={(value): void => onChangeItem({ ...item, link: value })}
        />
        <div />
        <YearMonthInput
          label="Start"
          value={item.start}
          onChange={(value) => onChangeItem({ ...item, start: value })}
        />
        <YearMonthInput
          label="End"
          value={item.end}
          onChange={(value) => onChangeItem({ ...item, end: value })}
        />
      </div>
      <BulletEditor
        label="Highlights"
        value={item.highlights}
        onChange={(value): void => onChangeItem({ ...item, highlights: value })}
      />
    </div>
  );

  return (
    <ListSection<ProjectItem>
      title="Projects"
      description="Show technical depth, complexity, and ownership."
      items={items}
      onAdd={(): void =>
        onChange((draft): void => {
          draft.resume.projects.push(createEmptyProjectItem());
        })
      }
      onRemove={(id): void =>
        onChange((draft): void => {
          draft.resume.projects = draft.resume.projects.filter(
            (item): boolean => item.id !== id,
          );
        })
      }
      onUpdate={(id, updater): void =>
        onChange((draft): void => {
          const item = draft.resume.projects.find(
            (item): boolean => item.id === id,
          );
          if (item !== undefined) {
            Object.assign(item, updater(item));
          }
        })
      }
      renderItem={renderProjectItem}
    />
  );
}
