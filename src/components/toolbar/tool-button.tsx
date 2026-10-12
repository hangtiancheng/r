import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";

export interface ToolButtonProps extends ComponentProps<typeof Button> {
  icon: ReactNode;
  label: string;
}

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
