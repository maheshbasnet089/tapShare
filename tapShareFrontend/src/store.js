import { create } from "zustand";
import axios from "axios";
// import { baseUrl } from "./config";

export const useStore = create((set) => ({
  send_file: async (file, email) => {
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
      alert("File sent successfully");
    } else {
      alert("Error sending file");
    }

    // console.log(res.data);
  },
}));
