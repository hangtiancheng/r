import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import type { Resume } from "@/schema";
import { HighlightsTextArea } from "./highlights-text-area";

function createEmptyProject(): Resume["projects"][number] {
  return { name: "", role: "", link: "", start: "", end: "", highlights: [] };
}

export function ProjectSection(): React.ReactElement {
  return (
    <Card title="Projects" size="small" styles={{ body: { padding: 16 } }}>
      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <Card
                key={field.key}
                size="small"
                title={`Project ${index + 1}`}
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
                    label="Name"
                    name={[field.name, "name"]}
                    className="min-w-45 flex-1"
                  >
                    <Input placeholder="Project name" />
                  </Form.Item>
                  <Form.Item
                    label="Role"
                    name={[field.name, "role"]}
                    className="min-w-45 flex-1"
                  >
                    <Input placeholder="Owner or core contributor" />
                  </Form.Item>
                </Space>
                <Space size={12} wrap className="w-full">
                  <Form.Item
                    label="Start"
                    name={[field.name, "start"]}
                    className="min-w-35 flex-1"
                  >
                    <Input placeholder="2024.01" />
                  </Form.Item>
                  <Form.Item
                    label="End"
                    name={[field.name, "end"]}
                    className="min-w-35 flex-1"
                  >
                    <Input placeholder="2024.12" />
                  </Form.Item>
                  <Form.Item
                    label="Link"
                    name={[field.name, "link"]}
                    className="min-w-40 flex-1"
                  >
                    <Input placeholder="https://..." />
                  </Form.Item>
                </Space>
                <Form.Item label="Highlights" name={[field.name, "highlights"]}>
                  <HighlightsTextArea placeholder="One project impact per line." />
                </Form.Item>
              </Card>
            ))}
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => add(createEmptyProject())}
            >
              Add Project
            </Button>
          </div>
        )}
      </Form.List>
    </Card>
  );
}
