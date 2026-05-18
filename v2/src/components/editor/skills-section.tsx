import { Card, Form, Select } from "antd";

export function SkillsSection(): React.ReactElement {
  return (
    <Card title="Skills" size="small" styles={{ body: { padding: 16 } }}>
      <Form.Item name="skills" label="Skill Tags">
        <Select
          mode="tags"
          placeholder="Type a skill and press Enter"
          tokenSeparators={[","]}
        />
      </Form.Item>
    </Card>
  );
}
