import LoadingSvg from "../svg/loadingSvg";

export default function UploadingAnimation() {
  return (
    <div
      className={
        "text-gray-100 font-semibold w-[170px] rounded-full bg-blue-400 flex"
      }
    >
      <div className="flex justify-center items-center px-4 py-2 select-none">
        <div className="h-full flex items-center relative -right-1">
          Uploading
        </div>
        <div className="flex items-center max-w-fit relative right-6">
          <object>
            <LoadingSvg />
          </object>
        </div>
      </div>
    </div>
  );
}
