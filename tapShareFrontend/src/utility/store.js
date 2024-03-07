import { create } from "zustand";
import axios from "axios";
import { baseUrl } from "../config";
import generateUserId from "./generateUserId";

export const useStore = create((set, get) => ({
  loading: false,
  progress: 0,
  fireButton: false,
  files: [],
  emailData: {
    value: "",
    type: "",
  },
  setEmailData: (email) =>
    set((set) => ({
      emailData: {
        ...set.emailData,
        ...email,
      },
    })),
  receiverEmail: [],
  isReceiverValid: false,
  setLoading: (isLoading) => set({ loading: isLoading }),
  setIsReceiverValid: (isValid) => set({ isReceiverValid: isValid }),
  validEmailToAdd: false,
  setValidEmailToAdd: (isValid) => set({ validEmailToAdd: isValid }),
  setReceiverEmail: (email) =>
    set((state) => ({
      receiverEmail: [...state.receiverEmail, email],
    })),
  replaceReceiverEmail: (email) =>
    set(() => ({
      receiverEmail: email,
    })),

  setFiles: (files) => {
    if (!files.length) return set({ files: [] });

    const existingFiles = get().files;

    const uniqueFiles = files.filter(
      (newFile) =>
        !existingFiles.some(
          (existingFile) => existingFile.name === newFile.name
        )
    );
    const file = [...existingFiles, ...uniqueFiles];
    set({ files: file });
  },
  removeFileByName: (fileName) => {
    set((state) => ({
      files: state.files.filter((file) => file.name !== fileName),
    }));
  },
  send_file: async (file, setToasterData, setFiles, navigate) => {
    if (
      localStorage.getItem("userId") == null ||
      localStorage.getItem("userId") == "" ||
      localStorage.getItem("userId") == undefined
    ) {
      const userId = generateUserId();
      localStorage.setItem("userId", userId);
      set({ fireButton: true });
    }
    // get the public ip address of the device
    const response = await axios.get("https://api64.ipify.org?format=json");
    const ipAddress = response.data.ip;

    const formData = new FormData();
    formData.append("email", JSON.stringify(get().receiverEmail));
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("ipAddress", ipAddress);
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }
    try {
      set({ loading: true });
      const res = await axios.post(`${baseUrl}api/v1/sendFile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          set({ progress: percentCompleted });
        },
      });

      if (res.data.status === 200) {
        setToasterData({
          open: true,
          message: "files sent successfully",
          severity: "success",
        });
        set(() => ({
          receiverEmail: [],
        }));
        set(() => ({
          emailData: {
            value: "",
            type: "",
          },
        }));
        setFiles([]);
      } else if (res.data.status === 201) {
        setFiles([]);
        set(() => ({
          emailData: {
            value: "",
            type: "",
          },
        }));
        navigate("/" + localStorage.getItem("userId"));
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
