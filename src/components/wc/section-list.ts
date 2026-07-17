import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { TitledItem } from "@/schema/resume";

/**
 * Generic list section web component (Lit, light DOM).
 *
 * Accepts title and items as reactive @property values.
 * Suitable for skills, works, projects, research sections.
 * Does not subscribe to resumeStore — props are pushed in by the parent.
 */
@customElement("section-list")
export class SectionList extends LitElement {
  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  @property({ type: String })
  title = "";

  @property({ attribute: false })
  items: (string | TitledItem)[] = [];

  override render() {
    return html`
      <section class="rounded-lg border border-neutral-200 bg-white p-3">
        <div class="text-sm font-semibold text-neutral-900">${this.title}</div>
        <div class="my-1 h-px bg-neutral-100"></div>
        <ul class="mt-1.5 ml-4 list-disc space-y-0.5 text-xs text-neutral-700">
          ${this.items.map((item) =>
            typeof item === "string"
              ? html`<li>${item}</li>`
              : html`<li><b>${item.title}</b>: ${item.content}</li>`,
          )}
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
