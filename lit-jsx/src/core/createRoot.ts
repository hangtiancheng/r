import type { RootElement } from "../types";

export class Root {
  _container?: RootElement;
  _elements: HTMLElement[] = [];

  static _roots = new Map<RootElement, Root>();

  constructor(container: RootElement) {
    this._container = container;
    Root._roots.set(container, this);
  }

  render(element: HTMLElement) {
    // Keep track of all elements rendered directly on the root.
    this._elements.push(element);
    this._container?.appendChild(element);
    return element;
  }

  unmount() {
    // Remove all elements rendered on the root.
    this._elements.forEach((element) => element.remove());
    if (this._container) {
      Root._roots.delete(this._container);
    }
    // Clear the references to the elements and container.
    this._elements.length = 0;
    this._container = undefined;
  }
}

export function createRoot(container: RootElement) {
  const existingRoot = Root._roots.get(container);
  if (existingRoot) {
    console.warn(`
            Warning: You are calling createRoot() on a container that has already been passed to createRoot() before.
            Call root.render() on the existing root instead if you want to update it.
        `);
    return existingRoot;
  }
  return new Root(container);
}
