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
  const [isLoading, setIsLoading] = useState(false);

  const allFileDownloadHandler = async () => {
    try {
      setIsLoading(true);
      let urlForAllFiles = `${import.meta.env.VITE_BASE_URL}u/multiple?`;

      files.forEach((url, index) => {
        console.log(url);
        const splitedUrl = url.path.split("/");
        const fileName = splitedUrl[splitedUrl.length - 1];
        urlForAllFiles += `file${index}=${fileName}&`;
      });
      const response = await fetch(urlForAllFiles);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "files.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
              disabled={isLoading}
              onClick={allFileDownloadHandler}
              className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-gray-50 transition-all ease duration-100 w-[161px] active:bg-blue-400 py-2 rounded-md"
            >
              {isLoading ? "processing..." : "Download All"}
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
