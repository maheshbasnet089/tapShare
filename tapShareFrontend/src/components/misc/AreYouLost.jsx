import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AreYouLost = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vdh] flex justify-center items-center w-full">
      <div className="flex justify-center min-h-[100dvh] items-center py-12">
        <div className="w-full max-w-[1000px] px-2 sm:px-8 md:px-12 lg:px-20">
          <div className="bg-gray-50 w-full rounded-md mt-10 pt-8 pb-4 px-6">
            <div className="flex justify-center">
              <h1 className="text-4xl sm:text-4xl text-center md:text-5xl lg:text-6xl text-slate-600 select-none font-black">
                Are You Lost?
              </h1>
            </div>
            <div className="flex text-justify select-none">
              <div className="select-none  text-slate-800 font-bold">
                <p className="text-md mt-5 ">
                  {" "}
                  Oops! Looks like you've encountered an infinite loop in the
                  digital jungle. Let's navigate back to civilization!
                </p>

                <p className="text-sm font-medium mt-2">
                  404 not found, but we've got backup plans! Check out these
                  safe havens
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-5">
              <div className="flex flex-wrap gap-4 sm:gap-8 justify-center">
                <button
                  className="text-blue-500 border-2 flex items-center justify-center gap-2 border-blue-500 hover:bg-blue-500 hover:text-gray-50 transition-all ease duration-100 w-[161px] active:bg-blue-400 py-2 rounded-md"
                  onClick={(e) => navigate(-1)}
                >
                  <MdOutlineArrowBack />
                  Back to Safety
                </button>
                <button
                  className="flex items-center  gap-2 justify-center text-gray-100 bg-blue-500 w-52 hover:bg-blue-600 hover:text-gray-50 transition-all ease duration-100 active:bg-blue-400 rounded-md py-2"
                  onClick={() => navigate("/")}
                >
                  <AiOutlineHome />  Let's Keep Tapping  👏
                </button>
              </div>
            </div>
            <p className="text-[10px] text-end font-medium pt-4">
              Sorry, we can't find that page!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreYouLost;
