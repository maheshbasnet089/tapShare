import React from "react";
import { useStore } from "../../utility/store";
import { MdPlaylistAdd } from "react-icons/md";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(97|98)\d{8}$/;
export default function ReceiverEmailInputField({ setToasterData }) {
  // store calls
  const loading = useStore((state) => state.loading);
  const setReceiverEmail = useStore((state) => state.setReceiverEmail);
  const replaceReceiverEmail = useStore((state) => state.replaceReceiverEmail);
  const receiverEmail = useStore((state) => state.receiverEmail);
  const emailData = useStore((state) => state.emailData);
  const setEmailData = useStore((state) => state.setEmailData);
  const setIsReceiverValid = useStore((state) => state.setIsReceiverValid);
  const validEmailToAdd = useStore((state) => state.validEmailToAdd);
  const setValidEmailToAdd = useStore((state) => state.setValidEmailToAdd);

  // states
  const [flag, setFlag] = React.useState(false);
  //handling email change and checking if it is valid or not
  const handleEmailChange = (e) => {
    setEmailData({ value: e.target.value });
    if (emailPattern.test(e.target.value)) {
      setEmailData({ type: "email" });
      setIsReceiverValid(true);
      setValidEmailToAdd(true);
      return;
    } else if (phonePattern.test(e.target.value)) {
      setEmailData({ type: "phone" });
      setIsReceiverValid(true);
      setValidEmailToAdd(true);
      return;
    } else {
      setIsReceiverValid(false);
      setValidEmailToAdd(false);
      return;
    }
  };
  // handles email adding to the array
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
    setIsReceiverValid(false);
    setValidEmailToAdd(false);
  };
  const removeEmail = (email) => {
    replaceReceiverEmail(receiverEmail.filter((data) => data.value !== email));
  };
  return (
    <div className="relative flex items-center justify-center py-2 px-2 text-gray-100 gap-x-1 min-[750px]:gap-x-2">
      <div className="w-full max-w-[400px]">
        <div className="flex gap-x-2 mb-2 flex-wrap justify-center">
          {Array.isArray(receiverEmail) &&
            receiverEmail.length > 0 &&
            receiverEmail?.slice(0, 2).map((email) => (
              <p
                className="text-[.7rem] cursor-pointer"
                key={email?.value}
                onClick={() => removeEmail(email?.value)}
              >
                {email?.value}
              </p>
            ))}
          {Array.isArray(receiverEmail) && receiverEmail.length > 2 && (
            <p
              className="text-[.7rem] cursor-pointer select-none"
              onClick={() => setFlag(true)}
              title="see more"
            >
              ...and {receiverEmail?.length - 2} more
            </p>
          )}
        </div>
        <div className="w-full flex items-center gap-x-1">
          <input
            type="text"
            placeholder="Enter the email address"
            onChange={handleEmailChange}
            className="bg-gray-600 h-12 placeholder:text-md sm:placeholder:text-lg w-full px-5 rounded-md focus:outline-[3px] focus:outline-blue-500 font-bold placeholder:text-gray-400 focus:bg-gray-800 transition-all ease-linear duration-200"
            value={emailData?.value}
            disabled={loading}
            onClick={() => setFlag(false)}
          />
          <div className={`relative flex justify-center items-center`}>
            <button
              title="add"
              onClick={() => {
                handleEmailAddClick(emailData);
              }}
            >
              <MdPlaylistAdd className="text-[2rem] cursor-pointer select-none" />
            </button>
            <div
              className={`absolute top-[-11em] right-0 rounded-sm bg-[#585858]/80 font-sans h-[10em] w-[11.5em] break-words p-2 ${
                flag ? "block" : "hidden"
              }`}
            >
              <span
                className="absolute right-2 top-0 text-[1.2rem] cursor-pointer select-none"
                onClick={() => setFlag(false)}
              >
                &times;
              </span>
              <div className="flex flex-col gap-y-1 h-[10em] overflow-y-scroll">
                {Array.isArray(receiverEmail) &&
                  receiverEmail.length > 0 &&
                  receiverEmail?.map((email) => (
                    <p
                      className="text-[.7rem]"
                      key={email?.value}
                      onClick={() => removeEmail(email?.value)}
                    >
                      {email?.value}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
