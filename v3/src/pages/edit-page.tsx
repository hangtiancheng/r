import { Card } from "antd";
import { useAtomValue } from "jotai";
import { useMemo, useRef } from "react";
import { ResumeEditor, ResumePreview } from "@/components";
import { ResumeA4 } from "@/components/preview";
import { createEmptyResume } from "@/schema";
import { resumeDraftAtom } from "@/store";
import { exportElementAsSinglePagePdf, toPersistedResume } from "@/utils";

export function EditPage(): React.ReactElement {
  const draft = useAtomValue(resumeDraftAtom);
  const exportNodeRef = useRef<HTMLDivElement | null>(null);
  const resume = useMemo(() => {
    try {
      return toPersistedResume(draft);
    } catch {
      return createEmptyResume();
    }
  }, [draft]);

  async function exportPdf(): Promise<void> {
    if (exportNodeRef.current === null) {
      return;
    }

    await exportElementAsSinglePagePdf({
      element: exportNodeRef.current,
      fileName: `${resume.basics.name ?? "resume"}.pdf`,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[560px_minmax(0,1fr)]">
      <ResumeEditor onExport={exportPdf} />
      <div className="self-start lg:sticky lg:top-23">
        <Card className="shadow-soft" title="Live Preview">
          <ResumePreview resume={resume} />
        </Card>
      </div>
      <div className="absolute top-0 -left-25000">
        <div ref={exportNodeRef}>
          <ResumeA4 resume={resume} />
        </div>
      </div>
    </div>
  );
}
