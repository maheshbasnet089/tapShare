import React from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryStore } from "../store";

const IconHistoryCard = ({ data }) => {
  const navigate = useNavigate();
  const setQueryData = useHistoryStore((state) => state.setQueryData);
  return (
    <>
      <div
        className="border px-2 cursor-pointer py-2 rounded border-l-[3px]"
        onClick={() => {
          navigate("/history");
          setQueryData(data);
        }}
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
        <p className="text-[.7rem]">code: {data?.userId}</p>
      </div>
    </>
  );
};

export default IconHistoryCard;
