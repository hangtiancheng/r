import { beforeEach, describe, expect, it, vi } from "vitest";
import { html, render } from "lit";
import { jsx } from "../src/jsx-runtime";
import { spread } from "../src/directives/spread";

let container: HTMLElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  return () => {
    container.remove();
  };
});

describe("spread directive cleanup", () => {
  it("removes listeners, attributes and properties dropped between renders", () => {
    const first = vi.fn();
    render(
      jsx("div", { id: "same", onClick: first, "data-x": "1" }) as never,
      container,
    );
    const el = container.firstElementChild as HTMLElement;
    el.dispatchEvent(new Event("click"));
    expect(first).toHaveBeenCalledTimes(1);

    render(jsx("div", { id: "same" }) as never, container);
    expect(container.firstElementChild).toBe(el);

    el.dispatchEvent(new Event("click"));
    expect(
      first,
      "stale listener should have been removed",
    ).toHaveBeenCalledTimes(1);
    expect(el.hasAttribute("data-x")).toBe(false);
  });

  it("swaps event handlers when they change between renders", () => {
    const first = vi.fn();
    const second = vi.fn();
    render(jsx("div", { id: "same", onClick: first }) as never, container);
    render(jsx("div", { id: "same", onClick: second }) as never, container);
    (container.firstElementChild as HTMLElement).dispatchEvent(
      new Event("click"),
    );
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledOnce();
  });

  it("treats nullish values as omitted without mutating spread data", () => {
    const view = (data: Record<string, unknown>) =>
      html`<input ${spread(data)} />`;
    const defaultMaxLength = document.createElement("input").maxLength;
    const initial = {
      ".maxLength": undefined,
      "@input": undefined,
      "data-x": undefined,
    };

    render(view(initial), container);
    const input = container.querySelector("input")!;
    expect(input.maxLength).toBe(defaultMaxLength);
    expect(input.hasAttribute("maxlength")).toBe(false);
    expect(input.hasAttribute("data-x")).toBe(false);

    const handler = vi.fn();
    const active = {
      ".maxLength": 5,
      "@input": handler,
      "data-x": "1",
    };
    render(view(active), container);
    input.dispatchEvent(new Event("input"));
    expect(handler).toHaveBeenCalledOnce();
    expect(input.maxLength).toBe(5);
    expect(input.getAttribute("data-x")).toBe("1");

    render(
      view({ ".maxLength": null, "@input": null, "data-x": null }),
      container,
    );
    input.dispatchEvent(new Event("input"));
    expect(handler).toHaveBeenCalledOnce();
    expect(input.maxLength).toBe(5);
    expect(input.hasAttribute("data-x")).toBe(false);
    expect(active).toEqual({
      ".maxLength": 5,
      "@input": handler,
      "data-x": "1",
    });
  });
});
