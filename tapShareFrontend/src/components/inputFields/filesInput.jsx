import { IconButton } from "@mui/material/";
import { useStore } from "../../utility/store";

export default function FilesInput() {
  const progress = useStore((state) => state.progress);
  const loading = useStore((state) => state.loading);
  const files = useStore((state) => state.files);
  const setFiles = useStore((state) => state.setFiles);
  const handleFileInput = (e) => {
    const fileList = e.target.files;
    const fileArray = Array.from(fileList);
    if (fileList.length > 0) {
      setFiles(fileArray);
    }
  };
  return (
    <div
      title="Click to send file"
      className="h-[4em] w-[4em] bg-[rgba(0,0,0,.5)] rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-[rgba(0,0,0,0.4)] absolute upload"
    >
      <IconButton
        aria-label="upload file"
        component="label"
        className="w-full h-full"
      >
        <input
          hidden
          accept="*"
          type="file"
          multiple="multiple"
          onChange={handleFileInput}
          onDragEndCapture={handleFileInput}
        />
        <input
          hidden
          type="file"
          directory=""
          webkitdirectory=""
          onDragEndCapture={handleFileInput}
          onChange={handleFileInput}
        />

        <img
          src="/tapShare-194x194.webp"
          className={`text-[1.5rem] text-[#efefef] ${
            files && files.length > 0 && "pointer"
          }`}
        />
      </IconButton>
      <p className="text-[#efefef] text-[.6rem] absolute top-[75%]">
        {loading && progress && `${progress}%`}
      </p>
    </div>
  );
}
