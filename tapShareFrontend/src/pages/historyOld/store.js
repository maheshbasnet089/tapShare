import axios from "axios";
import { create } from "zustand";
import { baseUrl } from "../../config";

export const useHistoryStore = create((set) => ({
  history: {
    codes: [],
    files: [],
  },
  getHistory: async () => {
    try {
      const responseForIp = await axios.get(
        "https://api64.ipify.org?format=json"
      );
      const ipAddress = responseForIp.data.ip;
      const res = await axios.get(`${baseUrl}api/v1/history/${ipAddress}`);
      if (res.data.status === 200) {
        set({
          history: {
            codes: [...res.data.codes],
            files: [...res.data.files],
          },
        });
        return {
          codes: [...res.data.codes],
          files: [...res.data.files],
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  queryData: {},
  setQueryData: (data) => set({ queryData: data }),
  getCodeDetails: async (id) => {
    try {
      const res = await axios.get(`${baseUrl}api/v1/history/code/${id}`);
      if (res.data.status === 200) {
        set({ queryData: res.data.code });
        return res.data.code;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  getFilesDetails: async (id) => {
    try {
      const res = await axios.get(`${baseUrl}api/v1/history/file/${id}`);
      if (res.data.status === 200) {
        set({ queryData: res.data.file });
        return res.data.file;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
}));
