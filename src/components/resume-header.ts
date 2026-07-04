import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("resume-header")
export class ResumeHeader extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String })
  name = "";

  @property({ type: String })
  myInfo = "";

  @property({ type: String })
  tel = "";

  @property({ type: String })
  email = "";

  @property({ type: String })
  github = "";

  @property({ type: String })
  labelTel = "";

  @property({ type: String })
  labelEmail = "";

  @property({ type: String })
  labelGithub = "";

  @property({ type: String })
  labelSwitch = "";

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
            @click=${this._handleToggleLocale}
          >
            ${this.labelSwitch}
          </button>
        </div>
        <p class="mt-1 text-xs text-neutral-500">${this.myInfo}</p>
        <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <div class="flex items-center gap-1.5">
            <span
              class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
              >${this.labelTel}</span
            >
            <a
              href="tel:${this.tel}"
              class="text-neutral-900 hover:text-black hover:underline"
              >${this.tel}</a
            >
          </div>
          <div class="flex items-center gap-1.5">
            <span
              class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
              >${this.labelEmail}</span
            >
            <a
              href="mailto:${this.email}"
              class="text-neutral-900 hover:text-black hover:underline"
              >${this.email}</a
            >
          </div>
          <div class="flex items-center gap-1.5">
            <span
              class="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600"
              >${this.labelGithub}</span
            >
            <a
              href="https://github.com/${this.github}"
              class="text-neutral-900 hover:text-black hover:underline"
              target="_blank"
              rel="noopener"
              >https://github.com/${this.github}</a
            >
          </div>
        </div>
      </div>
    `;
  }

  private _handleToggleLocale() {
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
