import type { ReactElement } from "react";
import type { Resume } from "@/schema";
import { formatDateRange } from "@/utils";
import { BulletList } from "./bullet-list";
import { PreviewSection } from "./preview-section";

interface SidebarColumnProps {
  resume: Resume;
}

export function SidebarColumn(props: SidebarColumnProps): ReactElement {
  const { resume } = props;

  return (
    <aside className="col-span-4">
      {resume.education.length > 0 ? (
        <PreviewSection title="Education">
          <div className="space-y-2">
            {resume.education
              .filter(
                (item): boolean =>
                  item.school.trim().length > 0 || item.major.trim().length > 0,
              )
              .map(
                (item): ReactElement => (
                  <div key={`${item.school}-${item.major}-${item.start}`}>
                    <div className="text-[12.5px] font-semibold text-slate-900">
                      {item.school.trim() || "School"}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-slate-700">
                      {[item.degree, item.major]
                        .map((value: string): string => value.trim())
                        .filter((value: string): boolean => value.length > 0)
                        .join(" · ")}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      {formatDateRange(item.start, item.end)}
                    </div>
                    <div className="mt-1">
                      <BulletList items={item.highlights} />
                    </div>
                  </div>
                ),
              )}
          </div>
        </PreviewSection>
      ) : null}

      {resume.skills.length > 0 ? (
        <PreviewSection title="Skills">
          <div className="space-y-2">
            {resume.skills
              .filter(
                (item): boolean =>
                  item.name.trim().length > 0 || item.items.length > 0,
              )
              .map(
                (item): ReactElement => (
                  <div key={item.name}>
                    <div className="text-xs font-semibold text-slate-900">
                      {item.name.trim() || "Skills"}
                    </div>
                    <div className="mt-0.5 text-[11.5px] leading-relaxed text-slate-700">
                      {item.items
                        .map((value: string): string => value.trim())
                        .filter(Boolean)
                        .join(" / ")}
                    </div>
                  </div>
                ),
              )}
          </div>
        </PreviewSection>
      ) : null}

      {resume.awards.length > 0 ? (
        <PreviewSection title="Awards">
          <div className="space-y-2">
            {resume.awards
              .filter((item): boolean => item.title.trim().length > 0)
              .map(
                (item): ReactElement => (
                  <div key={`${item.title}-${item.date}`}>
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="text-xs font-semibold text-slate-900">
                        {item.title.trim()}
                      </div>
                      <div className="shrink-0 text-[11px] text-slate-500">
                        {item.date.trim()}
                      </div>
                    </div>
                    {item.detail.trim().length > 0 ? (
                      <div className="mt-0.5 text-[11.5px] leading-relaxed text-slate-700">
                        {item.detail.trim()}
                      </div>
                    ) : null}
                  </div>
                ),
              )}
          </div>
        </PreviewSection>
      ) : null}
    </aside>
  );
}
