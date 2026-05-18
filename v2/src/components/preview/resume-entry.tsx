interface ResumeEntryProps {
  title: string;
  meta: string;
  highlights: string[];
}

export function ResumeEntry(props: ResumeEntryProps): React.ReactElement {
  const highlights = props.highlights
    .map((item): string => item.trim())
    .filter(Boolean);

  return (
    <div className="mb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 font-medium text-slate-900">
          {props.title || "Entry"}
        </div>
        <div className="shrink-0 text-right text-[10px] text-slate-500">
          {props.meta}
        </div>
      </div>

      {highlights.length > 0 && (
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-slate-700">
          {highlights.slice(0, 6).map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
