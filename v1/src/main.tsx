import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error('root element "#root" not found.');
}

createRoot(rootElement).render(<App />);
