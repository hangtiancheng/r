import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type { Resume } from "@/schema";

function createEmptyLink(): Resume["links"][number] {
  return { label: "", url: "" };
}

export function LinkSection(): React.ReactElement {
  return (
    <Card title="Links" size="small" styles={{ body: { padding: 16 } }}>
      <Form.List name="links">
        {(fields, { add, remove }) => (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <Card
                key={field.key}
                size="small"
                title={`Link ${index + 1}`}
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(field.name)}
                  />
                }
              >
                <Form.Item label="Label" name={[field.name, "label"]}>
                  <Input placeholder="Portfolio" />
                </Form.Item>
                <Form.Item label="URL" name={[field.name, "url"]}>
                  <Input placeholder="https://..." />
                </Form.Item>
              </Card>
            ))}
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => add(createEmptyLink())}
            >
              Add Link
            </Button>
          </div>
        )}
      </Form.List>
    </Card>
  );
}
