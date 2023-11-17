import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import LoadingScreen from "./components/animated/LoadingScreen";

const Home = React.lazy(() => import("./pages/Home"));
const AddCode = React.lazy(() => import("./pages/addCode"));
const ViewCode = React.lazy(() => import("./pages/viewCode"));
const SeeShared = React.lazy(() => import("./pages/ViewShared"));
const History = React.lazy(() => import("./pages/history/history"));
const AreYouLost = React.lazy(() => import("./components/misc/AreYouLost"));
//test
const App = () => {
  registerSW();
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<AddCode />} />
          <Route path="/code/:id" element={<ViewCode />} />
          <Route path="/:id" element={<SeeShared />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<AreYouLost />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
//test