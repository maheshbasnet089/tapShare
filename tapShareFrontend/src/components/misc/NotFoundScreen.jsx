import { useNavigate } from "react-router-dom";
export default function NotFoundScreen() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vdh] flex justify-center items-center w-full">
      <div className="flex justify-center min-h-[100dvh] items-center py-12">
        <div className="w-full max-w-[1000px] px-2 sm:px-8 md:px-12 lg:px-20">
          <div className="bg-gray-50 w-full rounded-md mt-10 py-8 px-6">
            <div className="flex justify-center">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-600 select-none font-black">
                404
              </h1>
            </div>
            <div className="flex text-justify select-none">
              <p className="select-none  text-slate-800 font-bold">
                <span className="text-md">
                  {" "}
                  The link you are following is either invalid or unavailable.
                </span>
                <br />
                <span className="text-sm font-medium">
                  Sorry for your inconvience.
                  <br />
                  Keep Tapping !{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    👏
                  </span>
                </span>
              </p>
            </div>
            <div className="flex justify-center pt-5">
              <div className="flex flex-wrap gap-4 sm:gap-8 justify-center">
                <button
                  className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-gray-50 transition-all ease duration-100 w-[161px] active:bg-blue-400 py-2 rounded-md"
                  onClick={(e) => navigate("/")}
                >
                  Share File
                </button>
                <button
                  className="flex items-center gap-1 justify-center text-gray-100 bg-blue-500 w-[161px] hover:bg-blue-600 hover:text-gray-50 transition-all ease duration-100 active:bg-blue-400 rounded-md py-2"
                  onClick={() => navigate("/code")}
                >
                  Share Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
