import React from "react";
import { useStore } from "../utility/store";
import Loader from "../assets/loading.gif";
const GenerateLink = () => {
  // store calls
  const send_file = useStore((state) => state.send_file);
  const files = useStore((state) => state.files);
  const loading = useStore((state) => state.loading);
  return (
    <div
      className={`flex ${
        !loading && "pl-[.8em] pr-[.5em]"
      } w-fit mt-[.5em] bg-[lightgray]  rounded shadow-md shadow-[#555] cursor-pointer`}
    >
        {loading ? (
          <img
            src={Loader}
            alt="loader"
            srcSet=""
            className="h-[2.25em] w-[6em] object-cover"
          />
        ) : (
          <h2
            className="hover:text-[#777676]"
            onClick={() => send_file(files, "")}
            title="generate link"
          >
            Generate Link
          </h2>
        )}
    </div>
  );
};

export default GenerateLink;
