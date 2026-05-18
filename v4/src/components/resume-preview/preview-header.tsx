import type { ReactElement } from "react";
import type { Resume } from "@/schema";

interface PreviewHeaderProps {
  resume: Resume;
}

export function PreviewHeader(props: PreviewHeaderProps): ReactElement {
  const basics = props.resume.basics;
  const contactParts = [basics.phone, basics.email, basics.city]
    .map((value: string): string => value.trim())
    .filter((value: string): boolean => value.length > 0);
  const links = basics.links
    .map((link) => ({ label: link.label.trim(), url: link.url.trim() }))
    .filter((link): boolean => link.label.length > 0 || link.url.length > 0);

  return (
    <header className="flex items-start justify-between gap-6">
      <div className="min-w-0">
        <div className="text-[26px] font-bold tracking-tight">
          {basics.name.trim() || "Unnamed Resume"}
        </div>
        {basics.title.trim().length > 0 ? (
          <div className="mt-1 text-[13px] font-medium text-slate-700">
            {basics.title.trim()}
          </div>
        ) : null}
        {contactParts.length > 0 ? (
          <div className="mt-2 text-[11.5px] text-slate-600">
            {contactParts.join(" · ")}
          </div>
        ) : null}
      </div>

      {links.length > 0 ? (
        <div className="shrink-0 text-right text-[11.5px] text-slate-600">
          {links.map(
            (link): ReactElement => (
              <div key={`${link.label}-${link.url}`} className="max-w-55">
                <span className="font-medium text-slate-700">
                  {link.label || "Link"}
                </span>
                {link.url.length > 0 ? (
                  <span className="ml-2 break-all">{link.url}</span>
                ) : null}
              </div>
            ),
          )}
        </div>
      ) : null}
    </header>
  );
}
