import type { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
}

export function ResumeSection(props: ResumeSectionProps): React.ReactElement {
  return (
    <section className="mt-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-indigo-500" />
        <h2 className="text-[11px] font-semibold tracking-[0.12em] text-slate-700 uppercase">
          {props.title}
        </h2>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      {props.children}
    </section>
  );
}
