import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type { ReactElement } from "react";
import { ListTextArea } from "./list-text-area";

export function ProjectsSection(): ReactElement {
  return (
    <Form.List name="projects">
      {(fields, { add, remove }): ReactElement => (
        <div className="space-y-3">
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={(): void =>
              add({
                name: "",
                role: "",
                link: "",
                start: "",
                end: "",
                techStack: [],
                highlights: [],
              })
            }
          >
            Add Project
          </Button>
          {fields.map((field, index) => (
            <Card
              key={field.key}
              size="small"
              title={`Project ${index + 1}`}
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
                <Form.Item label="Project" name={[field.name, "name"]}>
                  <Input placeholder="Project name" />
                </Form.Item>
                <Form.Item label="Role" name={[field.name, "role"]}>
                  <Input placeholder="Owner / contributor" />
                </Form.Item>
              </div>
              <Form.Item label="Link" name={[field.name, "link"]}>
                <Input placeholder="Optional URL" />
              </Form.Item>
              <div className="grid grid-cols-2 gap-3">
                <Form.Item label="Start" name={[field.name, "start"]}>
                  <Input placeholder="2024.01" />
                </Form.Item>
                <Form.Item label="End" name={[field.name, "end"]}>
                  <Input placeholder="2024.06" />
                </Form.Item>
              </div>
              <Form.Item label="Tech Stack" name={[field.name, "techStack"]}>
                <ListTextArea
                  rows={3}
                  placeholder="React
TypeScript"
                />
              </Form.Item>
              <Form.Item label="Highlights" name={[field.name, "highlights"]}>
                <ListTextArea rows={5} placeholder="Shipped a key result" />
              </Form.Item>
            </Card>
          ))}
        </div>
      )}
    </Form.List>
  );
}
