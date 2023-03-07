import { useState } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { BsHandIndexThumb } from "react-icons/bs";
import AppBar from "./components/app-bar";
import AnimateStyle from "./components/animate-style";
import SendFiles from "./components/send-files";
import ViewFiles from "./components/view-files";
function App() {
  // store calls
  // states
  const [files, setFiles] = useState(null);
  const [names, setNames] = useState([]);
  // handlers
  // handle file click
  const handleFileClick = (e) => {
    const fileList = e.target.files;
    console.log(fileList);
    const fileArray = Array.from(fileList);

    console.log(fileArray);
    // console.log(file);
    // setFiles(inputFiles);
    if (fileList.length > 0) {
      setFiles(fileArray);
    }
    console.log(files);
  };
  React.useEffect(() => {
    if (files) {
      let names = [];
      files.forEach((file) => {
        names.push(file.name);
      });
      setNames(names);
    }
  }, [files]);
  return (
    <div className="relative overflow-hidden">
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
          <div className="absolute to flex items-center flex-col ">
          <ViewFiles files={names} />
            <SendFiles files={files} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
