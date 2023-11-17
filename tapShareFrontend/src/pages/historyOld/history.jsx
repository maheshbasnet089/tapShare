import HistoryAppBar from "./components/app-bar";
import HistoryNav from "./components/history-nav";
import { useHistoryStore } from "./store";
import FilesHistory from "./components/files/files-history";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HistorySkeleton from "./components/history-skeleton";
import CodeHistory from "./components/codes/code-history";
import HistoryLoading from "./components/loading/history-loading";
const History = () => {
  // stores
  const getHistory = useHistoryStore((state) => state.getHistory);
  const queryData = useHistoryStore((state) => state.queryData);
  // states
  const [navType, setNavType] = useState("files");

  // react query
  const { data, isFetching } = useQuery({
    queryFn: getHistory,
    queryKey: ["get", "history"],
  });
  return (
    <>
      <HistoryAppBar />
      <div className="pt-16 text-white fixed w-full">
        <div className="">
          <p className="text-[#efefef] text-[1.1rem] min-[450px]:text-[1.2rem] px-2 min-[450px]:px-4">
            History
          </p>
          <p className="h-[1px] bg-slate-300" />
          <div className="px-2 min-[450px]:px-4 min-[800px]:flex gap-x-3">
            <div className="min-w-[15em] min-[1200px]:min-w-[20em] min-[800px]:h-[87dvh]">
              <div className="flex mt-2 gap-x-4 text-[1.1rem] min-[450px]:mt-3">
                <p
                  className="cursor-pointer select-none hover:text-gray-300"
                  onClick={() => setNavType("files")}
                >
                  Files
                </p>
                <p
                  className="cursor-pointer select-none hover:text-gray-300"
                  onClick={() => setNavType("codes")}
                >
                  Codes
                </p>
              </div>
              <p className="h-[1px] bg-slate-300 mt-1" />
              {isFetching ? (
                <HistorySkeleton />
              ) : (
                <>
                  {navType === "files" &&
                    (Array.isArray(data?.files) && data?.files.length > 0 ? (
                      <HistoryNav data={data?.files} />
                    ) : (
                      <p className="mt-2">no files available</p>
                    ))}
                  {navType === "codes" &&
                    (Array.isArray(data?.codes) && data?.codes.length > 0 ? (
                      <HistoryNav data={data?.codes} />
                    ) : (
                      <p className="mt-2">no codes available</p>
                    ))}
                </>
              )}
            </div>
            <div className="border-l pl-2 pt-2 w-full hidden min-[800px]:block ">
              {isFetching ? (
                <HistoryLoading />
              ) : (
                <>
                  {queryData?.name && <FilesHistory data={queryData} />}
                  {queryData?.title && <CodeHistory data={queryData} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
