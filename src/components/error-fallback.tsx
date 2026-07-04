import type { ErrorInfo } from "react";

interface ErrorFallbackProps {
  error: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Fallback for <ReactErrorBoundary>. Decoupled from i18next so it still renders
 * if the translation bundle fails to load. Component stack is dev-only.
 */
export function ErrorFallback({ error, errorInfo }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-4">
        <h1 className="text-base font-semibold text-neutral-900">Oops!</h1>

        <p className="mt-2 rounded bg-red-50 px-2 py-1.5 font-mono text-xs break-all text-red-500">
          {error.message || "Unknown error"}
        </p>

        {import.meta.env.DEV && errorInfo?.componentStack && (
          <pre className="mt-2 max-h-40 overflow-auto rounded bg-neutral-900 p-2 text-[11px] leading-relaxed text-neutral-100">
            {errorInfo.componentStack}
          </pre>
        )}

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-3 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:outline-none"
        >
          Reload page
        </button>
      </div>
    </div>
  );
}
