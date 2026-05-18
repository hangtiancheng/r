import html2canvas from "html2canvas";
import type { PdfPageSize, PdfPageSizeName } from "./pdf-file";
import { createSingleImagePdfBytes, getPdfPageSize } from "./pdf-file";

export type { PdfPageSize, PdfPageSizeName } from "./pdf-file";

export interface ExportElementToPdfOptions {
  element: HTMLElement;
  fileName: string;
  imageQuality?: number;
  pageSize?: PdfPageSize | PdfPageSizeName;
  scale?: number;
}

const defaultImageQuality = 0.95;
const defaultScale = 2;

function decodeBase64(base64Value: string): Uint8Array {
  const binary = window.atob(base64Value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function decodeDataUrl(dataUrl: string): Uint8Array {
  const marker = ";base64,";
  const markerIndex = dataUrl.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error("PDF export requires a base64 data URL.");
  }

  return decodeBase64(dataUrl.slice(markerIndex + marker.length));
}

function saveBytes(bytes: Uint8Array, fileName: string): void {
  const buffer = new ArrayBuffer(bytes.length);
  new Uint8Array(buffer).set(bytes);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function exportElementToPdf(
  options: ExportElementToPdfOptions,
): Promise<void> {
  const canvas = await html2canvas(options.element, {
    backgroundColor: "#ffffff",
    scale: options.scale ?? defaultScale,
    useCORS: true,
    logging: false,
  });
  const imageData = canvas.toDataURL(
    "image/jpeg",
    options.imageQuality ?? defaultImageQuality,
  );
  const pdfBytes = createSingleImagePdfBytes({
    imageBytes: decodeDataUrl(imageData),
    imageHeight: canvas.height,
    imageWidth: canvas.width,
    pageSize: getPdfPageSize(options.pageSize),
  });

  saveBytes(pdfBytes, options.fileName);
}
