import type { ReactElement, ReactNode } from "react";

interface PreviewSectionProps {
  title: string;
  children: ReactNode;
}

export function PreviewSection(props: PreviewSectionProps): ReactElement {
  const { title, children } = props;

  return (
    <section className="mt-3">
      <div className="flex items-center gap-2">
        <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-700">
          {title}
        </div>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="mt-2">{children}</div>
    </section>
  );
}
