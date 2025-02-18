import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Path from "./Router/Path";
import { Provider } from "react-redux";
import store from "../redux/store";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Path />
    </Provider>
  </StrictMode>
);
