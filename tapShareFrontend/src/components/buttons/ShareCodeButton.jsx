import { useStore } from "../../utility/store";
import UploadingAnimation from "../animated/uploadingAnimation";
export default function ShareCodeButton() {
  const loading = useStore((state) => state.loading);
  return (
    <>
      {loading ? (
        <UploadingAnimation />
      ) : (
        <>
          <button
            role="submit"
            className="bg-blue-500 p-0 text-gray-50 rounded-full text-center font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110 cursor-pointer py-2 px-4"
            title="Share this text"
          >
            Share Now
          </button>
        </>
      )}
    </>
  );
}
