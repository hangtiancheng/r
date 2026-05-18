import type { ReactElement } from "react";
import type { SkillGroup } from "@/schema";
import type { ResumeDensity } from "@/types";
import { EmptyHint } from "./empty-hint";

interface PreviewSkillGroupsProps {
  density: ResumeDensity;
  items: SkillGroup[];
}

export function PreviewSkillGroups(
  props: PreviewSkillGroupsProps,
): ReactElement {
  const { density, items } = props;
  const heading = density === "compact" ? "text-base" : "text-lg";
  if (items.length === 0) return <EmptyHint />;

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((group: SkillGroup) => (
        <div key={group.id} className="rounded-xl border border-slate-200 p-3">
          <div className={`font-semibold text-slate-900 ${heading}`}>
            {group.category.trim() || "Category"}
          </div>
          {group.items.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item: string) => (
                <span
                  key={item}
                  className="rounded-full bg-indigo-50 px-2 py-1 text-xs text-indigo-700"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-2 text-xs text-slate-500">
              No skills added yet.
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
