import { MonthPicker } from "@/components/controls/month-picker";
import { OptionsSelect } from "@/components/controls/options-select";
import { SwitchField } from "@/components/controls/switch-field";
import { ModuleDialog } from "@/components/dialogs/module-dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DEGREES, GENDERS, POLITICALS } from "@/lib/format";
import type { BaseInfo, Gender } from "@/lib/types";

export interface BaseInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  base: BaseInfo;
  onChange: (patch: Partial<BaseInfo>) => void;
}

/** 个人信息 module form. */
export function BaseInfoDialog({
  open,
  onOpenChange,
  base,
  onChange,
}: BaseInfoDialogProps) {
  const today = new Date();
  return (
    <ModuleDialog open={open} onOpenChange={onOpenChange} title="我的个人信息">
      <FieldGroup className="gap-3 sm:grid sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="base-name">姓名（必填）</FieldLabel>
          <Input
            id="base-name"
            value={base.name}
            placeholder="输入姓名"
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel>性别</FieldLabel>
          <ToggleGroup
            variant="outline"
            size="sm"
            spacing={0}
            aria-label="性别"
            className="w-full"
            value={base.gender ? [base.gender] : []}
            onValueChange={(value) => {
              const gender = value[value.length - 1];
              if (gender) onChange({ gender: gender as Gender });
            }}
          >
            {GENDERS.map((gender) => (
              <ToggleGroupItem key={gender} value={gender} className="flex-1">
                {gender}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>
        <Field>
          <FieldLabel>出生年月</FieldLabel>
          <MonthPicker
            value={base.birth}
            maxDate={today}
            onChange={(birth) => onChange({ birth })}
            className="w-full"
          />
        </Field>
        <SwitchField
          label="简历中以年龄显示"
          checked={base.showAge}
          onChange={(showAge) => onChange({ showAge })}
        />
        <Field>
          <FieldLabel>参加工作时间</FieldLabel>
          <MonthPicker
            value={base.workStart}
            maxDate={today}
            onChange={(workStart) => onChange({ workStart })}
            className="w-full"
          />
        </Field>
        <SwitchField
          label="应届毕业生"
          checked={base.freshGraduate}
          onChange={(freshGraduate) => onChange({ freshGraduate })}
        />
        <Field>
          <FieldLabel htmlFor="base-tel">手机号（必填）</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>+86</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="base-tel"
              inputMode="tel"
              value={base.tel}
              placeholder="输入手机号"
              onChange={(e) => onChange({ tel: e.target.value })}
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="base-email">邮箱（必填）</FieldLabel>
          <Input
            id="base-email"
            type="email"
            value={base.email}
            placeholder="输入邮箱"
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="base-hometown">籍贯</FieldLabel>
          <Input
            id="base-hometown"
            value={base.hometown}
            placeholder="输入籍贯"
            onChange={(e) => onChange({ hometown: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel>政治面貌</FieldLabel>
          <OptionsSelect
            value={base.political}
            options={POLITICALS}
            onChange={(political) => onChange({ political })}
            placeholder="请选择"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="base-location">所在地</FieldLabel>
          <Input
            id="base-location"
            value={base.location}
            placeholder="输入所在地"
            onChange={(e) => onChange({ location: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel>最高学历</FieldLabel>
          <OptionsSelect
            value={base.degree}
            options={DEGREES}
            onChange={(degree) => onChange({ degree })}
            placeholder="请选择"
          />
        </Field>
      </FieldGroup>
    </ModuleDialog>
  );
}
