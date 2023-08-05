import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/animated/LoadingScreen";
const Home = React.lazy(() => import("./pages/Home"));
const AddCode = React.lazy(() => import("./pages/addCode"));
const ViewCode = React.lazy(() => import("./pages/viewCode"));
const SeeShared = React.lazy(() => import("./pages/ViewShared"));
import { registerSW } from "virtual:pwa-register";
import AreYouLost from "./components/misc/AreYouLost";

const App = () => {
  registerSW();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/code"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <AddCode />
            </Suspense>
          }
        />
        <Route
          path="/code/:id"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <ViewCode />
            </Suspense>
          }
        />
        <Route
          path="/:id"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <SeeShared />
            </Suspense>
          }
        />

        <Route path="*" element={<AreYouLost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
