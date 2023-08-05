import React from "react";

const LoadingScreen = () => {
  return (
    <div className="bg-[rgb(60 72 107 )] h-screen w-screen">
      <div className="Loadingring bg-[#3c486b]">
        Loading
        <div className="loadingAnimation"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
