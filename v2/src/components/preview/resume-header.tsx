import type { Resume } from "@/schema";

interface ResumeHeaderProps {
  resume: Resume;
  contactLine: string;
  linkLine: string;
  isNonEmpty(value: string): boolean;
}

export function ResumeHeader(props: ResumeHeaderProps): React.ReactElement {
  const { resume } = props;

  return (
    <header className="flex items-start gap-4">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
        {props.isNonEmpty(resume.basics.avatarDataUrl) ? (
          <img
            src={resume.basics.avatarDataUrl}
            alt="Profile portrait"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-slate-500">
            {(resume.basics.name.trim()[0] ?? "R").toUpperCase()}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-[26px] font-semibold tracking-tight">
              {resume.basics.name || "Your Name"}
            </h1>
            {props.isNonEmpty(resume.basics.headline) && (
              <div className="mt-1 text-[13px] font-medium text-slate-700">
                {resume.basics.headline}
              </div>
            )}
          </div>
          <div className="text-right text-[11px] text-slate-600">
            {props.isNonEmpty(props.contactLine) && (
              <div>{props.contactLine}</div>
            )}
            {props.isNonEmpty(props.linkLine) && (
              <div className="mt-1">{props.linkLine}</div>
            )}
          </div>
        </div>
        {props.isNonEmpty(resume.basics.summary) && (
          <p className="mt-3 text-[11px] text-slate-700">
            {resume.basics.summary}
          </p>
        )}
      </div>
    </header>
  );
}
