import "antd/dist/reset.css";
import { createRoot } from "react-dom/client";
import { App } from "@/pages";
import "@/assets";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("root element #root not found.");
}

createRoot(rootElement).render(<App />);
