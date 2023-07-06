import React from "react";
import { useStore } from "../utility/store";
import Loader from "../assets/loading.gif";
const GenerateLink = () => {
  // store calls
  const send_file = useStore((state) => state.send_file);
  const files = useStore((state) => state.files);
  const loading = useStore((state) => state.loading);
  return (
    <>
      {loading ? (
        <img
          src={Loader}
          srcSet=""
          className="h-[2.25em] w-[6em] object-cover"
        />
      ) : (
        <button
          role="button"
          className="bg-blue-500 p-0 text-gray-50 rounded-full text-center mt-4 font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110"
          onClick={() => send_file(files, "")}
          title="Generate Link"
        >
          Generate Link
        </button>
      )}
    </>
  );
};

export default GenerateLink;
