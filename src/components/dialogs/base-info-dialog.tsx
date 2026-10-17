import { RequiredIndicator } from "@/components/controls/required-indicator";
import { MonthPicker } from "@/components/controls/month-picker";
import { OptionsSelect } from "@/components/controls/options-select";
import { SwitchField } from "@/components/controls/switch-field";
import { ModuleDialog } from "@/components/dialogs/module-dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DEGREES, GENDERS } from "@/lib/format";
import type { BaseInfo, BirthDisplay, Gender } from "@/lib/types";
import { issueFor, type ValidationReport } from "@/lib/validation";

export interface BaseInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  base: BaseInfo;
  onChange: (patch: Partial<BaseInfo>) => void;
  report: ValidationReport;
}

const BIRTH_DISPLAYS: { value: BirthDisplay; label: string }[] = [
  { value: "age", label: "年龄" },
  { value: "month", label: "出生年月" },
];

export function BaseInfoDialog({
  open,
  onOpenChange,
  base,
  onChange,
  report,
}: BaseInfoDialogProps) {
  const today = new Date();
  const nameError = issueFor(report, "base:name");
  const birthError = issueFor(report, "base:birth");
  const telError = issueFor(report, "base:tel");
  const emailError = issueFor(report, "base:email");
  return (
    <ModuleDialog open={open} onOpenChange={onOpenChange} title="我的个人信息">
      <FieldGroup className="gap-3 sm:grid sm:grid-cols-2">
        <Field data-invalid={!!nameError}>
          <FieldLabel htmlFor="base-name">
            姓名 <RequiredIndicator />
          </FieldLabel>
          <Input
            id="base-name"
            value={base.name}
            placeholder="输入姓名"
            aria-invalid={!!nameError}
            onChange={(e) => onChange({ name: e.target.value })}
          />
          <FieldError>{nameError}</FieldError>
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
        <Field data-invalid={!!birthError}>
          <FieldLabel>
            出生年月 <RequiredIndicator />
          </FieldLabel>
          <MonthPicker
            aria-label="出生年月"
            value={base.birth}
            maxDate={today}
            onChange={(birth) => onChange({ birth })}
            className="w-full"
          />
          <FieldError>{birthError}</FieldError>
        </Field>
        <Field>
          <FieldLabel>出生信息展示</FieldLabel>
          <ToggleGroup
            variant="outline"
            size="sm"
            spacing={0}
            aria-label="出生信息展示方式"
            className="w-full"
            value={[base.birthDisplay]}
            onValueChange={(value) => {
              const display = value[value.length - 1];
              if (display) onChange({ birthDisplay: display as BirthDisplay });
            }}
          >
            {BIRTH_DISPLAYS.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className="flex-1"
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>
        <Field>
          <FieldLabel>参加工作时间</FieldLabel>
          <MonthPicker
            aria-label="参加工作时间"
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
        <Field data-invalid={!!telError}>
          <FieldLabel htmlFor="base-tel">
            手机号 <RequiredIndicator />
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>+86</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="base-tel"
              inputMode="tel"
              value={base.tel}
              placeholder="输入手机号"
              aria-invalid={!!telError}
              onChange={(e) => onChange({ tel: e.target.value })}
            />
          </InputGroup>
          <FieldError>{telError}</FieldError>
        </Field>
        <Field data-invalid={!!emailError}>
          <FieldLabel htmlFor="base-email">
            邮箱 <RequiredIndicator />
          </FieldLabel>
          <Input
            id="base-email"
            type="email"
            value={base.email}
            placeholder="输入邮箱"
            aria-invalid={!!emailError}
            onChange={(e) => onChange({ email: e.target.value })}
          />
          <FieldError>{emailError}</FieldError>
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
