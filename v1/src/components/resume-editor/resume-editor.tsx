import { Divider } from "antd";
import type { ReactElement } from "react";
import type { ResumeDocument } from "@/schema";
import type { UpdateResumeDoc } from "@/types";
import { AwardsSection } from "./awards-section";
import { BasicsSection } from "./basics-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { ProjectsSection } from "./projects-section";
import { SkillGroupsSection } from "./skill-groups-section";

interface ResumeEditorProps {
  doc: ResumeDocument;
  onChange: UpdateResumeDoc;
}

export function ResumeEditor(props: ResumeEditorProps): ReactElement {
  const { doc, onChange } = props;

  return (
    <div className="space-y-4">
      <BasicsSection basics={doc.resume.basics} onChange={onChange} />
      <Divider className="my-4" />
      <EducationSection items={doc.resume.education} onChange={onChange} />
      <ExperienceSection items={doc.resume.experience} onChange={onChange} />
      <ProjectsSection items={doc.resume.projects} onChange={onChange} />
      <SkillGroupsSection items={doc.resume.skillGroups} onChange={onChange} />
      <AwardsSection items={doc.resume.awards} onChange={onChange} />
    </div>
  );
}
