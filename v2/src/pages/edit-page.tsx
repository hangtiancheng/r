import { Button } from "antd";
import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";
import { ResumeEditor, ResumePreview } from "@/components";
import { resumeAtom } from "@/store";

export function EditPage(): React.ReactElement {
  const resume = useAtomValue(resumeAtom);

  return (
    <div className="mx-auto max-w-350 px-5 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">
            Edit Resume
          </div>
          <div className="text-sm text-slate-600">
            Changes are saved automatically with base64url encoding and Zod
            validation.
          </div>
        </div>
        <Link to="/preview">
          <Button type="primary">Open Preview</Button>
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[520px_1fr]">
        <div className="shadow-soft rounded-2xl border border-slate-200/60 bg-white/70 p-4 backdrop-blur">
          <ResumeEditor />
        </div>

        <div className="flex justify-center">
          <div className="shadow-soft rounded-2xl border border-slate-200/60 bg-white/40 p-4 backdrop-blur">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
