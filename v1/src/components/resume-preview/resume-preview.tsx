import type { ReactElement } from "react";
import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
  ResumeDocument,
} from "@/schema";
import type { PreviewRef, ResumeDensity } from "@/types";
import { formatRange, sanitizeLink } from "@/utils";
import { EmptyHint } from "./empty-hint";
import { InlineInfo } from "./inline-info";
import { PreviewAwards } from "./preview-awards";
import { PreviewSkillGroups } from "./preview-skill-groups";
import { ResumeItem } from "./resume-item";
import { ResumeSection } from "./resume-section";

interface ResumePreviewProps {
  doc: ResumeDocument;
  density: ResumeDensity;
  previewRef: PreviewRef;
}

export function ResumePreview(props: ResumePreviewProps): ReactElement {
  const { density, doc, previewRef } = props;
  const basics = doc.resume.basics;
  const spacing = density === "compact" ? "space-y-2" : "space-y-3";
  const bodyText = density === "compact" ? "text-xs" : "text-sm";
  const sectionGap = density === "compact" ? "gap-2" : "gap-3";

  const renderEducationItem = (item: EducationItem): ReactElement => (
    <ResumeItem
      key={item.id}
      density={density}
      title={`${item.school || "School"}${item.major ? ` · ${item.major}` : ""}`}
      subtitle={[item.degree, formatRange(item.start, item.end), item.location]
        .filter(Boolean)
        .join(" / ")}
      bullets={item.highlights}
    />
  );
  const renderExperienceItem = (item: ExperienceItem): ReactElement => (
    <ResumeItem
      key={item.id}
      density={density}
      title={`${item.company || "Company"}${item.role ? ` · ${item.role}` : ""}`}
      subtitle={[formatRange(item.start, item.end), item.location]
        .filter(Boolean)
        .join(" / ")}
      bullets={item.highlights}
    />
  );
  const renderProjectItem = (item: ProjectItem): ReactElement => (
    <ResumeItem
      key={item.id}
      density={density}
      title={`${item.name || "Project"}${item.role ? ` · ${item.role}` : ""}`}
      subtitle={[
        formatRange(item.start, item.end),
        item.link ? sanitizeLink(item.link) : "",
      ]
        .filter(Boolean)
        .join(" / ")}
      bullets={item.highlights}
    />
  );

  return (
    <div
      ref={previewRef}
      className="rounded-2xl bg-white p-6 text-slate-900 shadow-sm"
    >
      <div className={`flex flex-col ${spacing}`}>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-semibold tracking-tight">
            {basics.name.trim() || "Your Name"}
          </div>
          <div className="text-sm font-medium text-slate-600">
            {basics.title.trim() || "Target Role"}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
            <InlineInfo label="Phone" value={basics.phone} />
            <InlineInfo label="Email" value={basics.email} />
            <InlineInfo label="Location" value={basics.location} />
            <InlineInfo label="Website" value={basics.website} />
            <InlineInfo label="GitHub" value={basics.github} />
          </div>
          {basics.summary.trim().length > 0 ? (
            <div className={`${bodyText} text-slate-700`}>{basics.summary}</div>
          ) : null}
        </div>
        <ResumeSection density={density} title="Education">
          {doc.resume.education.length > 0 ? (
            <div className={`grid ${sectionGap}`}>
              {doc.resume.education.map(renderEducationItem)}
            </div>
          ) : (
            <EmptyHint />
          )}
        </ResumeSection>
        <ResumeSection density={density} title="Experience">
          {doc.resume.experience.length > 0 ? (
            <div className={`grid ${sectionGap}`}>
              {doc.resume.experience.map(renderExperienceItem)}
            </div>
          ) : (
            <EmptyHint />
          )}
        </ResumeSection>
        <ResumeSection density={density} title="Projects">
          {doc.resume.projects.length > 0 ? (
            <div className={`grid ${sectionGap}`}>
              {doc.resume.projects.map(renderProjectItem)}
            </div>
          ) : (
            <EmptyHint />
          )}
        </ResumeSection>
        <ResumeSection density={density} title="Skills">
          <PreviewSkillGroups
            density={density}
            items={doc.resume.skillGroups}
          />
        </ResumeSection>
        <ResumeSection density={density} title="Awards and extras">
          <PreviewAwards density={density} items={doc.resume.awards} />
        </ResumeSection>
      </div>
    </div>
  );
}
