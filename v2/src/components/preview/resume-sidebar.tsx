import type { Resume } from "@/schema";
import { ResumeSection } from "./resume-section";

interface ResumeSidebarProps {
  resume: Resume;
  joinNonEmpty(values: string[]): string;
  isNonEmpty(value: string): boolean;
}

export function ResumeSidebar(props: ResumeSidebarProps): React.ReactElement {
  const { resume } = props;

  return (
    <aside className="col-span-4">
      {resume.skills.length > 0 && (
        <ResumeSection title="Skills" compact>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.slice(0, 30).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </ResumeSection>
      )}
      {resume.awards.length > 0 && (
        <ResumeSection title="Awards" compact>
          <div className="space-y-2">
            {resume.awards.map((item, index) => (
              <AwardItem key={`${item.name}-${index}`} item={item} {...props} />
            ))}
          </div>
        </ResumeSection>
      )}
      {resume.links.length > 0 && (
        <ResumeSection title="Links" compact>
          <div className="space-y-2">
            {resume.links.map((item, index) => (
              <LinkItem key={`${item.label}-${index}`} item={item} />
            ))}
          </div>
        </ResumeSection>
      )}
      {props.isNonEmpty(resume.meta.updatedAt) && (
        <div className="mt-4 text-[10px] text-slate-400">
          Last saved: {new Date(resume.meta.updatedAt).toLocaleString()}
        </div>
      )}
    </aside>
  );
}

function AwardItem(
  props: ResumeSidebarProps & { item: Resume["awards"][number] },
): React.ReactElement {
  return (
    <div className="text-[11px]">
      <div className="font-medium text-slate-800">
        {props.item.name || "Award"}
      </div>
      <div className="text-slate-600">
        {props.joinNonEmpty([props.item.issuer, props.item.date])}
      </div>
      {props.isNonEmpty(props.item.description) && (
        <div className="mt-1 text-slate-700">{props.item.description}</div>
      )}
    </div>
  );
}

function LinkItem(props: {
  item: Resume["links"][number];
}): React.ReactElement {
  return (
    <div className="text-[11px]">
      <div className="font-medium text-slate-800">
        {props.item.label || "Link"}
      </div>
      <div className="break-all text-slate-600">{props.item.url}</div>
    </div>
  );
}
