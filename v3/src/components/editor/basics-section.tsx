import { Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export function BasicsSection(): React.ReactElement {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Form.Item label="Name" name={["basics", "name"]}>
        <Input placeholder="Example: Alex Chen" />
      </Form.Item>
      <Form.Item label="Headline" name={["basics", "headline"]}>
        <Input placeholder="Example: Frontend Engineer" />
      </Form.Item>
      <Form.Item label="Phone" name={["basics", "phone"]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name={["basics", "email"]}>
        <Input />
      </Form.Item>
      <Form.Item label="Location" name={["basics", "location"]}>
        <Input placeholder="City" />
      </Form.Item>
      <div />
      <Form.List name={["basics", "links"]}>
        {(fields, { add, remove }) => (
          <div className="col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-slate-800">Links</div>
              <Button
                icon={<PlusOutlined />}
                onClick={() => add({ label: "", url: "" })}
              >
                Add Link
              </Button>
            </div>
            {fields.map((field) => (
              <div
                key={field.key}
                className="grid grid-cols-[140px_1fr_auto] gap-3"
              >
                <Form.Item name={[field.name, "label"]} className="!mb-0">
                  <Input placeholder="Label" />
                </Form.Item>
                <Form.Item name={[field.name, "url"]} className="!mb-0">
                  <Input placeholder="URL" />
                </Form.Item>
                <Button danger onClick={() => remove(field.name)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </Form.List>
    </div>
  );
}
