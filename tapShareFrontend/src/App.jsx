import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SeeFiles from "./SeeFiles";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<SeeFiles />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;