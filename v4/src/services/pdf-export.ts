import { exportElementToPdf as exportElementWithSharedPdf } from "@lark-resume/pdf";

export interface PdfExportOptions {
  fileName: string;
}

export async function exportElementToPdf(
  element: HTMLElement,
  options: PdfExportOptions,
): Promise<void> {
  await exportElementWithSharedPdf({ element, fileName: options.fileName });
}
