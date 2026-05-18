import { UploadOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Space,
  Upload,
} from "antd";
import type { FormInstance } from "antd";
import type { Resume } from "@/schema";

const { TextArea } = Input;

interface BasicsSectionProps {
  resume: Resume;
  form: FormInstance<Resume>;
  syncToAtom(): void;
}

export function BasicsSection(props: BasicsSectionProps): React.ReactElement {
  return (
    <Card
      title="Basic Information"
      size="small"
      styles={{ body: { padding: 16 } }}
    >
      <Space align="start" size={16} wrap>
        <Avatar
          shape="square"
          size={64}
          src={props.resume.basics.avatarDataUrl || undefined}
          style={{ borderRadius: 16 }}
        >
          {(props.resume.basics.name.trim()[0] ?? "R").toUpperCase()}
        </Avatar>

        <Form.Item label="Avatar" name={["basics", "avatarDataUrl"]}>
          <Space>
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={(file) => {
                if (file.size > 220 * 1024) {
                  message.error(
                    "Keep the avatar under 220KB for local storage.",
                  );
                  return Upload.LIST_IGNORE;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  props.form.setFieldValue(
                    ["basics", "avatarDataUrl"],
                    String(reader.result ?? ""),
                  );
                  props.syncToAtom();
                };
                reader.readAsDataURL(file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <Button
              danger
              onClick={() => {
                props.form.setFieldValue(["basics", "avatarDataUrl"], "");
                props.syncToAtom();
              }}
            >
              Clear
            </Button>
          </Space>
        </Form.Item>
      </Space>

      <Divider className="my-3" />

      <Form.Item label="Name" name={["basics", "name"]}>
        <Input placeholder="Example: Alex Chen" />
      </Form.Item>
      <Form.Item label="Headline" name={["basics", "headline"]}>
        <Input placeholder="Example: Frontend Platform Engineer" />
      </Form.Item>

      <Space size={12} wrap className="w-full">
        <Form.Item
          label="Phone"
          name={["basics", "phone"]}
          className="min-w-40 flex-1"
        >
          <Input placeholder="Phone number" />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["basics", "email"]}
          className="min-w-50 flex-1"
        >
          <Input placeholder="Email address" />
        </Form.Item>
      </Space>

      <Space size={12} wrap className="w-full">
        <Form.Item
          label="Location"
          name={["basics", "location"]}
          className="min-w-40 flex-1"
        >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          label="Website"
          name={["basics", "website"]}
          className="min-w-50 flex-1"
        >
          <Input placeholder="https://..." />
        </Form.Item>
      </Space>

      <Form.Item label="GitHub" name={["basics", "github"]}>
        <Input placeholder="https://github.com/..." />
      </Form.Item>
      <Form.Item label="Summary" name={["basics", "summary"]}>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 6 }}
          placeholder="Summarize strengths and direction in 2-4 sentences."
        />
      </Form.Item>
    </Card>
  );
}
