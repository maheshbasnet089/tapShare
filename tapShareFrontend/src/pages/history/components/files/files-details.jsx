import React from "react";
import HistoryAppBar from "../app-bar";
import HistoryLoading from "../loading/history-loading";
import { useHistoryStore } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
const FilesDetails = () => {
  const { id } = useParams();
  // stores
  const getFilesDetails = useHistoryStore((state) => state.getFilesDetails);
  // react query
  const { data, isFetching } = useQuery({
    queryKey: ["get", "code", "details", id],
    queryFn: () => getFilesDetails(id),
  });
  return (
    <>
      <HistoryAppBar />
      {isFetching ? (
        <div className="w-full pt-[4.5rem] h-[100dvh] flex justify-center items-center">
          <HistoryLoading />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-col h-[100dvh] text-[#efefef]">
          <a
            href="https://tapshare.xyz"
            title="TapShare"
            className="flex items-center gap-[.3rem] cursor-pointer"
          >
            <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] p-[2px] rounded-full">
              <div className="flex justify-center bg-[rgba(0,0,0,0.4)] rounded-full">
                <img
                  src="/tapShare-194x194.webp"
                  className="w-12  backdrop-blur-lg rounded-full"
                  alt="TapShare Logo"
                />
              </div>
            </div>
          </a>
          <div className="flex items-center gap-x-1">
            <h3 className="text-[1.4rem] font-sans">Keep tapping!</h3>
            <img
              src="/tapShare-194x194.webp"
              className="w-5  backdrop-blur-lg rounded-full"
              alt="TapShare Logo"
            />
          </div>
          <div className="text-center mt-5">
            <p className="text-[.8rem]">The shared file is:</p>
            <p>{data?.name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FilesDetails;
