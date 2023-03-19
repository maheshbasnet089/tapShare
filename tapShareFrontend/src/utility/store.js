import { create } from "zustand";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { baseUrl } from "./config";

export const useStore = create((set) => ({
  loading: false,
  progress: 0,
  send_file: async (file, email, setToasterData, setFiles) => {
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
    try {
      set({ loading: true });
      const res = await axios.post(
        // "http://localhost:1337/api/v1/sendFile",
        "https://tapshare.onrender.com/api/v1/sendFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            set({ progress: percentCompleted });
          },
        }
      );
      if (res.data.status === 200) {
        setToasterData({
          open: true,
          message: "files sent successfully",
          severity: "success",
        });
        setFiles(null);
      } else if (res.data.status === 201) {
        window.location.href =
          "https://tapshare.xyz/" + localStorage.getItem("userId");
        // "http://127.0.0.1:5173/" + localStorage.getItem("userId");
        // navigate("/seeAllMyFiles");
      } else {
        setToasterData({
          open: true,
          message: "Error sending files",
          severity: "error",
        });
      }
    } catch (error) {
      setToasterData({
        open: true,
        message: "Error sending files",
        severity: "error",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
