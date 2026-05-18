import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type { ReactElement } from "react";

export function AwardsSection(): ReactElement {
  return (
    <Form.List name="awards">
      {(fields, { add, remove }): ReactElement => (
        <div className="space-y-3">
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={(): void => add({ title: "", date: "", detail: "" })}
          >
            Add Award
          </Button>
          {fields.map((field, index) => (
            <Card
              key={field.key}
              size="small"
              title={`Award ${index + 1}`}
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
                <Form.Item label="Title" name={[field.name, "title"]}>
                  <Input placeholder="Award" />
                </Form.Item>
                <Form.Item label="Date" name={[field.name, "date"]}>
                  <Input placeholder="2024.11" />
                </Form.Item>
              </div>
              <Form.Item label="Detail" name={[field.name, "detail"]}>
                <Input.TextArea rows={3} placeholder="Optional detail" />
              </Form.Item>
            </Card>
          ))}
        </div>
      )}
    </Form.List>
  );
}
