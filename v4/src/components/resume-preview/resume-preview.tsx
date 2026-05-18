import type { ReactElement } from "react";
import type { Resume } from "@/schema";
import { MainColumn } from "./main-column";
import { PreviewHeader } from "./preview-header";
import { SidebarColumn } from "./sidebar-column";

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview(props: ResumePreviewProps): ReactElement {
  return (
    <div className="h-full w-full px-9 py-9 text-slate-900">
      <PreviewHeader resume={props.resume} />
      <div className="mt-4 grid grid-cols-12 gap-6">
        <MainColumn resume={props.resume} />
        <SidebarColumn resume={props.resume} />
      </div>
    </div>
  );
}
