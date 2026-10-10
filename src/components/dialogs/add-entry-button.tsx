import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface AddEntryButtonProps {
  label: string;
  onClick: () => void;
}

/** Dashed full-width 添加… button at the bottom of list dialogs. */
export function AddEntryButton({ label, onClick }: AddEntryButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full border-dashed"
      onClick={onClick}
    >
      <PlusIcon data-icon="inline-start" />
      {label}
    </Button>
  );
}
