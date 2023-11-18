import React from "react";

const HistorySkeleton = () => {
  return (
    <>
      <div className="relative flex w-full animate-pulse gap-2 px-4 py-3 border mt-3 rounded">
        <div className="w-[90%]">
          <div className="h-5 w-full rounded bg-slate-400 text-sm"></div>
          <div className="h-5 w-[30%] rounded bg-slate-400 text-sm mt-1"></div>
        </div>
        <div className="bottom-5 h-4 w-6 rounded-full bg-slate-400"></div>
      </div>
    </>
  );
};

export default HistorySkeleton;
