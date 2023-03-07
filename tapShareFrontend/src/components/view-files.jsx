import React, { useState, useEffect, useCallback } from "react";
import { MdOutlineCancel } from "react-icons/md";
const ViewFiles = ({ files }) => {
  const [coords, setCoords] = useState([]);
  // function that generates random numbers, x amd y, repeat files.length
  const random = () => {
    return [parseInt(Math.random() * 100), parseInt(Math.random() * 100)];
  };
  const position = useCallback(async () => {
    for (let i = 0; i < files.length; i++) {
      setCoords([...coords, random()]);
    }
    console.log("🚀 ~ file: view-files.jsx:13 ~ position ~ random:", random);
    console.log("🚀 ~ file: view-files.jsx:14 ~ position ~ coords:", coords);
  });

  useEffect(() => {
    if (files) position();
  }, [files]);
  return (
    <>
      <div className="flex flex-col">
        {files &&
          files.map((file, index) => {
            return (
              <div
                key={file}
                // className={`text-[#efefef] flex justify-between items-center absolute gap-x-1 top-[${
                //   coords[index] && coords[index][0]
                // }%] left-[${coords[index] && coords[index][1]}coords[index]%] max-w-[20emX]`}
                className={`text-[#efefef] flex justify-between items-center gap-x-1  max-w-[20em]`}
              >
                <p className="break-all">{file}</p>
                <MdOutlineCancel className="text-[1.4rem] text-[#f15b5b] cursor-pointer" />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ViewFiles;
