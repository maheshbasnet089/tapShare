import { MdContentCopy, MdCheck } from "react-icons/md";
import { useState } from "react";
export default function LinkContainer() {
  const [copyStatus, setCopyStatus] = useState({
    isCopied: false,
    text: "Copy",
  });
  const handleCopy = () => {
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
  return (
    <>
      <div className="px-3 py-2">
        <div className="flex">
          <input
            type="text"
            readOnly
            className="px-3 py-3 flex-1 bg-gray-100 focus:outline-none outline-none border-2 border-blue-500 rounded-l-xl border-r-0"
            value="https://oyster-app-2-t6ajw.ondigitalocean.app/u/6294076.png"
          />
          <button
            className="flex justify-center items-center gap-1 bg-blue-500 border-l-0 rounded-l-none rounded-r-xl text-gray-50"
            onClick={handleCopy}
          >
            <span className="hidden sm:block">{copyStatus.text}</span>
            {!copyStatus.isCopied && <MdContentCopy />}
            {copyStatus.isCopied && <MdCheck />}
          </button>
        </div>
      </div>

    </>
  );
}
