import { AiOutlineHome } from "react-icons/ai";
export default function HomeButton() {
  return (
    <div
      className="flex justify-center bg-blue-500 gap-2 items-center rounded-xl uppercase font-bold hover:bg-blue-600 transition-all ease-in-out duration-100 h-10 w-[120px] text-gray-100 hover:text-gray-50 active:bg-blue-300"
      role="button"
      title="Go back to homepage"
    >
      <AiOutlineHome className="text-2xl" />
      Home
    </div>
  );
}
