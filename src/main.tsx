import { render } from "@swifty.js/preact";
import "./index.css";
import "./i18n";
import {
  ScreenRecordPlugin,
  PerformancePlugin,
  ExposurePlugin,
} from "@swifty.js/sentry/plugins";
import { enablePlugin, init } from "@swifty.js/sentry";

import App from "./app";
import { PreactErrorBoundary } from "@swifty.js/sentry/preact";

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
  <PreactErrorBoundary fallback={<div>Error</div>}>
    <App />
  </PreactErrorBoundary>,
  document.getElementById("root")!,
);
