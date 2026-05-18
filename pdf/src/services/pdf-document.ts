import type { getDocument } from "pdfjs-dist";

export type LoadPdfDocumentOptions = Parameters<typeof getDocument>[0];
export type LoadedPdfDocument = Awaited<
  ReturnType<typeof getDocument>["promise"]
>;

export async function getPdfJsVersion(): Promise<string> {
  const { version } = await import("pdfjs-dist");
  return version;
}

export async function loadPdfDocument(
  options: LoadPdfDocumentOptions,
): Promise<LoadedPdfDocument> {
  const { getDocument } = await import("pdfjs-dist");
  const loadingTask = getDocument(options);
  return loadingTask.promise;
}
