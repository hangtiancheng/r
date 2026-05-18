import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";
import type { ReactElement } from "react";

export function BasicsSection(): ReactElement {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Form.Item label="Name" name={["basics", "name"]}>
          <Input placeholder="Taylor Chen" />
        </Form.Item>
        <Form.Item label="Title" name={["basics", "title"]}>
          <Input placeholder="Frontend Engineer / Platform Developer" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Form.Item label="Phone" name={["basics", "phone"]}>
          <Input placeholder="+86 138 0000 0000" />
        </Form.Item>
        <Form.Item label="Email" name={["basics", "email"]}>
          <Input placeholder="name@example.com" />
        </Form.Item>
      </div>

      <Form.Item label="City" name={["basics", "city"]}>
        <Input placeholder="Beijing" />
      </Form.Item>

      <Form.List name={["basics", "links"]}>
        {(fields, { add, remove }): ReactElement => (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Typography.Text strong>Links</Typography.Text>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={(): void => add({ label: "", url: "" })}
              >
                Add Link
              </Button>
            </div>
            {fields.map((field) => (
              <Card key={field.key} size="small" className="bg-slate-50">
                <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-2">
                  <Form.Item
                    label="Label"
                    name={[field.name, "label"]}
                    className="mb-0"
                  >
                    <Input placeholder="GitHub / Portfolio" />
                  </Form.Item>
                  <Form.Item
                    label="URL"
                    name={[field.name, "url"]}
                    className="mb-0"
                  >
                    <Input placeholder="https://..." />
                  </Form.Item>
                  <Button
                    type="text"
                    danger
                    icon={<MinusCircleOutlined />}
                    onClick={(): void => remove(field.name)}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </Form.List>
    </div>
  );
}
