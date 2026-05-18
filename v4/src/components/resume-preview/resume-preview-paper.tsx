import { Spin } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactElement } from "react";
import type { Resume } from "@/schema";
import { ResumePreview } from "./resume-preview";

const a4WidthPx = 794;
const a4HeightPx = 1123;

interface ResumePreviewPaperProps {
  resume: Resume;
  paperRef: React.RefObject<HTMLDivElement | null>;
  loading?: boolean;
}

export function ResumePreviewPaper(
  props: ResumePreviewPaperProps,
): ReactElement {
  const { loading = false, paperRef, resume } = props;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);

  useEffect((): (() => void) | void => {
    const viewportElement = viewportRef.current;

    if (viewportElement === null) {
      return;
    }

    const observer = new ResizeObserver((): void => {
      const availableWidth = Math.max(0, viewportElement.clientWidth - 32);
      const nextScale = Math.min(1, availableWidth / a4WidthPx);
      setScale(Number.isFinite(nextScale) ? nextScale : 1);
    });

    observer.observe(viewportElement);

    return (): void => {
      observer.disconnect();
    };
  }, []);

  const canvasStyle = useMemo(
    (): CSSProperties => ({
      width: a4WidthPx,
      height: a4HeightPx,
      transform: `scale(${scale})`,
      transformOrigin: "top left",
    }),
    [scale],
  );

  return (
    <div
      ref={viewportRef}
      className="relative w-full overflow-auto rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 p-4"
    >
      <div style={canvasStyle}>
        <div className="shadow-soft relative h-full w-full overflow-hidden rounded-xl bg-white">
          <div ref={paperRef} className="h-full w-full bg-white">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
          <Spin />
        </div>
      ) : null}
    </div>
  );
}
