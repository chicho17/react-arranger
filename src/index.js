import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "theme-ui";
import { funk } from "@theme-ui/presets";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={funk}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
);
