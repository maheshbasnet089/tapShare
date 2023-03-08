import { create } from "zustand";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { baseUrl } from "./config";

export const useStore = create((set) => ({
  send_file: async (file, email) => {
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

    const formData = new FormData();
    formData.append("email", email);
    formData.append("userId", localStorage.getItem("userId"));

    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }

    const res = await axios.post(
      // "http://localhost:1337/api/v1/sendFile",
      "https://tapshare.onrender.com/api/v1/sendFile",
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
      window.location.href =
        "https://www.tapshare.xyz/" + localStorage.getItem("userId");
      // navigate("/seeAllMyFiles");
    } else {
      alert("Error sending file");
    }
  },
}));
