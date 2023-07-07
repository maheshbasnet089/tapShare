import { Box, Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { styled, useTheme } from "@mui/material/styles";
import generateUserId from "../utility/generateUserId";
import "../styles/addCode.css";
import { useStore } from "../utility/store";
import UploadingAnimation from "../components/animated/uploadingAnimation";

const CodeWrap = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#02162a" : "#02162a",
  ...theme.typography.body2,

  textAlign: "center",
  color: "white",
  padding: "15px",
}));

const AddCode = () => {
  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const navigate = useNavigate();
  if (
    localStorage.getItem("userId") == null ||
    localStorage.getItem("userId") == "" ||
    localStorage.getItem("userId") == undefined
  ) {
    const userId = generateUserId();
    localStorage.setItem("userId", userId);
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.target);
      formData.append("userId", "f" + localStorage.getItem("userId"));
      const data = Object.fromEntries(formData);
      const response = await axios.post(`${baseUrl}api/v1/code`, data);
      if (response.data.status == 200) {
        setLoading(false);
        navigate("/" + response.data.code.userId);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const theme = useTheme();
  const inputRef = useRef(null);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "95%", pt: 4 }}>
        <form onSubmit={handleSubmit}>
          <CodeWrap borderRadius={"5px 5px 0 0"} sx={{ paddingTop: "20px" }}>
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
                <Grid container spacing={1} sx={{ pb: 0 }}>
                  <Grid item xs={10}>
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 1,
                    }}
                  >
                    <div className="h-[100px] px-2 flex items-center">
                      {loading ? (
                        <UploadingAnimation />
                      ) : (
                        <>
                          <button
                            role="submit"
                            className="bg-blue-500 p-0 text-gray-50 rounded-full text-center font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110 cursor-pointer"
                            title="Share this text"
                          >
                            Share Now
                          </button>
                        </>
                      )}
                    </div>
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
                  ></Grid>
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
