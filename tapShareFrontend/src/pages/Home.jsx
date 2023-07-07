import { useState } from "react";
import AppBar from "../components/misc/appBar";
import Toaster from "../components/animated/toaster";
import { useStore } from "../utility/store";
import DeleteUserId from "../components/buttons/deleteUserId";
import ShareTextButtonHome from "../components/buttons/shareTextButtonHome";
import AnimateStyle from "../components/animated/animateStyle";
import SearchCode from "../components/inputFields/searchCode";
import HomePageFilesOptions from "../components/misc/homePageFilesOptions";
import FilesInput from "../components/inputFields/filesInput";
function Home() {
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

      {/** Component to select files */}
      <FilesInput />

      {/* it is hidden by default, it appears as soon as one selects a file */}
      {files && files.length > 0 && (
        <HomePageFilesOptions setToasterData={setToasterData} />
      )}
    </div>
  );
}

export default Home;
