import type { ResumeDoc } from "@/lib/types";

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const TEL_RE = /^1\d{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationIssue {
  target: string;
  message: string;
}

export interface ValidationReport {
  issues: ValidationIssue[];
}

export const EMPTY_REPORT: ValidationReport = { issues: [] };

function isMonth(value: string): boolean {
  return MONTH_RE.test(value);
}

function validateRange(
  prefix: string,
  label: string,
  item: { start: string; end: string; ongoing: boolean },
  push: (target: string, message: string) => void,
): void {
  if (!item.start) push(`${prefix}:start`, `${label}：请选择开始时间`);
  if (!item.ongoing) {
    if (!item.end)
      push(`${prefix}:end`, `${label}：请选择结束时间，或勾选「至今」`);
    else if (item.start && item.end < item.start)
      push(`${prefix}:end`, `${label}：结束时间不能早于开始时间`);
  }
}

export function validateResume(doc: ResumeDoc): ValidationReport {
  const issues: ValidationIssue[] = [];
  const push = (target: string, message: string) =>
    issues.push({ target, message });

  const base = doc.base;
  if (!base.name.trim()) push("base:name", "请填写姓名");
  if (!base.birth) push("base:birth", "请选择出生年月");
  if (!base.tel.trim()) push("base:tel", "请填写手机号");
  else if (!TEL_RE.test(base.tel.trim())) push("base:tel", "手机号格式不正确");
  if (!base.email.trim()) push("base:email", "请填写邮箱");
  else if (!EMAIL_RE.test(base.email.trim()))
    push("base:email", "邮箱格式不正确");

  doc.edu.forEach((item, i) => {
    const label = `教育经历 ${i + 1}`;
    validateRange(`edu:${item.id}`, label, item, push);
    if (!item.school.trim())
      push(`edu:${item.id}:school`, `${label}：请填写学校名称`);
  });

  doc.works.forEach((item, i) => {
    const label = `工作经历 ${i + 1}`;
    validateRange(`work:${item.id}`, label, item, push);
    if (!item.company.trim())
      push(`work:${item.id}:company`, `${label}：请填写公司名`);
  });

  doc.projects.forEach((item, i) => {
    const label = `项目经历 ${i + 1}`;
    validateRange(`project:${item.id}`, label, item, push);
    if (!item.name.trim())
      push(`project:${item.id}:name`, `${label}：请填写项目名称`);
  });

  doc.honors.forEach((item, i) => {
    const label = `荣誉奖项 ${i + 1}`;
    if (!item.name.trim())
      push(`honor:${item.id}:name`, `${label}：请填写名称`);
    if (item.date && !isMonth(item.date))
      push(`honor:${item.id}:date`, `${label}：获奖时间格式不正确`);
  });

  doc.customModules.forEach((item, i) => {
    const label = item.name.trim()
      ? `「${item.name.trim()}」`
      : `自定义模块 ${i + 1}`;
    if (!item.name.trim())
      push(`custom:${item.id}:name`, `${label}：请填写模块名称`);
  });

  return { issues };
}

export function issueFor(
  report: ValidationReport,
  target: string,
): string | undefined {
  return report.issues.find((issue) => issue.target === target)?.message;
}
