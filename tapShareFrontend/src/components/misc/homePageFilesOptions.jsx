import ReceiverEmailInputField from "../inputFields/receiverEmailInputField";
import UploadFiles from "../buttons/uploadFiles";
import ViewFiles from "./viewFiles";

export default function HomePageFilesOptions({ setToasterData }) {
  return (
    <div className="absolute to flex flex-col w-full">
      {/* shows the selected files, also allow to remove files (if wanted) */}
      <div className="flex justify-center">
        <ViewFiles />
      </div>

      {/* the input field that accepts email */}
      <ReceiverEmailInputField setToasterData={setToasterData} />

      {/* generates links or send email*/}
      <div className="flex justify-center">
        <UploadFiles setToasterData={setToasterData} />
      </div>
    </div>
  );
}
