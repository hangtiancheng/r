import { DownloadOutlined } from "@ant-design/icons";
import { Button, Card, Space, Typography, message } from "antd";
import { useAtomValue } from "jotai";
import { useMemo, useRef } from "react";
import { ResumeA4, ResumePreview } from "@/components/preview";
import { createEmptyResume } from "@/schema";
import { resumeDraftAtom } from "@/store";
import { exportElementAsSinglePagePdf, toPersistedResume } from "@/utils";

export function ViewPage(): React.ReactElement {
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

    try {
      await exportElementAsSinglePagePdf({
        element: exportNodeRef.current,
        fileName: `${resume.basics.name ?? "resume"}.pdf`,
      });
      message.success("PDF export started.");
    } catch {
      message.error("PDF export failed. Please try again.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card
        className="shadow-soft"
        title="Single-Page Preview"
        extra={
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => void exportPdf()}
          >
            Export PDF
          </Button>
        }
      >
        <ResumePreview resume={resume} scale={0.86} />
      </Card>
      <Card className="shadow-soft" title="Export Notes">
        <Typography.Paragraph className="mb-2!">
          This compact template scales the resume into a single A4 page.
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary" className="mb-0!">
          Data is stored locally in the browser and is never uploaded.
        </Typography.Paragraph>
        <Space className="mt-4" direction="vertical" size={10}>
          <Button icon={<DownloadOutlined />} onClick={() => void exportPdf()}>
            Export Again
          </Button>
        </Space>
      </Card>
      <div className="absolute top-0 -left-25000">
        <div ref={exportNodeRef}>
          <ResumeA4 resume={resume} />
        </div>
      </div>
    </div>
  );
}
