import { Card } from "antd";
import type { ReactElement } from "react";
import { ResumePreview } from "@/components/resume-preview";
import type { ResumeDocument } from "@/schema";
import type { PreviewRef, ResumeDensity } from "@/types";

interface ViewPageProps {
  doc: ResumeDocument;
  density: ResumeDensity;
  previewRef: PreviewRef;
}

export function ViewPage(props: ViewPageProps): ReactElement {
  const { doc, density, previewRef } = props;
  return (
    <div className="mx-auto max-w-4xl">
      <Card className="shadow-sm">
        <ResumePreview density={density} doc={doc} previewRef={previewRef} />
      </Card>
    </div>
  );
}
