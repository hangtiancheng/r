interface ResumeEntryProps {
  title: string;
  meta: string;
  highlights: string[];
}

export function ResumeEntry(props: ResumeEntryProps): React.ReactElement {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2">
      <div className="min-w-0">
        <div className="text-[11px] font-semibold text-slate-900">
          {props.title || "Entry"}
        </div>
        {props.meta.length > 0 && (
          <div className="mt-0.5 text-[10px] text-slate-600">{props.meta}</div>
        )}
      </div>
      {props.highlights.length > 0 && (
        <ul className="col-span-2 mt-1 space-y-1 pl-4 text-[10.5px] leading-normal text-slate-800">
          {props.highlights.slice(0, 6).map((highlight, index) => (
            <li key={`${highlight}-${index}`} className="list-disc">
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
