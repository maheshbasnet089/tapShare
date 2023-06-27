import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Loader from "./../assets/loading.gif";

import { styled, useTheme } from "@mui/material/styles";
import { IoMdDownload } from "react-icons/io";
import { MdContentCopy, MdOutlineQrCode } from "react-icons/md";
import IosShareIcon from "@mui/icons-material/IosShare";
import "../Global/AddCode.css";

import Paper from "@mui/material/Paper";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#02162a" : "#02162a",
  ...theme.typography.body2,
  textAlign: "center",
  color: "white",
  padding: "10px 0",
}));

const CodeWrap = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#02162a" : "#02162a",
  ...theme.typography.body2,

  textAlign: "center",
  color: "white",
  padding: "15px",
}));

const AddCode = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  function generateUserId() {
    const userId = Math.floor(100000 + Math.random() * 900000);
    return userId;
  }
  if (
    localStorage.getItem("userId") == null ||
    localStorage.getItem("userId") == "" ||
    localStorage.getItem("userId") == undefined
  ) {
    const userId = generateUserId();
    localStorage.setItem("userId", userId);
  }

  const handleSubmit = async (e) => {
    // alert("click");
    setLoading(true);

    e.preventDefault();

    const formData = new FormData(e.target);

    formData.append("userId", "f" + localStorage.getItem("userId"));
    const data = Object.fromEntries(formData);

    const response = await axios.post(`${baseUrl}api/v1/code`, data);
    if (response.data.status == 200) {
      setLoading(false);

      navigate("/" + response.data.code.userId);
    }
  };
  const theme = useTheme();

  const inputRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");

      setIsCopied(true);

      // Reset the button text after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "95%", pt: 4 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <CodeWrap borderRadius={"5px 5px 0 0"} sx={{ paddingTop: "20px" }}>
            {/* <Typography variant="body1" sx={{ mb: 2 }}>
              TAP CODE
            </Typography> */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => window.location.reload()}
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  ml: 1,
                }}
              >
                <AddIcon />
                New Code
              </Button>
              <TextField
                id="outlined-basic"
                name="title"
                placeholder="Enter a title"
                variant="outlined"
                required
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&:hover": {
                      color: "white",
                    },
                  },
                }}
                size="small"
              />
            </Box>
          </CodeWrap>

          <Grid container spacing={2}>
            {/* <Grid item xs={3}>
              <Item>
                {" "}
                <Typography variant="body2">History</Typography>
              </Item>
              <Item sx={{ color: "#bbb" }}>Code for api fetch</Item>
              <Item sx={{ color: "#bbb" }}>Code for api fetch</Item>
            </Grid> */}
            <Grid item xs={12}>
              <Box
                sx={{
                  px: 2,
                  pt: 2,
                  pb: 3,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#02162a" : "#02162a",
                  ...theme.typography.body2,
                  padding: theme.spacing(1),
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Grid container spacing={2} sx={{ pb: 2 }}>
                  <Grid item xs={12}>
                    <TextareaAutosize
                      aria-label="textarea"
                      minRows={18}
                      name="text"
                      required
                      placeholder="Enter or paste your text/code here.."
                      style={{
                        width: "100%",
                        padding: "15px 10px",
                        backgroundColor: "transparent",
                        border: "1px solid gray",
                        maxHeight: "53vh",
                        overflow: "scroll",
                        overflowX: "hidden",
                      }}
                    />
                  </Grid>
                  {/* <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "25px",
                      mt: 2,
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      name="text"
                      label="Give this code a title.."
                      variant="outlined"
                      InputProps={{
                        style: {
                          color: "white",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "white",
                        },
                      }}
                      sx={{
                        width: "100%",
                        color: "white",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&:hover": {
                            color: "white",
                          },
                        },
                      }}
                      size="small"
                    />
                  </Grid> */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      sx={{
                        width: "100%",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      {loading ? (
                        <img
                          src={Loader}
                          alt="loader"
                          srcSet=""
                          className="h-[2.25em] w-[6em] object-cover"
                        />
                      ) : (
                        <>
                          <IosShareIcon sx={{ fontSize: "16px" }} />
                          <Typography>Share Text</Typography>
                        </>
                      )}
                      {/* Share Text */}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={5}
                    className="css-form-control"
                    sx={{
                      padding: "0",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    {/* <div className="form-row" style={{ width: "100%" }}>
                      <input
                        ref={inputRef}
                        type="text"
                        name="link"
                        id="link"
                        className="input-links"
                        // value={file.path ? file.path : file.title}
                        style={{
                          backgroundColor: "transparent",
                          color: "white",
                          letterSpacing: "1px",
                        }}
                      />
                      <button
                        // type="button"
                        onClick={handleCopyClick}
                        className="css-btn-primary btn-copy-links btn-with-icon"
                      >
                        {isCopied ? "Copied" : "Copy"}
                        <span className="btn-icon">
                          <MdContentCopy />
                        </span>
                      </button>
                    </div> */}
                  </Grid>
                  {/* <Grid item md={4}>
                    <TextField
                      id="outlined-basic"
                      name="text"
                      label="Enter receiver email to send this code.."
                      variant="outlined"
                      InputProps={{
                        style: {
                          color: "white",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "white",
                        },
                      }}
                      sx={{
                        width: "100%",
                        color: "white",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&:hover": {
                            color: "white",
                          },
                        },
                      }}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        width: "100%",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <SendIcon sx={{ fontSize: "16px" }} />
                      Send
                    </Button>
                  </Grid> */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddCode;
