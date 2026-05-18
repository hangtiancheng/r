import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import type { Resume } from "@/schema";
import { HighlightsTextArea } from "./highlights-text-area";

function createEmptyEducation(): Resume["education"][number] {
  return {
    school: "",
    degree: "",
    major: "",
    location: "",
    start: "",
    end: "",
    highlights: [],
  };
}

export function EducationSection(): React.ReactElement {
  return (
    <Card title="Education" size="small" styles={{ body: { padding: 16 } }}>
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <Card
                key={field.key}
                size="small"
                title={`Education ${index + 1}`}
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(field.name)}
                  />
                }
              >
                <Form.Item label="School" name={[field.name, "school"]}>
                  <Input placeholder="School name" />
                </Form.Item>
                <Space size={12} wrap className="w-full">
                  <Form.Item
                    label="Degree"
                    name={[field.name, "degree"]}
                    className="min-w-35 flex-1"
                  >
                    <Input placeholder="Bachelor or Master" />
                  </Form.Item>
                  <Form.Item
                    label="Major"
                    name={[field.name, "major"]}
                    className="min-w-40 flex-1"
                  >
                    <Input placeholder="Computer Science" />
                  </Form.Item>
                </Space>
                <Space size={12} wrap className="w-full">
                  <Form.Item
                    label="Start"
                    name={[field.name, "start"]}
                    className="min-w-35 flex-1"
                  >
                    <Input placeholder="2018.09" />
                  </Form.Item>
                  <Form.Item
                    label="End"
                    name={[field.name, "end"]}
                    className="min-w-35 flex-1"
                  >
                    <Input placeholder="2022.06" />
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
                  <HighlightsTextArea placeholder="Optional academic highlights." />
                </Form.Item>
              </Card>
            ))}
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => add(createEmptyEducation())}
            >
              Add Education
            </Button>
          </div>
        )}
      </Form.List>
    </Card>
  );
}
