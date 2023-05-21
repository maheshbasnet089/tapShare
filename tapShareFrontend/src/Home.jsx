import { useState } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";  
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { HiOutlineCursorClick } from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";
import { RiFileSearchLine } from "react-icons/ri";
import { useStore } from "./store";

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
borderRadius:'5px',
  boxShadow: 24,
  p: 4,
  pt:3
};
function Home() {
  // store calls
  const send_file = useStore((state) => state.send_file);
  // states
  const [files, setFiles] = useState(null);
  const [email, setEmail] = useState(null);

  // handlers
  // handle file click
  const handleFileClick = (e) => {
    const fileList = e.target.files;

    const fileArray = Array.from(fileList);

    if (fileList.length > 0) {
      setFiles(fileArray);
    }
  };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div className="relative overflow-hidden">
      {/* its the app bar section that contains logo at the top of the page */}
      <nav className="fixed w-full" title="TapShare">
        <div className="flex justify-center select-none w-full items-center p-[1em]">
          <div
            className="flex items-center justify-center gap-[.1rem] cursor-pointer"
            title="TapShare"
          >
            <div className="flex justify-center items-center  bg-[rgba(0,0,0,0.2)] p-[2px] rounded-full">
              <div className="flex justify-center bg-[rgba(0,0,0,0.4)] rounded-full ">
                <HiOutlineCursorClick className="text-[2rem] text-[#efefef] rounded-full bg-[rgba(0,0,0,.5)] p-[6px] m-[2px]" />
              </div>
            </div>
            <p className="text-[1.5rem] text-[#efefef] font-semibold tracking-wide">
              Share
            </p>
          </div>
        </div>
      </nav>

      {/* SEARCH START */}
      <div className="relative">
        <div
          className="flex justify-center items-center mt-28 absolute"
          style={{
            position: "absolute",

            top: "50%",

            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
          style={{backgroundColor:'transparent', border:'1px solid white'}}
            onClick={handleOpen}
            type="button"
            class="text-white hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Search"
                  variant="standard"
                  type="number"
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{ height: "fit-content", backgroundColor: "#657ee4" }}
                >
                  Search
                </Button>
              </Box>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mt: 3, lineHeight: "0.1" }}
              >
                Enter the sender code (e.g., '3456') to search for files shared
                by that sender.
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>

      {/* SEARCH END  */}
      {/* app bar ends here */}
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
        className="h-[4em] w-[4em] bg-[rgba(0,0,0,.5)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[rgba(0,0,0,0.4)] absolute upload"
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
          <HiOutlineCursorClick className="text-[1.5rem] text-[#efefef]" />
        </IconButton>
      </div>
      {/* this section takes input to whom file should be send */}
      {/* it is hidden by default, it appears as soon as one selects a file */}
      {files && files.length > 0 && (
        <div>
          <div className="absolute to flex items-center bg-[lightgray] pl-[.8em] pr-[.5em] rounded shadow-md shadow-[#555] ">
            <input
              type="text"
              placeholder="Enter email to send"
              onChange={(e) => setEmail(e.target.value)}
              className="h-[2.2em]  outline-none bg-[lightgray] text-[1.2rem] text-[#585858] min-w-[17em] placeholder:text-[1rem]  placeholder:text-[#555] tracking-wide"
            />

            <AiOutlineSend
              onClick={() => send_file(files, email)}
              className="text-[#555] text-[1.75rem] cursor-pointer hover:text-[#777676]"
            />
          </div>

          <div className="absolute to flex pl-[.8em] pr-[.5em]  mt-10 bg-[lightgray]  rounded shadow-md shadow-[#555] cursor-pointer ">
            <h2 onClick={() => send_file(files, "")}>Generate Link</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
