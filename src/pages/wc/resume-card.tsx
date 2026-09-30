import { LitElement, customElement, property } from "@yukino.js/lit-jsx";

/**
 * Education card. Each row is `[period, school, track]`.
 *
 * Renders into light DOM (no shadow root) so the global Tailwind stylesheet
 * applies to the template; the host is given the Tailwind `block` utility
 * because custom elements default to `display: inline`.
 */
@customElement("resume-card")
export class ResumeCardElement extends LitElement {
  /** Section heading text. */
  @property() header = "";

  /**
   * Education rows, three columns per row. Settable as a property or as a
   * JSON `items` attribute (Lit Array converter).
   */
  @property({ type: Array }) items: string[][] = [];

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
        <ul className="space-y-px text-xs leading-tight">
          {this.items.map((row) => (
            <li className="grid gap-x-2 md:grid-cols-[10rem_1fr_auto]">
              <div className="text-neutral-700 dark:text-neutral-300">
                {row[0]}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                {row[1]}
              </div>
              <div className="text-neutral-500 dark:text-neutral-500">
                {row[2]}
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "resume-card": ResumeCardElement;
  }
}
