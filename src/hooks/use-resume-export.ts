import { useCallback, useState, type RefObject } from "react";

import { toast } from "@/components/ui/toast";
import {
  downloadResumeJson,
  exportPaperToPdf,
  safeFileName,
} from "@/lib/export";
import type { ResumeDoc } from "@/lib/types";

export function useResumeExport(
  data: ResumeDoc | undefined,
  paperRef: RefObject<HTMLDivElement | null>,
) {
  const [exporting, setExporting] = useState(false);

  const exportPdf = useCallback(async () => {
    const paper = paperRef.current;
    if (!paper || exporting) return;
    setExporting(true);
    const filename = safeFileName(data?.title ?? "", "pdf");
    try {
      await exportPaperToPdf(paper, filename);
      toast.add({ title: "PDF 已导出", description: filename });
    } catch {
      toast.add({ title: "PDF 导出失败", type: "error" });
    } finally {
      setExporting(false);
    }
  }, [data?.title, exporting, paperRef]);

  const downloadJson = useCallback(() => {
    if (!data) return;
    downloadResumeJson(data);
  }, [data]);

  return { exporting, exportPdf, downloadJson };
}
