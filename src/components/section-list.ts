import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("section-list")
export class SectionList extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String })
  sectionTitle = "";

  @property({ type: Array })
  items: string[] = [];

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
        <ul class="mt-1.5 ml-4 list-disc space-y-0.5 text-xs text-neutral-700">
          ${this.items.map((item) => html`<li>${item}</li>`)}
        </ul>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "section-list": SectionList;
  }
}
