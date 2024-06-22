import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

const container = (document as Document).getElementById(
  "root"
) as HTMLInputElement;

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);