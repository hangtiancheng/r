import { Card } from "antd";
import type { ReactElement } from "react";
import { ResumeEditor } from "@/components/resume-editor";
import { ResumePreview } from "@/components/resume-preview";
import type { ResumeDocument } from "@/schema";
import type { PreviewRef, ResumeDensity, UpdateResumeDoc } from "@/types";

interface EditPageProps {
  doc: ResumeDocument;
  density: ResumeDensity;
  onChange: UpdateResumeDoc;
  previewRef: PreviewRef;
}

export function EditPage(props: EditPageProps): ReactElement {
  const { doc, density, onChange, previewRef } = props;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card
        className="shadow-sm"
        title={
          <div>
            <div className="text-sm font-semibold text-slate-900">Editor</div>
            <div className="text-xs text-slate-500">
              Every change is saved automatically to local storage.
            </div>
          </div>
        }
      >
        <ResumeEditor doc={doc} onChange={onChange} />
      </Card>
      <Card
        className="shadow-sm"
        title={
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Live Preview
            </div>
            <div className="text-xs text-slate-500">
              Export scales the preview to keep a single PDF page.
            </div>
          </div>
        }
      >
        <ResumePreview density={density} doc={doc} previewRef={previewRef} />
      </Card>
    </div>
  );
}
