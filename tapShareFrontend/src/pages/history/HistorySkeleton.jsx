import { Skeleton } from "@mui/material";
import React from "react";

const HistorySkeleton = () => {
  return (
    <li className="mb-10 ms-6">
      <div className="absolute flex items-center text-blue-300 justify-center w-6 h-6  rounded-full -start-3 ring-1 ring-[#303a55] bg-[#3c486b]">
        <Skeleton
          sx={{
            width: "10rem",
            height: "2.6rem",
            borderRadius: "50%",
          }}
        />
      </div>
      <Skeleton sx={{ width: "80%", height: "3rem" }} />
      <Skeleton sx={{ width: "30%", height: "1.5rem", mb: 1 }} />
      <Skeleton sx={{ width: "5rem", height: "2rem" }} />
      <Skeleton sx={{ width: "5rem", height: "2rem", mb: 2 }} />
      <Skeleton sx={{ width: "5rem", height: "4rem", mb: 2 }} />
    </li>
  );
};

export default HistorySkeleton;
