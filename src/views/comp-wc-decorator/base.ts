/**
 * Copyright (c) 2026 hangtiancheng
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { LitElement, type ComplexAttributeConverter } from "lit";

export const jsonConverter: ComplexAttributeConverter = {
  fromAttribute(value: string | null) {
    return value ? JSON.parse(value) : null;
  },
};

let sharedSheets: CSSStyleSheet[] | null = null;

function getSharedSheets(): CSSStyleSheet[] {
  if (!sharedSheets) {
    sharedSheets = Array.from(document.styleSheets)
      .filter((sheet) => {
        try {
          return sheet.cssRules.length >= 0;
        } catch {
          return false;
        }
      })
      .map((sheet) => {
        const copy = new CSSStyleSheet();
        copy.replaceSync(
          Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n"),
        );
        return copy;
      });
  }
  return sharedSheets;
}

export class StyledElement extends LitElement {
  createRenderRoot() {
    const root = this.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = getSharedSheets();
    return root;
  }
}
