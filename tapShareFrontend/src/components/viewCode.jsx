import {
  Box,
  Grid,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import "../Global/AddCode.css";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#02162a" : "#02162a",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  // padding: "10px 0",
}));

const CodeWrap = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#02162a" : "#02162a",
  ...theme.typography.body2,

  textAlign: "center",
  color: "white",
  padding: "15px",
}));

const ViewCode = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const { id } = useParams();
  const fetchCode = async () => {
    const response = await axios.get(`${baseUrl}api/v1/code/single/${id}`);
    if (response.data.status == 200) {
      setTitle(response.data.code.title);
      setText(response.data.code.text);
    } else {
      alert("Something Went Wrong ! Try again ");
    }
  };
  React.useEffect(() => {
    fetchCode();
  }, []);
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
            <h3 className="card-links-title title">Keep tapping! 👏</h3>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                id="outlined-basic"
                name="title"
                label="Title"
                value={title}
                readOnly
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
                <Grid container spacing={2} sx={{ pb: 2 }}>
                  <Grid item xs={12}>
                    <TextareaAutosize
                      aria-label="textarea"
                      minRows={18}
                      name="text"
                      value={text}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "15px 10px",
                        backgroundColor: "transparent",

                        maxHeight: "53vh",
                        overflow: "scroll",
                        overflowX: "hidden",
                      }}
                    />
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

export default ViewCode;
