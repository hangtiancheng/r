export interface PdfPageSize {
  width: number;
  height: number;
}
export type PdfPageSizeName = "a4";
const newline = "\n";
const textEncoder = new TextEncoder();

function encodeText(value: string): Uint8Array {
  return textEncoder.encode(value);
}

function concatenateBytes(chunks: Uint8Array[]): Uint8Array {
  const totalLength = chunks.reduce(
    (sum: number, chunk: Uint8Array): number => sum + chunk.length,
    0,
  );
  const output = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }

  return output;
}

function padPdfOffset(offset: number): string {
  return offset.toString().padStart(10, "0");
}
function getRenderBox(params: {
  imageHeight: number;
  imageWidth: number;
  pageSize: PdfPageSize;
}): PdfPageSize & { x: number; y: number } {
  const { imageHeight, imageWidth, pageSize } = params;
  const imageRatio = imageWidth / imageHeight;
  const pageRatio = pageSize.width / pageSize.height;
  const width =
    imageRatio > pageRatio ? pageSize.width : pageSize.height * imageRatio;
  const height =
    imageRatio > pageRatio ? pageSize.width / imageRatio : pageSize.height;

  return {
    width,
    height,
    x: (pageSize.width - width) / 2,
    y: (pageSize.height - height) / 2,
  };
}

export function getPdfPageSize(
  pageSize: PdfPageSize | PdfPageSizeName | undefined,
): PdfPageSize {
  if (pageSize === undefined || pageSize === "a4") {
    return { width: 595.28, height: 841.89 };
  }

  return pageSize;
}
export function createSingleImagePdfBytes(params: {
  imageBytes: Uint8Array;
  imageHeight: number;
  imageWidth: number;
  pageSize: PdfPageSize;
}): Uint8Array {
  const { imageBytes, imageHeight, imageWidth, pageSize } = params;
  const renderBox = getRenderBox({ imageHeight, imageWidth, pageSize });
  const content = [
    "q",
    `${renderBox.width} 0 0 ${renderBox.height} ${renderBox.x} ${renderBox.y} cm`,
    "/Im0 Do",
    "Q",
    "",
  ].join(newline);
  const contentBytes = encodeText(content);
  const chunks: Uint8Array[] = [];
  const objectOffsets: number[] = [];
  let byteOffset = 0;

  function append(chunk: Uint8Array): void {
    chunks.push(chunk);
    byteOffset += chunk.length;
  }
  function appendText(value: string): void {
    append(encodeText(value));
  }
  function appendObject(
    objectNumber: number,
    value: string | Uint8Array,
  ): void {
    objectOffsets[objectNumber] = byteOffset;
    appendText(`${objectNumber} 0 obj${newline}`);
    const valueBytes = typeof value === "string" ? encodeText(value) : value;
    append(valueBytes);
    appendText(`${newline}endobj${newline}`);
  }

  appendText(`%PDF-1.4${newline}% resume-pdf${newline}`);
  appendObject(1, `<< /Type /Catalog /Pages 2 0 R >>${newline}`);
  appendObject(2, `<< /Type /Pages /Kids [3 0 R] /Count 1 >>${newline}`);
  appendObject(
    3,
    [
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageSize.width} ${pageSize.height}]`,
      "/Resources << /XObject << /Im0 4 0 R >> >>",
      "/Contents 5 0 R >>",
      "",
    ].join(newline),
  );
  const imageDictionary = [
    `<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight}`,
    "/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode",
    `/Length ${imageBytes.length} >>`,
    "stream",
    "",
  ].join(newline);
  appendObject(
    4,
    concatenateBytes([
      encodeText(imageDictionary),
      imageBytes,
      encodeText(`${newline}endstream${newline}`),
    ]),
  );
  appendObject(
    5,
    `<< /Length ${contentBytes.length} >>${newline}stream${newline}${content}endstream${newline}`,
  );
  const xrefOffset = byteOffset;
  appendText(`xref${newline}0 6${newline}0000000000 65535 f ${newline}`);
  for (let objectNumber = 1; objectNumber <= 5; objectNumber += 1) {
    appendText(
      `${padPdfOffset(objectOffsets[objectNumber])} 00000 n ${newline}`,
    );
  }
  appendText(
    [
      "trailer",
      "<< /Size 6 /Root 1 0 R >>",
      "startxref",
      xrefOffset.toString(),
      "%%EOF",
      "",
    ].join(newline),
  );
  return concatenateBytes(chunks);
}
