import { Button, Card, Collapse } from "antd";
import type { ReactElement, ReactNode } from "react";

interface ListSectionProps<TItem extends { id: string }> {
  title: string;
  description: string;
  items: TItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updater: (previous: TItem) => TItem) => void;
  renderItem: (item: TItem, onChangeItem: (next: TItem) => void) => ReactNode;
}

export function ListSection<TItem extends { id: string }>(
  props: ListSectionProps<TItem>,
): ReactElement {
  const { description, items, onAdd, onRemove, onUpdate, renderItem, title } =
    props;

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="text-xs text-slate-500">{description}</div>
        </div>
        <Button onClick={onAdd} type="dashed">
          + Add
        </Button>
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          No entries yet. Click “Add” to create one.
        </div>
      ) : (
        <Collapse
          accordion
          className="bg-white"
          items={items.map((item: TItem, index: number) => ({
            key: item.id,
            label: `${title} #${index + 1}`,
            children: (
              <div className="space-y-3">
                <Card size="small" className="bg-slate-50">
                  {renderItem(item, (next: TItem): void =>
                    onUpdate(item.id, (): TItem => next),
                  )}
                </Card>
                <div className="flex justify-end">
                  <Button danger onClick={(): void => onRemove(item.id)}>
                    Delete entry
                  </Button>
                </div>
              </div>
            ),
            extra: (
              <span className="text-xs text-slate-400">
                {index + 1}/{items.length}
              </span>
            ),
          }))}
        />
      )}
      {items.length > 0 ? (
        <div className="text-xs text-slate-500">
          Keep the overall document concise so the PDF can stay on one page.
        </div>
      ) : null}
    </div>
  );
}
