import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SeeFiles from "./SeeFiles";
import AddCode from "./components/addCode";
import ViewCode from "./components/ViewCode";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<AddCode />} />
          <Route path="/code/:id" element={<ViewCode />} />

          <Route path="/:id" element={<SeeFiles />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
