import type { ResumeDoc } from "@/lib/types";

/** A4 width in CSS pixels at 96dpi — the offscreen export canvas. */
const A4_WIDTH_PX = 794;

/** Strip characters that are invalid in filenames on common OSes. */
export function safeFileName(title: string, ext: string): string {
  const base = (title || "resume").replace(/[\\/:*?"<>|]/g, "_");
  return `${base}.${ext}`;
}

/**
 * Clone the paper, lay it out offscreen at A4 width and download it as a PDF.
 * Cloning keeps the visible sheet untouched while html2pdf rasterizes.
 */
export async function exportPaperToPdf(
  paper: HTMLElement,
  filename: string,
): Promise<void> {
  const clone = paper.cloneNode(true) as HTMLElement;
  clone.style.width = `${A4_WIDTH_PX}px`;

  const holder = document.createElement("div");
  holder.style.cssText = `position:fixed;left:-10000px;top:0;width:${A4_WIDTH_PX}px;background:#fff;color:#13181d;`;
  holder.appendChild(clone);
  document.body.appendChild(holder);

  try {
    const { default: html2pdf } = await import("html2pdf.js");
    await html2pdf()
      .set({
        margin: [10, 12, 10, 12],
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: ".print-avoid-break" },
      })
      .from(clone)
      .save();
  } finally {
    holder.remove();
  }
}

/** Download the document as a pretty-printed JSON backup. */
export function downloadResumeJson(doc: ResumeDoc): void {
  const blob = new Blob([JSON.stringify(doc, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = safeFileName(doc.title, "json");
  anchor.click();
  URL.revokeObjectURL(url);
}
