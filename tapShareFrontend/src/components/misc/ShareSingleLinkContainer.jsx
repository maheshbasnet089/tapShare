import LinkContainer from "./LinkContainer";
import { MdOutlineQrCode } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRcodeContainer from "./QRcode";
export default function ShareSingleLinkContainer() {
  const navigate = useNavigate();
  const [isQRshown, setShowQR] = useState(false);
  return (
    <>
      <div className="bg-gray-50 rounded-md mt-10 py-8">
        <div className="w-full flex justify-center pb-2">
          <h2>
            To share <b className="font-black">Single</b> file, use
          </h2>
        </div>
        <LinkContainer />
        <div className="flex justify-center pt-5">
          <div className="flex flex-wrap gap-4 sm:gap-8 justify-center">
            <button
              className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-gray-50 transition-all ease duration-100 w-[161px] active:bg-blue-400"
              onClick={(e) => navigate("/")}
            >
              Share Another
            </button>
            <button
              className="flex items-center gap-1 justify-center text-gray-100 bg-blue-500 w-[161px] hover:bg-blue-600 hover:text-gray-50 transition-all ease duration-100 active:bg-blue-400"
              onClick={() => setShowQR(true)}
            >
              Share QR <MdOutlineQrCode />
            </button>
          </div>
        </div>
      </div>
      <QRcodeContainer
        isQRshown={isQRshown}
        setShowQR={setShowQR}
        content="https://tapshare.xyz/6789091"
      />
    </>
  );
}
