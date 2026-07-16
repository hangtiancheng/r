import { render } from "preact";
import "./index.css";
import "./i18n";
import {
  ScreenRecordPlugin,
  PerformancePlugin,
  ExposurePlugin,
} from "@swifty.js/sentry/plugins";
import { enablePlugin, init } from "@swifty.js/sentry";

import App from "./app";
import { PreactErrorBoundary } from "./components/error-boundary";

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

render(
  <PreactErrorBoundary>
    <App />
  </PreactErrorBoundary>,
  document.getElementById("root")!,
);
