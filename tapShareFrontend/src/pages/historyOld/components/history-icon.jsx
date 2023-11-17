import React from "react";
import { TbHistory } from "react-icons/tb";
import IconHistoryCard from "./icon-history-card";
import { useHistoryStore } from "../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const HistoryIcon = () => {
  const navigate = useNavigate();
  // stores
  const getHistory = useHistoryStore((state) => state.getHistory);
  const history = useHistoryStore((state) => state.history);
  useEffect(() => {
    getHistory();
  }, [getHistory]);

  return (
    <>
      <div className="border-[2px] p-1 rounded-full relative">
        <TbHistory
          onClick={() => {
            navigate("/history");
          }}
          className="text-[#efefef] text-[1rem] peer cursor-pointer"
          title="view history"
        />
        <div className="absolute -translate-x-[14em] top-3 w-[15em]  font-sans text-white peer-hover:block hover:block z-20 bg-transparent pt-4 hidden">
          <div className="bg-[#2c2c2c]/40 rounded px-3 overflow-y-scroll h-[15em] w-full grid grid-cols-1 place-content-start gap-3 py-4">
            {Array.isArray(history?.codes) &&
              Array.isArray(history?.files) &&
              [...history?.codes, ...history?.files].map((item) => (
                <IconHistoryCard key={item?._id} data={item} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryIcon;
