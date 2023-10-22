import React from "react";

const HistoryNavCard = ({ data }) => {
  return (
    <>
      <div
        className="border px-2 py-3 rounded border-l-[3px] z-[-2]"
        onClick={() => navigate("/history")}
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
      </div>
    </>
  );
};

export default HistoryNavCard;
