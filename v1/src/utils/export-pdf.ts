import { exportElementToPdf } from "@lark-resume/pdf";

interface ExportElementToSinglePagePdfParams {
  element: HTMLElement;
  fileName: string;
}

export async function exportElementToSinglePagePdf(
  params: ExportElementToSinglePagePdfParams,
): Promise<void> {
  await exportElementToPdf(params);
}
