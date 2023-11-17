import React from "react";
import { BiCopy } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CopyToClipboard } from "react-copy-to-clipboard";
import HistoryLoading from "../loading/history-loading";
import { useHistoryStore } from "../../store";
import HistoryAppBar from "../app-bar";
const CodeDetails = () => {
  const { id } = useParams();
  // stores
  const getCodeDetails = useHistoryStore((state) => state.getCodeDetails);
  // react query
  const { data, isFetching } = useQuery({
    queryKey: ["get", "code", "details", id],
    queryFn: () => getCodeDetails(id),
  });

  return (
    <>
      <HistoryAppBar />
      {isFetching ? (
        <div className="w-full pt-[4.5rem] h-[100dvh] flex justify-center items-center">
          <HistoryLoading />
        </div>
      ) : (
        <div className="w-full pt-[4.5rem] h-[80dvh] text-[#efefef] px-2 min-[450px]:px-4">
          <p className=" text-[1.1rem] min-[450px]:text-[1.2rem] capitalize">
            {data?.title}'s History
          </p>
          <p className="h-[1px] w-full bg-white" />
          <div className="border px-4 mt-3 py-3 relative w-full bg-[#2e2e2e] rounded h-[85dvh] overflow-hidden ">
            <code>
              <pre className="whitespace-pre-wrap overflow-y-scroll h-[82dvh]">
                {data?.text}
              </pre>
            </code>
            <div className="absolute top-0 right-0 pr-4 pt-3 ">
              <CopyToClipboard text={data?.text}>
                <BiCopy className="text-[1.2rem] cursor-pointer" />
              </CopyToClipboard>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CodeDetails;
