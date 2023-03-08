import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import SeeFiles from "./SeeFiles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <StyledEngineProvider injectFirst> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path=":id" element={<SeeFiles />} />
      </Routes>
    </BrowserRouter>
    {/* </StyledEngineProvider> */}
  </React.StrictMode>
);
