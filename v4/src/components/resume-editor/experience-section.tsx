import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type { ReactElement } from "react";
import { ListTextArea } from "./list-text-area";

export function ExperienceSection(): ReactElement {
  return (
    <Form.List name="experience">
      {(fields, { add, remove }): ReactElement => (
        <div className="space-y-3">
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={(): void =>
              add({
                company: "",
                role: "",
                city: "",
                start: "",
                end: "",
                highlights: [],
              })
            }
          >
            Add Experience
          </Button>

          {fields.map((field, index) => (
            <Card
              key={field.key}
              size="small"
              title={`Experience ${index + 1}`}
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
                <Form.Item label="Company" name={[field.name, "company"]}>
                  <Input placeholder="Company or team" />
                </Form.Item>
                <Form.Item label="Role" name={[field.name, "role"]}>
                  <Input placeholder="Role" />
                </Form.Item>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Form.Item label="City" name={[field.name, "city"]}>
                  <Input placeholder="Beijing" />
                </Form.Item>
                <Form.Item label="Start" name={[field.name, "start"]}>
                  <Input placeholder="2023.07" />
                </Form.Item>
                <Form.Item label="End" name={[field.name, "end"]}>
                  <Input placeholder="Present / 2025.06" />
                </Form.Item>
              </div>
              <Form.Item label="Highlights" name={[field.name, "highlights"]}>
                <ListTextArea
                  rows={5}
                  placeholder="Delivered a measurable outcome"
                />
              </Form.Item>
            </Card>
          ))}
        </div>
      )}
    </Form.List>
  );
}
