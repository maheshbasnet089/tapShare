import React from "react";
import { AiOutlineFileWord } from "react-icons/ai";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { BsFiletypePpt } from "react-icons/bs";
import { AiOutlineFileExcel } from "react-icons/ai";
const FileTypeIcon = ({ fileType }) => {
  return (
    <>
      {(fileType === "application/pdf" && (
        <AiOutlineFilePdf className="text-[2.5rem] " />
      )) ||
        (fileType.startsWith("image") && (
          <img
            style={{ height: "43px" }}
            className=" w-full object-cover"
            src={file ? URL.createObjectURL(file) : TapshareLogoGif}
          />
        )) ||
        (fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
          <AiOutlineFileWord className="text-[2.5rem] " />
        )) ||
        (fileType ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" && (
          <BsFiletypePpt className="text-[2.5rem] " />
        )) ||
        (fileType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
          <AiOutlineFileExcel className="text-[2.5rem] " />
        )) || <AiOutlineFileUnknown className="text-[2.5rem] " />}
    </>
  );
};

export default FileTypeIcon;
