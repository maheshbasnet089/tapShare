import LinkContainer from "./LinkContainer";
import { MdOutlineQrCode } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRcodeContainer from "./QRcode";
import { useParams } from "react-router-dom";
import { useStore } from "../../utility/store";
export default function ShareSingleLinkContainer({ files }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const setFiles = useStore((state) => state.setFiles);

  const [isQRshown, setShowQR] = useState(false);
  return (
    <>
      <div className="bg-gray-50 rounded-md mt-10 py-8">
        <div className="w-full flex justify-center pb-2">
          <h2 className="select-none">
            To share <b className="font-black">Single</b>{" "}
            {id.startsWith("f") ? "code" : "file"}, use individual link
          </h2>
        </div>
        {files.map((file) => {
          return (
            <LinkContainer
              key={file._id}
              type={"copy"}
              link={
                file.path ? file.path : `https://tapshare.xyz/code/${file._id}`
              }
              id={file._id ? file._id : file.path}
              name={
                file.path ? file.path : `https://tapshare.xyz/code/${file._id}`
              }
            />
          );
        })}
        <div className="flex justify-center pt-5">
          <div className="flex flex-wrap gap-4 sm:gap-8 justify-center">
            <button
              className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-gray-50 transition-all ease duration-100 w-[161px] active:bg-blue-400 py-2 rounded-md"
              onClick={() => {
                navigate("/"), setFiles([]);
              }}
            >
              Share Another
            </button>
            <button
              className="flex items-center gap-1 justify-center text-gray-100 bg-blue-500 w-[161px] hover:bg-blue-600 hover:text-gray-50 transition-all ease duration-100 active:bg-blue-400 py-2 rounded-md"
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
        content={"https://tapshare.xyz/" + id}
      />
    </>
  );
}
