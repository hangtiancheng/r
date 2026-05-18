import { exportElementToPdf } from "@lark-resume/pdf";

interface ExportElementAsSinglePagePdfParams {
  element: HTMLElement;
  fileName: string;
}

export async function exportElementAsSinglePagePdf(
  params: ExportElementAsSinglePagePdfParams,
): Promise<void> {
  await exportElementToPdf(params);
}
