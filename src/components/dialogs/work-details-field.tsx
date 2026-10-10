import { PlusIcon, Trash2Icon } from "lucide-react";

import { MarkdownField } from "@/components/controls/markdown-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { newWorkDetail } from "@/lib/factories";
import type { WorkDetail } from "@/lib/types";

export interface WorkDetailsFieldProps {
  details: WorkDetail[];
  onChange: (details: WorkDetail[]) => void;
}

/** Nested 项目 list inside a 工作经历 entry. */
export function WorkDetailsField({ details, onChange }: WorkDetailsFieldProps) {
  const patch = (id: string, value: Partial<WorkDetail>) =>
    onChange(details.map((d) => (d.id === id ? { ...d, ...value } : d)));

  return (
    <Field>
      <FieldLabel>工作内容</FieldLabel>
      <FieldGroup className="gap-2">
        {details.map((detail, index) => (
          <Card key={detail.id} size="sm">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-xs font-medium">
                项目 {index + 1}
              </CardTitle>
              <CardAction>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="删除该项目"
                  onClick={() =>
                    onChange(details.filter((d) => d.id !== detail.id))
                  }
                >
                  <Trash2Icon />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <FieldGroup className="gap-2">
                <Input
                  value={detail.title}
                  placeholder="总结主要工作内容，或事项名称"
                  onChange={(e) => patch(detail.id, { title: e.target.value })}
                />
                <MarkdownField
                  label="工作内容描述"
                  value={detail.content}
                  height={180}
                  placeholder="支持 Markdown，分点描述事项（- 一条），渲染为项目符号列表"
                  onChange={(content) => patch(detail.id, { content })}
                />
              </FieldGroup>
            </CardContent>
          </Card>
        ))}
        <Button
          variant="outline"
          size="xs"
          className="w-fit"
          onClick={() => onChange([...details, newWorkDetail()])}
        >
          <PlusIcon data-icon="inline-start" />
          增加项目
        </Button>
      </FieldGroup>
    </Field>
  );
}
