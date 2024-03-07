import DynamicIcon from "../DynamicFileTypeIcon";

{
  /** type should be readOnly or readWrite */
}
export default function CodeTitleField({ setTitle, title, type }) {
  const t = "hello.txt"
  console.log(title.split(".").pop());
  return (
    <>

      <div className="flex relative flex-row gap-2 items-center">
        <input
          type="text"
          placeholder={
            type === "readWrite" ? "Enter a title" : "Title of shared text"
          }
          name="title"
          className={`h-12 w-full max-w-[300px] rounded-lg pl-3 pr-8 bg-[#303A55]  outline-none text-gray-100 transition-all ease-in-out duration-200 ${type === "readOnly"
            ? " focus:outline-none select-none "
            : " focus:outline-2 focusplits:outline-blue-800 select-text focus:bg-[#252d41]"
            }`}
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={type === "readOnly" ? true : false}
          title={
            type === "readWrite" ? "Enter title for text" : "Title of shared text"
          }
        />
        {title &&
          <span class="absolute inset-y-0 right-0  flex items-center px-3 pointer-events-none text-white text-3xl">
            <DynamicIcon name={title} />
          </span>
        }
      </div></>
  );
}
