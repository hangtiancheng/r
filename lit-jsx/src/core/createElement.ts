import { ref } from "lit/directives/ref.js";
import { html } from "lit/static-html.js";
import { styleMap } from "lit/directives/style-map.js";
import { spread } from "../directives/spread";
import { getHTMLTag, parseProps, parseChildren } from "../utils/elementUtils";
import defaultElementRegistry from "../core/elementRegistry";

// Allow users to customize what should be rendered for each tag name.
// i.e if someone wants JSX <button /> to result in <my-custom-button /> they
// would pass an override in their registry.
let elementRegistry;
export function assignElements(overrides) {
  Object.assign(elementRegistry, overrides);
}
export function resetElements() {
  elementRegistry = Object.assign({}, defaultElementRegistry);
}
resetElements();

// Avoid creating a new object each time the user doesn't provide a style prop.
const EMPTY_STYLES = {};

type ElementConfig = {
  children?: unknown;
  ref?: Parameters<typeof ref>[0];
  style?: Parameters<typeof styleMap>[0];
  [property: string]: unknown;
};

// Render an HTML template using the given type and props, forwarding children.
export default function createElement(
  type,
  { children, ref: elementRef, style, ...props }: ElementConfig = {},
) {
  const tagName = getHTMLTag(type, elementRegistry);
  return html`
        <${tagName}
            ${ref(elementRef)}
            ${spread(parseProps(type, props, elementRegistry))}
            style=${styleMap(style ?? EMPTY_STYLES)}
        >
            ${parseChildren(children, elementRegistry)}
        </${tagName}>
    `;
}
