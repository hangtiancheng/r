import { Component, type JSX } from "preact";

interface ErrorFallbackProps {
  error: Error;
}

/**
 * Fallback UI for PreactErrorBoundary.
 * Decoupled from i18next so it still renders if the translation bundle fails.
 */
function ErrorFallback({ error }: ErrorFallbackProps): JSX.Element {
  return (
    <div class="flex min-h-dvh items-center justify-center bg-neutral-50 p-6">
      <div class="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-4">
        <h1 class="text-base font-semibold text-neutral-900">Oops!</h1>

        <p class="mt-2 rounded bg-red-50 px-2 py-1.5 font-mono text-xs break-all text-red-500">
          {error.message || "Unknown error"}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          class="mt-3 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:outline-none"
        >
          reload page
        </button>
      </div>
    </div>
  );
}

interface PreactErrorBoundaryProps {
  children: JSX.Element;
}

interface PreactErrorBoundaryState {
  error?: Error;
}

/**
 * Preact Error Boundary that reports caught errors to the Sentry SDK.
 */
export class PreactErrorBoundary extends Component<
  PreactErrorBoundaryProps,
  PreactErrorBoundaryState
> {
  state: PreactErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error): PreactErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("[PreactErrorBoundary]", error);
  }

  render(): JSX.Element {
    if (this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
