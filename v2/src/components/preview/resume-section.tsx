import type { ReactNode } from "react";
import { classNames } from "@/utils";

interface ResumeSectionProps {
  title: string;
  compact?: boolean;
  children: ReactNode;
}

export function ResumeSection(props: ResumeSectionProps): React.ReactElement {
  return (
    <section className={classNames("mb-4", props.compact && "mb-3")}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[12px] font-semibold tracking-wide text-slate-900">
          {props.title}
        </h2>
        <div className="h-px flex-1 bg-linear-to-r from-slate-200 to-transparent" />
      </div>
      <div>{props.children}</div>
    </section>
  );
}
