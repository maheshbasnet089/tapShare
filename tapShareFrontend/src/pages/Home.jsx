import { useState } from "react";
import AppBar from "../components/misc/appBar";
import Toaster from "../components/animated/toaster";
import { useStore } from "../utility/store";
import DeleteUserId from "../components/buttons/deleteUserId";
import ShareTextButtonHome from "../components/buttons/shareTextButtonHome";
import AnimateStyle from "../components/animated/animateStyle";
import HomePageFilesOptions from "../components/misc/homePageFilesOptions";
import FilesInput from "../components/inputFields/filesInput";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
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
  const actions = [
    {
      icon: <BsGithub className="text-black" />,
      name: "GitHub",
      link: "https://github.com/maheshbasnet089/tapShare",
    },
    {
      icon: <FaFacebook className="text-[#4267B2]" />,
      name: "Facebook",
      link: "https://www.facebook.com/tapshare089",
    },
    {
      icon: <BsLinkedin className="text-[#0a66c2]" />,
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/tapshare089/",
    },
  ];
  const handleNavigate = (link) => {
    window.open(link, "_blank").focus();
  };
  return (
    <>
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
      <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          direction="up"
          ariaLabel="SpeedDial openIcon example"
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            ".MuiSpeedDial-fab": {
              width: "43px",
              height: "43px",
              bgcolor: "#3c486b6e",
              color: "gray",
              ":hover": {
                color: "white",
                bgcolor: "#3c486b",
              },
            },
            ".MuiSpeedDialIcon-openIcon": {
              fontSize: "1.4rem",
            },
          }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleNavigate(action?.link)}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}

export default Home;
