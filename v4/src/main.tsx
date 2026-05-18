import "antd/dist/reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoot } from "@/components";
import "@/assets";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("root element #root not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);
