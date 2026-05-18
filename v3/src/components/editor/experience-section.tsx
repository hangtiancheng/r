import { Button, Card, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { HighlightsTextArea } from "./highlights-text-area";

function createEmptyExperience(): Record<string, unknown> {
  return {
    company: "",
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    highlights: [""],
  };
}

export function ExperienceSection(): React.ReactElement {
  return (
    <Form.List name="experiences">
      {(fields, { add, remove }) => (
        <div className="space-y-4">
          <Button
            block
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => add(createEmptyExperience())}
          >
            Add Experience
          </Button>
          {fields.map((field, index) => (
            <Card
              key={field.key}
              size="small"
              title={`Experience ${index + 1}`}
              extra={
                <Button danger onClick={() => remove(field.name)}>
                  Remove
                </Button>
              }
            >
              <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Company" name={[field.name, "company"]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Role" name={[field.name, "title"]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Start" name={[field.name, "startDate"]}>
                  <Input placeholder="2024.01" />
                </Form.Item>
                <Form.Item label="End" name={[field.name, "endDate"]}>
                  <Input placeholder="Present" />
                </Form.Item>
                <Form.Item
                  label="Location"
                  name={[field.name, "location"]}
                  className="col-span-2"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Highlights"
                  name={[field.name, "highlights"]}
                  className="col-span-2"
                >
                  <HighlightsTextArea placeholder="One achievement per line." />
                </Form.Item>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Form.List>
  );
}
