{
  /** type should be readOnly or readWrite */
}
export default function CodeTextField({ text, setText, type}) {
  return (
    <textarea
      name="text"
      className="w-full max-h-[calc(100dvh-400px)] min-h-[400px] rounded-lg px-3 bg-[#303A55] focus:bg-[#252d41] outline-none text-gray-100 transition-all ease-in-out duration-200 focus:outline-2 focus:outline-blue-800 py-3"
      required
      placeholder={
        type === "readWrite"
          ? "Enter or paste your text/code here..."
          : "Text shared by sender"
      }
      value={text}
      onChange={(e) => setText(e.target.value)}
      readOnly={type === "readOnly" ? true : false}
      title={
        type === "readWrite"
          ? "Enter the text to share"
          : "Text shared by sender"
      }
    ></textarea>
  );
}
