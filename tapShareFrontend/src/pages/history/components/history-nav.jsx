import React from "react";
import HistoryNavCard from "./history-nav-card";

const HistoryNav = ({ data }) => {
  return (
    <>
      <div className="flex flex-col pt-3 gap-y-3 min-w-[15em] min-[1200px]:min-w-[20em] h-[85dvh] min-[800px]:h-[87dvh] isolate overflow-y-scroll min-[800px]:pb-5">
        {Array.isArray(data?.codes) &&
          Array.isArray(data?.files) &&
          [...data?.codes, ...data?.files].map((item) => (
            <HistoryNavCard key={item?._id} data={item} />
          ))}
      </div>
    </>
  );
};

export default HistoryNav;
