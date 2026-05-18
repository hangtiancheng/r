import { Form, message } from "antd";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import { ResumeTopBar } from "@/components/app-shell";
import { ResumeEditorForm } from "@/components/resume-editor";
import { ResumePreviewPaper } from "@/components/resume-preview";
import { emptyResume, sampleResume } from "@/constants";
import type { Resume } from "@/schema";
import { clearResumeLocalStorage, exportElementToPdf } from "@/services";
import { resumeAtom, resumeHydrationAtom } from "@/store";

export function EditPage(): ReactElement {
  const [form] = Form.useForm<Resume>();
  const [resume, setResume] = useAtom(resumeAtom);
  const hydration = useAtomValue(resumeHydrationAtom);
  const paperRef = useRef<HTMLDivElement | null>(null);
  const didInitializeFormRef = useRef<boolean>(false);

  useEffect((): void => {
    if (!hydration.hydrated || didInitializeFormRef.current) {
      return;
    }

    form.setFieldsValue(resume);
    didInitializeFormRef.current = true;
  }, [form, hydration.hydrated, resume]);

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
    setResume(sampleResume);
    form.setFieldsValue(sampleResume);
    message.success("Sample resume loaded.");
  }

  function handleClear(): void {
    clearResumeLocalStorage();
    setResume(emptyResume);
    form.setFieldsValue(emptyResume);
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
        <div className="grid gap-6 xl:grid-cols-[560px_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
            <ResumeEditorForm form={form} onResumeChange={setResume} />
          </div>
          <div className="xl:sticky xl:top-19">
            <ResumePreviewPaper
              resume={resume}
              paperRef={paperRef}
              loading={!hydration.hydrated}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
