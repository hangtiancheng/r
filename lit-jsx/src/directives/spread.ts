import { nothing } from "lit/html.js";
import { directive, AsyncDirective } from "lit/async-directive.js";
import type { AttributePart } from "lit";

type EventListenerWithOptions = EventListenerOrEventListenerObject &
  Partial<AddEventListenerOptions>;

class SpreadDirective extends AsyncDirective {
  host!: EventTarget;
  element!: Element;
  prevData: { [key: string]: unknown } = {};

  render(spreadData: { [key: string]: unknown }) {
    void spreadData;
    return nothing;
  }

  // Each update, apply the props and remove/clean up stale ones.
  // This directive only ever sits in an attribute position, so the part is
  // always an AttributePart.
  update(part: AttributePart, [spreadData]: Parameters<this["render"]>) {
    if (this.element !== part.element) {
      this.element = part.element;
    }
    this.host = (part.options?.host as EventTarget | undefined) || this.element;
    this.apply(spreadData);
    this.groom(spreadData);
    this.prevData = spreadData;
  }

  // Apply props.
  apply(data: { [key: string]: unknown }) {
    if (!data) return;
    const { prevData, element } = this;
    for (const key in data) {
      const value = data[key];
      if (value === prevData[key]) {
        continue;
      }
      const name = key.slice(1);
      switch (key[0]) {
        case "@": {
          const prevHandler = prevData[key];
          if (prevHandler) {
            element.removeEventListener(
              name,
              this,
              prevHandler as EventListenerWithOptions,
            );
          }
          element.addEventListener(
            name,
            this,
            value as EventListenerWithOptions,
          );
          break;
        }
        case ".": // property
          (element as unknown as Record<string, unknown>)[name] = value;
          break;
        case "?": // boolean attribute
          if (value) {
            element.setAttribute(name, "");
          } else {
            element.removeAttribute(name);
          }
          break;
        default: // standard attribute
          if (value != null) {
            element.setAttribute(key, String(value));
          } else {
            element.removeAttribute(key);
          }
          break;
      }
    }
  }

  // Clean up any removed props.
  groom(data: { [key: string]: unknown }) {
    const { prevData, element } = this;
    if (!prevData) return;
    for (const key in prevData) {
      // ***********************
      // Change
      const removed =
        !data ||
        !(key in data) ||
        data[key] === undefined ||
        data[key] === null;
      // ***********************
      if (removed) {
        switch (key[0]) {
          case "@": {
            const value = prevData[key];
            element.removeEventListener(
              key.slice(1),
              this,
              value as EventListenerWithOptions,
            );
            break;
          }
          case ".": // property
            (element as unknown as Record<string, unknown>)[key.slice(1)] =
              undefined;
            break;
          case "?": // boolean attribute
            element.removeAttribute(key.slice(1));
            break;
          default: // standard attribute
            element.removeAttribute(key);
            break;
        }
      }
      // ***********************
      // Change
      if (key in data) {
        // Stop tracking the key so that we don't keep handling its removal.
        delete this.prevData[key];
      }
      // ***********************
    }
  }

  handleEvent(event: Event) {
    const value = this.prevData[`@${event.type}`] as EventListenerWithOptions;
    if (typeof value === "function") {
      value.call(this.host, event);
    } else {
      value.handleEvent(event);
    }
  }

  disconnected() {
    const { prevData, element } = this;
    for (const key in prevData) {
      if (key[0] !== "@") continue;
      // event listener
      const value = prevData[key];
      element.removeEventListener(
        key.slice(1),
        this,
        value as EventListenerWithOptions,
      );
    }
  }

  reconnected() {
    const { prevData, element } = this;
    for (const key in prevData) {
      if (key[0] !== "@") continue;
      // event listener
      const value = prevData[key];
      element.addEventListener(
        key.slice(1),
        this,
        value as EventListenerWithOptions,
      );
    }
  }
}

export const spread = directive(SpreadDirective);
