import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { StoreProvider } from "./redux";
import Sandbox from "./Sandbox";

import "./sass/index.scss";

const sandbox = true;

render(
  <Router>
    <StoreProvider>{sandbox ? <Sandbox /> : <App />}</StoreProvider>
  </Router>,
  document.getElementById("layout")
);
