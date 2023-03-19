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

const ViewFiles = ({ files, setFiles }) => {
  // states
  const [coords, setCoords] = useState([]);
  // function that generates random numbers, x amd y, repeat files.length
  //   const random = () => {
  //     return [parseInt(Math.random() * 100), parseInt(Math.random() * 100)];
  //   };
  //   const position = useCallback(async () => {
  //     for (let i = 0; i < files.length; i++) {
  //       setCoords([...coords, random()]);
  //     }
  //     console.log("🚀 ~ file: view-files.jsx:13 ~ position ~ random:", random);
  //     console.log("🚀 ~ file: view-files.jsx:14 ~ position ~ coords:", coords);
  //   });

  // handlers
  const removeClick = async (index) => {
    // if (files && files.length > 0) files.splice(index, 1);
    // await setFiles(files);
    // console.log("🚀 ~ file: view-files.jsx:33 ~ removeClick ~ files:", files);
  };

  return (
    <>
      <div className="flex gap-x-[.75em] overflow-y-scroll max-w-[23em] sm:max-w-[35em] items-center">
        {/* displays the selected files -> if there are many files then ihe div turn to scrollable  horizontally*/}
        {files.length > 0
          ? files.map((file, index) => {
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
                      className="text-[1.4rem] text-[#f65a69] cursor-pointer"
                      onClick={() => removeClick(index)}
                    />
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default ViewFiles;
