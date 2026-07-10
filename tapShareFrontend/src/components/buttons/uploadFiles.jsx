import React from "react";
import { useStore } from "../../utility/store";
import UploadingAnimation from "../animated/uploadingAnimation";
import { useNavigate } from "react-router-dom";

export default function UploadFiles({ setToasterData }) {
  const navigate = useNavigate();
  const send_file = useStore((state) => state.send_file);
  const files = useStore((state) => state.files);
  const loading = useStore((state) => state.loading);
  const setFiles = useStore((state) => state.setFiles);
  const emailData = useStore((state) => state.emailData);
  const setEmailData = useStore((state) => state.setEmailData);
  const validEmailToAdd = useStore((state) => state.validEmailToAdd);
  const receiverEmail = useStore((state) => state.receiverEmail);
  const setReceiverEmail = useStore((state) => state.setReceiverEmail);

  const handleEmailAddClick = (data) => {
    if (
      Array.isArray(receiverEmail) &&
      receiverEmail.some((email) => email.value === data.value)
    ) {
      setToasterData({
        open: true,
        message: "Email/phone already exists",
        severity: "warning",
      });
      return;
    }
    if (!validEmailToAdd) {
      setToasterData({
        open: true,
        message: "Invalid email/phone",
        severity: "warning",
      });
      return;
    }
    setReceiverEmail(data);
    setEmailData({ type: "", value: "" });
  };

  const handleSendNow = () => {
    if (Array.isArray(receiverEmail) && receiverEmail.length > 0) {
      send_file(files, setToasterData, setFiles, navigate);
      return;
    }
    if (validEmailToAdd) {
      handleEmailAddClick(emailData);
      send_file(files, setToasterData, setFiles, navigate);
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-fit h-fit mt-4">
          <UploadingAnimation />
        </div>
      ) : (
        <>
          {Array.isArray(receiverEmail) &&
            receiverEmail.length <= 0 &&
            !validEmailToAdd && (
              <button
                role="button"
                className="bg-blue-500 p-0 text-gray-50 rounded-full text-center mt-2 font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110 py-2 px-5"
                onClick={() =>
                  send_file(files, setToasterData, setFiles, navigate)
                }
                title="Generate Link"
              >
                Generate Link
              </button>
            )}
          {((Array.isArray(receiverEmail) && receiverEmail.length > 0) ||
            validEmailToAdd) && (
            <button
              role="button"
              className="bg-blue-500 p-0 text-gray-50 rounded-full text-center mt-2 font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110 py-2 px-5"
              onClick={handleSendNow}
              title="Send files"
            >
              Send Now
            </button>
          )}
        </>
      )}
    </>
  );
}
