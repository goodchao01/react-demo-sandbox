import { StrictMode } from "react";
import ReactDOM from "react-dom";

import RouterConfig from "./router";

import './style/index.scss'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <RouterConfig />
  </StrictMode>,
  rootElement
);
