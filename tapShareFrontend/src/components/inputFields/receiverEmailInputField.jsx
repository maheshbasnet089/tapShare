import React from "react";
import { useStore } from "../../utility/store";
// import { HiBackspace } from "react-icons/hi";
import { MdPlaylistAdd } from "react-icons/md";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(97|98)\d{8}$/;
export default function ReceiverEmailInputField() {
  // store calls
  const loading = useStore((state) => state.loading);
  const setReceiverEmail = useStore((state) => state.setReceiverEmail);
  const emailData = useStore((state) => state.emailData);
  const setEmailData = useStore((state) => state.setEmailData);
  const setIsReceiverValid = useStore((state) => state.setIsReceiverValid);
  const isReceiverValid = useStore((state) => state.isReceiverValid);

  // states
  //handling email change and checking if it is valid or not
  const handleEmailChange = (e) => {
    setEmailData({ value: e.target.value });
    if (emailPattern.test(e.target.value)) {
      setEmailData({ type: "email" });
      setIsReceiverValid(true);
      return;
    } else if (phonePattern.test(e.target.value)) {
      setEmailData({ type: "phone" });
      setIsReceiverValid(true);
      return;
    } else {
      setIsReceiverValid(false);
      return;
    }
  };
  return (
    <div className="relative flex items-center justify-center py-3 px-3 text-gray-100 gap-x-1 min-[750px]:gap-x-2">
      <input
        type="text"
        placeholder="Enter the email address"
        onChange={handleEmailChange}
        className="bg-gray-600 h-12 placeholder:text-md sm:placeholder:text-lg max-w-[400px] w-full px-5 rounded-md focus:outline-[3px] focus:outline-blue-500 font-bold placeholder:text-gray-400 focus:bg-gray-800 transition-all ease-linear duration-200"
        value={emailData?.value}
        disabled={loading}
      />
      <button
        title="add"
        disabled={!isReceiverValid}
        onClick={() => {
          setReceiverEmail(emailData);
          setEmailData({ type: "", value: "" });
        }}
      >
        <MdPlaylistAdd className="text-[2rem] cursor-pointer select-none" />
      </button>
    </div>
  );
}
