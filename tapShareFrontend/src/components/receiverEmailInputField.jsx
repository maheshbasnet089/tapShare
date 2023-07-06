import React from "react";
import { useStore } from "../utility/store";

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
    <div className="relative flex justify-center py-3 px-3">
      <input
        type="text"
        placeholder="Email or phone number of receiver"
        onChange={handleEmailChange}
        className="bg-gray-100 h-10 placeholder:text-xs sm:placeholder:text-lg max-w-[400px] w-full px-4 rounded-full"
        value={receiverEmail}
        disabled={loading}
      />
    </div>
  );
}
