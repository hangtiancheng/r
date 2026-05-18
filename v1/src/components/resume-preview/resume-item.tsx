import type { ReactElement } from "react";
import type { ResumeDensity } from "@/types";

interface ResumeItemProps {
  title: string;
  subtitle: string;
  bullets: string[];
  density: ResumeDensity;
}

export function ResumeItem(props: ResumeItemProps): ReactElement {
  const { bullets, density, subtitle, title } = props;
  const heading = density === "compact" ? "text-sm" : "text-base";
  const bodyText = density === "compact" ? "text-xs" : "text-sm";

  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className={`font-semibold text-slate-900 ${heading}`}>{title}</div>
        <div className="text-xs text-slate-500">{subtitle || " "}</div>
      </div>
      {bullets.length > 0 ? (
        <ul
          className={`mt-2 list-disc space-y-1 pl-4 ${bodyText} text-slate-700`}
        >
          {bullets.slice(0, 6).map((line: string) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-2 text-xs text-slate-500">No bullet points yet.</div>
      )}
    </div>
  );
}
