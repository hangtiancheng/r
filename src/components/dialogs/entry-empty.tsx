import { InboxIcon } from "lucide-react";

import { AddEntryButton } from "@/components/dialogs/add-entry-button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export interface EntryEmptyProps {
  title: string;
  description: string;
  addLabel: string;
  onAdd: () => void;
}

export function EntryEmpty({
  title,
  description,
  addLabel,
  onAdd,
}: EntryEmptyProps) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AddEntryButton label={addLabel} onClick={onAdd} />
      </EmptyContent>
    </Empty>
  );
}
