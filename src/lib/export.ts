import type { Options as CanvasOptions } from "html2canvas";

import type { ResumeDoc } from "@/lib/types";

const PDF_MARGIN_MM = 3;
const PDF_CONTENT_WIDTH_MM = 210 - PDF_MARGIN_MM * 2;
const PDF_CONTENT_HEIGHT_MM = 297 - PDF_MARGIN_MM * 2;
const PDF_PIXELS_PER_MM = 300 / 25.4;
const PDF_MIN_BODY_FONT_PT = 5;

interface PdfLink {
  left: number;
  top: number;
  width: number;
  height: number;
  url: string;
}

function fitPaperToPage(holder: HTMLElement, paper: HTMLElement): void {
  const aspectRatio = PDF_CONTENT_HEIGHT_MM / PDF_CONTENT_WIDTH_MM;
  let minWidth = holder.getBoundingClientRect().width;
  const minFontWidth =
    (parseFloat(getComputedStyle(paper).fontSize) * PDF_CONTENT_WIDTH_MM * 72) /
    (PDF_MIN_BODY_FONT_PT * 25.4);
  let maxWidth = Math.max(
    minWidth,
    Math.min(Math.ceil(paper.scrollHeight / aspectRatio), minFontWidth),
  );

  // A wider layout reflows text before it is scaled down, keeping the content
  // across the full page instead of shrinking a long column into a narrow strip.
  for (let i = 0; i < 12 && maxWidth - minWidth > 1; i++) {
    const width = (minWidth + maxWidth) / 2;
    holder.style.width = `${width}px`;
    if (paper.scrollHeight <= width * aspectRatio) {
      maxWidth = width;
    } else {
      minWidth = width;
    }
  }
  holder.style.width = `${Math.ceil(maxWidth)}px`;
}

async function capturePaperPage(
  html2canvas: typeof import("html2canvas").default,
  paper: HTMLElement,
  start: number,
) {
  const layout = {
    width: 0,
    height: 0,
    captureHeight: 0,
    renderScale: 0,
    links: [] as PdfLink[],
  };
  const options: Partial<CanvasOptions> = {
    y: start,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    onclone: (_, clonedPaper) => {
      // Measure the actual rendering document after its fonts and styles load.
      // Its layout can differ from the live page; using the live page's height
      // here can silently crop the last sections after modules are hidden.
      fitPaperToPage(clonedPaper.parentElement!, clonedPaper);
      const bounds = clonedPaper.getBoundingClientRect();
      layout.width = Math.max(Math.ceil(bounds.width), clonedPaper.scrollWidth);
      layout.height = Math.max(
        1,
        Math.ceil(bounds.height),
        clonedPaper.scrollHeight,
      );
      layout.captureHeight = Math.min(
        Math.floor(
          (layout.width * PDF_CONTENT_HEIGHT_MM) / PDF_CONTENT_WIDTH_MM,
        ),
        layout.height - start,
      );
      layout.renderScale = Math.min(
        3,
        (PDF_CONTENT_WIDTH_MM * PDF_PIXELS_PER_MM) / layout.width,
      );
      // html2canvas reads these render options after onclone has completed.
      options.width = layout.width;
      options.height = layout.captureHeight;
      options.scale = layout.renderScale;
      for (const link of clonedPaper.querySelectorAll<HTMLAnchorElement>(
        "a[href]",
      )) {
        for (const rect of link.getClientRects()) {
          layout.links.push({
            left: rect.left - bounds.left,
            top: rect.top - bounds.top,
            width: rect.width,
            height: rect.height,
            url: link.href,
          });
        }
      }
    },
  };
  const canvas = await html2canvas(paper, options);
  if (!layout.width || !layout.captureHeight)
    throw new Error("Unable to measure PDF layout");
  return { canvas, ...layout };
}

function trimPageAtWhitespace(canvas: HTMLCanvasElement, scale: number) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to read PDF canvas");
  const scanHeight = Math.min(canvas.height, Math.ceil(40 * scale));
  const offset = canvas.height - scanHeight;
  const { data } = context.getImageData(0, offset, canvas.width, scanHeight);
  let blankRows = 0;
  for (let row = scanHeight - 1; row >= 0; row--) {
    let blank = true;
    for (let column = 0; column < canvas.width; column++) {
      const pixel = (row * canvas.width + column) * 4;
      if (data[pixel] < 245 || data[pixel + 1] < 245 || data[pixel + 2] < 245) {
        blank = false;
        break;
      }
    }
    blankRows = blank ? blankRows + 1 : 0;
    if (blankRows < Math.ceil(2 * scale)) continue;

    // Check the rendered pixels rather than DOM font metrics: html2canvas's
    // glyph positions can differ slightly from the browser's text rectangles.
    const trimmed = document.createElement("canvas");
    trimmed.width = canvas.width;
    trimmed.height = offset + row + Math.ceil(blankRows / 2);
    const target = trimmed.getContext("2d");
    if (!target) throw new Error("Unable to create PDF canvas");
    target.drawImage(canvas, 0, 0);
    return trimmed;
  }
  // Oversized images or solid backgrounds may have no whitespace to split at.
  return canvas;
}

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
  clone.style.width = "100%";

  const holder = document.createElement("div");
  holder.style.cssText = `position:fixed;left:-10000px;top:0;width:${PDF_CONTENT_WIDTH_MM}mm;background:#fff;color:#13181d;`;
  holder.appendChild(clone);
  document.body.appendChild(holder);

  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
      document.fonts.ready,
      ...Array.from(clone.querySelectorAll("img"), (image) =>
        image.decode().catch(() => undefined),
      ),
    ]);

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    });

    let start = 0;
    let page = 0;
    let height: number;
    do {
      // Capture one page at a time to bound canvas memory for extreme resumes.
      const {
        canvas: capture,
        width,
        height: fullHeight,
        captureHeight,
        renderScale,
        links,
      } = await capturePaperPage(html2canvas, clone, start);
      height = fullHeight;
      const lastPage = start + captureHeight >= height;
      const canvas = lastPage
        ? capture
        : trimPageAtWhitespace(capture, renderScale);
      const pageHeight =
        canvas === capture ? captureHeight : canvas.height / renderScale;
      if (page > 0) pdf.addPage();
      const scale = Math.min(
        PDF_CONTENT_WIDTH_MM / canvas.width,
        PDF_CONTENT_HEIGHT_MM / canvas.height,
      );
      const imageWidth = canvas.width * scale;
      const imageHeight = canvas.height * scale;
      const x = PDF_MARGIN_MM + (PDF_CONTENT_WIDTH_MM - imageWidth) / 2;
      const y = PDF_MARGIN_MM;
      pdf.addImage(
        canvas,
        "PNG",
        x,
        y,
        imageWidth,
        imageHeight,
        undefined,
        "FAST",
      );

      // Restore clickable links on their page using the capture's scale.
      const scaleX = imageWidth / width;
      const scaleY = imageHeight / pageHeight;
      for (const link of links) {
        const linkTop = Math.max(link.top, start);
        const linkBottom = Math.min(link.top + link.height, start + pageHeight);
        if (!link.width || linkBottom <= linkTop) continue;
        pdf.link(
          x + link.left * scaleX,
          y + (linkTop - start) * scaleY,
          link.width * scaleX,
          (linkBottom - linkTop) * scaleY,
          { url: link.url },
        );
      }
      start = lastPage ? height : start + pageHeight;
      page++;
    } while (start < height);

    await pdf.save(filename, { returnPromise: true });
  } finally {
    holder.remove();
  }
}

export async function copyResumeJson(doc: ResumeDoc): Promise<void> {
  await navigator.clipboard.writeText(JSON.stringify(doc, null, 2));
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
