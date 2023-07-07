{
  /** type should be readOnly or readWrite */
}
export default function CodeTitleField({ setTitle, title, type }) {
  return (
    <input
      type="text"
      placeholder={
        type === "readWrite" ? "Enter a title" : "Title of shared text"
      }
      name="title"
      className={`h-12 w-full max-w-[300px] rounded-lg px-3 bg-[#303A55]  outline-none text-gray-100 transition-all ease-in-out duration-200 ${
        type === "readOnly"
          ? " focus:outline-none select-none "
          : " focus:outline-2 focus:outline-blue-800 select-text focus:bg-[#252d41]"
      }`}
      required
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      readOnly={type === "readOnly" ? true : false}
      title={
        type === "readWrite" ? "Enter title for text" : "Title of shared text"
      }
    />
  );
}
