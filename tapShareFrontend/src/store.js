import { create } from "zustand";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { baseUrl } from "./config";

export const useStore = create((set) => ({
  send_file: async (file, email) => {
    function generateFileNumber() {
      const fileNumber = Math.floor(1000 + Math.random() * 9000);
      console.log(fileNumber);
      return fileNumber;
    }
    generateFileNumber();
    const formData = new FormData();
    formData.append("email", email);

    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }

    const res = await axios.post(
      "http://localhost:1337/api/v1/sendFile",
      // "https://tapshare.onrender.com/api/v1/sendFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.status === 200) {
      alert(res.data.message);
    } else if (res.data.status === 201) {
      alert(res.data.message);
      console.log(res.data);
      // window.location.href = "http://localhost:3000/seeAllMyFiles";
      // navigate("/seeAllMyFiles");
    } else {
      alert("Error sending file");
    }

    // console.log(res.data);
  },
}));
