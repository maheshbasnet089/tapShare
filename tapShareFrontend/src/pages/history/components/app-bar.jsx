import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const HistoryAppBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="fixed w-full bg-[#3c486b] z-10 text-[#efefef]">
        <div className="flex justify-between select-none w-full items-center px-[1em] py-2">
          <p
            title="back"
            className="border py-[.4rem] rounded-sm cursor-pointer select-none px-3 group 
             transition-[translate] duration-500 delay-150"
            onClick={() => {
              window.history.back();
            }}
          >
            <MdOutlineKeyboardBackspace className="text-[1.2rem] group-hover:-translate-x-1" />
          </p>
          <div
            title="TapShare"
            className="flex items-center gap-[.3rem] cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
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
          </div>
          <div className="m-[1rem] flex flex-col justify-center items-center gap-2">
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
              title="About"
            >
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)", // Center the content horizontally and vertically
                }}
              >
                &#63; {/* Unicode character for question mark */}
              </span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HistoryAppBar;
