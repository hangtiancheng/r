import { Form } from "antd";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { resumeSchema, type Resume } from "@/schema";
import { resumeAtom } from "@/store";
import { AwardSection } from "./award-section";
import { BasicsSection } from "./basics-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { LinkSection } from "./link-section";
import { ProjectSection } from "./project-section";
import { SkillsSection } from "./skills-section";

export function ResumeEditor(): React.ReactElement {
  const [resume, setResume] = useAtom(resumeAtom);
  const [form] = Form.useForm<Resume>();
  const syncingRef = useRef(false);

  useEffect(() => {
    syncingRef.current = true;
    form.setFieldsValue(resume);
    queueMicrotask(() => {
      syncingRef.current = false;
    });
  }, [form, resume]);

  function syncToAtom(): void {
    const values: unknown = form.getFieldsValue(true);
    const parsed = resumeSchema.parse({
      ...resume,
      ...resumeSchema.partial().parse(values),
      meta: resume.meta,
      schemaVersion: resume.schemaVersion,
    });
    setResume(parsed);
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={resume}
      onValuesChange={() => {
        if (!syncingRef.current) {
          syncToAtom();
        }
      }}
      className="space-y-4"
    >
      <BasicsSection resume={resume} form={form} syncToAtom={syncToAtom} />
      <SkillsSection />
      <ExperienceSection />
      <ProjectSection />
      <EducationSection />
      <AwardSection />
      <LinkSection />
    </Form>
  );
}
