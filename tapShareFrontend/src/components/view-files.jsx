import React, { useState, useEffect, useCallback } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineFileWord } from "react-icons/ai";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileImage } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { BsFileEarmarkMusic } from "react-icons/bs";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { BsFiletypePpt } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";
import { useStore } from "../utility/store";

const ViewFiles = () => {
  // store calls
  const files = useStore((state) => state.files);
  const setFiles = useStore((state) => state.setFiles);
  // states
  const [showFiles, setShowFiles] = useState([]);
  // handlers
  const removeClick = async (fileName) => {
    let result = files.filter((file) => {
      return file.name !== fileName;
    });
    await setShowFiles(result);
    await setFiles(result);
  };

  useEffect(() => {
    setShowFiles(files);
  }, [files]);
  return (
    <>
      <div className="flex gap-x-[.75em] overflow-y-scroll max-w-[23em] sm:max-w-[35em] items-center">
        {/* displays the selected files -> if there are many files then ihe div turn to scrollable  horizontally */}
        {showFiles?.length > 0 &&
          showFiles.map((file, index) => {
            return (
              <div
                key={index}
                className={`text-[#efefef] flex flex-col justify-between min-w-[6.5em] items-center gap-x-1 border rounded-sm p-1 backdrop-blur-md`}
              >
                {/* checks the file types and shows icons accordingly. unknown file type is also present here */}
                {(file.type === "application/pdf" && (
                  <AiOutlineFilePdf className="text-[2.5rem] " />
                )) ||
                  (file.type.startsWith("image") && (
                    <AiOutlineFileImage className="text-[2.5rem] " />
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
                  <MdOutlineCancel
                    title={`remove ${file.name.toString().substring(0, 5)}...`}
                    className="text-[1.4rem] text-[#f65a69] cursor-pointer"
                    onClick={() => removeClick(file.name)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ViewFiles;
