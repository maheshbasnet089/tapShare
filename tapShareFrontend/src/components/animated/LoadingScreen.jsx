import React from "react";

const LoadingScreen = () => {
  return (
    <div className="loadingSvg">
      <div className="loadingCont">
        <img src="/gif/tapshare.gif" alt="loading......" />
        <p className="LoadingInfoText">Sharing made simple with TapShare!</p>
        <div className="loadinText">
          Loading...
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
