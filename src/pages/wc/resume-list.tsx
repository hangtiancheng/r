import { LitElement, customElement, property } from "@yukino.js/lit-jsx";

import type { TitledItem } from "@/schema/resume";

/**
 * Generic list section for skills, works, projects, research.
 *
 * Renders into light DOM (no shadow root) so the global Tailwind stylesheet
 * applies to the template; the host is given the Tailwind `block` utility
 * because custom elements default to `display: inline`.
 */
@customElement("resume-list")
export class ResumeListElement extends LitElement {
  /** Section heading text. */
  @property() header = "";

  /**
   * List rows: plain strings or `{ title, blocks }` pairs. Settable as a
   * property or as a JSON `items` attribute (Lit Array converter).
   */
  @property({ type: Array }) items: (string | TitledItem)[] = [];

  /** Column count hint; >1 renders a two-column list on `md:` screens. */
  @property({ type: Number }) columns = 1;

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("block");
  }

  protected override render() {
    return (
      <section className="rounded-lg border border-neutral-200 bg-white px-2.5 py-0.75 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="mb-0.5 border-l-2 border-neutral-400 pl-1.5 text-sm font-semibold tracking-wide text-neutral-900 uppercase dark:border-neutral-600 dark:text-neutral-100">
          {this.header}
        </h2>
        <ul
          className={
            "ml-3.5 list-disc space-y-px text-xs leading-tight text-neutral-600 marker:text-neutral-400 dark:text-neutral-400 dark:marker:text-neutral-600" +
            (this.columns > 1 ? " md:columns-2 md:gap-x-4" : "")
          }
        >
          {this.items.map((item) => this.renderItem(item))}
        </ul>
      </section>
    );
  }

  private renderItem(item: string | TitledItem) {
    if (typeof item === "string") {
      return <li className="break-inside-avoid">{item}</li>;
    }
    let textSeen = false;
    return (
      <li className="break-inside-avoid">
        <b className="font-semibold text-neutral-900 dark:text-neutral-100">
          {item.title}
        </b>
        {item.blocks.map((block) => {
          if (block.kind === "list") {
            return (
              <ul className="ml-4 list-disc space-y-px marker:text-neutral-400 dark:marker:text-neutral-600">
                {block.items.map((text) => (
                  <li className="break-inside-avoid">{text}</li>
                ))}
              </ul>
            );
          }
          const sep = textSeen ? "; " : ": ";
          textSeen = true;
          return (
            <span>
              {sep}
              {block.text}
            </span>
          );
        })}
      </li>
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "resume-list": ResumeListElement;
  }
}
