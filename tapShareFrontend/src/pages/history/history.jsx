import HistoryAppBar from "./components/app-bar";
import HistoryNav from "./components/history-nav";
import { useHistoryStore } from "./store";
import FilesHistory from "./components/files-history";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HistorySkeleton from "./components/history-skeleton";
import CodeHistory from "./components/code-history";
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
                      <p>no files available</p>
                    ))}
                  {navType === "codes" &&
                    (Array.isArray(data?.codes) && data?.codes.length > 0 ? (
                      <HistoryNav data={data?.codes} />
                    ) : (
                      <p>no codes available</p>
                    ))}
                </>
              )}
            </div>
            <div className="border-l pl-2 pt-2 w-full hidden min-[800px]:block ">
              {isFetching ? (
                <div className="w-full flex justify-center items-center min-[800px]:h-[87dvh]">
                  <a
                    href="https://tapshare.xyz"
                    title="TapShare"
                    className="flex items-center gap-[.3rem] cursor-pointer"
                  >
                    <div className="flex justify-center items-center bg-[rgba(0,0,0,0.2)] p-[2px] rounded-full">
                      <div className="flex justify-center bg-[rgba(0,0,0,0.4)] rounded-full">
                        <img
                          src="/tapShare-194x194.webp"
                          className="w-8 backdrop-blur-lg rounded-full"
                          alt="TapShare Logo"
                        />
                      </div>
                    </div>
                    <p className="text-[1.5rem] text-[#efefef] font-semibold tracking-wide">
                      Share
                    </p>
                  </a>
                </div>
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
