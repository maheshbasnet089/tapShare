import React from "react";

const AppBar = () => {
  return (
    <nav className="fixed w-full" title="TapShare">
      <div className="flex justify-center select-none w-full items-center p-[1em]">
        <div
          className="flex items-center justify-center gap-[.3rem] cursor-pointer"
          title="TapShare"
        >
          <div className="flex justify-center items-center  bg-[rgba(0,0,0,0.2)] p-[2px] rounded-full">
            <div className="flex justify-center  bg-[rgba(0,0,0,0.4)] rounded-full">
              <img
                src="/tapShare-194x194.webp"
                className="w-8 backdrop-blur-lg rounded-full"
              />
            </div>
          </div>
          <p className="text-[1.5rem] text-[#efefef] font-semibold tracking-wide">
            Share
          </p>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
