import { create } from "zustand";
import axios from "axios";
import { baseUrl } from "../config";
import generateUserId from "./generateUserId";

export const useStore = create((set) => ({
  loading: false,
  progress: 0,
  fireButton: false,
  files: [],
  receiverEmail: "",
  isReceiverValid: false,
  setLoading: (isLoading) => set({ loading: isLoading }),
  setIsReceiverValid: (isValid) => set({ isReceiverValid: isValid }),
  setReceiverEmail: (email) => set({ receiverEmail: email }),
  setFiles: (files) => set({ files }),
  send_file: async (file, email, setToasterData, setFiles) => {
    if (
      localStorage.getItem("userId") == null ||
      localStorage.getItem("userId") == "" ||
      localStorage.getItem("userId") == undefined
    ) {
      const userId = generateUserId();
      localStorage.setItem("userId", userId);
      set({ fireButton: true });
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
        `${baseUrl}api/v1/sendFile`,
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
      // window.location.href =
      // "https://ngr-np-obscure-waddle-rwqqq5gpgw6hwj7x-5173.preview.app.github.dev/" + localStorage.getItem("userId");
    } finally {
      set({ loading: false });
    }
  },
}));
