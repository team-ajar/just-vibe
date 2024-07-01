import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import justVibeIcon from './justVibeIcon.png';

const container = (document as Document).getElementById("root") as HTMLInputElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const link = document.createElement('link');
link.type = 'image/png';
link.rel = 'icon';
link.href = justVibeIcon;
document.head.appendChild(link);
