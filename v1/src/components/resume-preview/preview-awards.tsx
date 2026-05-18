import type { ReactElement } from "react";
import type { AwardItem } from "@/schema";
import type { ResumeDensity } from "@/types";
import { EmptyHint } from "./empty-hint";

interface PreviewAwardsProps {
  density: ResumeDensity;
  items: AwardItem[];
}

export function PreviewAwards(props: PreviewAwardsProps): ReactElement {
  const { density, items } = props;
  const heading = density === "compact" ? "text-base" : "text-lg";
  const bodyText = density === "compact" ? "text-xs" : "text-sm";
  if (items.length === 0) return <EmptyHint />;

  return (
    <div className="grid gap-2">
      {items.map((item: AwardItem) => (
        <div key={item.id} className="rounded-xl border border-slate-200 p-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className={`font-semibold text-slate-900 ${heading}`}>
              {item.name.trim() || "Award name"}
            </div>
            <div className="text-xs text-slate-500">
              {[item.issuer, item.date].filter(Boolean).join(" · ") || " "}
            </div>
          </div>
          {item.detail.trim().length > 0 ? (
            <div className={`mt-2 ${bodyText} text-slate-700`}>
              {item.detail}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
