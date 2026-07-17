/** @jsxImportSource react */
import { createRoot } from "react-dom/client";
import AppReact from "./app-react";

/**
 * Mounts the React application (Lit Web Components via @lit/react)
 * into the given container element.
 */
export function mountReactApp(container: HTMLElement): void {
  createRoot(container).render(<AppReact />);
}
