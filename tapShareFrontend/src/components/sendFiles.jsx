import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useStore } from "../utility/store";

const SendFiles = ({ setToasterData }) => {
  // store calls
  const loading = useStore((state) => state.loading);
  const send_file = useStore((state) => state.send_file);
  const files = useStore((state) => state.files);
  const setFiles = useStore((state) => state.setFiles);
  // states
  // email states -> email to whom one intends to send file/files
  const [email, setEmail] = useState(null);
  return (
    <div className="flex items-center bg-[lightgray] pl-[.8em] pr-[.5em] rounded shadow-md shadow-[#555] w-fit mt-2">
      <input
        type="text"
        placeholder="Enter email to send"
        onChange={(e) => setEmail(e.target.value)}
        className="h-[2.2em] outline-none bg-[lightgray] text-[1.2rem] text-[#585858] min-w-[17em] placeholder:text-[1rem] placeholder:text-[#555] tracking-wide focus:outline-none"
        disabled={loading}
      />
      {!loading && (
        <AiOutlineSend
          onClick={() => send_file(files, email, setToasterData, setFiles)}
          className="text-[#555] text-[1.75rem] cursor-pointer hover:text-[#777676]"
        />
      )}
    </div>
  );
};

export default SendFiles;
