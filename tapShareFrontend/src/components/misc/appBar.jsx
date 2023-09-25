import React from "react";

const AppBar = () => {
  return (
    <nav className="fixed w-full">
      <div className="flex justify-center select-none w-full items-center p-[1em] relative">
        <a href="https://tapshare.xyz" title="TapShare" className="flex items-center gap-[.3rem] cursor-pointer" target="_blank">
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
        </a>
        <div className="absolute top-0 right-0 m-[1rem] flex items-center" title="About">
          <a
            href="https://github.com/maheshbasnet089/tapShare"
            className="text-[#efefef] text-sm hover:underline relative"
            style={{
              textDecoration: "none",
              display: "inline-block",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: "2px solid #efefef",
              textAlign: "center",
              lineHeight: "24px",
            }}
            target="_blank"
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // Center the content horizontally and vertically
              }}
            >
              &#63; {/* Unicode character for question mark */}
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
