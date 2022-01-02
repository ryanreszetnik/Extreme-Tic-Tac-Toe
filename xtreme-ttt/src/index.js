import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Authentication from "./Authentication";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Authentication>
        <App />
      </Authentication>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
