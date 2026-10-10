import "@/index.css";

import { createRoot } from "react-dom/client";
import { createAntiCopy } from "@yukino.js/anti-copy";

import App from "@/app";

const antiCopy = import.meta.env.PROD
  ? createAntiCopy({
      mode: "replace",
      print: false,
      devtools: true,
      copy: false,
    })
  : null;
antiCopy?.enable();

const app = document.getElementById("app");
if (!app) {
  throw new Error("Missing #app container.");
}

createRoot(app).render(<App />);
