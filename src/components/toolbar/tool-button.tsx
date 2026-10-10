import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";

export interface ToolButtonProps extends ComponentProps<typeof Button> {
  /** Icon element rendered before the label; give it `data-icon="inline-start"`. */
  icon: ReactNode;
  label: string;
}

/** QQ Mail toolbar icon: 12px label + 16px icon, gray, blue on hover. */
export function ToolButton({ icon, label, ...props }: ToolButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-primary text-xs font-normal"
      {...props}
    >
      {icon}
      {label}
    </Button>
  );
}
