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
