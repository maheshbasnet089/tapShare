import React from "react";
import { useNavigate } from "react-router-dom";

const IconHistoryCard = ({ title }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="border px-2 cursor-pointer py-1 rounded-sm leading-5"
        onClick={() => navigate("")}
      >
        <p>{title?.charAt(0).toUpperCase() + title?.slice(1, 27)}</p>
        <p className="text-[.6rem] font-sans">Lorem ipsum dolor sit amet. </p>
      </div>
    </>
  );
};

export default IconHistoryCard;
