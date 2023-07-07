import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import "../styles/addCode.css";
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
  useEffect(() => {
    if (title.length === 0 && text.length === 0) fetchCode();
  }, []);
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
  return <></>;
};

export default ViewCode;
