import type { Resume } from "@/schema";
import { classNames } from "@/utils";
import { ResumeHeader } from "./resume-header";
import { ResumeMain } from "./resume-main";
import { ResumeSidebar } from "./resume-sidebar";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

interface ResumePreviewProps {
  resume: Resume;
  className?: string;
}

function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

function joinNonEmpty(values: string[]): string {
  return values.filter(isNonEmpty).join(" · ");
}

export function ResumePreview(props: ResumePreviewProps): React.ReactElement {
  const { resume } = props;
  const contactLine = joinNonEmpty([
    resume.basics.phone,
    resume.basics.email,
    resume.basics.location,
  ]);
  const linkLine = joinNonEmpty([resume.basics.website, resume.basics.github]);

  return (
    <div
      className={classNames(
        "shadow-soft bg-white text-slate-900",
        "overflow-hidden rounded-xl border border-slate-100",
        props.className,
      )}
      style={{ width: A4_WIDTH_PX, height: A4_HEIGHT_PX }}
    >
      <div className="h-full p-7 text-[12px] leading-snug">
        <ResumeHeader
          resume={resume}
          contactLine={contactLine}
          linkLine={linkLine}
          isNonEmpty={isNonEmpty}
        />
        <div className="mt-5 grid grid-cols-12 gap-5">
          <ResumeMain
            resume={resume}
            joinNonEmpty={joinNonEmpty}
            isNonEmpty={isNonEmpty}
          />
          <ResumeSidebar
            resume={resume}
            joinNonEmpty={joinNonEmpty}
            isNonEmpty={isNonEmpty}
          />
        </div>
      </div>
    </div>
  );
}
