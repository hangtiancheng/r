import { LitElement, customElement, property, state } from "@yukino.js/lit-jsx";

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

  protected override render() {
    return (
      <>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900">
          <img
            src={avatarUrl}
            alt={this.name}
            width={40}
            height={40}
            className="size-10 shrink-0 cursor-zoom-in rounded border border-neutral-200 object-cover dark:border-neutral-700"
            fetchPriority="low"
            onClick={() => (this.previewing = true)}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-lg leading-tight font-semibold text-neutral-900 dark:text-neutral-100">
                {this.name}
              </h1>
              <button
                type="button"
                className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-px text-xs leading-tight font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 print:hidden"
                onClick={this.toggleLocale}
              >
                {this.labels.switch}
              </button>
            </div>
            <p className="mt-0.5 text-xs leading-tight text-neutral-600 dark:text-neutral-400">
              {this.about}
            </p>
            <div className="mt-1 flex flex-wrap gap-x-2.5 gap-y-0.5 text-xs leading-tight">
              <div className="flex items-center gap-1">
                <span className="rounded bg-neutral-100 px-1 py-px text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  {this.labels.tel}
                </span>
                <a
                  href={`tel:${this.tel}`}
                  className="text-neutral-700 hover:text-black hover:underline dark:text-neutral-300 dark:hover:text-white"
                >
                  {this.tel}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <span className="rounded bg-neutral-100 px-1 py-px text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  {this.labels.email}
                </span>
                <a
                  href={`mailto:${this.email}`}
                  className="text-neutral-700 hover:text-black hover:underline dark:text-neutral-300 dark:hover:text-white"
                >
                  {this.email}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <span className="rounded bg-neutral-100 px-1 py-px text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  {this.labels.github}
                </span>
                <a
                  href={`https://github.com/${this.github}`}
                  className="text-neutral-700 hover:text-black hover:underline dark:text-neutral-300 dark:hover:text-white"
                  target="_blank"
                  rel="noopener"
                >
                  https://github.com/{this.github}
                </a>
              </div>
            </div>
          </div>
        </div>

        {this.previewing ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={this.closePreview}
          >
            <img
              src={avatarUrl}
              alt={this.name}
              className="max-h-[80vh] max-w-[80vw] rounded-lg"
            />
          </div>
        ) : null}
      </>
    );
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
