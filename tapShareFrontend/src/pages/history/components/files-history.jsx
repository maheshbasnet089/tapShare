import React from "react";

const FilesHistory = ({ data }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col h-full">
        <h3 className="text-[1.4rem] font-sans">Keep tapping!👏</h3>
        <div className="text-center mt-5">
          <p className="text-[.8rem]">The shared file is:</p>
          <p>{data?.name}</p>
        </div>
      </div>
    </>
  );
};

export default FilesHistory;
