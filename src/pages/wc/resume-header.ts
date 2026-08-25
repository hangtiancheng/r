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

import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import type { Labels } from "@/schema/resume";
import avatarUrl from "@/assets/avatar.jpeg";

const FALLBACK_LABELS: Labels = { tel: "", email: "", github: "", switch: "" };

/** Fired when the language toggle button is clicked. Carries no detail. */
export type ToggleLocaleEvent = CustomEvent<null>;

/**
 * Resume header. Pure presentation — data arrives through reactive
 * properties, and the language toggle dispatches a bubbling, composed
 * `toggle-locale` custom event instead of calling a callback prop.
 *
 * Renders into light DOM (no shadow root) so the global Tailwind stylesheet
 * applies to the template; the host is given the Tailwind `block` utility
 * because custom elements default to `display: inline`.
 */
@customElement("resume-header")
export class ResumeHeaderElement extends LitElement {
  @property() name = "";

  @property() about = "";

  @property() tel = "";

  @property() email = "";

  @property() github = "";

  /**
   * Locale-aware chrome labels (contact chips, language toggle button).
   * Settable as a property or as a JSON `labels` attribute (Lit Object
   * converter).
   */
  @property({ type: Object }) labels: Labels = FALLBACK_LABELS;

  /** Whether the enlarged avatar overlay is open. */
  @state() private previewing = false;

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("block");
  }

  private toggleLocale(): void {
    this.dispatchEvent(
      new CustomEvent<null>("toggle-locale", {
        detail: null,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private closePreview(e: MouseEvent): void {
    // Delegated click on the backdrop; clicking the enlarged image itself
    // must not dismiss (the old template's @click.stop).
    const hit = e.target;
    if (hit instanceof HTMLElement && hit.tagName === "IMG") return;
    this.previewing = false;
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3"
        swifty-sentry-el="resume-header"
      >
        <img
          src=${avatarUrl}
          alt=${this.name}
          class="size-16 shrink-0 cursor-zoom-in rounded-md border border-neutral-200 object-cover"
          fetchpriority="low"
          @click=${() => (this.previewing = true)}
        />
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <h1 class="text-xl font-semibold text-neutral-900">${this.name}</h1>
            <button
              class="rounded-md border border-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
              @click=${this.toggleLocale}
              swifty-sentry-ev="toggle-locale"
              swifty-sentry-msg="Toggle locale"
              swifty-sentry-label=${this.labels.switch}
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
                href="tel:${this.tel}"
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
                href="mailto:${this.email}"
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
                href="https://github.com/${this.github}"
                class="text-neutral-900 hover:text-black hover:underline"
                target="_blank"
                rel="noopener"
              >
                https://github.com/${this.github}
              </a>
            </div>
          </div>
        </div>
      </div>

      ${
        this.previewing
          ? html`
              <div
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                @click=${this.closePreview}
              >
                <img
                  src=${avatarUrl}
                  alt=${this.name}
                  class="max-h-[80vh] max-w-[80vw] rounded-lg shadow-2xl"
                />
              </div>
            `
          : nothing
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "resume-header": ResumeHeaderElement;
  }

  interface HTMLElementEventMap {
    "toggle-locale": ToggleLocaleEvent;
  }
}
