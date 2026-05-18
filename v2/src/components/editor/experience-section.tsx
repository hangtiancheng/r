import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import type { Resume } from "@/schema";
import { HighlightsTextArea } from "./highlights-text-area";

function createEmptyExperience(): Resume["experiences"][number] {
  return {
    company: "",
    title: "",
    location: "",
    start: "",
    end: "",
    highlights: [],
  };
}

export function ExperienceSection(): React.ReactElement {
  return (
    <Card
      title="Work Experience"
      size="small"
      styles={{ body: { padding: 16 } }}
    >
      <Form.List name="experiences">
        {(fields, { add, remove }) => (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <Card
                key={field.key}
                size="small"
                title={`Experience ${index + 1}`}
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(field.name)}
                  />
                }
              >
                <Space size={12} wrap className="w-full">
                  <Form.Item
                    label="Company"
                    name={[field.name, "company"]}
                    className="min-w-45 flex-1"
                  >
                    <Input placeholder="Company name" />
                  </Form.Item>
                  <Form.Item
                    label="Role"
                    name={[field.name, "title"]}
                    className="min-w-45 flex-1"
                  >
                    <Input placeholder="Role title" />
                  </Form.Item>
                </Space>
                <Space size={12} wrap className="w-full">
                  <Form.Item
                    label="Start"
                    name={[field.name, "start"]}
                    className="min-w-35 flex-1"
                  >
                    <Input placeholder="2023.06" />
                  </Form.Item>
                  <Form.Item
                    label="End"
                    name={[field.name, "end"]}
                    className="min-w-35 flex-1"
                  >
                    <Input placeholder="Present" />
                  </Form.Item>
                  <Form.Item
                    label="Location"
                    name={[field.name, "location"]}
                    className="min-w-35 flex-1"
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                </Space>
                <Form.Item label="Highlights" name={[field.name, "highlights"]}>
                  <HighlightsTextArea placeholder="One achievement per line." />
                </Form.Item>
              </Card>
            ))}
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => add(createEmptyExperience())}
            >
              Add Experience
            </Button>
          </div>
        )}
      </Form.List>
    </Card>
  );
}
