import { message } from "antd";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import type { ReactElement } from "react";
import { ResumeTopBar } from "@/components/app-shell";
import { ResumePreviewPaper } from "@/components/resume-preview";
import { clearResumeLocalStorage, exportElementToPdf } from "@/services";
import {
  resumeAtom,
  resumeHydrationAtom,
  setEmptyResumeAtom,
  setSampleResumeAtom,
} from "@/store";

export function ViewPage(): ReactElement {
  const resume = useAtomValue(resumeAtom);
  const hydration = useAtomValue(resumeHydrationAtom);
  const setSample = useSetAtom(setSampleResumeAtom);
  const setEmpty = useSetAtom(setEmptyResumeAtom);
  const paperRef = useRef<HTMLDivElement | null>(null);

  async function handleExport(): Promise<void> {
    const paperElement = paperRef.current;

    if (paperElement === null) {
      return;
    }

    message.loading({
      content: "Generating PDF...",
      key: "export",
      duration: 0,
    });

    try {
      await exportElementToPdf(paperElement, { fileName: "resume.pdf" });
      message.success({ content: "PDF exported.", key: "export" });
    } catch {
      message.error({
        content: "PDF export failed. Please try again.",
        key: "export",
      });
    }
  }

  function handleResetSample(): void {
    setSample();
    message.success("Sample resume loaded.");
  }

  function handleClear(): void {
    clearResumeLocalStorage();
    setEmpty();
    message.success("Local resume cleared.");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50">
      <ResumeTopBar
        hydration={hydration}
        onExportPdf={(): void => {
          void handleExport();
        }}
        onResetSample={handleResetSample}
        onClearLocal={handleClear}
      />
      <div className="mx-auto max-w-350 px-4 pt-6 pb-10">
        <div className="mx-auto max-w-245">
          <ResumePreviewPaper
            resume={resume}
            paperRef={paperRef}
            loading={!hydration.hydrated}
          />
        </div>
      </div>
    </div>
  );
}
