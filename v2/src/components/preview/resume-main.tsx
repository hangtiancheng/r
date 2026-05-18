import type { Resume } from "@/schema";
import { ResumeEntry } from "./resume-entry";
import { ResumeSection } from "./resume-section";

interface ResumeMainProps {
  resume: Resume;
  joinNonEmpty(values: string[]): string;
  isNonEmpty(value: string): boolean;
}

export function ResumeMain(props: ResumeMainProps): React.ReactElement {
  const { resume } = props;

  return (
    <main className="col-span-8">
      {resume.experiences.length > 0 && (
        <ResumeSection title="Work Experience">
          {resume.experiences.map((item, index) => (
            <ResumeEntry
              key={`${item.company}-${index}`}
              title={props.joinNonEmpty([item.company, item.title])}
              meta={props.joinNonEmpty([item.start, item.end, item.location])}
              highlights={item.highlights}
            />
          ))}
        </ResumeSection>
      )}
      {resume.projects.length > 0 && (
        <ResumeSection title="Projects">
          {resume.projects.map((item, index) => (
            <ResumeEntry
              key={`${item.name}-${index}`}
              title={props.joinNonEmpty([item.name, item.role])}
              meta={props.joinNonEmpty([item.start, item.end])}
              highlights={[
                ...(props.isNonEmpty(item.link) ? [item.link] : []),
                ...item.highlights,
              ]}
            />
          ))}
        </ResumeSection>
      )}
      {resume.education.length > 0 && (
        <ResumeSection title="Education">
          {resume.education.map((item, index) => (
            <ResumeEntry
              key={`${item.school}-${index}`}
              title={props.joinNonEmpty([item.school, item.degree, item.major])}
              meta={props.joinNonEmpty([item.start, item.end, item.location])}
              highlights={item.highlights}
            />
          ))}
        </ResumeSection>
      )}
    </main>
  );
}
