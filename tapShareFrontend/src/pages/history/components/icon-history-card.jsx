import React from "react";
import { useNavigate } from "react-router-dom";

const IconHistoryCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="border px-2 cursor-pointer py-3 rounded-sm"
        onClick={() => navigate("/history")}
      >
        <p className="relative">
          <span>
            {(data?.title &&
              `${data?.title?.charAt(0).toUpperCase()}${data?.title?.slice(
                1,
                20
              )}`) ||
              (data?.name &&
                `${data?.name?.charAt(0).toUpperCase()}${data?.name?.slice(
                  1,
                  20
                )}`)}
          </span>
          <span className="text-[.6rem] font-sans border rounded-full ml-1 w-6 text-center  absolute">
            {data?.name ? "file" : "code"}
          </span>
        </p>
      </div>
    </>
  );
};

export default IconHistoryCard;
