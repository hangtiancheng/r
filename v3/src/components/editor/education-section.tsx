import { Button, Card, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { HighlightsTextArea } from "./highlights-text-area";

function createEmptyEducation(): Record<string, unknown> {
  return {
    school: "",
    degree: "",
    major: "",
    startDate: "",
    endDate: "",
    highlights: [""],
  };
}

export function EducationSection(): React.ReactElement {
  return (
    <Form.List name="education">
      {(fields, { add, remove }) => (
        <div className="space-y-4">
          <Button
            block
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => add(createEmptyEducation())}
          >
            Add Education
          </Button>
          {fields.map((field, index) => (
            <Card
              key={field.key}
              size="small"
              title={`Education ${index + 1}`}
              extra={
                <Button danger onClick={() => remove(field.name)}>
                  Remove
                </Button>
              }
            >
              <div className="grid grid-cols-2 gap-4">
                <Form.Item label="School" name={[field.name, "school"]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Degree" name={[field.name, "degree"]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Major" name={[field.name, "major"]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Start" name={[field.name, "startDate"]}>
                  <Input placeholder="2020" />
                </Form.Item>
                <Form.Item label="End" name={[field.name, "endDate"]}>
                  <Input placeholder="2024" />
                </Form.Item>
                <Form.Item
                  label="Highlights"
                  name={[field.name, "highlights"]}
                  className="col-span-2"
                >
                  <HighlightsTextArea placeholder="Academic highlights." />
                </Form.Item>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Form.List>
  );
}
