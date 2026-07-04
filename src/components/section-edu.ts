import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("section-edu")
export class SectionEdu extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String })
  sectionTitle = "";

  @property({ type: Array })
  eduList: [string, string, string][] = [];

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  override render() {
    return html`
      <section class="rounded-lg border border-neutral-200 bg-white p-3">
        <div class="text-sm font-semibold text-neutral-900">
          ${this.sectionTitle}
        </div>
        <div class="my-1 h-px bg-neutral-100"></div>
        <ul class="mt-1.5 space-y-0.5 text-xs">
          ${this.eduList.map(
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
