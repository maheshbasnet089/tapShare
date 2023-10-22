import React from "react";
import { TbHistory } from "react-icons/tb";
import IconHistoryCard from "./icon-history-card";
const HistoryIcon = () => {
  return (
    <>
      <div className="border-[2px] p-1 rounded-full relative">
        <TbHistory
          className="text-[#efefef] text-[1rem] peer"
          title="history"
        />
        <div className="absolute -translate-x-[14em] top-3 w-[15em]  font-sans text-white peer-hover:block hover:block z-20 bg-transparent pt-4 hidden">
          <div className="bg-[#2c2c2c]/40 rounded p-2 pl-3 overflow-y-scroll h-[15em] w-full grid grid-cols-1 place-content-start gap-3">
            <IconHistoryCard
              title={"hard say test lot frequently ready law baseball"}
            />
            <IconHistoryCard
              title={"root traffic news burst should deer greatest nothing"}
            />
            <IconHistoryCard
              title={
                "flight table business went variety bright pound continent"
              }
            />
            <IconHistoryCard
              title={"ran rich return single suggest put capital rocky"}
            />
            <IconHistoryCard
              title={"rocky exact ship have dead immediately cloth upon"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryIcon;
