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

import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Labels } from "@/schema/resume";

/**
 * Resume header web component (Lit, light DOM).
 *
 * Pure presentation — all data arrives via @property, and the language
 * toggle dispatches a "toggle-locale" CustomEvent for the parent to handle.
 * Uses light DOM (createRenderRoot returns this) so Tailwind utility
 * classes apply without Shadow DOM boundary issues.
 */
@customElement("resume-header")
export class ResumeHeader extends LitElement {
  @property({ type: String })
  name = "";

  @property({ type: String })
  about = "";

  @property({ type: String })
  tel = "";

  @property({ type: String })
  email = "";

  @property({ type: String })
  github = "";

  @property({ attribute: false })
  labels: Labels = { tel: "", email: "", github: "", switch: "" };

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  override render() {
    return html`
      <div class="rounded-lg border border-neutral-200 bg-white p-3">
        <div class="flex items-center justify-between gap-2">
          <h1 class="text-xl font-semibold text-neutral-900">${this.name}</h1>
          <button
            class="rounded-md border border-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
            @click=${this.#handleToggleLocale}
          >
            ${this.labels.switch}
          </button>
        </div>
        <p class="mt-1 text-xs text-neutral-500">${this.about}</p>
        <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <div class="flex items-center gap-1.5">
            <span
              class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
            >
              ${this.labels.tel}
            </span>
            <a
              href=${`tel:${this.tel}`}
              class="text-neutral-900 hover:text-black hover:underline"
            >
              ${this.tel}
            </a>
          </div>
          <div class="flex items-center gap-1.5">
            <span
              class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
            >
              ${this.labels.email}
            </span>
            <a
              href=${`mailto:${this.email}`}
              class="text-neutral-900 hover:text-black hover:underline"
            >
              ${this.email}
            </a>
          </div>
          <div class="flex items-center gap-1.5">
            <span
              class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
            >
              ${this.labels.github}
            </span>
            <a
              href=${`https://github.com/${this.github}`}
              class="text-neutral-900 hover:text-black hover:underline"
              target="_blank"
              rel="noopener"
            >
              https://github.com/${this.github}
            </a>
          </div>
        </div>
      </div>
    `;
  }

  #handleToggleLocale(): void {
    this.dispatchEvent(
      new CustomEvent("toggle-locale", { bubbles: true, composed: true }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "resume-header": ResumeHeader;
  }
}
