import React from "react";
import { useHistoryStore } from "../store";
import { useNavigate } from "react-router-dom";

const HistoryNavCard = ({ data }) => {
  const navigate = useNavigate();
  // stores
  const setQueryData = useHistoryStore((state) => state.setQueryData);

  return (
    <>
      <div
        className="border p-2 rounded border-l-[3px] z-[-2] cursor-pointer hidden min-[800px]:block"
        onClick={() => {
          setQueryData(data);
        }}
      >
        <p className="relative z-[-1]">
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
      {/* nav cards for small devices */}
      {/* it si because for a small device, details of the history is shown in a separate page thus it is needed to navigate to a separate route */}
      <div
        className="border p-2 rounded border-l-[3px] z-[-2] cursor-pointer min-[800px]:hidden"
        onClick={() => {
          setQueryData(data);
          if (data?.name) navigate(`/history/file/${data?._id}`);
          if (data?.title) navigate(`/history/code/${data?._id}`);
        }}
      >
        <p className="relative z-[-1]">
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

export default HistoryNavCard;
