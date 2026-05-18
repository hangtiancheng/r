import { Button, Collapse, Form, Input, Space, Typography } from "antd";
import type { FormInstance } from "antd";
import type { ReactElement } from "react";
import type { Resume } from "@/schema";
import { resumeSchema } from "@/schema";
import { AwardsSection } from "./awards-section";
import { BasicsSection } from "./basics-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { ProjectsSection } from "./projects-section";
import { SkillsSection } from "./skills-section";

interface ResumeEditorFormProps {
  form: FormInstance<Resume>;
  onResumeChange: (resume: Resume) => void;
}

export function ResumeEditorForm(props: ResumeEditorFormProps): ReactElement {
  const { form, onResumeChange } = props;

  return (
    <Form<Resume>
      form={form}
      layout="vertical"
      colon={false}
      onValuesChange={(): void => {
        const values: unknown = form.getFieldsValue(true);
        onResumeChange(resumeSchema.parse(values));
      }}
    >
      <Collapse
        bordered={false}
        defaultActiveKey={["basics", "experience"]}
        items={[
          { key: "basics", label: "Basics", children: <BasicsSection /> },
          {
            key: "summary",
            label: "Summary",
            children: (
              <Form.Item name="summary">
                <Input.TextArea
                  rows={4}
                  placeholder="Core strengths, domain experience, and outcomes."
                />
              </Form.Item>
            ),
          },
          {
            key: "experience",
            label: "Experience",
            children: <ExperienceSection />,
          },
          { key: "projects", label: "Projects", children: <ProjectsSection /> },
          {
            key: "education",
            label: "Education",
            children: <EducationSection />,
          },
          { key: "skills", label: "Skills", children: <SkillsSection /> },
          { key: "awards", label: "Awards", children: <AwardsSection /> },
          {
            key: "additional",
            label: "Additional",
            children: (
              <Form.Item name="additional">
                <Input.TextArea
                  rows={4}
                  placeholder="Open source, writing, languages, or interests."
                />
              </Form.Item>
            ),
          },
        ]}
      />

      <div className="mt-3">
        <Typography.Text type="secondary" className="text-xs">
          List fields render each non-empty line as one resume item.
        </Typography.Text>
      </div>

      <div className="mt-4">
        <Space>
          <Button
            onClick={(): void => {
              const values: unknown = form.getFieldsValue(true);
              onResumeChange(resumeSchema.parse(values));
            }}
          >
            Sync Preview
          </Button>
        </Space>
      </div>
    </Form>
  );
}
