import type { JSX } from "preact";
import { resumeData } from "../i18n";

/**
 * Education section component.
 * Reads edu from the resumeData signal.
 */
export function SectionEdu(): JSX.Element {
  const data = resumeData.value;

  return (
    <section class="rounded-lg border border-neutral-200 bg-white p-3">
      <div class="text-sm font-semibold text-neutral-900">
        {data.headers.edu}
      </div>
      <div class="my-1 h-px bg-neutral-100" />
      <ul class="mt-1.5 space-y-0.5 text-xs">
        {data.edu.map((edu) => (
          <li class="grid gap-1 md:grid-cols-3">
            <div class="text-neutral-700">{edu[0]}</div>
            <div class="text-neutral-700">{edu[1]}</div>
            <div class="text-neutral-700">{edu[2]}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
