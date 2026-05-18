import { Input } from "antd";
import type { ReactElement, ReactNode } from "react";
import type { AwardItem } from "@/schema";
import type { UpdateResumeDoc } from "@/types";
import { createEmptyAwardItem } from "@/utils";
import { LabeledInput } from "./labeled-input";
import { ListSection } from "./list-section";
import { YearMonthInput } from "./year-month-input";

interface AwardsSectionProps {
  items: AwardItem[];
  onChange: UpdateResumeDoc;
}

export function AwardsSection(props: AwardsSectionProps): ReactElement {
  const { items, onChange } = props;

  const renderAwardItem = (
    item: AwardItem,
    onChangeItem: (next: AwardItem) => void,
  ): ReactNode => (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput
          label="Name"
          value={item.name}
          onChange={(value): void => onChangeItem({ ...item, name: value })}
        />
        <LabeledInput
          label="Issuer"
          value={item.issuer}
          onChange={(value): void => onChangeItem({ ...item, issuer: value })}
        />
        <YearMonthInput
          label="Date"
          value={item.date}
          onChange={(value) => onChangeItem({ ...item, date: value })}
        />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-slate-700">Detail</div>
        <Input.TextArea
          value={item.detail}
          placeholder="Explain the significance or ranking"
          autoSize={{ minRows: 2, maxRows: 4 }}
          onChange={(event): void =>
            onChangeItem({ ...item, detail: event.target.value })
          }
        />
      </div>
    </div>
  );

  return (
    <ListSection<AwardItem>
      title="Awards and extras"
      description="Optional: awards, certificates, research, community work, or open source."
      items={items}
      onAdd={(): void =>
        onChange((draft): void => {
          draft.resume.awards.push(createEmptyAwardItem());
        })
      }
      onRemove={(id): void =>
        onChange((draft): void => {
          draft.resume.awards = draft.resume.awards.filter(
            (item): boolean => item.id !== id,
          );
        })
      }
      onUpdate={(id, updater): void =>
        onChange((draft): void => {
          const item = draft.resume.awards.find(
            (item): boolean => item.id === id,
          );
          if (item !== undefined) {
            Object.assign(item, updater(item));
          }
        })
      }
      renderItem={renderAwardItem}
    />
  );
}
