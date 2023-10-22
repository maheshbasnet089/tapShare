import axios from "axios";
import { create } from "zustand";

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
      const res = await axios.get(
        `http://localhost:5000/api/v1/history/2400:1a00:bd20:d727:3d41:95d9:94a3:224e`
      );
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
}));
