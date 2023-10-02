import { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineFileWord } from "react-icons/ai";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { BsFiletypePpt } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";
import { useStore } from "../../utility/store";
import TapshareLogoGif from "../../assets/tapshare.gif";
const ViewFiles = () => {
  // store calls
  const files = useStore((state) => state.files);
  const loading = useStore((state) => state.loading);
  const setFiles = useStore((state) => state.setFiles);
  // states
  const [showFiles, setShowFiles] = useState([]);
  // handlers
  const removeClick = async (fileName) => {
    let result = files.filter((file) => {
      return file.name !== fileName;
    });
    setShowFiles(result);
    await setFiles(result);
  };

  useEffect(() => {
    setShowFiles(files);
  }, [files]);
  const progress = useStore((state) => state.progress);
  const progressBarWidth = loading && progress ? `${progress}%` : "0%";
  // console.log(typeof progress);
  return (
    <>
      <div className="relative overflow-hidden">
        {loading && progress !== 0 && (
          <div
            className="absolute top-0 left-0 w-0 h-[82%] z-10 bg-[#51f63b80] transition-[width 0.3s]"
            style={{ width: progressBarWidth }}
          />
        )}
        <div
          className={`custom-scroolbar flex gap-x-[.75em] snap-x snap-mandatory overflow-x-scroll max-w-[23em] sm:max-w-[35em] items-center`}
        >
          {/* displays the selected files -> if there are many files then ihe div turn to scrollable  horizontally */}
          {showFiles?.length > 0 &&
            showFiles.map((file, index) => {
              return (
                <div
                  key={index}
                  className={`text-[#efefef] mb-2 snap-start flex flex-col justify-between min-w-[6.5em] items-center gap-x-1 border rounded-sm p-1 backdrop-blur-md`}
                >
                  {/* checks the file types and shows icons accordingly. unknown file type is also present here */}
                  {(file.type === "application/pdf" && (
                    <AiOutlineFilePdf className="text-[2.5rem] " />
                  )) ||
                    (file.type.startsWith("image") && (
                      <img
                        style={{ height: "43px" }}
                        className=" w-full object-cover"
                        src={file ? URL.createObjectURL(file) : TapshareLogoGif}
                      />
                    )) ||
                    (file.type ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                      <AiOutlineFileWord className="text-[2.5rem] " />
                    )) ||
                    (file.type ===
                      "application/vnd.openxmlformats-officedocument.presentationml.presentation" && (
                      <BsFiletypePpt className="text-[2.5rem] " />
                    )) ||
                    (file.type ===
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                      <AiOutlineFileExcel className="text-[2.5rem] " />
                    )) || <AiOutlineFileUnknown className="text-[2.5rem] " />}
                  <div className="flex gap-x-1">
                    <p className="">{`${file.name
                      .toString()
                      .substring(0, 5)}...`}</p>
                    {/* change '5' to higher, to show more characters in tha name of the file */}
                    {!loading && (
                      <MdOutlineCancel
                        title={`remove ${file.name
                          .toString()
                          .substring(0, 5)}...`}
                        className="text-[1.4rem] text-red-400 hover:text-red-500 active:text-red-400 cursor-pointer transition ease-in duration-150"
                        onClick={() => removeClick(file.name)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ViewFiles;
