import type { ReactElement, ReactNode } from "react";
import type { ResumeDensity } from "@/types";

interface ResumeSectionProps {
  title: string;
  density: ResumeDensity;
  children: ReactNode;
}

export function ResumeSection(props: ResumeSectionProps): ReactElement {
  const { children, density, title } = props;
  const titleSize = density === "compact" ? "text-sm" : "text-base";
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className={`font-semibold text-slate-900 ${titleSize}`}>
          {title}
        </div>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      {children}
    </div>
  );
}
