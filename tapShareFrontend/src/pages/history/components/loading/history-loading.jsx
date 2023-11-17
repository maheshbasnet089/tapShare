import React from "react";

const HistoryLoading = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center min-[800px]:h-[87dvh]">
        <h3
          title="tap-share"
          className="flex items-center gap-[.3rem] cursor-pointer"
        >
          <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] p-[2px] rounded-full">
            <div className="flex justify-center bg-[rgba(0,0,0,0.4)] rounded-full">
              <img
                src="/tapShare-194x194.webp"
                className="w-8 backdrop-blur-lg rounded-full"
                alt="TapShare Logo"
              />
            </div>
          </div>
          <p className="text-[1.5rem] text-[#efefef] font-semibold tracking-wide">
            Share
          </p>
        </h3>
      </div>
    </>
  );
};

export default HistoryLoading;
