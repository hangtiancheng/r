import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { resumeStore } from "@/i18n/store";

/**
 * Education section web component (Lit, light DOM).
 * Subscribes to resumeStore for automatic re-render on language change.
 */
@customElement("section-edu")
export class SectionEdu extends LitElement {
  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  override render() {
    const data = resumeStore.getData();

    return html`
      <section class="rounded-lg border border-neutral-200 bg-white p-3">
        <div class="text-sm font-semibold text-neutral-900">
          ${data.headers.edu}
        </div>
        <div class="my-1 h-px bg-neutral-100"></div>
        <ul class="mt-1.5 space-y-0.5 text-xs">
          ${data.edu.map(
            (edu) => html`
              <li class="grid gap-1 md:grid-cols-3">
                <div class="text-neutral-700">${edu[0]}</div>
                <div class="text-neutral-700">${edu[1]}</div>
                <div class="text-neutral-700">${edu[2]}</div>
              </li>
            `,
          )}
        </ul>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "section-edu": SectionEdu;
  }
}
