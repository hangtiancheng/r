import type { Resume } from "@/schema";
import { ResumeEntry } from "./resume-entry";
import { ResumeSection } from "./resume-section";

interface ResumeA4Props {
  resume: Resume;
}

function formatRange(start?: string, end?: string): string {
  const cleanStart = (start ?? "").trim();
  const cleanEnd = (end ?? "").trim();
  if (cleanStart.length > 0 && cleanEnd.length > 0) {
    return `${cleanStart} - ${cleanEnd}`;
  }
  return cleanStart || cleanEnd;
}

function joinNonEmpty(values: (string | undefined)[]): string {
  return values
    .map((value) => value ?? "")
    .filter(Boolean)
    .join(" · ");
}

export function ResumeA4(props: ResumeA4Props): React.ReactElement {
  const { resume } = props;
  const contact = [
    resume.basics.phone,
    resume.basics.email,
    resume.basics.location,
    ...resume.basics.links.map((link) =>
      link.label ? `${link.label}: ${link.url}` : link.url,
    ),
  ];

  return (
    <div className="shadow-soft h-280 w-200 overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900">
      <div className="h-full px-10 pt-9 pb-10">
        <header>
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="text-[26px] leading-tight font-semibold tracking-tight">
                {resume.basics.name ?? "Unnamed Resume"}
              </div>
              {resume.basics.headline && (
                <div className="mt-1 text-[12px] font-medium text-slate-600">
                  {resume.basics.headline}
                </div>
              )}
            </div>
            <div className="shrink-0 rounded-xl bg-slate-50 px-3 py-2 text-[10px] leading-[1.4] text-slate-600">
              <div className="font-medium text-slate-700">Single Page</div>
              <div className="mt-0.5">Concise PDF layout</div>
            </div>
          </div>
          {joinNonEmpty(contact).length > 0 && (
            <div className="mt-3 text-[10.5px] leading-[1.45] text-slate-600">
              {joinNonEmpty(contact)}
            </div>
          )}
        </header>
        {resume.summary && (
          <ResumeSection title="Summary">
            <p className="text-[11px] leading-[1.55] text-slate-800">
              {resume.summary}
            </p>
          </ResumeSection>
        )}
        <ResumeCollections resume={resume} />
        {resume.skills.length > 0 && (
          <ResumeSection title="Skills">
            <div className="flex flex-wrap gap-2">
              {resume.skills.slice(0, 32).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ResumeSection>
        )}
        <div className="mt-5 text-[9.5px] text-slate-400">
          Data is stored only in the local browser through localStorage.
        </div>
      </div>
    </div>
  );
}

function ResumeCollections(props: ResumeA4Props): React.ReactElement {
  const { resume } = props;

  return (
    <>
      {resume.experiences.length > 0 && (
        <ResumeSection title="Experience">
          <div className="space-y-3">
            {resume.experiences.map((item, index) => (
              <ResumeEntry
                key={`${item.company}-${index}`}
                title={joinNonEmpty([item.title, item.company])}
                meta={joinNonEmpty([
                  formatRange(item.startDate, item.endDate),
                  item.location,
                ])}
                highlights={item.highlights}
              />
            ))}
          </div>
        </ResumeSection>
      )}
      {resume.projects.length > 0 && (
        <ResumeSection title="Projects">
          <div className="space-y-3">
            {resume.projects.map((item, index) => (
              <ResumeEntry
                key={`${item.name}-${index}`}
                title={joinNonEmpty([item.name, item.role])}
                meta={joinNonEmpty([
                  formatRange(item.startDate, item.endDate),
                  item.link,
                ])}
                highlights={item.highlights}
              />
            ))}
          </div>
        </ResumeSection>
      )}
      {resume.education.length > 0 && (
        <ResumeSection title="Education">
          <div className="space-y-3">
            {resume.education.map((item, index) => (
              <ResumeEntry
                key={`${item.school}-${index}`}
                title={joinNonEmpty([item.school, item.major])}
                meta={joinNonEmpty([
                  item.degree,
                  formatRange(item.startDate, item.endDate),
                ])}
                highlights={item.highlights}
              />
            ))}
          </div>
        </ResumeSection>
      )}
    </>
  );
}
