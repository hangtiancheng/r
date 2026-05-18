import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type { ReactElement } from "react";
import { ListTextArea } from "./list-text-area";

export function EducationSection(): ReactElement {
  return (
    <Form.List name="education">
      {(fields, { add, remove }): ReactElement => (
        <div className="space-y-3">
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={(): void =>
              add({
                school: "",
                major: "",
                degree: "",
                start: "",
                end: "",
                highlights: [],
              })
            }
          >
            Add Education
          </Button>
          {fields.map((field, index) => (
            <Card
              key={field.key}
              size="small"
              title={`Education ${index + 1}`}
              extra={
                <Button
                  type="text"
                  danger
                  icon={<MinusCircleOutlined />}
                  onClick={(): void => remove(field.name)}
                />
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <Form.Item label="School" name={[field.name, "school"]}>
                  <Input placeholder="School" />
                </Form.Item>
                <Form.Item label="Major" name={[field.name, "major"]}>
                  <Input placeholder="Major" />
                </Form.Item>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Form.Item label="Degree" name={[field.name, "degree"]}>
                  <Input placeholder="Bachelor / Master" />
                </Form.Item>
                <Form.Item label="Start" name={[field.name, "start"]}>
                  <Input placeholder="2019.09" />
                </Form.Item>
                <Form.Item label="End" name={[field.name, "end"]}>
                  <Input placeholder="2023.06" />
                </Form.Item>
              </div>
              <Form.Item label="Highlights" name={[field.name, "highlights"]}>
                <ListTextArea
                  rows={4}
                  placeholder="GPA, ranking, scholarship"
                />
              </Form.Item>
            </Card>
          ))}
        </div>
      )}
    </Form.List>
  );
}
