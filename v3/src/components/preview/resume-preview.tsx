import type { Resume } from "@/schema";
import { ResumeA4 } from "./resume-a4";

const a4Width = 794;
const a4Height = 1123;

interface ResumePreviewProps {
  resume: Resume;
  scale?: number;
}

export function ResumePreview(props: ResumePreviewProps): React.ReactElement {
  const scale = props.scale ?? 0.62;

  return (
    <div className="relative">
      <div
        className="mx-auto"
        style={{ width: a4Width * scale, height: a4Height * scale }}
      >
        <div
          className="origin-top-left"
          style={{ transform: `scale(${scale})` }}
        >
          <ResumeA4 resume={props.resume} />
        </div>
      </div>
    </div>
  );
}
