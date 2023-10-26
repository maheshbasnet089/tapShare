import React from "react";

const FilesHistory = ({ data }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col h-full">
        <a
          href="https://tapshare.xyz"
          title="TapShare"
          className="flex items-center gap-[.3rem] cursor-pointer"
        >
          <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] p-[2px] rounded-full">
            <div className="flex justify-center bg-[rgba(0,0,0,0.4)] rounded-full">
              <img
                src="/tapShare-194x194.webp"
                className="w-12  backdrop-blur-lg rounded-full"
                alt="TapShare Logo"
              />
            </div>
          </div>
        </a>
        <div className="flex items-center gap-x-1">
          <h3 className="text-[1.4rem] font-sans">Keep tapping!</h3>
          <img
            src="/tapShare-194x194.webp"
            className="w-5  backdrop-blur-lg rounded-full"
            alt="TapShare Logo"
          />
        </div>
        <div className="text-center mt-5">
          <p className="text-[.8rem]">The shared file is:</p>
          <p>{data?.name}</p>
        </div>
      </div>
    </>
  );
};

export default FilesHistory;
