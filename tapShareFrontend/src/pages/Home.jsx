import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ViewFiles from "../components/viewFiles";
import AppBar from "../components/misc/appBar";
import ReceiverEmailInputField from "../components/inputFields/receiverEmailInputField";
import UploadFiles from "../components/buttons/uploadFiles";
import Toaster from "../components/animated/toaster";
import { useStore } from "../utility/store";
import { useNavigate } from "react-router-dom";
import DeleteUserId from "../components/buttons/deleteUserId";
import ShareTextButtonHome from "../components/buttons/shareTextButtonHome";
import AnimateStyle from "../components/animated/animateStyle";
import SearchCode from "../components/inputFields/searchCode";

function Home() {
  const progress = useStore((state) => state.progress);
  const loading = useStore((state) => state.loading);
  const files = useStore((state) => state.files);
  const setFiles = useStore((state) => state.setFiles);

  const [toasterData, setToasterData] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const closeToaster = (value) => {
    setToasterData({
      open: value,
      message: null,
      severity: undefined,
    });
  };

  const handleFileInput = (e) => {
    const fileList = e.target.files;
    const fileArray = Array.from(fileList);
    if (fileList.length > 0) {
      setFiles(fileArray);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileArray = Array.from(event.dataTransfer.files);
    if (fileArray.length > 0) {
      setFiles(fileArray);
    }
  };
  return (
    <div
      className="relative overflow-hidden"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{ maxHeight: "100vh" }}
    >
      {/* This components contain fire button which delete the session */}
      <DeleteUserId />

      {/** This components shows error when something went wrong */}
      <Toaster data={toasterData} close={closeToaster} />

      {/* This is the app bar section that contains logo at the top of the page */}
      <AppBar />

      {/** Component to search code  */}
      <SearchCode />

      {/* When no file is selected ShareText Button is to be shown in Home Page */}
      {files?.length == 0 && <ShareTextButtonHome />}

      {/* This is the cool ring type animation which is shown when any file is selected */}
      <AnimateStyle files={files} />

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
            onChange={handleFileInput}
          />

          <img
            src="/tapShare.png"
            className={`text-[1.5rem] text-[#efefef] ${
              files && files.length > 0 && "pointer"
            }`}
          />
        </IconButton>

        {/* this will show the progress of send -> its not functional at the moment*/}
        <p className="text-[#efefef] text-[.6rem] absolute top-[75%]">
          {loading && progress && `${progress}%`}
        </p>
      </div>
      {/* this section takes input to whom file should be send */}
      {/* it is hidden by default, it appears as soon as one selects a file */}
      {files && files.length > 0 && (
        <>
          <div className="absolute to flex flex-col w-full">
            {/* shows the selected files, also allow to remove files (if wanted) */}
            <div className="flex justify-center">
              <ViewFiles />
            </div>
            {/* this section contains the input field that accepts email */}
            <ReceiverEmailInputField />
            {/* this section generates links or send email*/}
            <div className="flex justify-center">
              <UploadFiles setToasterData={setToasterData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
