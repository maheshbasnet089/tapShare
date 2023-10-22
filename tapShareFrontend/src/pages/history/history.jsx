import HistoryAppBar from "./components/app-bar";
import { useHistoryStore } from "./store";
import HistoryNav from "./components/history-nav";
import { useEffect } from "react";
import FilesHistory from "./components/files-history";
const History = () => {
  // stores
  const getHistory = useHistoryStore((state) => state.getHistory);
  const history = useHistoryStore((state) => state.history);
  const queryData = useHistoryStore((state) => state.queryData);

  useEffect(() => {
    getHistory();
  }, [getHistory]);
  return (
    <>
      <HistoryAppBar />
      <div className="pt-16 text-white">
        <div className="">
          <p className="text-[#efefef] text-[1.1rem] min-[450px]:text-[1.2rem] px-2 min-[450px]:px-4">
            History
          </p>
          <p className="h-[1px] bg-slate-300" />
          <div className="px-2 min-[450px]:px-4 min-[800px]:flex gap-x-3">
            <HistoryNav data={history} />
            <div className="border-l pl-2 pt-2 w-full">
              {queryData?.name && <FilesHistory data={queryData} />}
              {queryData?.title && (
                <p className="text-[#efefef] text-[1.1rem] min-[450px]:text-[1.2rem] px-2 min-[450px]:px-4">
                  {queryData?.title}'s History
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
//  <Route path="/code/:id" element={<ViewCode />} />
// <Route path="/:id" element={<SeeShared />} />
