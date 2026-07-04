import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import {
  ScreenRecordPlugin,
  PerformancePlugin,
  ExposurePlugin,
} from "@swifty.js/sentry/plugins";
import { enablePlugin, init } from "@swifty.js/sentry";
import { ReactErrorBoundary } from "@swifty.js/sentry/react";

import type { ErrorInfo } from "react";
import App from "./app";
import { ErrorFallback } from "./components/error-fallback";

init({
  dsn: "/sentry",
  debug: true,
  beforePushEventList(eventList) {
    if (!import.meta.env.DEV) {
      console.log("@swifty.js/sentry App:", eventList);
      return false;
    }
    return eventList;
  },
});

enablePlugin(new ScreenRecordPlugin());
enablePlugin(new ExposurePlugin());
enablePlugin(new PerformancePlugin());

const fallback = (error: Error, errorInfo?: ErrorInfo) => (
  <ErrorFallback error={error} errorInfo={errorInfo} />
);

createRoot(document.getElementById("root")!).render(
  <ReactErrorBoundary fallback={fallback}>
    <App />
  </ReactErrorBoundary>,
);
