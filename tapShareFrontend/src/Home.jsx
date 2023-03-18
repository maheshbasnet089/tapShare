import { useState } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { BsHandIndexThumb } from "react-icons/bs";
import ViewFiles from "./components/view-files";
import AppBar from "./components/app-bar";
import AnimateStyle from "./components/animate-style";
import SendFiles from "./components/send-files";
import GenerateLink from "./components/generate-link";
import Toaster from "./components/toaster";
function Home() {
  // states
  const [files, setFiles] = useState(null);
  const [toasterData, setToasterData] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  // Close Toaster
  const getToasterValue = (value) => {
    setToasterData({
      open: value,
      message: null,
      color: undefined,
    });
  };
  // handlers
  // handle file click
  const handleFileClick = (e) => {
    const fileList = e.target.files;
    const fileArray = Array.from(fileList);
    if (fileList.length > 0) {
      setFiles(fileArray);
    }
  };
  return (
    <div className="relative overflow-hidden">
      <Toaster data={toasterData} close={getToasterValue} />
      {/* its the app bar section that contains logo at the top of the page */}
      <AppBar />
      {/* app bar ends here */}
      {/* this section primarily exists for aesthetic purpose */}
      {/* select at least one file to see the animation */}
      <AnimateStyle files={files} />
      {/* This section contains the input field that accepts file/files */}
      {/* select at least one file, to make the below section appear */}
      <div
        title="Click to send file"
        className="h-[4em] w-[4em] bg-[rgba(0,0,0,.5)] rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-[rgba(0,0,0,0.4)] absolute upload"
      >
        <IconButton
          aria-label="upload file"
          component="label"
          className="w-full h-full"
        >
          <input
            hidden
            accept="*"
            type="file"
            multiple="multiple"
            onChange={handleFileClick}
          />
          <BsHandIndexThumb
            className={`text-[1.5rem] text-[#efefef] ${
              files && files.length > 0 && "pointer"
            }`}
          />
        </IconButton>
        {/* this will show the progress of send -> its not functional at the moment*/}
        {/* <p className="text-[#efefef] text-[.6rem] absolute top-[75%]">89%</p> */}
      </div>
      {/* this section takes input to whom file should be send */}
      {/* it is hidden by default, it appears as soon as one selects a file */}
      {files && files.length > 0 && (
        <>
          <div className="absolute to flex items-center flex-col">
            <ViewFiles files={files} setFiles={setFiles} />
            <SendFiles files={files} setToasterData={setToasterData} />
            <GenerateLink files={files} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
