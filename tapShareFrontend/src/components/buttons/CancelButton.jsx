import { RxCross2 } from "react-icons/rx";
export default function CancelButton({handleCancel}) {
  return (
    <div
      className="flex justify-center bg-red-500 gap-2 items-center rounded-xl uppercase font-bold hover:bg-red-600 transition-all ease-in-out duration-100 h-10 w-[130px] text-gray-100 hover:text-gray-50 active:bg-red-300"
      role="button"
      onClick={handleCancel}
      title="Cancel & Go back to home"
    >
      Cancel <RxCross2 className="text-2xl" />
    </div>
  );
}
