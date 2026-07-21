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

/** @jsxImportSource react */
import type { ErrorInfo as ReactErrorInfo } from "react";
import { createElement } from "@swifty.js/preact";
import type { ErrorInfo as PreactErrorInfo } from "@swifty.js/preact";

export const PreactErrorBoundaryFallback = (
  error: Error,
  errorInfo?: PreactErrorInfo,
) =>
  createElement(
    "div",
    { class: "min-h-dvh w-full bg-neutral-50 text-neutral-900 p-6" },
    createElement(
      "div",
      {
        class:
          "mx-auto max-w-2xl rounded-lg border border-red-200 bg-white p-4",
      },
      createElement(
        "div",
        { class: "mb-3 flex items-center gap-2" },
        createElement("div", { class: "h-2 w-2 rounded-full bg-red-500" }),
        createElement(
          "h1",
          { class: "text-sm font-semibold text-neutral-900" },
          "Rendering Error",
        ),
      ),
      createElement(
        "div",
        { class: "mb-2 text-xs text-red-700" },
        error.message,
      ),
      errorInfo?.componentStack
        ? createElement(
            "pre",
            {
              class:
                "overflow-auto rounded bg-neutral-100 p-3 text-[11px] leading-relaxed text-neutral-600",
            },
            String(errorInfo.componentStack),
          )
        : null,
    ),
  );

export const ReactErrorBoundaryFallback = (
  error: Error,
  errorInfo?: ReactErrorInfo,
) => (
  <div className="min-h-dvh w-full bg-neutral-50 p-6 text-neutral-900">
    <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-red-500" />
        <h1 className="text-sm font-semibold text-neutral-900">
          Rendering Error
        </h1>
      </div>
      <div className="mb-2 text-xs text-red-700">{error.message}</div>
      {errorInfo?.componentStack && (
        <pre className="overflow-auto rounded bg-neutral-100 p-3 text-[11px] leading-relaxed text-neutral-600">
          {errorInfo.componentStack}
        </pre>
      )}
    </div>
  </div>
);
