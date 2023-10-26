import React from "react";
import HistoryNavCard from "./history-nav-card";

const HistoryNav = ({ data }) => {
  return (
    <>
      <div className="flex flex-col pt-3 gap-y-3 w-full h-[85dvh] min-[800px]:h-[87dvh] isolate overflow-y-scroll min-[800px]:pb-5 pb-5">
        {data.map((item) => (
          <HistoryNavCard key={item?._id} data={item} />
        ))}
      </div>
    </>
  );
};

export default HistoryNav;
