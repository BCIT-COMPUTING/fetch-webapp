import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./components/Router";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./store/appContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
