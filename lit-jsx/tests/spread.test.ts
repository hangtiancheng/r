import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "lit";
import { jsx } from "../src/jsx-runtime";

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
});
