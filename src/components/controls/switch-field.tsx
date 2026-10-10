import { useId } from "react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export interface SwitchFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

/** Bordered row with a label on the left and a visibility switch on the right. */
export function SwitchField({
  label,
  checked,
  onChange,
  description,
}: SwitchFieldProps) {
  const id = useId();
  return (
    <Item variant="outline" size="xs">
      <ItemContent className="min-w-0 flex-1">
        <ItemTitle className="w-full min-w-0">
          <Label htmlFor={id} className="min-w-0 truncate font-normal">
            {label}
          </Label>
        </ItemTitle>
        {description && (
          <ItemDescription className="line-clamp-1 text-xs">
            {description}
          </ItemDescription>
        )}
      </ItemContent>
      <ItemActions>
        <Switch
          id={id}
          size="sm"
          checked={checked}
          onCheckedChange={(next) => onChange(next === true)}
        />
      </ItemActions>
    </Item>
  );
}
