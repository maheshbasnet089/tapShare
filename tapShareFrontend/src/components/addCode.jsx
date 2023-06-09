import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";

const AddCode = () => {
  const navigate = useNavigate();
  function generateUserId() {
    const userId = Math.floor(1000 + Math.random() * 9000);
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
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("userId", "f" + localStorage.getItem("userId"));
    const data = Object.fromEntries(formData);
    const response = await axios.post(`${baseUrl}api/v1/code`, data);
    if (response.data.status == 200) {
      navigate("/" + response.data.code.userId);
    }
    console.log(response.data);
    console.log(data);
  };
  return (
    <div>
      <h1>Add Code</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="outlined-basic"
          name="title"
          label="Outlined"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          name="text"
          label="Outlined"
          variant="outlined"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddCode;
