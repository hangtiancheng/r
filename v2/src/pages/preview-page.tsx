import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Slider, Space, message } from "antd";
import { useAtomValue } from "jotai";
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ResumePreview } from "@/components";
import { resumeAtom } from "@/store";
import { exportElementToSinglePagePdf } from "@/utils";

export function PreviewPage(): React.ReactElement {
  const resume = useAtomValue(resumeAtom);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.9);
  const [exporting, setExporting] = useState(false);

  const fileName = useMemo((): string => {
    const base = resume.basics.name.trim() || "resume";
    return `${base}.pdf`;
  }, [resume.basics.name]);

  async function exportPdf(): Promise<void> {
    if (previewRef.current === null) {
      return;
    }

    try {
      setExporting(true);
      await exportElementToSinglePagePdf({
        element: previewRef.current,
        fileName,
      });
      message.success("PDF download started.");
    } catch {
      message.error("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="mx-auto max-w-350 px-5 py-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">
            Preview And Export
          </div>
          <div className="text-sm text-slate-600">
            Export a single-page A4 PDF with automatic scaling.
          </div>
        </div>

        <Space wrap>
          <Link to="/edit">
            <Button>Back To Editor</Button>
          </Link>
          <Button
            icon={<PrinterOutlined />}
            onClick={() => {
              window.print();
            }}
          >
            Print
          </Button>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            loading={exporting}
            onClick={() => {
              void exportPdf();
            }}
          >
            Export PDF
          </Button>
        </Space>
      </div>

      <div className="shadow-soft mt-5 rounded-2xl border border-slate-200/60 bg-white/60 p-4 backdrop-blur">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="text-sm font-medium text-slate-700">
            Preview Scale
          </div>
          <div className="w-full max-w-sm">
            <Slider
              min={0.5}
              max={1.2}
              step={0.05}
              value={scale}
              onChange={(value) => {
                setScale(value);
              }}
              tooltip={{
                formatter: (value) => `${Math.round((value ?? 1) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center overflow-auto">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
          >
            <div ref={previewRef}>
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
