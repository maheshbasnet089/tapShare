import { MdContentCopy, MdCheck } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoOpenOutline } from "react-icons/io5";
export default function LinkContainer({ type, link, id, name }) {
  const navigate = useNavigate();
  const [copyStatus, setCopyStatus] = useState({
    isCopied: false,
    text: "Copy",
  });
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopyStatus({
      isCopied: true,
      text: "Copied",
    });
    setTimeout(() => {
      setCopyStatus({
        isCopied: false,
        text: "Copy",
      });
    }, 2000);
  };
  const handleOpen = () => {
    navigate(`/code/${id}`);
  };
  return (
    <>
      <div className="px-3 py-2">
        <div className="flex">
          <input
            type="text"
            readOnly
            className="px-3 py-3 flex-1 bg-gray-100 focus:outline-none outline-none border-2 border-blue-500 rounded-l-xl border-r-0"
            value={name}
          />
          {type === "copy" && (
            <button
              className="flex justify-center items-center gap-1 bg-blue-500 border-l-0 rounded-l-none rounded-r-xl text-gray-50 hover:bg-blue-600 transition-all duration-200 ease-linear hover:text-white px-4"
              onClick={handleCopy}
            >
              <span className="hidden sm:block">{copyStatus.text}</span>
              {!copyStatus.isCopied && <MdContentCopy className="text-2xl" />}
              {copyStatus.isCopied && <MdCheck className="text-2xl" />}
            </button>
          )}
          {type === "open" && (
            <button
              className="flex justify-center items-center gap-1 bg-blue-500 border-l-0 rounded-l-none rounded-r-xl text-gray-50 hover:bg-blue-600 transition-all duration-200 ease-linear hover:text-white px-4"
              onClick={handleOpen}
            >
              <span className="hidden sm:block">Open</span>
              <IoOpenOutline className="text-2xl" />
            </button>
          )}
          {type === "download" && (
            <a href={link} download className="h-[52px]">
              <button className="flex justify-center items-center gap-1 bg-blue-500 border-l-0 rounded-l-none rounded-r-xl text-gray-50 h-full hover:bg-blue-600 transition-all duration-200 ease-linear hover:text-white px-4">
                <span className="hidden sm:block">Download</span>
                <AiOutlineCloudDownload className="text-2xl" />
              </button>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
