import type { JSX } from "@swifty.js/preact";
import { resumeData, currentLang, i18next } from "../i18n";

/**
 * Resume header component.
 *
 * Reads data from the resumeData signal so it re-renders automatically
 * when the language changes, with no prop drilling required.
 */
export function ResumeHeader(): JSX.Element {
  const data = resumeData.value;

  const handleToggleLocale = () => {
    void i18next.changeLanguage(currentLang.value === "en" ? "zh" : "en");
  };

  return (
    <div class="rounded-lg border border-neutral-200 bg-white p-3">
      <div class="flex items-center justify-between gap-2">
        <h1 class="text-xl font-semibold text-neutral-900">{data.name}</h1>
        <button
          class="rounded-md border border-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
          onClick={handleToggleLocale}
        >
          {data.labels.switch}
        </button>
      </div>
      <p class="mt-1 text-xs text-neutral-500">{data.about}</p>
      <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
        <div class="flex items-center gap-1.5">
          <span class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600">
            {data.labels.tel}
          </span>
          <a
            href={`tel:${data.tel}`}
            class="text-neutral-900 hover:text-black hover:underline"
          >
            {data.tel}
          </a>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600">
            {data.labels.email}
          </span>
          <a
            href={`mailto:${data.email}`}
            class="text-neutral-900 hover:text-black hover:underline"
          >
            {data.email}
          </a>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600">
            {data.labels.github}
          </span>
          <a
            href={`https://github.com/${data.github}`}
            class="text-neutral-900 hover:text-black hover:underline"
            target="_blank"
            rel="noopener"
          >
            https://github.com/{data.github}
          </a>
        </div>
      </div>
    </div>
  );
}
