import LoadingSvg from "../svg/loadingSvg";
export default function FetchingScreen() {
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center absolute bg-[rgba(0,0,0,0.6)]">
      <div>
        <div>
          <span className="text-xl sm:text-3xl font-bold text-gray-100">
            Fetching Data
          </span>
        </div>
        <div className="flex justify-center">
          <LoadingSvg />
        </div>
      </div>
    </div>
  );
}
