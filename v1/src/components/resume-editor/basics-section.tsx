import { Input } from "antd";
import type { ReactElement } from "react";
import type { ResumeDocument } from "@/schema";
import type { UpdateResumeDoc } from "@/types";
import { LabeledInput } from "./labeled-input";

interface BasicsSectionProps {
  basics: ResumeDocument["resume"]["basics"];
  onChange: UpdateResumeDoc;
}

function updateBasics(
  onChange: UpdateResumeDoc,
  key: keyof ResumeDocument["resume"]["basics"],
  value: string,
): void {
  onChange((draft): void => {
    draft.resume.basics[key] = value;
  });
}

export function BasicsSection(props: BasicsSectionProps): ReactElement {
  const { basics, onChange } = props;

  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-semibold text-slate-900">Basics</div>
        <div className="text-xs text-slate-500">
          Used for the header and primary contact information.
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput
          label="Name"
          value={basics.name}
          placeholder="Your name"
          onChange={(value): void => updateBasics(onChange, "name", value)}
        />
        <LabeledInput
          label="Target role"
          value={basics.title}
          placeholder="Frontend Engineer"
          onChange={(value): void => updateBasics(onChange, "title", value)}
        />
        <LabeledInput
          label="Phone"
          value={basics.phone}
          onChange={(value): void => updateBasics(onChange, "phone", value)}
        />
        <LabeledInput
          label="Email"
          value={basics.email}
          onChange={(value): void => updateBasics(onChange, "email", value)}
        />
        <LabeledInput
          label="Location"
          value={basics.location}
          onChange={(value): void => updateBasics(onChange, "location", value)}
        />
        <LabeledInput
          label="Website"
          value={basics.website}
          placeholder="https://..."
          onChange={(value): void => updateBasics(onChange, "website", value)}
        />
        <LabeledInput
          label="GitHub"
          value={basics.github}
          placeholder="https://github.com/..."
          onChange={(value): void => updateBasics(onChange, "github", value)}
        />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-slate-700">Summary</div>
        <Input.TextArea
          value={basics.summary}
          placeholder="Summarize your strengths in one or two sentences"
          autoSize={{ minRows: 2, maxRows: 5 }}
          onChange={(event): void =>
            updateBasics(onChange, "summary", event.target.value)
          }
        />
      </div>
    </div>
  );
}
