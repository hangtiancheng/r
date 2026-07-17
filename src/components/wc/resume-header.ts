import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { resumeStore } from "@/i18n/store";

/**
 * Resume header web component (Lit, light DOM).
 *
 * Subscribes to resumeStore in connectedCallback and calls requestUpdate()
 * on each notification so the template re-renders on language change.
 * Uses light DOM (createRenderRoot returns this) so Tailwind utility
 * classes apply without Shadow DOM boundary issues.
 */
@customElement("resume-header")
export class ResumeHeader extends LitElement {
  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  override render() {
    const data = resumeStore.getData();

    return html`
      <div class="rounded-lg border border-neutral-200 bg-white p-3">
        <div class="flex items-center justify-between gap-2">
          <h1 class="text-xl font-semibold text-neutral-900">${data.name}</h1>
          <button
            class="rounded-md border border-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
            @click=${() => resumeStore.toggleLanguage()}
          >
            ${data.labels.switch}
          </button>
        </div>
        <p class="mt-1 text-xs text-neutral-500">${data.about}</p>
        <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <div class="flex items-center gap-1.5">
            <span
              class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
            >
              ${data.labels.tel}
            </span>
            <a
              href=${`tel:${data.tel}`}
              class="text-neutral-900 hover:text-black hover:underline"
            >
              ${data.tel}
            </a>
          </div>
          <div class="flex items-center gap-1.5">
            <span
              class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
            >
              ${data.labels.email}
            </span>
            <a
              href=${`mailto:${data.email}`}
              class="text-neutral-900 hover:text-black hover:underline"
            >
              ${data.email}
            </a>
          </div>
          <div class="flex items-center gap-1.5">
            <span
              class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
            >
              ${data.labels.github}
            </span>
            <a
              href=${`https://github.com/${data.github}`}
              class="text-neutral-900 hover:text-black hover:underline"
              target="_blank"
              rel="noopener"
            >
              https://github.com/${data.github}
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "resume-header": ResumeHeader;
  }
}
