import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

import App from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

// Hot Module Replacement (HMR)
if (undefined /*[snowpack] import.met.hot */) {
  undefined /*[snowpack] import.meta.hot */
    .accept();
}
