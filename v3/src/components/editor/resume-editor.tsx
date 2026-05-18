import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Collapse,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useAtom } from "jotai";
import { useMemo } from "react";
import {
  createEmptyResumeDraft,
  resumeDraftSchema,
  type ResumeDraft,
} from "@/schema";
import { clearResumeStorage } from "@/services";
import { resumeDraftAtom } from "@/store";
import { toPersistedResume } from "@/utils";
import { BasicsSection } from "./basics-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { ProjectSection } from "./project-section";

const { TextArea } = Input;

interface ResumeEditorProps {
  onExport(): Promise<void>;
}

export function ResumeEditor(props: ResumeEditorProps): React.ReactElement {
  const [draft, setDraft] = useAtom(resumeDraftAtom);
  const [form] = Form.useForm<ResumeDraft>();
  const resume = useMemo(() => toPersistedResume(draft), [draft]);

  function handleValuesChange(_changedValues: unknown, values: unknown): void {
    const parsed = resumeDraftSchema.safeParse({
      ...resumeDraftSchema.parse(values),
      schemaVersion: 1,
    });
    if (parsed.success) {
      setDraft(parsed.data);
    }
  }

  function handleClear(): void {
    clearResumeStorage();
    const empty = createEmptyResumeDraft();
    setDraft(empty);
    form.setFieldsValue(empty);
    message.success("Local resume data was cleared.");
  }

  return (
    <Card
      className="shadow-soft"
      title="Edit Resume"
      extra={
        <Space>
          <Button
            icon={<DownloadOutlined />}
            type="primary"
            onClick={() => void props.onExport()}
          >
            Export PDF
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={handleClear}>
            Clear Local Data
          </Button>
        </Space>
      }
    >
      <Typography.Paragraph type="secondary" className="!mb-4">
        All changes are stored locally. Keep entries concise for a single-page
        PDF.
      </Typography.Paragraph>
      <Form
        form={form}
        layout="vertical"
        initialValues={draft}
        onValuesChange={handleValuesChange}
        requiredMark={false}
      >
        <Form.Item name="schemaVersion" hidden>
          <Input />
        </Form.Item>
        <Collapse
          defaultActiveKey={["basics", "experience"]}
          items={[
            { key: "basics", label: "Basics", children: <BasicsSection /> },
            {
              key: "summary",
              label: "Summary",
              children: (
                <Form.Item name="summary">
                  <TextArea
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    placeholder="Summarize direction, strengths, and measurable outcomes."
                  />
                </Form.Item>
              ),
            },
            {
              key: "experience",
              label: "Experience",
              children: <ExperienceSection />,
            },
            {
              key: "projects",
              label: "Projects",
              children: <ProjectSection />,
            },
            {
              key: "education",
              label: "Education",
              children: <EducationSection />,
            },
            {
              key: "skills",
              label: "Skills",
              children: (
                <Form.Item name="skills">
                  <Select
                    mode="tags"
                    placeholder="Type a skill and press Enter"
                    tokenSeparators={[","]}
                    options={[]}
                  />
                </Form.Item>
              ),
            },
          ]}
        />
      </Form>
      <div className="sr-only" aria-live="polite">
        Current resume owner: {resume.basics.name ?? "Unnamed resume"}
      </div>
    </Card>
  );
}
