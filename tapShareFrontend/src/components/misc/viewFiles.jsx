import { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineFileWord, AiOutlineFolder } from "react-icons/ai";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { BsFiletypePpt } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";
import { useStore } from "../../utility/store";
import TapshareLogoGif from "../../assets/tapshare.gif";
import { Tooltip } from "@mui/material";
import DynamicIcon, { iconMap } from "../DynamicFileTypeIcon";
const ViewFiles = () => {
  // store calls
  const files = useStore((state) => state.files);
  const loading = useStore((state) => state.loading);
  const removeFileByName = useStore((state) => state.removeFileByName);
  // states
  const [showFiles, setShowFiles] = useState([]);
  // handlers
  const removeClick = async (fileName) => {
    const filteredFiles = files.filter((file) => file.name !== fileName);
    setShowFiles(filteredFiles);
    await removeFileByName(fileName);
  };

  useEffect(() => {
    setShowFiles(files);
  }, [files]);
  const progress = useStore((state) => state.progress);
  const progressBarWidth = loading && progress ? `${progress}%` : "0%";
  // console.log(typeof progress);
  const iconStyle = "animate-[scale_300ms] text-[2.5rem]"
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
            showFiles.map((file) => {
              // console.log(["file", file.type, file.name, file.name.split(".")[1]])
              // console.log("iconMap /", iconMap[file.type.split("/")[1]])
              // console.log("iconMap .", iconMap[file.name.split(".")[1]])
              return (
                <Tooltip placement="top" key={file.name} title={file.name}  arrow>
                  <div
                    className={`text-[#efefef] relative mb-2 snap-start flex flex-col animate-[scale_200ms] justify-between min-w-[6.5em] items-center gap-x-1 border rounded-sm p-1 backdrop-blur-md`}
                  >
                    {/* checks the file types and shows icons accordingly. unknown file type is also present here */}
                    {
                      (file.type.startsWith("image") ? (
                        <img
                          style={{ height: "43px" }}
                          className=" w-full object-cover"
                          src={
                            file ? URL.createObjectURL(file) : TapshareLogoGif
                          }
                        />
                      ) :
                        file.type ===
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                          <AiOutlineFileWord className={iconStyle} />
                        ) :
                          file.type ===
                            "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                            <BsFiletypePpt className={iconStyle} />
                          ) :
                            file.type ===
                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                              <AiOutlineFileExcel className={iconStyle} />
                            ) :
                              iconMap[file?.name.split(".").pop().toLowerCase()] ? <div className={iconStyle}>
                                <DynamicIcon name={file?.name} />
                              </div> :
                                file?.type === "" ? (
                                  <AiOutlineFolder className={iconStyle} />
                                ) :
                                  <AiOutlineFileUnknown className={iconStyle} />
                      )}
                    <div className="flex gap-x-1">
                      <p className="">{`${file.name
                        .toString()
                        .substring(0, 5)}...`}</p>
                      {/* change '5' to higher, to show more characters in tha name of the file */}
                      {!loading && (
                        <MdOutlineCancel
                          className="text-[1.4rem] absolute top-1 right-1 text-red-400/75 hover:text-red-500 active:text-red-400 cursor-pointer transition ease-in duration-150"
                          onClick={() => removeClick(file.name)}
                        />
                      )}
                    </div>
                  </div>
                </Tooltip>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ViewFiles;
