import { useState } from "react";
import {IconButton} from "@mui/material/";
import ViewFiles from "./components/viewFiles";
import AppBar from "./components/appBar";
import ReceiverEmailInputField from "./components/receiverEmailInputField";
import UploadFiles from "./components/uploadFiles";
import Toaster from "./components/toaster";
import { useStore } from "./utility/store";
import {Button} from "@mui/material/";
import {Modal} from "@mui/material/";
import {Box} from "@mui/material";
import {Typography} from "@mui/material/";
import {TextField} from "@mui/material/";
import { useNavigate } from "react-router-dom";
import DeleteUserId from "./components/deleteUserId";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  pt: 3,
};
function Home() {
  // store calls
  const progress = useStore((state) => state.progress);
  const loading = useStore((state) => state.loading);
  const files = useStore((state) => state.files);
  const setFiles = useStore((state) => state.setFiles);
  const [search, setSearch] = useState("");
  // states
  // const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [toasterData, setToasterData] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  // Close Toaster
  const closeToaster = (value) => {
    setToasterData({
      open: value,
      message: null,
      severity: undefined,
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
  // handles drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    const fileArray = Array.from(event.dataTransfer.files);
    if (fileArray.length > 0) {
      setFiles(fileArray);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      className="relative overflow-hidden"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{ maxHeight: "100vh" }}
    >
      <DeleteUserId />

      <Toaster data={toasterData} close={closeToaster} />
      {/* its the app bar section that contains logo at the top of the page */}
      <AppBar />
      {/* app bar ends here */}
      {/* this section primarily exists for aesthetic purpose */}
      {/* select at least one file to see the animation */}
      {/* <AnimateStyle files={files} /> */}

      {/* removed duplicate navbar  */}

      {/* SEARCH START */}
      <div className="relative">
        <div
          className="flex justify-center items-center mt-28 absolute"
          style={{
            width: "100%",
            // position: "absolute",
            display: "flex",
            justifyContent: "center",

            top: "50%",

            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              border: "1px solid white",
            }}
            onClick={handleOpen}
            type="button"
            className="text-white hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            <span style={{ width: "20px", marginRight: "10px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            Search Code
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/${search}`);
                }}
              >
                <Box
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Search"
                    variant="standard"
                    autoFocus
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    sx={{ height: "fit-content", backgroundColor: "#657ee4" }}
                  >
                    Search
                  </Button>
                </Box>
              </form>

              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mt: 3, lineHeight: "0.1" }}
              >
                Enter the sender code (e.g.'345678') to search for files/text
                shared by that sender.
              </Typography>
            </Box>
          </Modal>

          {/*  */}
        </div>
      </div>

      {/* SEARCH END  */}
      {/* app bar ends here */}

      {files?.length == 0 && (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            bottom: { xs: "110px", md: "80px" },
            left: "50%",
            transform: "translateX(-50%)",
            padding: "0 0px 0 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              border: "1px solid white",
            }}
            onClick={() => navigate("/code")}
            type="button"
            className="btn-add-code text-white hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            <span style={{ width: "20px", marginRight: "10px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
            Share Text
          </button>
        </Box>
      )}

      {/* this section primarily exists for aesthetic purpose */}
      {/* select at least one file to see the animation */}

      <div
        className={`w-full h-screen flex items-center justify-center ${
          files && files.length > 0 && "animate"
        } overflow-hidden`}
      >
        <div
          className={`flex justify-center items-center  ${
            files &&
            files.length > 0 &&
            "border border-[#9c9a9a] dark:border-[#efefef]"
          } p-[5em] rounded-full`}
        >
          <div
            className={`flex justify-center items-center  ${
              files &&
              files.length > 0 &&
              "border border-[#bab9b9] dark:border-[#efefef]"
            } p-[5em] rounded-full `}
          >
            <div
              className={`flex justify-center items-center  ${
                files && files.length > 0 && "border dark:border-[#efefef]"
              } p-[5em] rounded-full `}
            >
              <div className="flex justify-center items-center  bg-[rgba(0,0,0,0.2)] p-[2em] rounded-full ">
                <div className="flex justify-center items-center  bg-[#0000004d] p-[2em] rounded-full  overflow-hidden">
                  <div className="flex justify-center items-center  bg-[rgba(0,0,0,.4)] p-[2em] rounded-full  overflow-hidden">
                    <div className="h-[4em] w-[4em] bg-[rgba(0,0,0,.8)] rounded-full flex items-center justify-center  hover:bg-[rgba(0,0,0,0.3)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

          <img
            src="/tapShare-194x194.webp"
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
