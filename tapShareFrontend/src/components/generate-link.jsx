import React from "react";
import { useStore } from "../utility/store";
const GenerateLink = ({ files }) => {
  // store calls
  const send_file = useStore((state) => state.send_file);
  const loading = useStore((state) => state.loading);
  return (
    <div className="flex pl-[.8em] pr-[.5em] w-fit mt-1 bg-[lightgray]  rounded shadow-md shadow-[#555] cursor-pointer ">
      {loading ? (
        <img src="loader.gif" alt="" srcset="" height="20px" width="50px" />
      ) : (
        <h2
          className="hover:text-[#777676]"
          onClick={() => send_file(files, "")}
        >
          Generate Link
        </h2>
      )}
    </div>
  );
};

export default GenerateLink;
