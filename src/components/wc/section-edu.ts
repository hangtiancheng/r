import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Education section web component (Lit, light DOM).
 * Pure presentation — all data arrives via @property.
 */
@customElement("section-edu")
export class SectionEdu extends LitElement {
  @property({ type: String })
  header = "";

  @property({ attribute: false })
  edu: [string, string, string][] = [];

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  override render() {
    return html`
      <section class="rounded-lg border border-neutral-200 bg-white p-3">
        <div class="text-sm font-semibold text-neutral-900">${this.header}</div>
        <div class="my-1 h-px bg-neutral-100"></div>
        <ul class="mt-1.5 space-y-0.5 text-xs">
          ${this.edu.map(
            (item) => html`
              <li class="grid gap-1 md:grid-cols-3">
                <div class="text-neutral-700">${item[0]}</div>
                <div class="text-neutral-700">${item[1]}</div>
                <div class="text-neutral-700">${item[2]}</div>
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
