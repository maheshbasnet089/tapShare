import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddCode from "./pages/addCode";
import ViewCode from "./pages/viewCode";
import SeeShared from "./pages/ViewShared";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<AddCode />} />
          <Route path="/code/:id" element={<ViewCode />} />
          <Route path="/:id" element={<SeeShared />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
