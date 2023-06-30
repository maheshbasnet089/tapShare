import React from "react";
import { BsHandIndexThumb } from "react-icons/bs";

const AppBar = () => {
  return (
    <nav className="fixed w-full" title="TapShare">
      <div className="flex justify-center select-none w-full items-center p-[1em]">
        <div
          className="flex items-center justify-center gap-[.1rem] cursor-pointer"
          title="TapShare"
        >
          <div className="flex justify-center items-center  bg-[rgba(0,0,0,0.2)] p-[2px] rounded-full">
            <div className="flex justify-center bg-[rgba(0,0,0,0.4)] rounded-full">
              {/* <BsHandIndexThumb className="text-[2rem] text-[#efefef] rounded-full bg-[rgba(0,0,0,.5)] p-[6px] m-[2px] pr-2" /> */}
              <img
                src="/tapShare.png"
                className="w-8 backdrop-blur-lg rounded-full"
                alt="tapshare"
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
