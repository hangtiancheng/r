import type { ReactElement, ReactNode } from "react";
import type { EducationItem } from "@/schema";
import type { UpdateResumeDoc } from "@/types";
import { createEmptyEducationItem } from "@/utils";
import { BulletEditor } from "./bullet-editor";
import { LabeledInput } from "./labeled-input";
import { ListSection } from "./list-section";
import { YearMonthInput } from "./year-month-input";

interface EducationSectionProps {
  items: EducationItem[];
  onChange: UpdateResumeDoc;
}

export function EducationSection(props: EducationSectionProps): ReactElement {
  const { items, onChange } = props;

  const renderEducationItem = (
    item: EducationItem,
    onChangeItem: (next: EducationItem) => void,
  ): ReactNode => (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput
          label="School"
          value={item.school}
          onChange={(value): void => onChangeItem({ ...item, school: value })}
        />
        <LabeledInput
          label="Degree"
          value={item.degree}
          onChange={(value): void => onChangeItem({ ...item, degree: value })}
        />
        <LabeledInput
          label="Major"
          value={item.major}
          onChange={(value): void => onChangeItem({ ...item, major: value })}
        />
        <LabeledInput
          label="Location"
          value={item.location}
          onChange={(value): void => onChangeItem({ ...item, location: value })}
        />
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
    <ListSection<EducationItem>
      title="Education"
      description="Highlight schools, degree progression, and notable academic details."
      items={items}
      onAdd={(): void =>
        onChange((draft): void => {
          draft.resume.education.push(createEmptyEducationItem());
        })
      }
      onRemove={(id): void =>
        onChange((draft): void => {
          draft.resume.education = draft.resume.education.filter(
            (item): boolean => item.id !== id,
          );
        })
      }
      onUpdate={(id, updater): void =>
        onChange((draft): void => {
          const item = draft.resume.education.find(
            (item): boolean => item.id === id,
          );
          if (item !== undefined) {
            Object.assign(item, updater(item));
          }
        })
      }
      renderItem={renderEducationItem}
    />
  );
}
