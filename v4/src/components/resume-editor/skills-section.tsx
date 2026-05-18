import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type { ReactElement } from "react";
import { ListTextArea } from "./list-text-area";

export function SkillsSection(): ReactElement {
  return (
    <Form.List name="skills">
      {(fields, { add, remove }): ReactElement => (
        <div className="space-y-3">
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={(): void => add({ name: "", items: [] })}
          >
            Add Skill Group
          </Button>
          {fields.map((field, index) => (
            <Card
              key={field.key}
              size="small"
              title={`Skill Group ${index + 1}`}
              extra={
                <Button
                  type="text"
                  danger
                  icon={<MinusCircleOutlined />}
                  onClick={(): void => remove(field.name)}
                />
              }
            >
              <Form.Item label="Group Name" name={[field.name, "name"]}>
                <Input placeholder="Frontend / Engineering" />
              </Form.Item>
              <Form.Item label="Items" name={[field.name, "items"]}>
                <ListTextArea
                  rows={4}
                  placeholder="React
TypeScript"
                />
              </Form.Item>
            </Card>
          ))}
        </div>
      )}
    </Form.List>
  );
}
