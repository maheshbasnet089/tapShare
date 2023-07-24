import { VscNewFile } from "react-icons/vsc";
export default function NewCodeButton({ handleNewCode }) {
  return (
    <button
      className="flex bg-gray-200 gap-2 items-center rounded-xl uppercase font-bold hover:bg-white transition-all ease-in-out duration-100 h-10 w-[170px] text-slate-700 hover:text-slate-800 active:bg-gray-300 justify-center"
      role="button"
      title="Share new text"
      onClick={handleNewCode}
    >
      <VscNewFile className="text-2xl" /> New Text
    </button>
  );
}
