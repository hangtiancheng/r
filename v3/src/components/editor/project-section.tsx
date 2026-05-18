import { Button, Card, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { HighlightsTextArea } from "./highlights-text-area";

function createEmptyProject(): Record<string, unknown> {
  return {
    name: "",
    role: "",
    startDate: "",
    endDate: "",
    link: "",
    highlights: [""],
  };
}

export function ProjectSection(): React.ReactElement {
  return (
    <Form.List name="projects">
      {(fields, { add, remove }) => (
        <div className="space-y-4">
          <Button
            block
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => add(createEmptyProject())}
          >
            Add Project
          </Button>
          {fields.map((field, index) => (
            <Card
              key={field.key}
              size="small"
              title={`Project ${index + 1}`}
              extra={
                <Button danger onClick={() => remove(field.name)}>
                  Remove
                </Button>
              }
            >
              <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Name" name={[field.name, "name"]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Role" name={[field.name, "role"]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Start" name={[field.name, "startDate"]}>
                  <Input placeholder="2024.01" />
                </Form.Item>
                <Form.Item label="End" name={[field.name, "endDate"]}>
                  <Input placeholder="2024.12" />
                </Form.Item>
                <Form.Item
                  label="Link"
                  name={[field.name, "link"]}
                  className="col-span-2"
                >
                  <Input placeholder="Optional URL" />
                </Form.Item>
                <Form.Item
                  label="Highlights"
                  name={[field.name, "highlights"]}
                  className="col-span-2"
                >
                  <HighlightsTextArea placeholder="One impact per line." />
                </Form.Item>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Form.List>
  );
}
