import React from "react";
import { useStore } from "../../utility/store";
import UploadingAnimation from "../animated/uploadingAnimation";

export default function UploadFiles({ setToasterData }) {
  // store calls
  const send_file = useStore((state) => state.send_file);
  const files = useStore((state) => state.files);
  const loading = useStore((state) => state.loading);
  const isReceiverValid = useStore((state) => state.isReceiverValid);
  const receiverEmail = useStore((state) => state.receiverEmail);
  const setFiles = useStore((state) => state.setFiles);
  return (
    <>
      {loading ? (
        <div className="w-fit h-fit mt-4">
          <UploadingAnimation />
        </div>
      ) : (
        <>
          {!isReceiverValid && (
            <>
              <button
                role="button"
                className="bg-blue-500 p-0 text-gray-50 rounded-full text-center mt-2 font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110"
                onClick={() => send_file(files, "", setToasterData, setFiles)}
                title="Generate Link"
              >
                Generate Link
              </button>
            </>
          )}
          {isReceiverValid && (
            <>
              <button
                role="button"
                className="bg-blue-500 p-0 text-gray-50 rounded-full text-center mt-2 font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110"
                onClick={() =>
                  send_file(files, receiverEmail, setToasterData, setFiles)
                }
                title="Generate Link"
              >
                Send Now
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}
