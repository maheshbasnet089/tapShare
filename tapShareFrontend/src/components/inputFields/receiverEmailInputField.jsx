import React from "react";
import { useStore } from "../../utility/store";
// import { HiBackspace } from "react-icons/hi";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(97|98)\d{8}$/;
export default function ReceiverEmailInputField() {
  // store calls
  const loading = useStore((state) => state.loading);
  const receiverEmail = useStore((state) => state.receiverEmail);
  const setReceiverEmail = useStore((state) => state.setReceiverEmail);
  const setIsReceiverValid = useStore((state) => state.setIsReceiverValid);

  //handling email change and checking if it is valid or not
  const handleEmailChange = (e) => {
    setReceiverEmail(e.target.value);
    if (emailPattern.test(e.target.value)) {
      setIsReceiverValid(true);
      return;
    } else if (phonePattern.test(e.target.value)) {
      setIsReceiverValid(true);
      return;
    } else {
      setIsReceiverValid(false);
      return;
    }
  };
  return (
    <div className="relative flex flex-col items-center py-3 px-3">
      <input
        type="text"
        placeholder="Enter the email address"
        onChange={handleEmailChange}
        className="bg-gray-600 h-12 placeholder:text-xs sm:placeholder:text-lg max-w-[400px] w-full px-5 rounded-full focus:outline-[3px] focus:outline-blue-500 text-gray-100 font-bold placeholder:text-gray-400 focus:bg-gray-800 transition-all ease-linear duration-200"
        value={receiverEmail}
        disabled={loading}
      />
    </div>
  );
}
