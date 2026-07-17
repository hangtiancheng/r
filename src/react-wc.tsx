/** @jsxImportSource react */
import { createRoot } from "react-dom/client";
import AppReactWC from "./app-react-wc";
import { ReactErrorBoundary } from "@swifty.js/sentry/react";
/** @jsxImportSource react */
import { ReactErrorBoundaryFallback } from "./fallback";

/**
 * Mounts the React application (Lit Web Components via @lit/react)
 * into the given container element.
 */
export function mountReactWC(reactRoot: HTMLElement): void {
  const root = createRoot(reactRoot);
  root.render(
    <ReactErrorBoundary fallback={ReactErrorBoundaryFallback}>
      <AppReactWC />
    </ReactErrorBoundary>,
  );
}
