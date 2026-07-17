import AppPreact from "@/app-preact";
import { PreactErrorBoundary } from "@swifty.js/sentry/preact";
import { PreactErrorBoundaryFallback } from "./fallback";
import { render } from "@swifty.js/preact";

/**
 * Mounts the React application (Lit Web Components via @lit/react)
 * into the given container element.
 */
export function mountPreact(preactRoot: HTMLElement): void {
  // Preact tree (English mode).
  render(
    <PreactErrorBoundary fallback={PreactErrorBoundaryFallback}>
      <AppPreact />
    </PreactErrorBoundary>,
    preactRoot,
  );
}
