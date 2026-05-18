import type { ReactElement } from "react";
import type { Resume } from "@/schema";
import { formatDateRange } from "@/utils";
import { BulletList } from "./bullet-list";
import { PreviewSection } from "./preview-section";

interface MainColumnProps {
  resume: Resume;
}

export function MainColumn(props: MainColumnProps): ReactElement {
  const { resume } = props;

  return (
    <main className="col-span-8">
      {resume.summary.trim().length > 0 ? (
        <PreviewSection title="Summary">
          <div className="text-xs leading-relaxed text-slate-800">
            {resume.summary.trim()}
          </div>
        </PreviewSection>
      ) : null}

      {resume.experience.length > 0 ? (
        <PreviewSection title="Experience">
          <div className="space-y-3">
            {resume.experience
              .filter(
                (item): boolean =>
                  item.company.trim().length > 0 || item.role.trim().length > 0,
              )
              .map(
                (item): ReactElement => (
                  <div key={`${item.company}-${item.role}-${item.start}`}>
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-semibold text-slate-900">
                          {item.role.trim() || "Role"}
                        </div>
                        <div className="truncate text-xs text-slate-700">
                          {[item.company, item.city]
                            .map((value: string): string => value.trim())
                            .filter(
                              (value: string): boolean => value.length > 0,
                            )
                            .join(" · ")}
                        </div>
                      </div>
                      <div className="shrink-0 text-[11px] text-slate-500">
                        {formatDateRange(item.start, item.end)}
                      </div>
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

      {resume.projects.length > 0 ? (
        <PreviewSection title="Projects">
          <div className="space-y-3">
            {resume.projects
              .filter((item): boolean => item.name.trim().length > 0)
              .map(
                (item): ReactElement => (
                  <div key={`${item.name}-${item.start}`}>
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-semibold text-slate-900">
                          {item.name.trim()}
                        </div>
                        <div className="truncate text-xs text-slate-700">
                          {[item.role, item.link]
                            .map((value: string): string => value.trim())
                            .filter(
                              (value: string): boolean => value.length > 0,
                            )
                            .join(" · ")}
                        </div>
                      </div>
                      <div className="shrink-0 text-[11px] text-slate-500">
                        {formatDateRange(item.start, item.end)}
                      </div>
                    </div>
                    {item.techStack.length > 0 ? (
                      <div className="mt-1 text-[11.5px] text-slate-600">
                        <span className="font-medium text-slate-700">
                          Stack:{" "}
                        </span>
                        {item.techStack
                          .map((value: string): string => value.trim())
                          .filter(Boolean)
                          .join(" / ")}
                      </div>
                    ) : null}
                    <div className="mt-1">
                      <BulletList items={item.highlights} />
                    </div>
                  </div>
                ),
              )}
          </div>
        </PreviewSection>
      ) : null}

      {resume.additional.trim().length > 0 ? (
        <PreviewSection title="Additional">
          <div className="text-xs leading-relaxed text-slate-800">
            {resume.additional.trim()}
          </div>
        </PreviewSection>
      ) : null}
    </main>
  );
}
