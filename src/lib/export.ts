import type { ResumeDoc } from "@/lib/types";

const PDF_MARGIN_MM = [8, 8, 8, 8];
const PDF_CONTENT_WIDTH_MM = 210 - PDF_MARGIN_MM[1] - PDF_MARGIN_MM[3];

export function safeFileName(title: string, ext: string): string {
  const base = (title || "resume").replace(/[\\/:*?"<>|]/g, "_");
  return `${base}.${ext}`;
}

export async function exportPaperToPdf(
  paper: HTMLElement,
  filename: string,
): Promise<void> {
  const clone = paper.cloneNode(true) as HTMLElement;
  clone.classList.add("resume-pdf");
  // html2pdf captures only the page width remaining after its margins.
  // Let the paper reflow to that container instead of overflowing its right edge.
  clone.style.width = "100%";

  const holder = document.createElement("div");
  holder.style.cssText = `position:fixed;left:-10000px;top:0;width:${PDF_CONTENT_WIDTH_MM}mm;background:#fff;color:#13181d;`;
  holder.appendChild(clone);
  document.body.appendChild(holder);

  try {
    const { default: html2pdf } = await import("html2pdf.js");
    await html2pdf()
      .set({
        margin: PDF_MARGIN_MM,
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: ".break-inside-avoid" },
      })
      .from(clone)
      .save();
  } finally {
    holder.remove();
  }
}

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
