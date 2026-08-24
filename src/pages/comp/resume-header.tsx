/**
 * Copyright (c) 2026 hangtiancheng
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { useSignal } from "@lark.js/mvc";
import type { Labels } from "@/schema/resume";
import avatarUrl from "@/assets/avatar.jpeg";

interface ResumeHeaderProps {
  name?: string;
  about?: string;
  tel?: string;
  email?: string;
  github?: string;
  labels?: Labels;
  onToggleLocale?: () => void;
}

const FALLBACK_LABELS: Labels = { tel: "", email: "", github: "", switch: "" };

/**
 * Resume header. Pure presentation — data arrives through props (reading
 * them in the body subscribes this instance, so parent re-renders push
 * fresh values), and the language toggle calls the `onToggleLocale`
 * callback prop directly.
 */
export default function ResumeHeader(props: ResumeHeaderProps) {
  const previewing = useSignal(false);

  const name = props.name ?? "";
  const about = props.about ?? "";
  const tel = props.tel ?? "";
  const email = props.email ?? "";
  const github = props.github ?? "";
  const labels = props.labels ?? FALLBACK_LABELS;

  return (
    <>
      <div
        class="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3"
        swifty-sentry-el="resume-header"
      >
        <img
          src={avatarUrl}
          alt={name}
          class="size-16 shrink-0 cursor-zoom-in rounded-md border border-neutral-200 object-cover"
          fetchpriority="medium"
          onClick={() => (previewing.value = true)}
        />
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <h1 class="text-xl font-semibold text-neutral-900">{name}</h1>
            <button
              class="rounded-md border border-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
              onClick={() => props.onToggleLocale?.()}
              swifty-sentry-ev="toggle-locale"
              swifty-sentry-msg="Toggle locale"
              swifty-sentry-label={labels.switch}
            >
              {labels.switch}
            </button>
          </div>
          <p class="mt-1 text-xs text-neutral-500">{about}</p>
          <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
            <div class="flex items-center gap-1.5">
              <span class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600">
                {labels.tel}
              </span>
              <a
                href={`tel:${tel}`}
                class="text-neutral-900 hover:text-black hover:underline"
              >
                {tel}
              </a>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600">
                {labels.email}
              </span>
              <a
                href={`mailto:${email}`}
                class="text-neutral-900 hover:text-black hover:underline"
              >
                {email}
              </a>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600">
                {labels.github}
              </span>
              <a
                href={`https://github.com/${github}`}
                class="text-neutral-900 hover:text-black hover:underline"
                target="_blank"
                rel="noopener"
              >
                https://github.com/{github}
              </a>
            </div>
          </div>
        </div>
      </div>

      {previewing.value && (
        <div
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            // Delegated click on the backdrop; clicking the enlarged image
            // itself must not dismiss (the old template's @click.stop).
            const hit = e.target;
            if (hit instanceof HTMLElement && hit.tagName === "IMG") return;
            previewing.value = false;
          }}
        >
          <img
            src={avatarUrl}
            alt={name}
            class="max-h-[80vh] max-w-[80vw] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
