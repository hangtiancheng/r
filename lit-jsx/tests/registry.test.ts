import { beforeEach, describe, expect, it } from "vitest";
import { render } from "lit";
import { literal } from "lit/static-html.js";
import { jsx } from "../src/jsx-runtime";
import { assignElements, resetElements } from "../src/core/create-element";

let container: HTMLElement;

beforeEach(() => {
  resetElements();
  container = document.createElement("div");
  document.body.appendChild(container);
  return () => {
    container.remove();
  };
});

describe("element registry overrides", () => {
  it("accepts plain-string tag overrides", () => {
    assignElements({ button: "my-button" });
    render(jsx("button", { children: "go" }) as never, container);
    expect(container.querySelector("my-button")).toBeTruthy();
    expect(container.textContent).toContain("go");
  });

  it("accepts StaticValue (literal) tag overrides", () => {
    assignElements({ button: literal`my-lit-button` });
    render(jsx("button", { children: "go" }) as never, container);
    expect(container.querySelector("my-lit-button")).toBeTruthy();
  });

  it("can override the default fallback tag", () => {
    assignElements({ default: "section" });
    render(jsx("completely-unknown-tag", {}) as never, container);
    expect(container.querySelector("section")).toBeTruthy();
  });

  it("resetElements restores the default mapping", () => {
    assignElements({ button: "my-button" });
    resetElements();
    render(jsx("button", {}) as never, container);
    expect(container.querySelector("button")).toBeTruthy();
    expect(container.querySelector("my-button")).toBeNull();
  });
});
