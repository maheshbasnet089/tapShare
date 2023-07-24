import {FaRegShareSquare } from "react-icons/fa";
export default function ShareNewCode({ handleShareNewCode }) {
  return (
    <button
      className="flex bg-gray-200 gap-2 items-center rounded-xl uppercase font-bold hover:bg-white transition-all ease-in-out duration-100 h-10 w-[190px] text-slate-700 hover:text-slate-800 active:bg-gray-300 justify-center"
      role="button"
      title="Share new text"
      onClick={handleShareNewCode}
    >
      <FaRegShareSquare className="text-2xl" />
      Share New
    </button>
  );
}
