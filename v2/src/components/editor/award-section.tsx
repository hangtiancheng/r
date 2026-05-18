import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import type { Resume } from "@/schema";

const { TextArea } = Input;

function createEmptyAward(): Resume["awards"][number] {
  return { name: "", issuer: "", date: "", description: "" };
}

export function AwardSection(): React.ReactElement {
  return (
    <Card title="Awards" size="small" styles={{ body: { padding: 16 } }}>
      <Form.List name="awards">
        {(fields, { add, remove }) => (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <Card
                key={field.key}
                size="small"
                title={`Award ${index + 1}`}
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(field.name)}
                  />
                }
              >
                <Form.Item label="Name" name={[field.name, "name"]}>
                  <Input placeholder="Award name" />
                </Form.Item>
                <Space size={12} wrap className="w-full">
                  <Form.Item
                    label="Issuer"
                    name={[field.name, "issuer"]}
                    className="min-w-40 flex-1"
                  >
                    <Input placeholder="Issuer" />
                  </Form.Item>
                  <Form.Item
                    label="Date"
                    name={[field.name, "date"]}
                    className="min-w-35 flex-1"
                  >
                    <Input placeholder="2024" />
                  </Form.Item>
                </Space>
                <Form.Item
                  label="Description"
                  name={[field.name, "description"]}
                >
                  <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                </Form.Item>
              </Card>
            ))}
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => add(createEmptyAward())}
            >
              Add Award
            </Button>
          </div>
        )}
      </Form.List>
    </Card>
  );
}
